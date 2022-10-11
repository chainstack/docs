---
meta:
  - name: description
    content: eth_chainId JSON-RPC method for the Polygon API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby polygon 
---

# Polygon eth_chainId RPC method

Polygon API method that returns the current chain ID. Chain ID is used to sign replay-protected transactions. It was introduced in [EIP-155](https://eips.ethereum.org/EIPS/eip-155). 

**Parameters:** 

* `none`

**Returns:** 

* `quantity` - EIP-155 Chain ID. 

**Example:**

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.getChainId((err, chain) => {
    console.log(chain)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL"  
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.chain_id)  
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.chain_id
puts response
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_chainId","params":[],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>