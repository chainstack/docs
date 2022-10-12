---
meta:
  - name: description
    content: eth_getFilterChanges JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum
---

# Ethereum eth_getFilterChanges RPC method

Ethereum API polling method for a filter, which returns an array of logs which occurred since last poll.

**Parameters:**

- `quantity` - The filter id that is returned from [eth_newFilter](/api/ethereum/eth_newfilter), [eth_newBlockFilter](/api/ethereum/eth_newblockfilter), or [eth_newPendingTransactionFilter](/api/ethereum/eth_newpendingtransactionfilter).

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
  fromBlock: "0xE4E7B1",
  toBlock: "latest",
  address: "0x514910771af9ca656af840dff83e8264ecf986ca",
  topics: ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]
})
puts filterId["result"]
response = client.eth_get_filter_changes(filterId["result"].to_s)
puts response["result"]
```

</template>
<template v-slot:cr>

```sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getFilterChanges","params":["0x7842730ec9d87e1e2afe0573f6c747b2"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>
