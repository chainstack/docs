---
meta:
  - name: description
    content: eth_getStorageAt JSON-RPC method for the Polygon API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby polygon 
---

# Polygon eth_getStorageAt RPC method

Polygon API method that returns the value from a storage position at a given address. 

**Parameters:**

* `address` - The address to check for storage.
* `quantity` - Integer of the position in storage.
* `quantity or tag` - Integer block number, or the string `'latest'`, `'earliest'` or `'pending'`. See the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

**Returns:**

* `result` - The value at this storage position.

**Example:**

The example returns the storage value of the [simple storage contract](https://mumbai.polygonscan.com/address/0x702E0755450aFb6A72DbE3cAD1fb47BaF3AC525C) on the Mumbai testnet.

The last value change was in block [27949094](https://mumbai.polygonscan.com/tx/0xdbe48ca04f6e54c9ff7dcf69bc9f4d501aa793c43c5b45f698ecf08cee45830c) and it can be used as a reference point to retrieve the different storage values in time. Note that to query a state in the past, you need <a href="https://chainstack.com/evm-nodes-a-dive-into-the-full-vs-archive-mode/" target="_blank">an archive node</a>.

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
web3.eth.getStorageAt("0x702E0755450aFb6A72DbE3cAD1fb47BaF3AC525C", 0, 27949094).then(result => {
  console.log(result);
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
storage = web3.eth.get_storage_at("0x702E0755450aFb6A72DbE3cAD1fb47BaF3AC525C", 0, 27949094)
print(web3.toHex(storage))
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_storage_at("0x702E0755450aFb6A72DbE3cAD1fb47BaF3AC525C", 0, 27949094)
puts response["result"]
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getStorageAt","params":["0x702E0755450aFb6A72DbE3cAD1fb47BaF3AC525C", "0x0", "0x1AA7826"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>