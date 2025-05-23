import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { networkTools } from "./tools/networkTools.js";
import { delegateTools } from "./tools/delegateTools.js";
import { checkTools } from "./tools/checkTools.js";

export function createMcpServerInstance(): McpServer {
  const server = new McpServer({
    name: "Delegate Registry v2 MCP",
    version: "1.0.0",
    description: "Delegate Registry v2 MCP",
  });

  Object.values(networkTools).forEach(tool => {
    server.tool(tool.name, tool.description, tool.schema, tool.handler);
  });

  Object.values(delegateTools).forEach(tool => {
    server.tool(tool.name, tool.description, tool.schema, tool.handler);
  });

  Object.values(checkTools).forEach(tool => {
    server.tool(tool.name, tool.description, tool.schema, tool.handler);
  });

  return server;
}