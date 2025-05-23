# Delegate Registry v2 MCP

## MCP SERVER TOOLS

### getSupportedNetworks
*Get list of all supported networks for Delegate Registry v2*
```bash
curl -X POST \
    http://localhost:8080/delegate-registry-v2/mcp \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json, text/event-stream' \
    -d '{
        "jsonrpc": "2.0",
        "method": "tools/call",
        "params": {
            "name": "getSupportedNetworks"
        },
        "id": "curl-request-get-supported-networks"
    }'
```

### getNetworkInfo
*Get detailed information about a specific supported network*
```bash
curl -X POST \
    http://localhost:8080/delegate-registry-v2/mcp \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json, text/event-stream' \
    -d '{
        "jsonrpc": "2.0",
        "method": "tools/call",
        "params": {
            "name": "getNetworkInfo",
            "arguments": {
                "networkIdentifier": "shape"
            }
        },
        "id": "curl-request-get-network-info"
    }'
```

### multicall
*Prepares a multicall transaction to execute multiple actions on the registry*
```bash
curl -X POST \
    http://localhost:8080/delegate-registry-v2/mcp \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json, text/event-stream' \
    -d '{
        "jsonrpc": "2.0",
        "method": "tools/call",
        "params": {
            "name": "multicall",
            "arguments": {
                "network": "apechain",
                "encodedCalls": [
                    "0x30ff3140000000000000000000000000829d550783e1495c8b8b063973437e0564bc311affffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000001","0x30ff3140000000000000000000000000829d550783e1495c8b8b063973437e0564bc311affffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000"
                ]
            }
        },
        "id": "curl-request-multicall"
    }'
```

### delegateAll
*Prepares transaction object for delegating all rights*
```bash
curl -X POST \
    http://localhost:8080/delegate-registry-v2/mcp \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json, text/event-stream' \
    -d '{
        "jsonrpc": "2.0",
        "method": "tools/call",
        "params": {
            "name": "delegateAll",
            "arguments": {
                "network": "plume",
                "delegatee": "0x829d550783E1495c8B8B063973437E0564bC311a",
                "rights": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                "enable": true
            }
        },
        "id": "curl-request-delegate-all"
    }'
  ```

### delegateContract
*Prepares transaction object for delegating rights of a contract*
```bash
curl -X POST \
    http://localhost:8080/delegate-registry-v2/mcp \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json, text/event-stream' \
    -d '{
        "jsonrpc": "2.0",
        "method": "tools/call",
        "params": {
            "name": "delegateContract",
            "arguments": {
                "delegatee": "0x829d550783E1495c8B8B063973437E0564bC311a",
                "contractToDelegate": "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401",
                "rights": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                "enable": true,
                "network": "ethereum"
            }
        },
        "id": "curl-request-delegate-contract"
    }'
```

### delegateERC721
*Prepares transaction object for delegating rights for a specific ERC721 token*
```bash
curl -X POST \
    http://localhost:8080/delegate-registry-v2/mcp \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json, text/event-stream' \
    -d '{
        "jsonrpc": "2.0",
        "method": "tools/call",
        "params": {
            "name": "delegateERC721",
            "arguments": {
                "delegatee": "0x829d550783E1495c8B8B063973437E0564bC311a",
                "contractToDelegate": "0xBd3531dA5CF5857e7CfAA92426877b022e612cf8",
                "tokenId": "69420",
                "rights": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                "enable": true,
                "network": "ethereum"
            }
        },
        "id": "curl-request-delegate-ERC-721"
    }'
```

### delegateERC20
*"Prepares transaction object for delegating rights for an amount of ERC20 tokens*
```bash
curl -X POST \
    http://localhost:8080/delegate-registry-v2/mcp \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json, text/event-stream' \
    -d '{
        "jsonrpc": "2.0",
        "method": "tools/call",
        "params": {
            "name": "delegateERC20",
            "arguments": {
                "delegatee": "0x829d550783E1495c8B8B063973437E0564bC311a",
                "contractToDelegate": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
                "rights": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                "amount": "69",
                "network": "base"
            }
        },
        "id": "curl-request-delegate-ERC-20"
    }'
```

