import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Hex } from "viem";
import {
  prepareMulticallTransactionData,
  prepareDelegateAllTransactionData,
  prepareDelegateContractTransactionData,
  prepareDelegateERC721TransactionData,
  prepareDelegateERC20TransactionData,
  prepareDelegateERC1155TransactionData,
  TransactionParameters,
} from "../services/delegateRegistryService.js";
import {
  PrepareMulticallParamsSchema,
  PrepareDelegateAllParamsSchema,
  PrepareDelegateContractParamsSchema,
  PrepareDelegateERC721ParamsSchema,
  PrepareDelegateERC20ParamsSchema,
  PrepareDelegateERC1155ParamsSchema,
} from "../schemas/schemas.js";

type ToolOperations = 
  | { success: true; transactionParameters: TransactionParameters }
  | { success: false; error: string };

export function createMcpServerInstance(): McpServer {
  const server = new McpServer({
    name: "Delegate Registry v2 MCP",
    version: "1.0.0",
    description: "Delegate Registry v2 MCP",
  });

  server.tool(
    "multicall",
    "Prepares a multicall transaction to execute multiple actions on the Delegate Registry",
    PrepareMulticallParamsSchema.shape,
    async (params: {
      encodedCalls: string[];
    }): Promise<{ content: [{ type: "text"; text: string }] }> => {
      let result: ToolOperations;
      try {
        const txData = prepareMulticallTransactionData({ encodedCalls: params.encodedCalls as Hex[] });
        result = { success: true, transactionParameters: { ...txData, value: txData.value?.toString() } as any };
      } catch (error) {
        console.error('multicall tool error:', error);
        result = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }
  );

  server.tool(
    "delegate_all",
    "Prepares transaction object for delegating all rights",
    PrepareDelegateAllParamsSchema.shape,
    async (params: { 
      delegateeAddress: string; 
      rights: string; 
      enable: boolean; 
    }): Promise<{ content: [{ type: "text"; text: string }] }> => {
      let result: ToolOperations;
      try {
        const txData = prepareDelegateAllTransactionData(params as any);
        result = { success: true, transactionParameters: { ...txData, value: txData.value?.toString() } as any };
      } catch (error) {
        console.error('delegate_all tool error:', error);
        result = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }
  );

  server.tool(
    "delegate_contract",
    "Prepares transaction object for delegating rights of a contract",
    PrepareDelegateContractParamsSchema.shape, 
    async (params: { 
      delegateeAddress: string; 
      contractToDelegate: string; 
      rights: string; 
      enable: boolean; 
    }): Promise<{ content: [{ type: "text"; text: string }] }> => {
      let result: ToolOperations;
      try {
        const txData = prepareDelegateContractTransactionData(params as any);
        result = { success: true, transactionParameters: { ...txData, value: txData.value?.toString() } as any };
      } catch (error) {
        result = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }
  );

  server.tool(
    "delegate_erc_721",
    "Prepares transaction object for delegating rights for a specific ERC721 token",
    PrepareDelegateERC721ParamsSchema.shape, 
    async (params: { 
      delegateeAddress: string; 
      contractToDelegate: string; 
      tokenId: string;
      rights: string; 
      enable: boolean; 
    }): Promise<{ content: [{ type: "text"; text: string }] }> => {
      let result: ToolOperations;
      try {
        const functionParams = {
          ...params,
          tokenId: BigInt(params.tokenId),
        };
        const txData = prepareDelegateERC721TransactionData(functionParams as any);
        result = { success: true, transactionParameters: { ...txData, value: txData.value?.toString() } as any };
      } catch (error) {
        result = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }
  );

  server.tool(
    "delegate_erc_20",
    "Prepares transaction object for delegating rights for an amount of ERC20 tokens",
    PrepareDelegateERC20ParamsSchema.shape, 
    async (params: { 
      delegateeAddress: string; 
      contractToDelegate: string; 
      rights: string; 
      amount: string; 
    }): Promise<{ content: [{ type: "text"; text: string }] }> => {
      let result: ToolOperations;
      try {
        const functionParams = {
          ...params,
          amount: BigInt(params.amount),
        };
        const txData = prepareDelegateERC20TransactionData(functionParams as any);
        result = { success: true, transactionParameters: { ...txData, value: txData.value?.toString() } as any };
      } catch (error) {
        result = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }
  );

  server.tool(
    "delegate_erc_1155",
    "Prepares transaction object for delegating rights for an amount of an ERC1155 token",
    PrepareDelegateERC1155ParamsSchema.shape, 
    async (params: { 
      delegateeAddress: string; 
      contractToDelegate: string; 
      tokenId: string; 
      rights: string; 
      amount: string; 
    }): Promise<{ content: [{ type: "text"; text: string }] }> => {
      let result: ToolOperations;
      try {
        const functionParams = {
          ...params,
          tokenId: BigInt(params.tokenId),
          amount: BigInt(params.amount),
        };
        const txData = prepareDelegateERC1155TransactionData(functionParams as any);
        result = { success: true, transactionParameters: { ...txData, value: txData.value?.toString() }as any };
      } catch (error) {
        result = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }
  );

  return server;
}