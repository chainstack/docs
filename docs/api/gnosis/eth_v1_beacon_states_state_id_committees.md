---
meta:
  - name: description
    content: eth/v1/beacon/states/{state_id}/committees Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain lighthouse gnosis
---

# eth/v1/beacon/states/{state_id}/committees

Gnosis consensus layer Beacon Chain API call that returns the [committees](https://ethereum.org/en/glossary/#committee) for the given state.

**Parameters:** 

* `state_id` — `string` — (required) the state identifier;
  * `head` — the canonical head of the chain in the view of the node that you sending the call to.
  * `genesis` — the genesis state of the chain.
  * `justified` — the slot in the current epoch that has received [attestations](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/attestations/) from two thirds of the Ethereum validators.
  * `finalized` — the previously justified slot that is now in the epoch that is at least immediately previous to the current epoch.
  * `slot` — the slot number.
  * `0xstateRoot` — the root hash for the global chain state after applying changes [in the block](https://ethereum.org/en/developers/docs/blocks/) that is in the slot.
* `epoch` — `string` — fetch committees for the given epoch. If not present, then the committees for the epoch of the state will be obtained.
* `index` — `string` — restrict returned values to those matching the supplied committee index.
* `slot` — `string` — restrict returned values to those matching the supplied slot.


**Returns:** 

* `execution_optimistic` — `boolean` — `true` if the response references an unverified execution payload. Optimistic information may be invalidated at a later time. If the field is not present, assume the `false` value.
* `data` — `array` — `object`:
  * `index` — `string` — the index of the committee at a slot.
  * `slot` — `string` — the slot number.
  * `validator` — `array` — the list of validator indices assigned to this committee.

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/beacon/states/head/committees
```
