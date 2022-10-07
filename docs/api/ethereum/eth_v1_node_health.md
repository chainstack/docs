---
meta:
  - name: description
    content: eth/v1/node/health Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain nimbus eth2
---

# Ethereum eth/v1/node/health RPC method

Ethereum consensus layer Beacon Chain API call that returns the node health status in HTTP status codes.

**Parameters:** 

* `none`

**Returns:** 

* `200` — The node is ready.
* `206` — Node is syncing but can serve incomplete data.
* `503` — Node not initialized or having issues.

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/node/health
```
