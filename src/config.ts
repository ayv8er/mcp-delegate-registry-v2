export interface NetworkInfo {
  displayName: string;
  chainId: number;
  contractAddress: string;
  rpcUrl?: string;
}

export const DELEGATE_REGISTRY_ADDRESSES = {
  EVM: "0x00000000000000447e69651d841bD8D104Bed493",
  ZKSYNC: "0x0000000059A24EB229eED07Ac44229DB56C5d797"
} as const;

export const NETWORKS: Record<string, NetworkInfo> = {
  ethereum: {
    displayName: "Ethereum",
    chainId: 1,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  apechain: {
    displayName: "Apechain",
    chainId: 33139,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://apechain-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  arbitrum: {
    displayName: "Arbitrum One",
    chainId: 42161,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  arbitrum_nova: {
    displayName: "Arbitrum Nova",
    chainId: 42170,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://arbnova-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  avalanche: {
    displayName: "Avalanche",
    chainId: 43114,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://avax-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  base: {
    displayName: "Base",
    chainId: 8453,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  blast: {
    displayName: "Blast",
    chainId: 238,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://blast-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  bnb: {
    displayName: "BNB Chain",
    chainId: 56,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://bnb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  canto: {
    displayName: "Canto",
    chainId: 7700,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://canto-rpc.ansybl.io`
  },
  celo: {
    displayName: "Celo",
    chainId: 42220,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://celo-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  fantom: {
    displayName: "Fantom",
    chainId: 250,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://fantom-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  gnosis: {
    displayName: "Gnosis",
    chainId: 100,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://gnosis-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  hychain: {
    displayName: "Hychain",
    chainId: 2911,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://rpc.hychain.com/http`
  },
  linea: {
    displayName: "Linea",
    chainId: 59144,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://linea-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  mantle: {
    displayName: "Mantle",
    chainId: 5000,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://mantle-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  moonbeam: {
    displayName: "Moonbeam",
    chainId: 1284,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://rpc.api.moonbeam.network`
  },
  moonriver: {
    displayName: "Moonriver",
    chainId: 1285,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://rpc.api.moonriver.moonbeam.network`
  },
  optimism: {
    displayName: "Optimism",
    chainId: 10,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  polygon: {
    displayName: "Polygon",
    chainId: 137,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  polygon_zkevm: {
    displayName: "Polygon zkEVM",
    chainId: 1101,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://polygonzkevm-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  plume: {
    displayName: "Plume",
    chainId: 98866,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: "https://rpc.plume.org"
  },
  ronin: {
    displayName: "Ronin",
    chainId: 2020,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://ronin-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  sanko: {
    displayName: "Sanko",
    chainId: 1996,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://mainnet.sanko.xyz`
  },
  scroll: {
    displayName: "Scroll",
    chainId: 534352,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://scroll-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  sei: {
    displayName: "Sei",
    chainId: 1329,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://sei-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  shape: {
    displayName: "Shape",
    chainId: 360,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://shape-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  taiko: {
    displayName: "Taiko",
    chainId: 167000,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://rpc.taiko.xyz`
  },
  xai: {
    displayName: "XAI",
    chainId: 660279,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://xai-chain.net/rpc`
  },
  zetachain: {
    displayName: "ZetaChain",
    chainId: 7000,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://zetachain-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  zora: {
    displayName: "Zora",
    chainId: 7777777,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://zora-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  abstract: {
    displayName: "Abstract",
    chainId: 2741,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.ZKSYNC,
    rpcUrl: `https://abstract-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  zksync_era: {
    displayName: "zkSync Mainnet",
    chainId: 324,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.ZKSYNC,
    rpcUrl: `https://zksync-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  treasure: {
    displayName: "Treasure",
    chainId: 61166,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.ZKSYNC,
    rpcUrl: `https://rpc.treasure.lol`
  },
  ethereum_sepolia: {
    displayName: "Ethereum Sepolia",
    chainId: 11155111,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  ethereum_holesky: {
    displayName: "Ethereum Holesky",
    chainId: 17000,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://eth-holesky.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  abstract_sepolia: {
    displayName: "Abstract Sepolia",
    chainId: 11124,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://abstract-testnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  base_sepolia: {
    displayName: "Base Sepolia",
    chainId: 84532,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://base-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  berachain_artio: {
    displayName: "Berachain Bepolia",
    chainId: 80069,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
    rpcUrl: `https://berachain-bepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },
  ronin_testnet: {
    displayName: "Ronin Testnet",
    chainId: 2021,
    contractAddress: DELEGATE_REGISTRY_ADDRESSES.EVM,
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