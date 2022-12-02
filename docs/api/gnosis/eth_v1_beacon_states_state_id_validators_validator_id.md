---
meta:
  - name: description
    content: eth/v1/beacon/states/{state_id}/validators/{validator_id} Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain lighthouse gnosis
---

# eth/v1/beacon/states/{state_id}/validators/{validator_id} API method

Gnosis consensus layer Beacon Chain API call that returns the validator specified by `state_id` and `validator_id` or public key along with status and balance.

**Parameters:**

* `state_id` — `string` — (required) the state identifier with:
  * `head` — the canonical head of the chain in the view of the node that you are sending the call to.
  * `genesis` — the genesis state of the chain.
  * `justified` — the slot in the current epoch that has received [attestations](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/attestations/) from two thirds of the Gnosis validators.
  * `finalized` — the previously justified slot that is now in the epoch that is at least immediately previous to the current epoch.
  * `slot` — the slot number.
  * `0xstateRoot` — the root hash for the global chain state after applying changes [in the block](https://ethereum.org/en/developers/docs/blocks/) that is in the slot.
* `validator_id` — `string` — the hex encoded public key (any bytes48 with 0x prefix) or validator index.

**Returns:**

* `data` — `object` with:
  * `index` — `string` — the index of the validator in the validator registry.
  * `balance` — `string` — the current validator balance in Gwei.
  * `status` — `string` — the validator status per the [specification](https://hackmd.io/ofFJ5gOmQpu1jjHilHbdQQ).
  * `validator` — `object` with:
    * `pubkey` — `string` — the validator's BLS public key, uniquely identifying the validator.
    * `withdrawal_crendetials` — `string` — the root of withdrawal credentials.
    * `effective_balance` — `string` — the balance at stake in Gwei.
    * `slashed` — `string` — shows if the validator is slashed and no longer active.
    * `activation_elgibility_epoch` — `string` — when the criteria for activation were met.
    * `activation_epoch` — `string` — the epoch when validator activated. `FAR_FUTURE_EPOCH` if not activated.
    * `exit_epoch` — `string` — the epoch when the validator exited.
    * `withdrawable_epoch` — `string` — shoes when the validator can withdraw or transfer funds. `FAR_FUTURE_EPOCH` if not defined.

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/beacon/states/head/validators/0x84a623de8666c418154afac6b3b5dcb85e50500cb357c49d24d17bc5408139d7febacaddbd38e226d8c30baa6924457e
```
