---
meta:
  - name: description
    content: eth/v1/beacon/pool/attester_slashings Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain lighthouse gnosis
---

# eth/v1/beacon/pool/attester_slashings API method

Gnosis consensus layer Beacon Chain API call that returns attester slashings known by the node but not necessarily incorporated into any block.

**Parameters:**

* `none`

**Returns:**

* `execution_optimistic` — `boolean` — `true` if the response references an unverified execution payload. Optimistic information may be invalidated at a later time. If the field is not present, assume the `false` value.
  * `data` — `array` — `objects` — the [Attestation](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#attestation) objects with:
    * `aggregation_bits` — `string` — the attester aggregation bits.
    * `signature` — `string` — the BLS aggregate signature.
    * `data` — `object` — the [AttestationData](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#attestationdata) object with:
     * `slot` — `string` — the corresponding slot.
     * `index` — `string` — the index.
     * `beacon_block_root` — `string` — the LMD GHOST vote.
     * `source` — `object` — the [Checkpoint](https://ethereum.org/en/glossary/#checkpoint) object with:
       * `epoch` — `string` — the corresponding epoch.
       * `root` — `string` — the corresponding root.
    * `target` — `object` — the [Checkpoint](https://ethereum.org/en/glossary/#checkpoint) object with:
      * `epoch` — `string` — the corresponding epoch.
      * `root` — `string` — the corresponding root.

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/beacon/pool/attester_slashings
```
