---
meta:
  - name: description
    content: eth_newFilter JSON-RPC method for the Polygon API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby polygon
---

# eth_newFilter

Polygon API method that creates a filter object based on the filter options to notify when the state changes (logs). To check if the state has changed, call eth_getFilterChanges.

**Parameters:**

- `object` - Should contain the filter information. All keys are optional:
  - `fromBlock` - (Optional) Integer block number, or the string `'latest'`, `'earliest'` or `'pending'`, encoded as hexadecimal starting with `0x`.
  - `toBlock` - (Optional) Integer block number, or the string `'latest'`, `'earliest'` or `'pending'`, encoded as hexadecimal starting with `0x`.
  - `address` - (Optional) Contract address, or a list of addresses from which the logs should originate.
  - `topics` - (Optional) Array of DATA topics. Topics are order-dependent. Go here to learn more about topics.

**Returns:**

- `result` - Returns a filter ID to be used when calling [eth_getFilterChanges](/api/polygon/eth_getfilterchanges).

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
# The method eth_newFilter does not exist/is not available.
```

</template>
<template v-slot:rb>

```rb
# The method eth_newFilter does not exist/is not available.
```

</template>
<template v-slot:cr>

```sh
# The method eth_newFilter does not exist/is not available.
```

</template>
</CodeSwitcher>
