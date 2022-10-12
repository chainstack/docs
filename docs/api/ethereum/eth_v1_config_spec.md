---
meta:
  - name: description
    content: eth/v1/config/spec Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain nimbus eth2
---

# Ethereum eth/v1/config/spec RPC method

Ethereum consensus layer Beacon Chain API call that returns the specification configuration used on this node.

**Parameters:** 

* `none`

**Returns:** 

The configuration set for the node per the [consensus layer specification](https://github.com/ethereum/consensus-specs/).

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/config/spec
```
