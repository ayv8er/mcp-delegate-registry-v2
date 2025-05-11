import "dotenv/config";
import { config } from "./config.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express, { Express, Request as ExpressRequest, Response as ExpressResponse } from "express";
import { createMcpServerInstance } from "./api/toolRegistry.js";

const app: Express = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.all('/delegate-registry-v2/mcp', async (expressReq: ExpressRequest, expressRes: ExpressResponse) => {
  const server = createMcpServerInstance();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  expressRes.on('close', () => {
    console.log('Request closed, cleaning up server and transport.');
    try {
      transport.close();
      server.close();
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
            server.close();
        } catch (cleanupError) {
            console.error("Error during error-path cleanup:", cleanupError);
        }
    }
  }
});

async function main() {
  app.listen(PORT, () => {
    console.log(`Delegate Registry V2 MCP Stateless HTTP Server started on port ${PORT}`);
    console.log(`Listening for requests at http://localhost:${PORT}/mcp`);
    console.log(`Contract Address: ${config.contract.address}`);
  });
}

main().catch((err) => {
  console.error("Failed to start MCP HTTP Server:", err);
  process.exit(1);
});