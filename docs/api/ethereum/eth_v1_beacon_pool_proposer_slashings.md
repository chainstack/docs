---
meta:
  - name: description
    content: eth/v1/beacon/pool/proposer_slashings Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain nimbus eth2
---

# eth/v1/beacon/pool/proposer_slashings RPC method

Ethereum consensus layer Beacon Chain API call that returns proposer slashings known by the node but not necessarily incorporated into any block.

**Parameters:** 

* `none`

**Returns:** 

* `execution_optimistic` - `boolean` - `true` if the response references an unverified execution payload. Optimistic information may be invalidated at a later time. If the field is not present, assume the `false` value.
  * `data` - `array` — `objects` - The [Attestation](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#attestation) object with:
    * `aggregation_bits` - `string` - Attester aggregation bits.
    * `signature` - `string` - BLS aggregate signature.
    * `data` - `object` - The [AttestationData](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#attestationdata) object.
     * `slot` - `string` - The corresponding slot.
     * `index` - `string` - The index.
     * `beacon_block_root` - `string` - LMD GHOST vote.
     * `source` - `object` - The [checkpoint](https://ethereum.org/en/glossary/#checkpoint).
       * `epoch` - `string` - The corresponding epoch.
       * `root` - `string` - The corresponding root.
    * `target` - `object` - The [checkpoint](https://ethereum.org/en/glossary/#checkpoint).
      * `epoch` - `string` - The corresponding epoch.
      * `root` - `string` - The corresponding root.

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/beacon/pool/proposer_slashings
```
