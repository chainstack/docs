---
meta:
  - name: description
    content: eth/v1/beacon/headers Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain lighthouse gnosis
---

# eth/v1/beacon/headers API method

Gnosis consensus layer Beacon Chain API call that returns the block headers matching the given query. By default, it will fetch current head slot blocks.

**Parameters:**

* `slot` — `string` — fetches [sync committees](https://ethereum.org/en/glossary/#sync-committee) for the given epoch. If not present, then the sync committees for the epoch of the state will be obtained.
* `parent_root` — `string` — fetches [sync committees](https://ethereum.org/en/glossary/#sync-committee) for the given epoch. If not present, then the sync committees for the epoch of the state will be obtained.

**Returns:**

* `execution_optimistic` — `boolean` — `true` if the response references an unverified execution payload. Optimistic information may be invalidated at a later time. If the field is not present, assume the `false` value.
* `data` — `array` — `objects` with:
  * `root` — `string` — the corresponding root.
  * `canonical` — `boolean`.
  * `header` — `object` — the [SignedBeaconBlockHeader](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#signedbeaconblockheader) object.
  * `message` — `object` — the [BeaconBlockHeader](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#beaconblockheader) object.
 * `slot` — `string` — the slot to which this block corresponds.
 * `proposer_index` — `string` — the index of the validator in the validator registry.
 * `parent_root` — `string` — the signing merkle root of the parent [BeaconBlock](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#beaconblock).
 * `state_root` — `string` — the tree hash merkle root of the [BeaconState](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#beaconstate) for the [BeaconBlock](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#beaconblock).
 * `body_root` — `string` — the tree hash merkle root of the [BeaconBlockBody](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#beaconblockbody) for the [BeaconBlock](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#beaconblock).
 * `signature` — `string` — the signature.

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/beacon/headers
```
