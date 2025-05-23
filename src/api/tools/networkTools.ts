import { z } from "zod";
import { McpToolResponse } from "../../types/types.js";
import { getNetworkInfo, getNetworks } from "../../utils/getters.js";

export const networkTools = {
  getSupportedNetworks: {
    name: "getSupportedNetworks",
    description: "Get list of all supported networks for Delegate Registry v2",
    schema: {},
    handler: async (): Promise<McpToolResponse> => {
      try {
        const networks = getNetworks();
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, networks }) }]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })}]
        };
      }
    }
  },

  getNetworkInfo: {
    name: "getNetworkInfo",
    description: "Get detailed information about a specific supported network by name or chainId",
    schema: {
      networkIdentifier: z.string()
    },
    handler: async (params: { networkIdentifier: string }): Promise<McpToolResponse> => {
      try {
        const networkInfo = getNetworkInfo(params.networkIdentifier);
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, networkInfo })}]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })}]
        };
      }
    }
  }
}; 