---
meta:
  - name: description
    content: eth_getTransactionCount JSON-RPC method for the Arbitrum API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby Arbitrum 
---

# eth_getTransactionCount

Arbitrum API method that returns the number of transactions sent from an address (nonce).   

**Parameters:**  

* `address` - The address to retrieve the transaction count from.
* `quantity or tag` - (optional) Integer block number, or the string `'latest'`, `'earliest'` or `'pending'`. See the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter). 

**Returns:** 

* `result` - An integer number of transactions sent from an address.

**Example:**

::: tip
cURL needs a `HEX String` starting with `0x` to identify the block if you want to use a hex integer block number as a parameter.
For example, block number `14000000` will be `0xD59F80`.
:::

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.getTransactionCount("0xf14662b6b7edfebe645d783afef03a6ce615dfe0", "latest", (err, nonce) => {
  console.log(nonce)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
address = web3.toChecksumAddress("0xf14662b6b7edfebe645d783afef03a6ce615dfe0")
print(web3.eth.getTransactionCount(address, "latest")) 
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_transaction_count("0xf14662b6b7edfebe645d783afef03a6ce615dfe0", "latest")
puts response["result"].to_i(16)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getTransactionCount","params":["0xf14662b6b7edfebe645d783afef03a6ce615dfe0", "latest"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>