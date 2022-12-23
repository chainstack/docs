---
meta:
  - name: description
    content: eth/v1/config/fork_schedule Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain nimbus eth2
---

# Ethereum eth/v1/config/fork_schedule RPC method

Ethereum consensus layer Beacon Chain API call that returns all forks, past present and future, of which this node is aware.

**Parameters:**

* `none`

**Returns:**

* `data` — `object` with:
  * `previous_version` — `string` — the fork version number.
  * `current_version` — `string` — the fork version number.
  * `epoch` — the minimum epoch at which this exit can be included on chain.

**Example:**

``` sh
curl -X GET https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/config/fork_schedule
```
