---
meta:
  - name: description
    content: eth/v1/beacon/blocks/{block_id}/attestations Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain nimbus eth2
---

# eth/v1/beacon/blocks/{block_id}/attestations

Ethereum consensus layer Beacon Chain API call that returns [attestations](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/attestations/) included in requested block.

**Parameters:** 

* `block_id` — `string` - (Required) Block identifier;
  * `head` — The canonical head of the chain in the view of the node that you sending the call to.
  * `genesis` — The genesis state of the chain.
  * `justified` — The slot in the current epoch that has received [attestations](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/attestations/) from two thirds of the Ethereum validators.
  * `finalized` — A previously justified slot that is now in the epoch that is at least immediately previous to the current epoch.
  * `slot` — A slot number.
  * `0xblockRoot` — The root hash of the Beacon Chain [block](https://ethereum.org/en/developers/docs/blocks/).

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
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/beacon/blocks/head/root
```
