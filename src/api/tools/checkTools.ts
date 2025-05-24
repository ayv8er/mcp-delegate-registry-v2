import { z } from "zod";
import { Address, Hex } from "viem";
import { getNetworkConfig } from "../../utils/getters.js";
import type { McpToolResponse } from "../../types/types.js";
import { 
  addressSchema, 
  hexSchema, 
  validateAddress, 
  validateBytes32, 
  validateBigIntString, 
} from "../../utils/validators.js";
import {
  checkDelegateForAll,
  checkDelegateForContract,
  checkDelegateForERC1155,
  checkDelegateForERC20,
  checkDelegateForERC721
} from "../../services/DelegateRegistryCheckService.js";

export const checkTools = {
  checkDelegateForAll: {
    name: "checkDelegateForAll",
    description: "Check if delegatee is granted to act on behalf of delegator for all operations",
    schema: {
      delegatee: addressSchema,
      delegator: addressSchema,
      rights: hexSchema,
      network: z.string()
    },
    handler: async (params: {
      delegatee: Address;
      delegator: Address;
      rights: Hex;
      network: string;
    }): Promise<McpToolResponse> => {
      try {
        const networkInfo = getNetworkConfig(params.network);
        const isDelegate = await checkDelegateForAll({
          delegatee: validateAddress(params.delegatee, "delegatee"),
          delegator: validateAddress(params.delegator, "delegator"),
          rights: validateBytes32(params.rights),
          network: networkInfo
        });
        return { content: [{ type: "text", text: JSON.stringify({ success: true, result: isDelegate })}] };
      } catch (error: any) {
        return { content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error'})}] };
      }
    }
  },

  checkDelegateForContract: {
    name: "checkDelegateForContract",
    description: "Check if delegatee is granted to act on behalf of delegator for a specific contract",
    schema: {
      delegatee: addressSchema,
      delegator: addressSchema,
      contractToDelegate: addressSchema,
      rights: hexSchema,
      network: z.string()
    },
    handler: async (params: {
      delegatee: Address;
      delegator: Address;
      contractToDelegate: Address;
      rights: Hex;
      network: string;
    }): Promise<McpToolResponse> => {
      try {
        const networkInfo = getNetworkConfig(params.network);
        const isDelegate = await checkDelegateForContract({
          delegatee: validateAddress(params.delegatee, "delegatee"),
          delegator: validateAddress(params.delegator, "delegator"),
          contractToDelegate: validateAddress(params.contractToDelegate, "contractToDelegate"),
          rights: validateBytes32(params.rights),
          network: networkInfo
        });
        return { content: [{ type: "text", text: JSON.stringify({ success: true, result: isDelegate })}] };
      } catch (error: any) {
        return { content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error'})}] };
      }
    }
  },

  checkDelegateForERC721: {
    name: "checkDelegateForERC721",
    description: "Check if delegatee is granted to act on behalf of delegator for a specific ERC721 token",
    schema: {
      delegatee: addressSchema,
      delegator: addressSchema,
      contractToDelegate: addressSchema,
      tokenId: z.string(),
      rights: hexSchema,
      network: z.string()
    },
    handler: async (params: {
      delegatee: Address;
      delegator: Address;
      contractToDelegate: Address;  
      tokenId: string;
      rights: Hex;
      network: string;
    }): Promise<McpToolResponse> => {
      try {
        const networkInfo = getNetworkConfig(params.network);
        const isDelegate = await checkDelegateForERC721({
          delegatee: validateAddress(params.delegatee, "delegatee"),
          delegator: validateAddress(params.delegator, "delegator"),
          contractToDelegate: validateAddress(params.contractToDelegate, "contractToDelegate"),
          tokenId: BigInt(validateBigIntString(params.tokenId, "tokenId")),
          rights: validateBytes32(params.rights),
          network: networkInfo
        });
        return { content: [{ type: "text", text: JSON.stringify({ success: true, result: isDelegate })}] };
      } catch (error: any) {
        return { content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error'})}] };
      }
    }
  },

  checkDelegateForERC20: {
    name: "checkDelegateForERC20",
    description: "Check if delegatee is granted to act on behalf of delegator for an amount of ERC20 tokens",
    schema: {
      delegatee: addressSchema,
      delegator: addressSchema,
      contractToDelegate: addressSchema,
      rights: hexSchema,
      network: z.string()
    },
    handler: async (params: {
      delegatee: Address;
      delegator: Address;
      contractToDelegate: Address;
      rights: Hex;
      network: string;
    }): Promise<McpToolResponse> => {
      try {
        const networkInfo = getNetworkConfig(params.network);
        const amount = await checkDelegateForERC20({
          delegatee: validateAddress(params.delegatee, "delegatee"),
          delegator: validateAddress(params.delegator, "delegator"),
          contractToDelegate: validateAddress(params.contractToDelegate, "contractToDelegate"),
          rights: validateBytes32(params.rights),
          network: networkInfo
        });
        return { content: [{ type: "text", text: JSON.stringify({ success: true, result: amount.toString() })}] };
      } catch (error: any) {
        return { content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error'})}] };
      }
    }
  },

  checkDelegateForERC1155: {
    name: "checkDelegateForERC1155",
    description: "Check if delegatee is granted to act on behalf of delegator for an amount of ERC1155 tokens",
    schema: {
      delegatee: addressSchema,
      delegator: addressSchema,
      contractToDelegate: addressSchema,
      tokenId: z.string(),
      rights: hexSchema,
      network: z.string()
    },
    handler: async (params: {
      delegatee: Address;
      delegator: Address;
      contractToDelegate: Address;
      tokenId: string;
      rights: Hex;
      network: string;
    }): Promise<McpToolResponse> => {
      try {
        const networkInfo = getNetworkConfig(params.network); 
        const amount = await checkDelegateForERC1155({
          delegatee: validateAddress(params.delegatee, "delegatee"),
          delegator: validateAddress(params.delegator, "delegator"),
          contractToDelegate: validateAddress(params.contractToDelegate, "contractToDelegate"),
          tokenId: BigInt(validateBigIntString(params.tokenId, "tokenId")),
          rights: validateBytes32(params.rights),
          network: networkInfo
        });
        return { content: [{ type: "text", text: JSON.stringify({ success: true, result: amount.toString() })}] };
      } catch (error: any) {
        return { content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error'})}] };
      }
    }
  }
}; 