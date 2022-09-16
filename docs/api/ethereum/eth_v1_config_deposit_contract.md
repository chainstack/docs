---
meta:
  - name: description
    content: eth/v1/config/deposit_contract Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain nimbus eth2
---

# eth/v1/config/deposit_contract

Ethereum consensus layer Beacon Chain API call that returns the execution layer deposit contract address and chain ID..

**Parameters:** 

* `none`

**Returns:** 

* `data`:
  * `chain_id` — The ID for the chain.
  * `address` — The execution layer deposit contract. For example, on the [Ethereum Mainnet](https://etherscan.io/address/0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6).

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/config/deposit_contract
```
