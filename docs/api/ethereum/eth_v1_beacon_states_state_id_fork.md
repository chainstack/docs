---
meta:
  - name: description
    content: eth/v1/beacon/states/{state_id}/fork Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain nimbus eth2
---

# eth/v1/beacon/states/{state_id}/fork

Ethereum consensus layer Beacon Chain API call that returns the Fork object for the state with the given `state_id`. See also [Fork object](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#fork) and [fork choice](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice).

**Parameters:** 

* `state_id` - `string` - (Required) State identifier:
  * `head` — The canonical head of the chain in the view of the node that you sending the call to.
  * `genesis` — The genesis state of the chain.
  * `justified` — The slot in the current epoch that has received [attestations](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/attestations/) from two thirds of the Ethereum validators.
  * `finalized` — A previously justified slot that is now in the epoch that is at least immediately previous to the current epoch.
  * `slot` — A slot number.
  * `0xstateRoot` — The root hash for the global chain state after applying changes [in the block](https://ethereum.org/en/developers/docs/blocks/) that is in the slot.

**Returns:** 

* `data` - `object` - The [Fork object](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#fork) with the values:
  * `previous_version` - `string` - A fork version number.
  * `current_version` - `string` - A fork version number.
  * `epoch` - `string` - Epoch number.

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/beacon/states/finalized/fork 
```
