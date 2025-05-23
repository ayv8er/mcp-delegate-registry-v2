import type { NetworkConfig } from "./types/types";

export const DELEGATE_REGISTRY_ADDRESSES = {
  EVM: "0x00000000000000447e69651d841bD8D104Bed493",
  ZKSYNC: "0x0000000059A24EB229eED07Ac44229DB56C5d797"
} as const;

export const NETWORKS: Record<string, NetworkConfig> = {
  ethereum: {
    displayName: "ethereum",
    chainId: 1,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  apechain: {
    displayName: "apechain",
    chainId: 33139,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://apechain-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  arbitrum: {
    displayName: "arbitrum one",
    chainId: 42161,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  arbitrum_nova: {
    displayName: "arbitrum nova",
    chainId: 42170,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://arbnova-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  avalanche: {
    displayName: "avalanche",
    chainId: 43114,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://avax-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  base: {
    displayName: "base",
    chainId: 8453,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  blast: {
    displayName: "blast",
    chainId: 238,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://blast-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  bnb: {
    displayName: "bnb chain",
    chainId: 56,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://bnb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  canto: {
    displayName: "canto",
    chainId: 7700,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://canto-rpc.ansybl.io`
  },
  celo: {
    displayName: "celo",
    chainId: 42220,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://celo-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  fantom: {
    displayName: "fantom",
    chainId: 250,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://fantom-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  gnosis: {
    displayName: "gnosis",
    chainId: 100,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://gnosis-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  hychain: {
    displayName: "hychain",
    chainId: 2911,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://rpc.hychain.com/http`
  },
  linea: {
    displayName: "linea",
    chainId: 59144,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://linea-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  mantle: {
    displayName: "mantle",
    chainId: 5000,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://mantle-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  moonbeam: {
    displayName: "moonbeam",
    chainId: 1284,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://rpc.api.moonbeam.network`
  },
  moonriver: {
    displayName: "moonriver",
    chainId: 1285,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://rpc.api.moonriver.moonbeam.network`
  },
  optimism: {
    displayName: "optimism",
    chainId: 10,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  polygon: {
    displayName: "polygon",
    chainId: 137,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  polygon_zkevm: {
    displayName: "polygon zkevm",
    chainId: 1101,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://polygonzkevm-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  plume: {
    displayName: "plume",
    chainId: 98866,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: "https://rpc.plume.org"
  },
  ronin: {
    displayName: "ronin",
    chainId: 2020,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://ronin-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  sanko: {
    displayName: "sanko",
    chainId: 1996,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://mainnet.sanko.xyz`
  },
  scroll: {
    displayName: "scroll",
    chainId: 534352,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://scroll-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  sei: {
    displayName: "sei",
    chainId: 1329,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://sei-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  shape: {
    displayName: "shape",
    chainId: 360,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://shape-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  taiko: {
    displayName: "taiko",
    chainId: 167000,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://rpc.taiko.xyz`
  },
  xai: {
    displayName: "xai",
    chainId: 660279,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://xai-chain.net/rpc`
  },
  zetachain: {
    displayName: "zetachain",
    chainId: 7000,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://zetachain-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  zora: {
    displayName: "zora",
    chainId: 7777777,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://zora-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  abstract: {
    displayName: "abstract",
    chainId: 2741,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.ZKSYNC,
    rpcUrl: `https://abstract-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  zksync_era: {
    displayName: "zksync era",
    chainId: 324,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.ZKSYNC,
    rpcUrl: `https://zksync-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  treasure: {
    displayName: "treasure",
    chainId: 61166,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.ZKSYNC,
    rpcUrl: `https://rpc.treasure.lol`
  },
  ethereum_sepolia: {
    displayName: "ethereum sepolia",
    chainId: 11155111,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  ethereum_holesky: {
    displayName: "ethereum holesky",
    chainId: 17000,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://eth-holesky.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  abstract_sepolia: {
    displayName: "abstract sepolia",
    chainId: 11124,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://abstract-testnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  base_sepolia: {
    displayName: "base sepolia",
    chainId: 84532,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://base-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  berachain_artio: {
    displayName: "berachain bepolia",
    chainId: 80069,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://berachain-bepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  ronin_testnet: {
    displayName: "ronin testnet",
    chainId: 2021,
    delegateRegistryV2Address: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://ronin-saigon.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  }
} as const;

export type NetworkName = keyof typeof NETWORKS;
export type NetworkType = typeof NETWORKS[NetworkName];

if (!process.env.ALCHEMY_API_KEY) {
  throw new Error(
    "Missing required environment variable:\n" +
    "- ALCHEMY_API_KEY: API key for Alchemy"
  );
}