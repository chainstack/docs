---
meta:
  - name: description
    content: eth_getBlockTransactionCountByNumber JSON-RPC method for the Avalanche API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby Avalanche 
---

# eth_getBlockTransactionCountByNumber

Avalanche API method that returns the number of transactions in the block matching the given block number. 

**Parameters:**  

* `integer` - Block number.

**Returns:** 

* `result` - Integer number of transactions in the block.

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
web3.eth.getBlockTransactionCount(19640102, (err, block) => {
  console.log(block)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print (web3.eth.get_block_transaction_count(19640102)) # A hex value starting with "0x" is accepted as well.
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_block_transaction_count_by_number("0x12BAF26")
puts response["result"].to_i(16)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getBlockTransactionCountByNumber","params":["0x12BAF26"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>