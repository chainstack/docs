---
meta:
  - name: description
    content: eth_getUncleCountByBlockHash JSON-RPC method for the Arbitrum API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby Arbitrum 
---

# eth_getUncleCountByBlockHash

Arbitrum API method that returns the number of uncles for the block matching the given block hash.    

**Parameters:**  

* `hash` - The hash of the block to retrieve uncles from.

**Returns:** 

* `uncles` - The integer value of the number of uncles in the block. Encoded as hexadecimal.

**Example:**

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.getBlockUncleCount("0x1b60656f5ff0828f6c2f4b00e9f500625b4f1dc0bca45f1f46c31d78d53bb9b8", (err, uncle) => {
    console.log(uncle)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_uncle_count("0x1b60656f5ff0828f6c2f4b00e9f500625b4f1dc0bca45f1f46c31d78d53bb9b8"))   
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_uncle_count_by_block_hash("0x1b60656f5ff0828f6c2f4b00e9f500625b4f1dc0bca45f1f46c31d78d53bb9b8")
puts response["result"].to_i(16)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getUncleCountByBlockHash","params":["0x1b60656f5ff0828f6c2f4b00e9f500625b4f1dc0bca45f1f46c31d78d53bb9b8"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>