import "dotenv/config";
import express, { Express, Request as ExpressRequest, Response as ExpressResponse } from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpServerInstance } from "./api/toolRegistry.js";
import { NETWORKS, DELEGATE_REGISTRY_ADDRESSES } from "./config.js";

if (!process.env.ALCHEMY_API_KEY) {
  throw new Error("ALCHEMY_API_KEY environment variable is required");
}

const app: Express = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

const server = createMcpServerInstance();
if (!server) {
  throw new Error("Failed to create MCP server instance");
}

app.all('/delegate-registry-v2/mcp', async (expressReq: ExpressRequest, expressRes: ExpressResponse) => {
  console.log('Incoming request body:', expressReq.body);

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  expressRes.on('close', () => {
    console.log('Request closed, cleaning up server and transport.');
    try {
      transport.close();
    } catch (cleanupError) {
      console.error("Error during cleanup:", cleanupError);
    }
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(expressReq, expressRes, expressReq.body);
  } catch (error) {
    console.error("MCP request handling error:", error);
    if (!expressRes.headersSent) {
      expressRes.status(500).json({
        jsonrpc: '2.0',
        error: { code: -32603, message: 'Internal server error' },
        id: (expressReq.body as any)?.id ?? null,
      });
    }

    if (!expressRes.writableEnded) {
        console.log("Ensuring cleanup after error before request fully handled.");
        try {
            transport.close();
        } catch (cleanupError) {
            console.error("Error during error-path cleanup:", cleanupError);
        }
    }
  }
});

async function main() {
  await new Promise<void>(resolve => {
    const httpServer = app.listen(PORT, () => {

      const isProduction = process.env.NODE_ENV === 'production';
      const baseUrl = isProduction 
        ? process.env.BASE_URL || 'https://api.delegatexyz.com'
        : `http://localhost:${PORT}`;

      console.log(`
Delegate Registry V2 MCP Stateless HTTP Server
--------------------------------------------
Server started on port: ${PORT}
Endpoint URL: ${baseUrl}/delegate-registry-v2/mcp
Contract Addresses:
  - EVM:    ${DELEGATE_REGISTRY_ADDRESSES.EVM}
  - ZKSYNC: ${DELEGATE_REGISTRY_ADDRESSES.ZKSYNC}
Supported Networks: ${Object.keys(NETWORKS).length}
      `)
      resolve();
    });

    const shutdown = async (signal: string) => {
      console.log(`${signal} received. Shutting down...`);
      try {
        await server.close();
        await new Promise(resolve => httpServer.close(resolve));
        console.log('Shutdown completed');
        process.exit(0);
      } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
      }
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  });
}

main().catch((err) => {
  console.error("Failed to start MCP HTTP Server:", err);
  process.exit(1);
});