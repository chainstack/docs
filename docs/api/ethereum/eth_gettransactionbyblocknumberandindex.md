---
meta:
  - name: description
    content: eth_getTransactionByBlockNumberAndIndex JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum
---

# Ethereum eth_getTransactionByBlockNumberAndIndex RPC method

Ethereum API method that returns information about a transaction given a block number and a transaction's index position.  

**Parameters:**  

* `quantity or tag` — the integer block number, or the string with:
  * `latest` — the latest block that is to be validated. The Beacon Chain may reorg and the latest block can become orphaned.
  * `safe` — the block that is equal to the tip of the chain and is very unlikely to be orphaned.
  * `finalized` — the block that is accepted by the two thirds of the Ethereum validators.
  * `earliest` — the genesis block.
  * `pending` — the pending state and transactions block.
* `quantity` — a hex of the integer representing the position in the block.

**Returns:**

* `object` — the transaction response object , or `null` if no transaction is found:
  * `hash` — the hash of the transaction.
  * `nonce` — the number of transactions made by the sender before this one, encoded as hexadecimal.
  * `blockHash` — the hash of the block where this transaction was in. `null` if pending.
  * `blockNumber` — the block number where this transaction was in. `null` if pending.
  * `transactionIndex` — the integer of the transactions index position in the block. `null` if pending.
  * `from` — the address of the sender.
  * `to` — the address of the receiver. `null` when it is a contract creation transaction.
  * `value` — the value transferred in Wei, encoded as hexadecimal.
  * `gasPrice` — the gas price provided by the sender in Wei, encoded as hexadecimal.
  * `gas` — the gas provided by the sender, encoded as hexadecimal.
  * `input` — the data sent along with the transaction.
  * `v` — the standardized V field of the signature.
  * `standardV` — the standardized V field of the signature (0 or 1).
  * `r` — the R field of the signature.
  * `raw` — the raw transaction data.  
  * `publicKey` — the public key of the signer.
  * `chainId` — the chain ID of the transaction, if any.

**Example:**

::: tip Information
cURL needs a `HEX String` starting with `0x` to identify the block if you want to use a hex integer block number as a parameter.
For example, block number `14000000` will be `0xD59F80`.
:::

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.getTransactionFromBlock(14806883, 214, (err, block) => {
    console.log(block)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL"
web3 = Web3(Web3.HTTPProvider(node_url))
print(web3.eth.get_transaction_by_block(14806883, 214)) # Hex encoded parameters starting with "0x" are accepted as well.
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_transaction_by_block_number_and_index("0xE1EF63", 214)
puts response["result"]
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getTransactionByBlockNumberAndIndex","params":["0xE1EF63", "0xD6"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>
