---
meta:
  - name: description
    content: eth_getTransactionByHash JSON-RPC method for the Arbitrum API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby Arbitrum 
---

# Arbitrum eth_getTransactionByHash RPC method

Arbitrum API method that returns the information about a transaction from the transaction hash.   

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
web3.eth.getTransaction("0xa50f10c5b701572050b0b7a9e3f7df098cbea1e901c1d7e91e6b837a712fb5d8", (err, tx) => {
  console.log(tx)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_transaction("0xa50f10c5b701572050b0b7a9e3f7df098cbea1e901c1d7e91e6b837a712fb5d8")) 
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_transaction_by_hash("0xa50f10c5b701572050b0b7a9e3f7df098cbea1e901c1d7e91e6b837a712fb5d8")
puts response["result"]
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getTransactionByHash","params":["0xa50f10c5b701572050b0b7a9e3f7df098cbea1e901c1d7e91e6b837a712fb5d8"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>