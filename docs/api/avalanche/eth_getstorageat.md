---
meta:
  - name: description
    content: eth_getStorageAt JSON-RPC method for the Avalanche API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby Avalanche 
---

# eth_getStorageAt

Avalanche API method that returns the value from a storage position at a given address. 

**Parameters:**

* `address` - The address to check for storage.
* `quantity` - Integer of the position in storage.
* `quantity or tag` - Integer block number, or the string `'latest'`, `'earliest'` or `'pending'`. See the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

**Returns:**

* `result` - The value at this storage position.

**Example:**

The example returns the storage value of the [simple storage contract](https://testnet.snowtrace.io/address/0x6b21fc9607d2B8d39Ee8C95F9B063CD654a3d46C) on the Avalanche Fuji testnet.

The last value change was in block [13258270](https://testnet.snowtrace.io/tx/0xf1b181d1e15c91d50e9214364e5a58710f1f64b7c21621b1a832527c3649de05) and it can be used as a reference point to retrieve the different storage values in time. Note that to query a state in the past, you need <a href="https://chainstack.com/evm-nodes-a-dive-into-the-full-vs-archive-mode/" target="_blank">an archive node</a>.

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
web3.eth.getStorageAt("0x6b21fc9607d2b8d39ee8c95f9b063cd654a3d46c", 0, 13258270).then(result => {
  console.log(result);
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
storage = web3.eth.get_storage_at("0x6b21fc9607d2b8d39ee8c95f9b063cd654a3d46c", 0, 13258270)
print(web3.toHex(storage))
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_storage_at("0x6b21fc9607d2b8d39ee8c95f9b063cd654a3d46c", 0, 13258270)
puts response["result"]
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getStorageAt","params":["0x6b21fc9607d2b8d39ee8c95f9b063cd654a3d46c", "0x0", "0x3CD50"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>