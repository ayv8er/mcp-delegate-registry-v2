import type { Address, Hex } from "viem";

export type McpToolResponse = {
  content: [{ type: "text"; text: string }];
};

export interface NetworkConfig {
  displayName: string;
  chainId: number;
  delegateRegistryV2Address: Address;
  rpcUrl: string;
}

export interface NetworkInfo {
  displayName: string;
  chainId: number;
  delegateRegistryV2Address: Address;
}

export interface TransactionParameters {
  to: Address;
  data: Hex;
  value?: bigint;
  chainId: number;
}

export interface WriteDelegationBaseParams {
  delegatee: Address;
  rights: Hex;
  chainId: number;
  delegateRegistryV2Address: Address;
}

export interface CheckDelegationBaseParams {
  delegatee: Address;
  delegator: Address;
  rights: Hex;
  network: NetworkConfig;
}