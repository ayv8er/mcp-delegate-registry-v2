import { NETWORKS } from "../config.js";
import type { NetworkConfig, NetworkInfo } from "../types/types.js";

export function getNetworkConfig(networkKey: string): NetworkConfig {
  const network = NETWORKS[networkKey.toLowerCase()];
  if (!network) {
    throw new Error(`Network "${networkKey}" not supported`);
  }
  return network;
} 

export function getNetworks(): NetworkInfo[] {
  return Object.entries(NETWORKS).map(([, net]): NetworkInfo => ({
    displayName: net.displayName,
    chainId: net.chainId,
    delegateRegistryV2Address: net.delegateRegistryV2Address,
  }));
}

export function getNetworkInfo(networkKey: string | number): NetworkInfo {
  const network = typeof networkKey === "string"
    ? NETWORKS[networkKey.toLowerCase()]
    : Object.values(NETWORKS).find(n => n.chainId === networkKey);
  if (!network) {
    throw new Error(`Network "${networkKey}" not supported`);
  }
  return {
    displayName: network.displayName,
    chainId: network.chainId,
    delegateRegistryV2Address: network.delegateRegistryV2Address,
  };
}