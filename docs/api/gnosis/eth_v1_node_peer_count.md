---
meta:
  - name: description
    content: eth/v1/node/peer_count Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain lighthouse gnosis
---

# eth/v1/node/peer_count

Gnosis consensus layer Beacon Chain API call that returns the number of the peers connected to the node.

**Parameters:** 

* `none`

**Returns:** 

* `data` — `object`:
  * `disconnected`
  * `connecting`
  * `connected`
  * `disconnecting`

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/node/peer_count
```
