---
meta:
  - name: description
    content: eth/v1/config/deposit_contract Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain lighthouse gnosis
---

# eth/v1/config/deposit_contract API method

Gnosis consensus layer Beacon Chain API call that returns the execution layer deposit contract address and chain ID.

**Parameters:**

* `none`

**Returns:**

* `data` with:
  * `chain_id` — the ID for the chain.
  * `address` — the execution layer deposit contract. For example, on the [Gnosis mainnet](https://gnosisscan.io/address/0x0b98057ea310f4d31f2a452b414647007d1645d9).

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/config/deposit_contract
```
