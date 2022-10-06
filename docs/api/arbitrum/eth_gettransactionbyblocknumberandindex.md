---
meta:
  - name: description
    content: eth_getTransactionByBlockNumberAndIndex JSON-RPC method for the Arbitrum API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby Arbitrum 
---

# Arbitrum eth_getTransactionByBlockNumberAndIndex RPC method

Arbitrum API method that returns information about a transaction given a block number and a transaction's index position.  

**Parameters:**  

* `quantity or tag` - Integer block number, or the string `latest`, `earliest`, or `pending`. See the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).
* `quantity` - A hex of the integer representing the position in the block.

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
For example, block number `14000000` will be `0xD59F80`.
:::

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.getTransactionFromBlock(23203995, 2, (err, block) => {
  console.log(block)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_transaction_by_block(23203995, 2)) # Hex encoded parameters starting with "0x" are accepted as well.
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_transaction_by_block_number_and_index("0x162109B", 2)
puts response["result"]
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getTransactionByBlockNumberAndIndex","params":["0x162109B", "0x2"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>