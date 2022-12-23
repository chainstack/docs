---
meta:
  - name: description
    content: eth/v1/beacon/pool/voluntary_exits Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain lighthouse gnosis
---

# eth/v1/beacon/pool/voluntary_exits API method 

Gnosis consensus layer Beacon Chain API call that returns voluntary exits known by the node but not necessarily incorporated into any block.

**Parameters:**

* `none`

**Returns:**

* `data` — `array` — `objects` — the [Attestation](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#attestation) objects with:
 * `message`:
   * `epoch` — the minimum epoch at which this exit can be included on chain.
   * `validator_index` — the index of the validator exiting.
   * `signature` — the signature of [VoluntaryExit](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#voluntaryexit) by the public key associated with the validator defined by `validator_index`.

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/beacon/pool/voluntary_exits
```
