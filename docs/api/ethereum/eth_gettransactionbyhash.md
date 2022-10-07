---
meta:
  - name: description
    content: eth_getTransactionByHash JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum 
---

# Ethereum eth_getTransactionByHash RPC method

Ethereum API method that returns the information about a transaction from the transaction hash.   

**Parameters:**  

* `hash` - The hash of a transaction.

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

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.getTransaction("0xf915903ecc67ab20a5162ae13eec36e3a68ca558765ada1779847e0a0c35479c", (err, tx) => {
    console.log(tx)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_transaction("0xf915903ecc67ab20a5162ae13eec36e3a68ca558765ada1779847e0a0c35479c")) 
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_transaction_by_hash("0xf915903ecc67ab20a5162ae13eec36e3a68ca558765ada1779847e0a0c35479c")
puts response["result"]
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getTransactionByHash","params":["0xf915903ecc67ab20a5162ae13eec36e3a68ca558765ada1779847e0a0c35479c"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>