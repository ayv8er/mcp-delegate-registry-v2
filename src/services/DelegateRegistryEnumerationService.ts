import { http, createPublicClient } from "viem";
import { delegateRegistryAbi } from '../abi/delegateRegistryAbi.js';
import type  { Address, Hex } from "viem";
import type { NetworkConfig, Delegation } from "../types/types.js";

export function createNetworkClient(network: NetworkConfig) {
  // TODO: Add backup RPC URL and check other network properties
  if (!network.rpcUrl) {
    throw new Error(`No RPC URL configured for network: ${network.displayName}`);
  }

  return createPublicClient({
    chain: {
      id: network.chainId,
      name: network.displayName,
      network: network,
      nativeCurrency: {
        // TODO: Dynamic update to currency data for the network
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: { 
          http: [network.rpcUrl]
        },
        // TODO: Add backup RPC URL
        public: {
          http: [network.rpcUrl]
        }
      }
    },
    transport: http(network.rpcUrl)
  });
}

export async function getIncomingDelegations(
  address: Address, network: NetworkConfig
): Promise<readonly Delegation[]> {
  return await createNetworkClient(network).readContract({
    address: network.delegateRegistryV2Address,
    abi: delegateRegistryAbi,
    functionName: "getIncomingDelegations",
    args: [address]
  });
}

export async function getOutgoingDelegations(
  address: Address, network: NetworkConfig
): Promise<readonly Delegation[]> {
  return await createNetworkClient(network).readContract({
    address: network.delegateRegistryV2Address,
    abi: delegateRegistryAbi,
    functionName: "getOutgoingDelegations",
    args: [address]
  });
}

export async function getIncomingDelegationHashes(
  address: Address, network: NetworkConfig
): Promise<readonly Hex[]> {
  return await createNetworkClient(network).readContract({
    address: network.delegateRegistryV2Address,
    abi: delegateRegistryAbi,
    functionName: "getIncomingDelegationHashes",
    args: [address]
  });
}

export async function getOutgoingDelegationHashes(
  address: Address, network: NetworkConfig
): Promise<readonly Hex[]> {
  return await createNetworkClient(network).readContract({
    address: network.delegateRegistryV2Address,
    abi: delegateRegistryAbi,
    functionName: "getOutgoingDelegationHashes",
    args: [address]
  });
}

export async function getDelegationsFromHashes(
  delegationHashes: Hex[], network: NetworkConfig
): Promise<readonly Delegation[]> {
  return await createNetworkClient(network).readContract({
    address: network.delegateRegistryV2Address,
    abi: delegateRegistryAbi,
    functionName: "getDelegationsFromHashes",
    args: [delegationHashes]
  });
}