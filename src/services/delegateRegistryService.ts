import { http, encodeFunctionData, createPublicClient, type Hex, type Address } from "viem";
import { delegateRegistryAbi } from '../abi/delegateRegistryAbi.js';
import { mainnet } from "viem/chains";
import { config } from '../config.js';
import "dotenv/config";

export const contractAddress = config.contract.address;

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(config.rpc.mainnet),
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
  params: { encodedCalls: Hex[] }
): TransactionParameters {
  const data = encodeFunctionData({
    abi: delegateRegistryAbi,
    functionName: "multicall",
    args: [params.encodedCalls],
  });
  return {
    to: contractAddress,
    data: data,
    value: 0n,
    chainId: mainnet.id,
  };
}

export function prepareDelegateAllTransactionData(
  params: BaseDelegationParams & { enable: boolean }
): TransactionParameters {
  const data = encodeFunctionData({
    abi: delegateRegistryAbi,
    functionName: "delegateAll",
    args: [params.delegatee, params.rights, params.enable],
  });
  return {
    to: contractAddress,
    data: data,
    value: 0n,
    chainId: mainnet.id,
  };
}

export function prepareDelegateContractTransactionData(
  params: BaseDelegationParams & { contractToDelegate: Address; enable: boolean }
): TransactionParameters {
  const data = encodeFunctionData({
    abi: delegateRegistryAbi,
    functionName: "delegateContract",
    args: [params.delegatee, params.contractToDelegate, params.rights, params.enable],
  });
  return {
    to: contractAddress,
    data: data,
    value: 0n,
    chainId: mainnet.id,
  };
}

export function prepareDelegateERC721TransactionData(
  params: BaseDelegationParams & { contractToDelegate: Address; tokenId: bigint; enable: boolean }
): TransactionParameters {
  const data = encodeFunctionData({
    abi: delegateRegistryAbi,
    functionName: "delegateERC721",
    args: [params.delegatee, params.contractToDelegate, params.tokenId, params.rights, params.enable],
  });
  return {
    to: contractAddress,
    data: data,
    value: 0n,
    chainId: mainnet.id,
  };
}

export function prepareDelegateERC20TransactionData(
  params: BaseDelegationParams & { contractToDelegate: Address; amount: bigint }
): TransactionParameters {
  const data = encodeFunctionData({
    abi: delegateRegistryAbi,
    functionName: "delegateERC20",
    args: [params.delegatee, params.contractToDelegate, params.rights, params.amount],
  });
  return {
    to: contractAddress,
    data: data,
    value: 0n,
    chainId: mainnet.id,
  };
}

export function prepareDelegateERC1155TransactionData(
  params: BaseDelegationParams & { contractToDelegate: Address; tokenId: bigint; amount: bigint }
): TransactionParameters {
  const data = encodeFunctionData({
    abi: delegateRegistryAbi,
    functionName: "delegateERC1155",
    args: [params.delegatee, params.contractToDelegate, params.tokenId, params.rights, params.amount],
  });
  return {
    to: contractAddress,
    data: data,
    value: 0n,
    chainId: mainnet.id,
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