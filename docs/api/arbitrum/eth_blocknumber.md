---
meta:
  - name: description
    content: eth_blockNumber JSON-RPC method for the Arbitrum API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby Arbitrum 
---

# eth_blockNumber 

Arbitrum API method that returns the latest block number of the blockchain. 

**Parameters:** 

* `none`

**Returns:** 

* `result` — Integer value of latest block number encoded as hexadecimal. 

**Example:**

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3"); 
const node_url = "CHAINSTACK_NODE_URL"; 
const web3 = new Web3(node_url) 
web3.eth.getBlockNumber((err,block) => { 
    console.log("latest block", block) 
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3 
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print (web3.eth.blockNumber) 
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
block_number = client.eth_block_number
puts block_number["result"].to_i(16)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_blockNumber", "jsonrpc":"2.0", "params":[],"id":1}'
```

</template>
</CodeSwitcher>