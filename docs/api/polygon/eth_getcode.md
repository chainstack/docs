---
meta:
  - name: description
    content: eth_getCode JSON-RPC method for the Polygon API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby polygon 
---

# eth_getCode

Polygon API method that returns the compiled bytecode of a smart contract.

**Parameters:**  

* `address` - Address of the smart contract to retrieve the bytecode from.
* `quantity or tag` - Integer block number, or the string 'latest', 'earliest' or 'pending'. See the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter). 

**Returns:** 

* `result` - The string value of the compiled bytecode.

**Example:**

The example retrieves the bytecode of the [Wrapped Matic token](https://polygonscan.com/token/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270) at the state of the latest block.

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
web3.eth.getCode("0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", "latest", (err, byte) => {
  console.log(byte)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
code = web3.eth.get_code("0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", "latest") 
print(web3.toHex(code))   # Convert the Bytes result into HEX.
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_code("0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", "latest")
puts response["result"]
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getCode","params":["0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", "latest"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>