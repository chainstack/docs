---
meta:
  - name: description
    content: eth/v1/beacon/states/{state_id}/validator_balances Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain nimbus eth2
---

# eth/v1/beacon/states/{state_id}/validator_balances

Ethereum consensus layer Beacon Chain API call that returns a filterable list of validators balances.

Balances will be returned for all indices or public key that match known validators. If an index or public key does not match any known validator, no balance will be returned but this will not cause an error. There are no guarantees for the returned data in terms of ordering; the index and is returned for each balance, and can be used to confirm for which inputs a response has been returned.

**Parameters:** 

* `state_id` - `string` - (Required) State identifier:
  * `head` — The canonical head of the chain in the view of the node that you sending the call to.
  * `genesis` — The genesis state of the chain.
  * `justified` — The slot in the current epoch that has received [attestations](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/attestations/) from two thirds of the Ethereum validators.
  * `finalized` — A previously justified slot that is now in the epoch that is at least immediately previous to the current epoch.
  * `slot` — A slot number.
  * `0xstateRoot` — The root hash for the global chain state after applying changes [in the block](https://ethereum.org/en/developers/docs/blocks/) that is in the slot.
* `id` - `array` — `string` - Either the hex encoded public key (any bytes48 with 0x prefix) or validator index.

**Returns:** 

* `execution_optimistic` - `boolean` - `true` if the response references an unverified execution payload. Optimistic information may be invalidated at a later time. If the field is not present, assume the `false` value.
* `data` - `array` — `object`:
  * `index` - `string` - Index of validator in validator registry.
  * `balance` - `string` - Current validator balance in gwei.

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/beacon/states/head/validator_balances?id=0x84a623de8666c418154afac6b3b5dcb85e50500cb357c49d24d17bc5408139d7febacaddbd38e226d8c30baa6924457e
```
