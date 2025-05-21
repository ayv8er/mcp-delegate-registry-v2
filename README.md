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
            "delegatee": "0x829d550783E1495c8B8B063973437E0564bC311a",
            "rights": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
            "enable": true
        }
    },
    "id": "curl-request-delegate-all-final"
  }'
  ```