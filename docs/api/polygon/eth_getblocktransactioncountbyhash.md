---
meta:
  - name: description
    content: eth_getBlockTransactionCountByHash JSON-RPC method for the Polygon API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby polygon 
---

# eth_getBlockTransactionCountByHash

Polygon API method that returns the number of transactions in the block matching the given block hash.  

**Parameters:**  

* `hash` - Hash of the block.

**Returns:** 

* `result` - Integer number of transactions in the block.

**Example:**

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.getBlockTransactionCount("0x7709b7cacb9a3d647afe557d51891c00ad0c00e01d5bffdbcfe6c1730d36290c", (err, block) => {
    console.log(block)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_block_transaction_count("0x7709b7cacb9a3d647afe557d51891c00ad0c00e01d5bffdbcfe6c1730d36290c"))
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_block_transaction_count_by_hash("0x7709b7cacb9a3d647afe557d51891c00ad0c00e01d5bffdbcfe6c1730d36290c")
puts response["result"].to_i(16)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getBlockTransactionCountByHash","params":["0x7709b7cacb9a3d647afe557d51891c00ad0c00e01d5bffdbcfe6c1730d36290c"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>