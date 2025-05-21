import { http, encodeFunctionData, createPublicClient, type Hex, type Address } from "viem";
import { delegateRegistryAbi } from '../abi/delegateRegistryAbi.js';
import { mainnet } from "viem/chains";
import { NETWORKS } from '../config.js';
import "dotenv/config";

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(NETWORKS.mainnet.rpcUrl),
});

export interface BaseDelegationParams {
  delegatee: Address;
  rights: Hex;
}

export interface TransactionParameters {
  to: Address;
  data: Hex;
  value?: bigint;
  chainId: number;
}

export function prepareMulticallTransactionData(
  params: { encodedCalls: Hex[], chainId: number, contractAddress: Address }
): TransactionParameters {
  const data = encodeFunctionData({
    abi: delegateRegistryAbi,
    functionName: "multicall",
    args: [params.encodedCalls],
  });
  return {
    to: params.contractAddress,
    data: data,
    value: 0n,
    chainId: params.chainId,
  };
}

export function prepareDelegateAllTransactionData(
  params: BaseDelegationParams & { enable: boolean, chainId: number, contractAddress: Address }
): TransactionParameters {
  const data = encodeFunctionData({
    abi: delegateRegistryAbi,
    functionName: "delegateAll",
    args: [params.delegatee, params.rights, params.enable],
  });
  return {
    to: params.contractAddress,
    data: data,
    value: 0n,
    chainId: params.chainId,
  };
}

export function prepareDelegateContractTransactionData(
  params: BaseDelegationParams & { contractToDelegate: Address; enable: boolean, chainId: number, contractAddress: Address }
): TransactionParameters {
  const data = encodeFunctionData({
    abi: delegateRegistryAbi,
    functionName: "delegateContract",
    args: [params.delegatee, params.contractToDelegate, params.rights, params.enable],
  });
  return {
    to: params.contractAddress,
    data: data,
    value: 0n,
    chainId: params.chainId,
  };
}

export function prepareDelegateERC721TransactionData(
  params: BaseDelegationParams & { contractToDelegate: Address; tokenId: bigint; enable: boolean, chainId: number, contractAddress: Address }
): TransactionParameters {
  const data = encodeFunctionData({
    abi: delegateRegistryAbi,
    functionName: "delegateERC721",
    args: [params.delegatee, params.contractToDelegate, params.tokenId, params.rights, params.enable],
  });
  return {
    to: params.contractAddress,
    data: data,
    value: 0n,
    chainId: params.chainId,
  };
}

export function prepareDelegateERC20TransactionData(
  params: BaseDelegationParams & { contractToDelegate: Address; amount: bigint, chainId: number, contractAddress: Address }
): TransactionParameters {
  const data = encodeFunctionData({
    abi: delegateRegistryAbi,
    functionName: "delegateERC20",
    args: [params.delegatee, params.contractToDelegate, params.rights, params.amount],
  });
  return {
    to: params.contractAddress,
    data: data,
    value: 0n,
    chainId: params.chainId,
  };
}

export function prepareDelegateERC1155TransactionData(
  params: BaseDelegationParams & { contractToDelegate: Address; tokenId: bigint; amount: bigint, chainId: number, contractAddress: Address }
): TransactionParameters {
  const data = encodeFunctionData({
    abi: delegateRegistryAbi,
    functionName: "delegateERC1155",
    args: [params.delegatee, params.contractToDelegate, params.tokenId, params.rights, params.amount],
  });
  return {
    to: params.contractAddress,
    data: data,
    value: 0n,
    chainId: params.chainId,
  };
}

// export async function getOutgoingDelegations(fromAddress: Address): Promise<any> {
//   if (contractABI.length === 0) throw new Error("Contract ABI is not populated.");
//   return await publicClient.readContract({
//     address: contractAddress,
//     abi: contractABI,
//     functionName: 'getOutgoingDelegations',
//     args: [fromAddress],
//   });
// }