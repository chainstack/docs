---
meta:
  - name: description
    content: eth/v1/beacon/blocks/{block_id}/attestations Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain nimbus eth2
---

# eth/v1/beacon/blocks/{block_id}/attestations RPC method

Ethereum consensus layer Beacon Chain API call that returns [attestations](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/attestations/) included in requested block.

**Parameters:**

* `block_id` — `string` — (required) the block identifier with:
  * `head` — the canonical head of the chain in the view of the node that you are sending the call to.
  * `genesis` — the genesis state of the chain.
  * `justified` — the slot in the current epoch that has received [attestations](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/attestations/) from two thirds of the Ethereum validators.
  * `finalized` — the previously justified slot that is now in the epoch that is at least immediately previous to the current epoch.
  * `slot` — the slot number.
  * `0xblockRoot` — the root hash of the Beacon Chain [block](https://ethereum.org/en/developers/docs/blocks/).

**Returns:**

* `execution_optimistic` — `boolean` — `true` if the response references an unverified execution payload. Optimistic information may be invalidated at a later time. If the field is not present, assume the `false` value.
  * `data` — `array` — `objects` — the [Attestation](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#attestation) object with:
    * `aggregation_bits` — `string` — attester aggregation bits.
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
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/beacon/blocks/head/root
```
