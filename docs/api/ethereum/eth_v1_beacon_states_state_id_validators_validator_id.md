---
meta:
  - name: description
    content: eth/v1/beacon/states/{state_id}/validators/{validator_id} Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain nimbus eth2
---

# eth/v1/beacon/states/{state_id}/validators/{validator_id} RPC method

Ethereum consensus layer Beacon Chain API call that returns the validator specified by `state_id` and `validator_id` or public key along with status and balance.

**Parameters:** 

* `state_id` - `string` - (Required) State identifier:
  * `head` — The canonical head of the chain in the view of the node that you sending the call to.
  * `genesis` — The genesis state of the chain.
  * `justified` — The slot in the current epoch that has received [attestations](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/attestations/) from two thirds of the Ethereum validators.
  * `finalized` — A previously justified slot that is now in the epoch that is at least immediately previous to the current epoch.
  * `slot` — A slot number.
  * `0xstateRoot` — the root hash for the global chain state after applying changes [in the block](https://ethereum.org/en/developers/docs/blocks/) that is in the slot.
* `validator_id` - `string` - Either the hex encoded public key (any bytes48 with 0x prefix) or validator index.

**Returns:** 

* `data` - `object`:
  * `index` - `string` - Index of the validator in validator registry.
  * `balance` - `string` - Current validator balance in gwei.
  * `status` - `string` - Validator status per the [specification](https://hackmd.io/ofFJ5gOmQpu1jjHilHbdQQ).
  * `validator` - `object`:
    * `pubkey` - `string` - The validator's BLS public key, uniquely identifying the validator.
    * `withdrawal_crendetials` - `string` - Root of withdrawal credentials.
    * `effective_balance` - string - Balance at stake in gwei.
    * `slashed` - `string` - If the validator is slashed and no longer active).
    * `activation_elgibility_epoch` - `string` - When criteria for activation were met.
    * `activation_epoch` - `string` - Epoch when validator activated. 'FAR_FUTURE_EPOCH' if not activated.
    * `exit_epoch` - `string` - Epoch when validator exited.
    * `withdrawable_epoch` - `string` - When validator can withdraw or transfer funds. 'FAR_FUTURE_EPOCH' if not defined.

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/beacon/states/head/validators/0x84a623de8666c418154afac6b3b5dcb85e50500cb357c49d24d17bc5408139d7febacaddbd38e226d8c30baa6924457e
```
