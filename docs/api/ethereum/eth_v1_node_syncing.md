---
meta:
  - name: description
    content: eth/v1/node/syncing Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain nimbus eth2
---

# Ethereum eth/v1/node/syncing RPC method

Ethereum consensus layer Beacon Chain API call that returns if the node is synced or not and the latest slot.

**Parameters:** 

* `none`

**Returns:** 

* `data` - `object`:
  * `head slot`
  * `sync_distance`
  * `is_syncing`
  * `is_optimistic`

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/node/syncing
```
