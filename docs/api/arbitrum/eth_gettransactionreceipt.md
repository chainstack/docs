---
meta:
  - name: description
    content: eth_getTransactionReceipt JSON-RPC method for the Arbitrum API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby Arbitrum 
---

# eth_getTransactionReceipt

Arbitrum API method that returns a receipt object given a transaction hash.   

**Parameters:**  

* `hash` - The hash of a transaction.

**Returns:** 

* `object` - Transaction Response Object , or `null` if no transaction is found:
  * `transactionHash`- Hash of the transaction. 
  * `transactionIndex` - Integer of the transactions index position in the block encoded as hexadecimal. 
  * `from` - Address of the sender.
  * `to` - Address of the receiver. `null` when it's a contract creation transaction.
  * `blockHash` - Hash of the block where this transaction was in.
  * `blockNumber` - Block number where this transaction was added, encoded as hexadecimal.
  * `cumulativeGasUsed` - The total gas used when this transaction was executed in the block.
  * `gasUsed` - The amount of gas used by this specific transaction.
  * `contractAddress` - The contract address created during the contract creation, otherwise `null`.
  * `logs` - Array of log objects that this transaction generated.
  * `logsBloom` - Bloom filter for light clients to quickly retrieve related logs.
  * `value` - Value transferred in Wei encoded as hexadecimal.
  * `v` - ECDSA recovery id encoded as hexadecimal.
  * `r` - ECDSA signature r
  * `s` - ECDSA signature s 

It also returns either: 
* `root` - 32 bytes of post-transaction stateroot (pre-Byzantium). 
* `status` - Either 1 (success) or 0 (failure) encoded as hexadecimal. 

**Example:**

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.getTransactionReceipt("0xa50f10c5b701572050b0b7a9e3f7df098cbea1e901c1d7e91e6b837a712fb5d8", (err, receipt) => {
  console.log(receipt)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_transaction_receipt("0xa50f10c5b701572050b0b7a9e3f7df098cbea1e901c1d7e91e6b837a712fb5d8"))  
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_transaction_receipt("0xa50f10c5b701572050b0b7a9e3f7df098cbea1e901c1d7e91e6b837a712fb5d8")
puts response["result"]
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getTransactionReceipt","params":["0xa50f10c5b701572050b0b7a9e3f7df098cbea1e901c1d7e91e6b837a712fb5d8"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>