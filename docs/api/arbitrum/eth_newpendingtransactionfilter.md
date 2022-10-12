---
meta:
  - name: description
    content: eth_newPendingTransactionFilter JSON-RPC method for the Arbitrum API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby Arbitrum
---

# Arbitrum eth_newPendingTransactionFilter RPC method

Arbitrum API method that creates a filter object to notify when new pending transactions are detected. To check if the state has changed, call [eth_getFilterChanges](/api/arbitrum/eth_getfilterchanges).

**Parameters:**

- `none`

**Returns:**

- `result` - Returns a filter ID to be used when calling [eth_getFilterChanges](/api/arbitrum/eth_getfilterchanges).

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
newFilterId = web3.eth.filter("pending")
print(newFilterId)
```

</template>
<template v-slot:rb>

```rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_new_pending_transaction_filter
puts response["result"]
```

</template>
<template v-slot:cr>

```sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_newPendingTransactionFilter","params":[], "jsonrpc":"2.0","id":1}'
```

</template>
</CodeSwitcher>
