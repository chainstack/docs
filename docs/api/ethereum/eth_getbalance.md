---
meta:
  - name: description
    content: eth_getBalance JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum 
---

# Ethereum eth_getBalance RPC method

Ethereum API method that returns the balance of a given account address. The value is returned in Wei. 

**Parameters:** 

* `address` - The address to check the balance of.
* `quantity or tag` - Integer block number, or the string:
    * `latest` — the latest block that is to be validated. The Beacon Chain may reorg and the latest block can become orphaned.
    * `safe` — the block that is equal to the tip of the chain and is very unlikely to be orphaned.
    * `finalized` — the block that is accepted by the two thirds of the Ethereum validators.
    * `earliest` — the genesis block.
    * `pending` — the pending state and transactions block.

**Returns:** 

* `quantity` - The integer value of the current balance in Wei.

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
web3.eth.getBalance("0x9D00f1630b5B18a74231477B7d7244f47138ab47", "latest", (err, balance) => {
    console.log(balance)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
balance = web3.eth.get_balance("0x9D00f1630b5B18a74231477B7d7244f47138ab47", "latest") 
print(balance) 
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.get_balance("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")
puts response
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getBalance","params":["0x9D00f1630b5B18a74231477B7d7244f47138ab47", "latest"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>