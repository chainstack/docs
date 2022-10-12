---
meta:
  - name: description
    content: eth_getFilterChanges JSON-RPC method for the Polygon API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby polygon
---

# Polygon eth_getFilterChanges RPC method

Polygon API polling method for a filter, which returns an array of logs which occurred since last poll.

**Parameters:**

- `quantity` - The filter id that is returned from [eth_newFilter](/api/polygon/eth_newfilter), [eth_newBlockFilter](/api/polygon/eth_newblockfilter), or [eth_newPendingTransactionFilter](/api/polygon/eth_newpendingtransactionfilter).

**Returns:**

- `array` - An array of one of the following, depending on the filter type, or empty if no changes occurred since the last poll:
  - For filters created with `eth_newBlockFilter`:
    - `blockHash` - The 32 bytes hash of a block that meets your filter requirements.
  - For filters created with `eth_newPendingTransactionFilter`:
    - `transactionHash` - The 32 bytes hash of a transaction that meets your filter requirements.
  - For filters created with `eth_newFilter`, logs are objects with the following parameters:
    - `removed` - The boolean value `True` if the log was removed due to a chain reorganization. `False` if it is a valid log.
    - `logindex` - Integer of the log index position in the block encoded as hexadecimal. `null` if pending.
    - `transactionindex` - Integer of the transactions' index position the log was created from. `null` if it is pending.
    - `transactionhash` - Hash of the transactions the log was created from. `null` if pending.
    - `blockhash` - Hash of the block where this log was in. `null` if it is pending.
    - `blocknumber` - The block number where this log was encoded as hexadecimal. `null` if it is pending.
    - `address` - The address from which this log originated.
    - `data` - Contains one or more 32 Bytes non-indexed arguments of the log.
    - `topics` - An array of 0 to 4 32 Bytes of indexed log arguments.

**Example:**

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

```js
// Web3.js does not support this feature. See the Web3.js subscriptions page.
```

</template>
<template v-slot:py>

```py
from web3 import Web3
node_url = "CHAINSTACK_NODE_URL"
web3 = Web3(Web3.HTTPProvider(node_url))

# Using eth_newPendingTransactionFilter in this example
put_filter = web3.eth.filter("pending")
print(web3.eth.get_filter_changes(put_filter.filter_id))
```

</template>
<template v-slot:rb>

```rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
filterId = client.eth_new_filter({
  fromBlock: "0x1F3793B",
  toBlock: "latest",
  address: "0xb0897686c545045aFc77CF20eC7A532E3120E0F1",
  topics: ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]
})
puts filterId["result"]
response = client.eth_get_filter_changes(filterId["result"].to_s)
puts response["result"]
```

</template>
<template v-slot:cr>

```sh
// The method eth_getFilterChanges does not exist/is not available in cURL.
```

</template>
</CodeSwitcher>
