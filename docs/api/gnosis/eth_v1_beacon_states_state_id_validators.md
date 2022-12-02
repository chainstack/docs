---
meta:
  - name: description
    content: eth/v1/beacon/states/{state_id}/validators Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain lighthouse gnosis
---

# eth/v1/beacon/states/{state_id}/validators API method

Gnosis consensus layer Beacon Chain API call that returns a filterable list of validators with their balance, status, and index. The information is returned for all indices or public keys that match known validators. If an index or public key does not match any known validator, no information will be returned, but this will not cause an error. There are no guarantees for the returned data in terms of the order. Both the index and public key are returned for each validator and can be used to confirm for which inputs a response has been returned.

**Parameters:**

* `state_id` — `string` — (required) the state identifier with:
  * `head` — the canonical head of the chain in the view of the node that you are sending the call to.
  * `genesis` — the genesis state of the chain.
  * `justified` — the slot in the current epoch that has received [attestations](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/attestations/) from two thirds of the Gnosis validators.
  * `finalized` — the previously justified slot that is now in the epoch that is at least immediately previous to the current epoch.
  * `slot` — the slot number.
  * `0xstateRoot` — the root hash for the global chain state after applying changes [in the block](https://ethereum.org/en/developers/docs/blocks/) that is in the slot.
* `id` — `array` — the hex encoded public key (any bytes48 with 0x prefix) or validator index.
* `status` — `array` — see [Validator status specification](https://hackmd.io/ofFJ5gOmQpu1jjHilHbdQQ).

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
    * `activation_elgibility_epoch` — `string` — when criteria for activation were met.
    * `activation_epoch` — `string` — the epoch when validator activated. `FAR_FUTURE_EPOCH` if not activated.
    * `exit_epoch` — `string` — the epoch when validator exited.
    * `withdrawable_epoch` — `string` — shows when the validator can withdraw or transfer funds. `FAR_FUTURE_EPOCH` if not defined.

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/beacon/states/head/validators?status=active
```
