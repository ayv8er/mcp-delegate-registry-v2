import { encodeFunctionData } from "viem";
import { delegateRegistryAbi } from '../abi/delegateRegistryAbi.js';
import type { Address, Hex } from "viem";
import type { TransactionParameters, WriteDelegationBaseParams } from "../types/types.js";

export function prepareMulticallTransactionData(
  params: { 
    encodedCalls: Hex[]; 
    chainId: number; 
    delegateRegistryV2Address: Address 
  }
): TransactionParameters {
  return {
    to: params.delegateRegistryV2Address,
    data: encodeFunctionData({
      abi: delegateRegistryAbi,
      functionName: "multicall",
      args: [params.encodedCalls],
    }),
    value: 0n,
    chainId: params.chainId,
  };
}

export function prepareDelegateAllTransactionData(
  params: WriteDelegationBaseParams & { 
    enable: boolean; 
  }
): TransactionParameters {
  return {
    to: params.delegateRegistryV2Address,
    data: encodeFunctionData({
      abi: delegateRegistryAbi,
      functionName: "delegateAll",
      args: [params.delegatee, params.rights, params.enable],
    }),
    value: 0n,
    chainId: params.chainId,
  };
}

export function prepareDelegateContractTransactionData(
  params: WriteDelegationBaseParams & { 
    contractToDelegate: Address; 
    enable: boolean;
  }
): TransactionParameters {
  return {
    to: params.delegateRegistryV2Address,
    data: encodeFunctionData({
      abi: delegateRegistryAbi,
      functionName: "delegateContract",
      args: [
        params.delegatee, 
        params.contractToDelegate, 
        params.rights, 
        params.enable
      ],
    }),
    value: 0n,
    chainId: params.chainId,
  };
}

export function prepareDelegateERC721TransactionData(
  params: WriteDelegationBaseParams & { 
    contractToDelegate: Address; 
    tokenId: bigint; 
    enable: boolean; 
  }
): TransactionParameters {
  return {
    to: params.delegateRegistryV2Address,
    data: encodeFunctionData({
      abi: delegateRegistryAbi,
      functionName: "delegateERC721",
      args: [
        params.delegatee, 
        params.contractToDelegate, 
        params.tokenId, 
        params.rights, 
        params.enable
      ],
    }),
    value: 0n,
    chainId: params.chainId,
  };
}

export function prepareDelegateERC20TransactionData(
  params: WriteDelegationBaseParams & { 
    contractToDelegate: Address; 
    amount: bigint; 
  }
): TransactionParameters {
  return {
    to: params.delegateRegistryV2Address,
    data: encodeFunctionData({
      abi: delegateRegistryAbi,
      functionName: "delegateERC20",
      args: [
        params.delegatee, 
        params.contractToDelegate, 
        params.rights, 
        params.amount
      ],
    }),
    value: 0n,
    chainId: params.chainId,
  };
}

export function prepareDelegateERC1155TransactionData(
  params: WriteDelegationBaseParams & { 
    contractToDelegate: Address; 
    tokenId: bigint; 
    amount: bigint; 
  }
): TransactionParameters {
  return {
    to: params.delegateRegistryV2Address,
    data: encodeFunctionData({
      abi: delegateRegistryAbi,
      functionName: "delegateERC1155",
      args: [
        params.delegatee, 
        params.contractToDelegate, 
        params.tokenId, 
        params.rights, 
        params.amount
      ],
    }),
    value: 0n,
    chainId: params.chainId,
  };
}