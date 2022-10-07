---
meta:
  - name: description
    content: eth_newFilter JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum
---

# Ethereum eth_newFilter RPC method

Ethereum API method that creates a filter object based on the filter options to notify when the state changes (logs). To check if the state has changed, call eth_getFilterChanges.

**Parameters:**

- `object` - Should contain the filter information. All keys are optional:
  - `fromBlock` - (Optional) Integer block number, or the string `'latest'`, `'earliest'` or `'pending'`, encoded as hexadecimal starting with `0x`.
  - `toBlock` - (Optional) Integer block number, or the string `'latest'`, `'earliest'` or `'pending'`, encoded as hexadecimal starting with `0x`.
  - `address` - (Optional) Contract address, or a list of addresses from which the logs should originate.
  - `topics` - (Optional) Array of DATA topics. Topics are order-dependent. Go here to learn more about topics.

**Returns:**

- `result` - Returns a filter ID to be used when calling [eth_getFilterChanges](/api/ethereum/eth_getfilterchanges).

**Example:**

::: tip
cURL needs a `HEX String` starting with `0x` to identify the block if you want to use a hex integer block number as a parameter.
For example, block number `14000000` will be `0xD59F80`.
:::

<CodeSwitcher :languages="{js:'web3.js',py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

```js
// Web3.js does not support this feature. See the Web3.js subscriptions page.
```

</template>
<template v-slot:py>

```py
from web3 import Web3
node_url = "CHAINSTACK_NODE_URL"
newBlockFilterId = web3.eth.filter("latest")
newFilterId = web3.eth.filter({
  "fromBlock": "14915418",      # An integer encoded as hexadecimal starting with "0x" is accepted as well.
  "toBlock": "latest",
  "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
})
print(newFilterId)
```

</template>
<template v-slot:rb>

```rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
filter = {
  fromBlock: "0xE3975A",
  toBlock: "latest",
  address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
}
response = client.eth_new_filter(filter)
puts response["result"]
```

</template>
<template v-slot:cr>

```sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_newFilter","params":[{"fromBlock": "0xE3975A", "toBlock": "0x6C6174657374", "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984","topics": []}], "jsonrpc":"2.0", "id":1}'
```

</template>
</CodeSwitcher>
