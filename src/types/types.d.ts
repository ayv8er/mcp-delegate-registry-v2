import type { Address, Hex } from "viem";

export type McpToolResponse = {
  content: [{ type: "text"; text: string }];
};

export type Delegation = {
  readonly type_: number;
  readonly to: `0x${string}`;
  readonly from: `0x${string}`;
  readonly rights: `0x${string}`;
  readonly contract_: `0x${string}`;
  readonly tokenId: bigint;
  readonly amount: bigint;
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
  readonly to: Address;
  readonly data: Hex;
  readonly value?: bigint;
  readonly chainId: number;
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