---
meta:
  - name: description
    content: eth/v1/node/identity Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain lighthouse gnosis
---

# eth/v1/node/identity API method

Gnosis consensus layer Beacon Chain API call that returns the data about the node's network presence.

**Parameters:**

* `none`

**Returns:**

* `data` — `object` with:
  * `peer_id` — the ID of the peer.
  * `enr` — the Gnosis node record data as provided in the [networking specification](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md).

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/node/identity
```
