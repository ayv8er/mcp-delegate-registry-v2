#!/usr/bin/env node

import "dotenv/config";
import express, { Express, Request as ExpressRequest, Response as ExpressResponse } from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createMcpServerInstance } from "./api/toolRegistry.js";
import { NETWORKS, DELEGATE_REGISTRY_ADDRESSES } from "./config.js";

if (!process.env.ALCHEMY_API_KEY) {
  throw new Error("ALCHEMY_API_KEY environment variable is required");
}

const isStdio = !process.env.PORT && process.argv.includes('stdio');

const server = createMcpServerInstance();
if (!server) {
  throw new Error("Failed to create MCP server instance");
}

if (isStdio || process.stdout.isTTY === false) {
  const transport = new StdioServerTransport();
  
  server.connect(transport).then(() => {
    console.error("Delegate Registry V2 MCP Server (stdio mode) started");
    console.error(`Using contracts:`);
    console.error(`  - EVM:    ${DELEGATE_REGISTRY_ADDRESSES.EVM}`);
    console.error(`  - ZKSYNC: ${DELEGATE_REGISTRY_ADDRESSES.ZKSYNC}`);
  }).catch((error) => {
    console.error("Failed to start stdio server:", error);
    process.exit(1);
  });
} else {
  const app: Express = express();
  app.use(express.json());

  const PORT = process.env.PORT || 8080;

  app.all('/delegate-registry-v2/mcp', async (expressReq: ExpressRequest, expressRes: ExpressResponse) => {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    expressRes.on('close', () => {
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
          try {
              transport.close();
          } catch (cleanupError) {
              console.error("Error during error-path cleanup:", cleanupError);
          }
      }
    }
  });

  app.listen(PORT, () => {
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
  });
}

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down...');
  process.exit(0);
});