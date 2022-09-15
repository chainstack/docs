---
meta:
  - name: description
    content: eth_getBlockTransactionCountByNumber JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum 
---

# eth_getBlockTransactionCountByNumber

Ethereum API method that returns the number of transactions in the block matching the given block number. 

**Parameters:**  

* `quantity or tag` - Integer block number, or the string:
    * `latest` — the latest block that is to be validated. The Beacon Chain may reorg and the latest block can become orphaned.
    * `safe` — the block that is equal to the tip of the chain and is very unlikely to be orphaned.
    * `finalized` — the block that is accepted by the two thirds of the Ethereum validators.
    * `earliest` — the genesis block.
    * `pending` — the pending state and transactions block.

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
web3.eth.getBlockTransactionCount(14897720, (err, block) => {
    console.log(block)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print (web3.eth.get_block_transaction_count(14897720)) # A hex value starting with "0x" is accepted as well.
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_block_transaction_count_by_number("0xE35238")
puts response["result"].to_i(16)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getBlockTransactionCountByNumber","params":["0xE35238"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>