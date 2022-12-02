---
meta:
  - name: description
    content: eth/v2/beacon/blocks/{block_id} Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain lighthouse gnosis
---

# eth/v2/beacon/blocks/{block_id} API method

Gnosis consensus layer Beacon Chain API call that returns block details for the given `block_id`. Depending on the `Accept` header, it can be returned either as JSON or as bytes serialized by SSZ.

**Parameters:**

* `block_id` — `string` — (required) the block identifier with:
  * `head` — the canonical head of the chain in the view of the node that you are sending the call to.
  * `genesis` — the genesis state of the chain.
  * `justified` — the slot in the current epoch that has received [attestations](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/attestations/) from two thirds of the Gnosis validators.
  * `finalized` — the previously justified slot that is now in the epoch that is at least immediately previous to the current epoch.
  * `slot` — the slot number.
  * `0xblockRoot` — the root hash of the Beacon Chain [block](https://ethereum.org/en/developers/docs/blocks/).

**Returns:**

* `execution_optimistic` — `boolean` — `true` if the response references an unverified execution payload. Optimistic information may be invalidated at a later time. If the field is not present, assume the `false` value.
* `data` — `array` — `objects` with:
  * `root` — `string` — the corresponding root.
  * `canonical` — `boolean`.
  * `header` — `object` — the [SignedBeaconBlockHeader](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#signedbeaconblockheader) object.
  * `message` — `object` — the [BeaconBlockHeader](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#beaconblockheader) object.
 * `slot` — `string` — the slot to which this block corresponds.
 * `proposer_index` — `string` — the index of the validator in the validator registry.
 * `parent_root` — `string` — the signing merkle root of the parent [BeaconBlock](https://github.com/ethereum/consensus—specs/blob/dev/specs/phase0/beacon-chain.md#beaconblock).
 * `state_root` — `string` — the tree hash merkle root of the [BeaconState](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#beaconstate) for the [BeaconBlock](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#beaconblock).
 * `body_root` — `string` — the tree hash merkle root of the [BeaconBlockBody](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#beaconblockbody) for the [BeaconBlock](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#beaconblock).
 * `signature` — `string` — the signature.

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v2/beacon/blocks/head
```
