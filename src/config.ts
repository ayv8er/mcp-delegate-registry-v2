import { Address } from "viem";

if (
  !process.env.DELEGATE_REGISTRY_CONTRACT_ADDRESS ||
  !process.env.ALCHEMY_MAINNET_RPC_URL ||
  !process.env.ALCHEMY_SEPOLIA_RPC_URL
) {
  throw new Error(
    "Missing required environment variables:\n" +
    "- DELEGATE_REGISTRY_CONTRACT_ADDRESS: Contract address for the Delegate Registry\n" +
    "- ALCHEMY_MAINNET_RPC_URL: RPC URL for Ethereum mainnet\n" +
    "- ALCHEMY_SEPOLIA_RPC_URL: RPC URL for Sepolia testnet"
  );
}

export const config = {
  contract: {
    address: process.env.DELEGATE_REGISTRY_CONTRACT_ADDRESS as Address,
  },
  rpc: {
    mainnet: process.env.ALCHEMY_MAINNET_RPC_URL,
    sepolia: process.env.ALCHEMY_SEPOLIA_RPC_URL,
  },
} as const; 