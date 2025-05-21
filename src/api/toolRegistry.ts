import { validateAddress, validateBigIntString, validateBytes32 } from "../validators.js";
import {
  prepareMulticallTransactionData,
  prepareDelegateAllTransactionData,
  prepareDelegateContractTransactionData,
  prepareDelegateERC721TransactionData,
  prepareDelegateERC20TransactionData,
  prepareDelegateERC1155TransactionData,
  TransactionParameters,
} from "../services/delegateRegistryService.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Hex } from "viem";
import { z } from "zod";
import { NETWORKS, NetworkType } from "../config.js";

type ToolOperations = { 
  success: true; 
  transactionParameters: TransactionParameters 
} | { 
  success: false; 
  error: string 
};

interface NetworkResponse {
  displayName: string;
  chainId: number;
  contractAddress: string;
}

export function createMcpServerInstance(): McpServer {
  const server = new McpServer({
    name: "Delegate Registry v2 MCP",
    version: "1.0.0",
    description: "Delegate Registry v2 MCP",
  });

  server.tool(
    "getSupportedNetworks",
    "Get list of all supported networks for delegation",
    async (): Promise<{ content: [{ type: "text"; text: string }] }> => {
      const networks = Object.entries(NETWORKS).map(([key, net]): NetworkResponse => ({
        displayName: net.displayName,
        chainId: net.chainId,
        contractAddress: net.contractAddress,
      }));
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify({ networks }) 
        }]
      };
    }
  );

  server.tool(
    "getNetworkInfo",
    "Get detailed information about a specific network",
    {
      networkIdentifier: z.string().describe("Network name or chainId")
    },
    async (params: { 
      networkIdentifier: string 
    }): Promise<{ content: [{ type: "text"; text: string }] }> => {
      const network = isNaN(Number(params.networkIdentifier)) 
        ? NETWORKS[params.networkIdentifier.toLowerCase()]
        : Object.values(NETWORKS).find(n => n.chainId === Number(params.networkIdentifier));
      if (!network) {
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify({ 
              error: "Network not found" 
            }) 
          }]
        };
      }
      const response: NetworkResponse = {
        displayName: network.displayName,
        chainId: network.chainId,
        contractAddress: network.contractAddress
      };
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(response)
        }]
      };
    }
  );

  server.tool(
    "multicall",
    "Prepares a multicall transaction to execute multiple actions on the Delegate Registry",
    {
      network: z.string().describe("Network identifier"),
      encodedCalls: z.array(z.string()),
    },
    async (params: {
      network: string;
      encodedCalls: string[];
    }): Promise<{ content: [{ type: "text"; text: string }] }> => {
      let result: ToolOperations;
      try {
        const validatedParams = {
          encodedCalls: params.encodedCalls.map(call => 
            validateBytes32(call, "encodedCall")
          ) as Hex[],
          chainId: NETWORKS[params.network].chainId,
          contractAddress: NETWORKS[params.network].contractAddress
        };
        const txData = prepareMulticallTransactionData(validatedParams as any);
        result = { success: true, transactionParameters: { ...txData, value: txData.value?.toString() } as any };
      } catch (error: any) {
        result = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }
  );

  server.tool(
    "delegateAll",
    "Prepares transaction object for delegating all rights",
    {
      network: z.string().describe("Network identifier"),
      delegatee: z.string(),
      rights: z.string(),
      enable: z.boolean()
    },
    async (params: { 
      network: string;
      delegatee: string;
      rights: string; 
      enable: boolean; 
    }): Promise<{ content: [{ type: "text"; text: string }] }> => {
      let result: ToolOperations;
      try {
        const validatedParams = {
          delegatee: validateAddress(params.delegatee, "delegatee"),
          rights: validateBytes32(params.rights, "rights"),
          enable: params.enable,
          chainId: NETWORKS[params.network].chainId,
          contractAddress: NETWORKS[params.network].contractAddress
        };
        const txData = prepareDelegateAllTransactionData(validatedParams as any);
        result = { success: true, transactionParameters: { ...txData, value: txData.value?.toString() } as any };
      } catch (error: any) {
        result = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }
  );

  server.tool(
    "delegateContract",
    "Prepares transaction object for delegating rights of a contract",
    {
      delegatee: z.string(),
      contractToDelegate: z.string(),
      rights: z.string(),
      enable: z.boolean(),
      network: z.string().describe("Network identifier")
    },
    async (params: { 
      delegatee: string; 
      contractToDelegate: string; 
      rights: string; 
      enable: boolean; 
      network: string;
    }): Promise<{ content: [{ type: "text"; text: string }] }> => {
      let result: ToolOperations;
      try {
        const validatedParams = {
          delegatee: validateAddress(params.delegatee, "delegatee"),
          contractToDelegate: validateAddress(params.contractToDelegate, "contractToDelegate"),
          rights: validateBytes32(params.rights, "rights"),
          enable: params.enable,
          chainId: NETWORKS[params.network].chainId,
          contractAddress: NETWORKS[params.network].contractAddress
        };
        const txData = prepareDelegateContractTransactionData(validatedParams as any);
        result = { success: true, transactionParameters: { ...txData, value: txData.value?.toString() } as any };
      } catch (error: any) {
        result = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }
  );

  server.tool(
    "delegateERC721",
    "Prepares transaction object for delegating rights for a specific ERC721 token",
    {
      delegatee: z.string(),
      contractToDelegate: z.string(),
      tokenId: z.string(),
      rights: z.string(),
      enable: z.boolean(),
      network: z.string().describe("Network identifier")
    },
    async (params: { 
      delegatee: string; 
      contractToDelegate: string; 
      tokenId: string;
      rights: string; 
      enable: boolean; 
      network: string;
    }): Promise<{ content: [{ type: "text"; text: string }] }> => {
      let result: ToolOperations;
      try {
        const validatedParams = {
          delegatee: validateAddress(params.delegatee, "delegatee"),
          contractToDelegate: validateAddress(params.contractToDelegate, "contractToDelegate"),
          tokenId: validateBigIntString(params.tokenId, "tokenId"),
          rights: validateBytes32(params.rights, "rights"),
          enable: params.enable,
          chainId: NETWORKS[params.network].chainId,
          contractAddress: NETWORKS[params.network].contractAddress
        };
        const transformedParams = {
          ...validatedParams,
          tokenId: BigInt(params.tokenId),
        };
        const txData = prepareDelegateERC721TransactionData(transformedParams as any);
        result = { success: true, transactionParameters: { ...txData, value: txData.value?.toString() } as any };
      } catch (error: any) {
        result = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }
  );

  server.tool(
    "delegateERC20",
    "Prepares transaction object for delegating rights for an amount of ERC20 tokens",
    {
      delegatee: z.string(),
      contractToDelegate: z.string(),
      rights: z.string(),
      amount: z.string(),
      network: z.string().describe("Network identifier")
    },
    async (params: { 
      delegatee: string; 
      contractToDelegate: string; 
      rights: string; 
      amount: string; 
      network: string;
    }): Promise<{ content: [{ type: "text"; text: string }] }> => {
      let result: ToolOperations;
      try {
        const validatedParams = {
          delegatee: validateAddress(params.delegatee, "delegatee"),
          contractToDelegate: validateAddress(params.contractToDelegate, "contractToDelegate"),
          rights: validateBytes32(params.rights, "rights"),
          amount: validateBigIntString(params.amount, "amount"),
          chainId: NETWORKS[params.network].chainId,
          contractAddress: NETWORKS[params.network].contractAddress
        };
        const transformedParams = {
          ...validatedParams,
          amount: BigInt(params.amount),
        };
        const txData = prepareDelegateERC20TransactionData(transformedParams as any);
        result = { success: true, transactionParameters: { ...txData, value: txData.value?.toString() } as any };
      } catch (error: any) {
        result = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }
  );

  server.tool(
    "delegateERC1155",
    "Prepares transaction object for delegating rights for an amount of an ERC1155 token",
    {
      delegatee: z.string(),
      contractToDelegate: z.string(),
      tokenId: z.string(),
      rights: z.string(),
      amount: z.string(),
      network: z.string().describe("Network identifier")
    },
    async (params: { 
      delegatee: string; 
      contractToDelegate: string; 
      tokenId: string; 
      rights: string; 
      amount: string; 
      network: string;
    }): Promise<{ content: [{ type: "text"; text: string }] }> => {
      let result: ToolOperations;
      try {
        const validatedParams = {
          delegatee: validateAddress(params.delegatee, "delegatee"),
          contractToDelegate: validateAddress(params.contractToDelegate, "contractToDelegate"),
          tokenId: validateBigIntString(params.tokenId, "tokenId"),
          rights: validateBytes32(params.rights, "rights"),
          amount: validateBigIntString(params.amount, "amount"),
          chainId: NETWORKS[params.network].chainId,
          contractAddress: NETWORKS[params.network].contractAddress
        };
        const transformedParams = {
          ...validatedParams,
          tokenId: BigInt(params.tokenId),
        };
        const txData = prepareDelegateERC1155TransactionData(transformedParams as any);
        result = { success: true, transactionParameters: { ...txData, value: txData.value?.toString() }as any };
      } catch (error: any) {
        result = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }
  );

  return server;
}