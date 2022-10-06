---
meta:
  - name: description
    content: eth_getTransactionByBlockHashAndIndex JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum 
---

# Ethereum eth_getTransactionByBlockHashAndIndex RPC method

Ethereum API method that returns information about a transaction given a block hash and a transaction's index position. 

**Parameters:**  

* `hash` - A block's hash.
* `quantity` - An integer of the transaction index position.

**Returns:** 

* `object` - Transaction Response Object , or `null` if no transaction is found:
  * `hash` - The hash of the transaction. 
  * `nonce` - The number of transactions made by the sender before this one. Encoded as hexadecimal. 
  * `blockHash` - The hash of the block where this transaction was in. `null` if pending. 
  * `blockNumber` - The block number where this transaction was in. `null` if pending. 
  * `transactionIndex` - Integer of the transactions index position in the block. `null` if pending. 
  * `from` - Address of the sender. 
  * `to` - Address of the receiver. `null` when it is a contract creation transaction. 
  * `value` - The value transferred in Wei, encoded as hexadecimal. 
  * `gasPrice` - The gas price provided by the sender in Wei, encoded as hexadecimal. 
  * `gas` - The gas provided by the sender, encoded as hexadecimal. 
  * `input` - The data sent along with the transaction. 
  * `v` - The standardized V field of the signature. 
  * `standardV` - The standardized V field of the signature (0 or 1). 
  * `r` The R field of the signature. 
  * `raw` - The raw transaction data.  
  * `publicKey` - The public key of the signer. 
  * `chainId` - The chain id of the transaction, if any. 

**Example:**

::: tip
cURL needs a `HEX String` starting with `0x` to identify the block if you want to use a hex integer block number as a parameter.
For example, block number `207` will be `0xCF`.
:::

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.getTransactionFromBlock("0xc05b2e16a1643d0aa15d098a408b28aa9109322087d2f2730bb2a8fa6bb699b0", 207, (err, block) => {
    console.log(block)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_transaction_by_block("0xc05b2e16a1643d0aa15d098a408b28aa9109322087d2f2730bb2a8fa6bb699b0", 207))
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_transaction_by_block_hash_and_index("0xc05b2e16a1643d0aa15d098a408b28aa9109322087d2f2730bb2a8fa6bb699b0", 207)
puts response["result"]
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getTransactionByBlockHashAndIndex","params":["0xc05b2e16a1643d0aa15d098a408b28aa9109322087d2f2730bb2a8fa6bb699b0","0xCF"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>