### delegateERC1155
*Prepares transaction object for delegating rights for an amount of an ERC1155 token*
```bash
curl -X POST \
    http://localhost:8080/delegate-registry-v2/mcp \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json, text/event-stream' \
    -d '{
        "jsonrpc": "2.0",
        "method": "tools/call",
        "params": {
            "name": "delegateERC1155",
            "arguments": {
                "delegatee": "0x829d550783E1495c8B8B063973437E0564bC311a",
                "contractToDelegate": "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401",
                "tokenId": "420",
                "rights": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                "amount": "69",
                "network": "ethereum"
            }
        },
        "id": "curl-request-delegate-ERC-1155"
    }'
```

### checkDelegateForAll
*Check if delegatee is granted to act on behalf of delegator for all operations*
```bash
curl -X POST \
    http://localhost:8080/delegate-registry-v2/mcp \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json, text/event-stream' \
    -d '{
        "jsonrpc": "2.0",
        "method": "tools/call",
        "params": {
            "name": "checkDelegateForAll",
            "arguments": {
                "delegatee": "0xDd555E39F07f46F1dD7c39034Ce19A094CcA710f",
                "delegator": "0x9f761675CfAE369dA99Ef0B2A2515EF215077087",
                "rights": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                "network": "ethereum"
            }
        },
        "id": "curl-request-check-delegate-all"
    }'
```

### checkDelegateForContract
*Check if delegatee is granted to act on behalf of delegator for a specific contract*
```bash
curl -X POST \
    http://localhost:8080/delegate-registry-v2/mcp \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json, text/event-stream' \
    -d '{
        "jsonrpc": "2.0",
        "method": "tools/call",
        "params": {
            "name": "checkDelegateForContract",
            "arguments": {
                "delegatee": "0xDd555E39F07f46F1dD7c39034Ce19A094CcA710f",
                "delegator": "0x9f761675CfAE369dA99Ef0B2A2515EF215077087",
                "contractToDelegate": "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401",
                "rights": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                "network": "ethereum"
            }
        },
        "id": "curl-request-check-delegate-for-contract"
    }'
```

### checkDelegateForERC721
*Check if delegatee is granted to act on behalf of delegator for a specific ERC721 token*
```bash
curl -X POST \
    http://localhost:8080/delegate-registry-v2/mcp \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json, text/event-stream' \
    -d '{
        "jsonrpc": "2.0",
        "method": "tools/call",
        "params": {
            "name": "checkDelegateForERC721",
            "arguments": {
                "delegatee": "0xDd555E39F07f46F1dD7c39034Ce19A094CcA710f",
                "delegator": "0x9f761675CfAE369dA99Ef0B2A2515EF215077087",
                "contractToDelegate": "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401",
                "tokenId": "3",
                "rights": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                "network": "ethereum"
            }
        },
        "id": "curl-request-check-delegate-for-ERC-721"
    }'
```

### checkDelegateForERC20
*Check if delegatee is granted to act on behalf of delegator for an amount of ERC20 tokens*
```bash
curl -X POST \
    http://localhost:8080/delegate-registry-v2/mcp \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json, text/event-stream' \
    -d '{
        "jsonrpc": "2.0",
        "method": "tools/call",
        "params": {
            "name": "checkDelegateForERC20",
            "arguments": {
                "delegatee": "0xDd555E39F07f46F1dD7c39034Ce19A094CcA710f",
                "delegator": "0x9f761675CfAE369dA99Ef0B2A2515EF215077087",
                "contractToDelegate": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
                "rights": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                "network": "ethereum"
            }
        },
        "id": "curl-request-check-delegate-for-ERC-20"
    }'
```

### checkDelegateForERC1155
*Check if delegatee is granted to act on behalf of delegator for an amount of ERC1155 tokens*
```bash
curl -X POST \
    http://localhost:8080/delegate-registry-v2/mcp \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json, text/event-stream' \
    -d '{
        "jsonrpc": "2.0",
        "method": "tools/call",
        "params": {
            "name": "checkDelegateForERC1155",
            "arguments": {
                "delegatee": "0xDd555E39F07f46F1dD7c39034Ce19A094CcA710f",
                "delegator": "0x9f761675CfAE369dA99Ef0B2A2515EF215077087",
                "contractToDelegate": "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401",
                "tokenId": "4",
                "rights": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                "network": "ethereum"
            }
        },
        "id": "curl-request-check-delegate-for-ERC-1155"
    }'
```