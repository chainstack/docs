---
meta:
  - name: description
    content: eth_newFilter JSON-RPC method for the Avalanche API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby Avalanche
---

# eth_newFilter

Avalanche API method that creates a filter object based on the filter options to notify when the state changes (logs). To check if the state has changed, call eth_getFilterChanges.

**Parameters:**

- `object` - Should contain the filter information. All keys are optional:
  - `fromBlock` - (Optional) Integer block number, or the string `'latest'`, `'earliest'` or `'pending'`, encoded as hexadecimal starting with `0x`.
  - `toBlock` - (Optional) Integer block number, or the string `'latest'`, `'earliest'` or `'pending'`, encoded as hexadecimal starting with `0x`.
  - `address` - (Optional) Contract address, or a list of addresses from which the logs should originate.
  - `topics` - (Optional) Array of DATA topics. Topics are order-dependent. Go here to learn more about topics.

**Returns:**

- `result` - Returns a filter ID to be used when calling [eth_getFilterChanges](/api/avalanche/eth_getfilterchanges).

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
newBlockFilterId = web3.eth.filter("latest")
newFilterId = web3.eth.filter({
  "fromBlock": "0x12BB7BA",
  "toBlock": "latest",
  "address": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
})
print(newFilterId)
```

</template>
<template v-slot:rb>

```rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
filter = {
  fromBlock: "0x12BB7BA",
  toBlock: "latest",
  address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
}
response = client.eth_new_filter(filter)
puts response["result"]

```

</template>
<template v-slot:cr>

```sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_newFilter","params":[{"fromBlock": "0x12BB7BA", "toBlock": "0x6C6174657374", "address": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7","topics": []}], "jsonrpc":"2.0", "id":1}'

```

</template>
</CodeSwitcher>
