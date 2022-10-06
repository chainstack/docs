---
meta:
  - name: description
    content: eth_getCode JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum 
---

# Ethereum eth_getCode RPC method

Ethereum API method that returns the compiled bytecode of a smart contract.

**Parameters:**  

* `address` - Address of the smart contract to retrieve the bytecode from.
* `quantity or tag` - Integer block number, or the string:
    * `latest` — the latest block that is to be validated. The Beacon Chain may reorg and the latest block can become orphaned.
    * `safe` — the block that is equal to the tip of the chain and is very unlikely to be orphaned.
    * `finalized` — the block that is accepted by the two thirds of the Ethereum validators.
    * `earliest` — the genesis block.
    * `pending` — the pending state and transactions block. 

**Returns:** 

* `result` - The string value of the compiled bytecode.

**Example:**

The example retrieves the bytecode of the [Uniswap token](https://etherscan.io/address/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984#code) at the state of the latest block.

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
web3.eth.getCode("0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", "latest", (err, byte) => {
    console.log(byte)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
code = web3.eth.get_code("0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", "latest") 
print(web3.toHex(code))   # Convert the Bytes result into HEX.
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_code("0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", "latest")
puts response["result"]
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getCode","params":["0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", "latest"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>