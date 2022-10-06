---
meta:
  - name: description
    content: eth_gasPrice JSON-RPC method for the Arbitrum API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby Arbitrum 
---

# Arbitrum eth_gasPrice RPC method

Arbitrum API method that returns the current gas base fee of the network. The value returned is in Wei. 

**Parameters:** 

* `none`

**Returns:** 

* `quantity` - The integer value of the current gas base fee in Wei.

**Example:**

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.getGasPrice((err, gasPrice) => {
    console.log(gasPrice)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.gas_price) 
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_gas_price
puts response["result"].to_i(16)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_gasPrice","params":[],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>