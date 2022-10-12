---
meta:
  - name: description
    content: eth/v1/beacon/genesis Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain nimbus eth2
---

# eth/v1/beacon/genesis RPC method

Ethereum consensus layer Beacon Chain API call that returns the current chain's genesis details. This call can also be used to easily identify the chain. 

**Parameters:** 

* `none`

**Returns:** 

* `data` - `object`:
  * `genesis_time` — `string` — The `genesis_time` configured for the consensus layer Beacon Chain node. This is the Unix time of when the Beacon Chain started.
  * `genesis_validators_root` - `string` - The genesis validator root.
  * `genesis_fork_version` - `string` - The fork version number.

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/beacon/genesis
```
