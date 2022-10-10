---
meta:
  - name: description
    content: eth_newPendingTransactionFilter JSON-RPC method for the Polygon API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby polygon
---

# Polygon eth_newPendingTransactionFilter RPC method

Polygon API method that creates a filter object to notify when new pending transactions are detected. To check if the state has changed, call [eth_getFilterChanges](/api/polygon/eth_getfilterchanges).

**Parameters:**

- `none`

**Returns:**

- `result` - Returns a filter ID to be used when calling [eth_getFilterChanges](/api/polygon/eth_getfilterchanges).

**Example:**

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

```js
// Web3.js does not support this feature. See the Web3.js subscriptions page.
```

</template>
<template v-slot:py>

```py
# The method eth_newPendingTransactionFilter does not exist/is not available.
```

</template>
<template v-slot:rb>

```rb
# The method eth_newPendingTransactionFilter does not exist/is not available.
```

</template>
<template v-slot:cr>

```sh
# The method eth_newPendingTransactionFilter does not exist/is not available.
```

</template>
</CodeSwitcher>
