---
meta:
  - name: description
    content: eth_getUncleByBlockNumberAndIndex JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum 
---

# Ethereum eth_getUncleByBlockNumberAndIndex RPC method

Ethereum API method that returns information about an uncle of a block by number and uncle index position.   

**Parameters:**  

* `quantity or tag` - Block number encoded as hexadecimal starting with `0x`.
* `index` - The uncle's index position.

**Returns:** 

* `object` - A block object, or `null` when no block was found:
  * `number` - The block number. `null` when it is a pending block.
  * `hash` - Hash of the block. `null` when it is a pending block.
  * `parentHash` - Hash of the parent block.
  * `nonce` - Hash of the generated proof-of-work. `null` when it is a pending block.
  * `sha3Uncles` - SHA3 of the uncles' data in the block.
  * `logsBloom` - The bloom filter for the logs of the block. `null` when it is a pending block.
  * `transactionsRoot` - The root of the transaction trie of the block.
  * `stateRoot` - The root of the final state trie of the block.
  * `receiptsRoot` The root of the receipts trie of the block.
  * `miner` The address of the beneficiary to whom the mining rewards were given.
  * `difficulty` - Integer of the difficulty for this block.
  * `totalDifficulty` - Integer of the total difficulty of the chain until this block.
  * `extraData` - The "extra data" field of this block.
  * `size` - Integer of the size of this block in bytes.
  * `gasLimit` - The maximum gas allowed in this block.
  * `gasUsed` - The total used gas by all transactions in this block.
  * `timestamp` - The UNIX timestamp for when the block was collated.
  * `transactions` - Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter.
  * `uncles` - Array of uncle hashes.

**Example:**

::: tip
Web3.js requires the block number identifier to be an integer **not encoded** as hexadecimal.
:::

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.getUncle("12911679", 0, (err, uncle) => {
    console.log(uncle)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_uncle_by_block("0xDB60", 0))    
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_uncle_count_by_block_number("0xDB60")
puts response["result"].to_i(16)   
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getUncleByBlockNumberAndIndex","params":["0xDB60", "0x0"],"id":1, "jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>