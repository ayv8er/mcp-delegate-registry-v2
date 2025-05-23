import { z } from "zod";
import { Address, Hex } from "viem";
import { getNetworkInfo } from "../../utils/getters.js";
import type { McpToolResponse } from "../../types/types.js";
import { addressSchema, hexSchema, validateAddress, validateBytes32, validateBigIntString } from "../../utils/validators.js";
import {
  prepareMulticallTransactionData,
  prepareDelegateAllTransactionData,
  prepareDelegateContractTransactionData,
  prepareDelegateERC721TransactionData,
  prepareDelegateERC20TransactionData,
  prepareDelegateERC1155TransactionData,
} from "../../services/DelegateRegistryWriteService.js";

export const delegateTools = {
  multicall: {
    name: "multicall",
    description: "Prepares a multicall transaction to execute multiple actions on the registry",
    schema: {
      encodedCalls: z.array(hexSchema),
      network: z.string()
    },
    handler: async (params: {
      encodedCalls: Hex[];
      network: string;
    }): Promise<McpToolResponse> => {
      try {
        const networkInfo = getNetworkInfo(params.network);
        const txData = prepareMulticallTransactionData({
          encodedCalls: params.encodedCalls.map(call => validateBytes32(call)),
          chainId: networkInfo.chainId,
          delegateRegistryV2Address: networkInfo.delegateRegistryV2Address
        });
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, transactionParameters: { ...txData, value: txData.value?.toString() } as any })}]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })}]
        };
      }
    }
  },

  delegateAll: {
    name: "delegateAll",
    description: "Prepares transaction object for delegating all rights",
    schema: {
      delegatee: addressSchema,
      rights: hexSchema,
      enable: z.boolean(),
      network: z.string(),
    },
    handler: async (params: { 
      delegatee: Address;
      rights: Hex; 
      enable: boolean; 
      network: string;
    }): Promise<McpToolResponse> => {
      try {
        const networkInfo = getNetworkInfo(params.network);
        const txData = prepareDelegateAllTransactionData({
          delegatee: validateAddress(params.delegatee, "delegatee"),
          rights: validateBytes32(params.rights),
          enable: params.enable,
          chainId: networkInfo.chainId,
          delegateRegistryV2Address: networkInfo.delegateRegistryV2Address
        });
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, transactionParameters: { ...txData, value: txData.value?.toString() } as any })}]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })}]
        };
      }
    }
  },

  delegateContract: {
    name: "delegateContract",
    description: "Prepares transaction object for delegating rights of a contract",
    schema: {
      delegatee: addressSchema,
      contractToDelegate: addressSchema,
      rights: hexSchema,
      enable: z.boolean(),
      network: z.string()
    },
    handler: async (params: { 
      delegatee: Address; 
      contractToDelegate: Address; 
      rights: Hex; 
      enable: boolean; 
      network: string;
    }): Promise<McpToolResponse> => {
      try {
        const networkInfo = getNetworkInfo(params.network);
        const txData = prepareDelegateContractTransactionData({
          delegatee: validateAddress(params.delegatee, "delegatee"),
          contractToDelegate: validateAddress(params.contractToDelegate, "contractToDelegate"),
          rights: validateBytes32(params.rights),
          enable: params.enable,
          chainId: networkInfo.chainId,
          delegateRegistryV2Address: networkInfo.delegateRegistryV2Address
        });
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, transactionParameters: { ...txData, value: txData.value?.toString() } as any })}]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })}]
        };
      }
    }
  },

  delegateERC721: {
    name: "delegateERC721",
    description: "Prepares transaction object for delegating rights for a specific ERC721 token",
    schema: {
      delegatee: addressSchema,
      contractToDelegate: addressSchema,
      tokenId: z.string(),
      rights: hexSchema,
      enable: z.boolean(),
      network: z.string()
    },
    handler: async (params: { 
      delegatee: Address; 
      contractToDelegate: Address; 
      tokenId: string;
      rights: Hex; 
      enable: boolean; 
      network: string;
    }): Promise<McpToolResponse> => {
      try {
        const networkInfo = getNetworkInfo(params.network);
        const txData = prepareDelegateERC721TransactionData({
          delegatee: validateAddress(params.delegatee, "delegatee"),
          contractToDelegate: validateAddress(params.contractToDelegate, "contractToDelegate"),
          tokenId: BigInt(validateBigIntString(params.tokenId, "tokenId")),
          rights: validateBytes32(params.rights),
          enable: params.enable,
          chainId: networkInfo.chainId,
          delegateRegistryV2Address: networkInfo.delegateRegistryV2Address
        });
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, transactionParameters: { ...txData, value: txData.value?.toString() } as any })}]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })}]
        };
      }
    }
  },

  delegateERC20: {
    name: "delegateERC20",
    description: "Prepares transaction object for delegating rights for an amount of ERC20 tokens",
    schema: {
      delegatee: addressSchema,
      contractToDelegate: addressSchema,
      rights: hexSchema,
      amount: z.string(),
      network: z.string()
    },
    handler: async (params: { 
      delegatee: Address; 
      contractToDelegate: Address; 
      rights: Hex; 
      amount: string; 
      network: string;
    }): Promise<McpToolResponse> => {
      try {
        const networkInfo = getNetworkInfo(params.network);
        const txData = prepareDelegateERC20TransactionData({
          delegatee: validateAddress(params.delegatee, "delegatee"),
          contractToDelegate: validateAddress(params.contractToDelegate, "contractToDelegate"),
          rights: validateBytes32(params.rights),
          amount: BigInt(validateBigIntString(params.amount, "amount")),
          chainId: networkInfo.chainId,
          delegateRegistryV2Address: networkInfo.delegateRegistryV2Address
        });
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, transactionParameters: { ...txData, value: txData.value?.toString() } as any })}]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })}]
        };
      }
    }
  },

  delegateERC1155: {
    name: "delegateERC1155",
    description: "Prepares transaction object for delegating rights for an amount of an ERC1155 token",
    schema: {
      delegatee: addressSchema,
      contractToDelegate: addressSchema,
      tokenId: z.string(),
      rights: hexSchema,
      amount: z.string(),
      network: z.string()
    },
    handler: async (params: { 
      delegatee: Address; 
      contractToDelegate: Address; 
      tokenId: string; 
      rights: Hex; 
      amount: string; 
      network: string;
    }): Promise<McpToolResponse> => {
      try {
        const networkInfo = getNetworkInfo(params.network);
        const txData = prepareDelegateERC1155TransactionData({
          delegatee: validateAddress(params.delegatee, "delegatee"),
          contractToDelegate: validateAddress(params.contractToDelegate, "contractToDelegate"),
          tokenId: BigInt(validateBigIntString(params.tokenId, "tokenId")),
          rights: validateBytes32(params.rights),
          amount: BigInt(validateBigIntString(params.amount, "amount")),
          chainId: networkInfo.chainId,
          delegateRegistryV2Address: networkInfo.delegateRegistryV2Address
        });
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, transactionParameters: { ...txData, value: txData.value?.toString() } as any })}]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })}]
        };
      }
    }
  }
}; 