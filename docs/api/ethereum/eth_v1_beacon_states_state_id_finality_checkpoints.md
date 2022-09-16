---
meta:
  - name: description
    content: eth/v1/beacon/states/{state_id}/finality_checkpoints Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain nimbus eth2
---

# eth/v1/beacon/states/{state_id}/finality_checkpoints

Ethereum consensus layer Beacon Chain API call that returns [finality checkpoints](https://ethereum.org/en/glossary/#checkpoint) for the state with the given `state_id`. If the finality for the state in the call is not yet achieved, the checkpoint returns epoch 0 and ZERO_HASH as root.

**Parameters:** 

* `state_id` - `string` - (Required) State identifier;
  * `head` — The canonical head of the chain in the view of the node that you sending the call to.
  * `genesis` — The genesis state of the chain.
  * `justified` — The slot in the current epoch that has received [attestations](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/attestations/) from two thirds of the Ethereum validators.
  * `finalized` — A previously justified slot that is now in the epoch that is at least immediately previous to the current epoch.
  * `slot` — A slot number.
  * `0xstateRoot` — The root hash for the global chain state after applying changes [in the block](https://ethereum.org/en/developers/docs/blocks/) that is in the slot.

**Returns:** 

* `data` - `object`:
  * `previous_justified` - `object` - [Checkpoint](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#checkpoint)
    * `epoch` - `string` - The corresponding epoch.
    * `root` - `string` - The corresponding root.
  * `current_justified` - `object` - [Checkpoint](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#checkpoint)
    * `epoch` - `string` - The corresponding epoch.
    * `root` - `string` - The corresponding root.
  * `final_justified` - `object` - [Checkpoint](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#checkpoint)
    * `epoch` - `string` - The corresponding epoch.
    * `root` - `string` - The corresponding root.

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/beacon/states/finalized/finality_checkpoints
```
