---
meta:
  - name: description
    content: eth/v1/beacon/pool/voluntary_exits Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain nimbus eth2
---

# eth/v1/beacon/pool/voluntary_exits

Ethereum consensus layer Beacon Chain API call that returns voluntary exits known by the node but not necessarily incorporated into any block.

**Parameters:** 

* `none`

**Returns:** 

* `data` - `array` — `objects` - The [Attestation](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#attestation) object with:
 * `message`:
   * `epoch` - Minimum epoch at which this exit can be included on chain.
   * `validator_index` - Index of the validator exiting.
   * `signature` - Signature of [VoluntaryExit](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#voluntaryexit) by the pubkey associated with the validator defined by `validator_index`.

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/beacon/pool/voluntary_exits
```
