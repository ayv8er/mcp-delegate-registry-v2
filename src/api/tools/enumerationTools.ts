import { z } from "zod";
import { Address, Hex } from "viem";
import { getNetworkConfig } from "../../utils/getters.js";
import type { McpToolResponse } from "../../types/types.js";
import { 
  addressSchema, 
  hexSchema, 
  validateAddress, 
  validateBytes32, 
} from "../../utils/validators.js";
import { 
  getDelegationsFromHashes, 
  getIncomingDelegationHashes, 
  getIncomingDelegations,
  getOutgoingDelegationHashes, 
  getOutgoingDelegations 
} from "../../services/DelegateRegistryEnumerationService.js";

export const enumerationTools = {
  getIncomingDelegations: {
    name: "getIncomingDelegations",
    description: "Returns all enabled delegations for a given delegatee address",
    schema: {
      address: addressSchema,
      network: z.string()
    },
    handler: async (params: { 
      address: Address; 
      network: string 
    }): Promise<McpToolResponse> => {
      try {
        const validatedAddress = validateAddress(params.address, "address");
        const networkInfo = getNetworkConfig(params.network);
        const delegations = await getIncomingDelegations(validatedAddress, networkInfo);
        const serializedDelegations = delegations.map(delegation => ({
          ...delegation,
          tokenId: delegation.tokenId.toString(),
          amount: delegation.amount.toString()
        }));
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, delegations: serializedDelegations })}]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })}]
        };
      }
    }
  },

  getOutgoingDelegations: {
    name: "getOutgoingDelegations",
    description: "Returns all enabled delegations for a given delegator address",
    schema: {
      address: addressSchema,
      network: z.string()
    },
    handler: async (params: { 
      address: Address; 
      network: string 
    }): Promise<McpToolResponse> => {
      try {
        const validatedAddress = validateAddress(params.address, "address");
        const networkInfo = getNetworkConfig(params.network);
        const delegations = await getOutgoingDelegations(validatedAddress, networkInfo);
        const serializedDelegations = delegations.map(delegation => ({
          ...delegation,
          tokenId: delegation.tokenId.toString(),
          amount: delegation.amount.toString()
        }));
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, delegations: serializedDelegations })}]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })}]
        };
      }
    }
  },

  getIncomingDelegationHashes: {
    name: "getIncomingDelegationHashes",
    description: "Returns all enabled delegation hashes for a given delegatee address",
    schema: {
      address: addressSchema,
      network: z.string()
    },
    handler: async (params: { 
      address: Address; 
      network: string 
    }): Promise<McpToolResponse> => {
      try {
        const validatedAddress = validateAddress(params.address, "address");
        const networkInfo = getNetworkConfig(params.network);
        const delegationHashes = await getIncomingDelegationHashes(validatedAddress, networkInfo);
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, delegationHashes })}]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })}]
        };
      }
    }
  },

  getOutgoingDelegationHashes: {
    name: "getOutgoingDelegationHashes",
    description: "Returns all enabled delegation hashes for a given delegator address",
    schema: {
      address: addressSchema,
      network: z.string()
    },
    handler: async (params: { 
      address: Address; 
      network: string 
    }): Promise<McpToolResponse> => {
      try {
        const validatedAddress = validateAddress(params.address, "address");
        const networkInfo = getNetworkConfig(params.network);
        const delegationHashes = await getOutgoingDelegationHashes(validatedAddress, networkInfo);
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, delegationHashes })}]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })}]
        };
      }
    }
  },

  getDelegationsFromHashes: {
    name: "getDelegationsFromHashes",
    description: "Returns all enabled delegation hashes for a given address",
    schema: {
      delegationHashes: z.array(hexSchema),
      network: z.string()
    },
    handler: async (params: { 
      delegationHashes: Hex[]; 
      network: string 
    }): Promise<McpToolResponse> => {
      try {
        const validatedDelegationHashes = params.delegationHashes.map(hash => validateBytes32(hash));
        const networkInfo = getNetworkConfig(params.network);
        const delegations = await getDelegationsFromHashes(validatedDelegationHashes, networkInfo);
        const serializedDelegations = delegations.map(delegation => ({
          ...delegation,
          tokenId: delegation.tokenId.toString(),
          amount: delegation.amount.toString()
        }));
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, delegations: serializedDelegations })}]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })}]
        };
      }
    }
  }
};