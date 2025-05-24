import { http, createPublicClient } from "viem";
import { delegateRegistryAbi } from '../abi/delegateRegistryAbi.js';
import type  { Address } from "viem";
import type { CheckDelegationBaseParams, NetworkConfig } from "../types/types.js";

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

export async function checkDelegateForAll(
  params: CheckDelegationBaseParams
): Promise<boolean> {
  return await createNetworkClient(params.network).readContract({
    address: params.network.delegateRegistryV2Address,
    abi: delegateRegistryAbi,
    functionName: "checkDelegateForAll",
    args: [params.delegatee, params.delegator, params.rights]
  });
}

export async function checkDelegateForContract(
  params: CheckDelegationBaseParams & { 
    contractToDelegate: Address
  }): Promise<boolean> {
  return await createNetworkClient(params.network).readContract({
    address: params.network.delegateRegistryV2Address,
    abi: delegateRegistryAbi,
    functionName: "checkDelegateForContract",
    args: [
      params.delegatee, 
      params.delegator, 
      params.contractToDelegate, 
      params.rights
    ]
  });
}

export async function checkDelegateForERC721(
  params: CheckDelegationBaseParams & { 
    contractToDelegate: Address, 
    tokenId: bigint 
  }): Promise<boolean> {
  return await createNetworkClient(params.network).readContract({
    address: params.network.delegateRegistryV2Address,
    abi: delegateRegistryAbi,
    functionName: "checkDelegateForERC721",
    args: [
      params.delegatee, 
      params.delegator, 
      params.contractToDelegate, 
      params.tokenId, 
      params.rights
    ]
  });
}

export async function checkDelegateForERC20(
  params: CheckDelegationBaseParams & { 
    contractToDelegate: Address, 
  }): Promise<bigint> {
  return await createNetworkClient(params.network).readContract({
    address: params.network.delegateRegistryV2Address,
    abi: delegateRegistryAbi,
    functionName: "checkDelegateForERC20",
    args: [
      params.delegatee, 
      params.delegator, 
      params.contractToDelegate, 
      params.rights
    ]
  });
}

export async function checkDelegateForERC1155(
  params: CheckDelegationBaseParams & { 
    contractToDelegate: Address, 
    tokenId: bigint
  }): Promise<bigint> {
  return await createNetworkClient(params.network).readContract({
    address: params.network.delegateRegistryV2Address,
    abi: delegateRegistryAbi,
    functionName: "checkDelegateForERC1155",
    args: [
      params.delegatee, 
      params.delegator, 
      params.contractToDelegate, 
      params.tokenId, 
      params.rights
    ]
  });
}