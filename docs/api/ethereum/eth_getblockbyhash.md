---
meta:
  - name: description
    content: eth_getBlockByHash JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum
---

# Ethereum eth_getBlockByHash RPC method

Ethereum API method that returns information about the block matching the given block hash.

**Parameters:**

- `hash` — the hash of the block.
- `boolean` — if `True`, it returns the full transaction objects. If `False`, only the hashes of the transactions.

**Returns:**

- `object` — the block object, or `null` when no block was found.
  - `number` — the block number of the requested block, encoded as hexadecimal. `null` if pending.
  - `hash` — the block hash of the requested block. `null` if pending.
  - `parenthash` — the hash of the parent block.
  - `nonce` — the hash of the generated proof-of-work. `null` if pending.
  - `sha3uncles` — SHA-3 of the uncles data in the block.
  - `logsbloom` — the bloom filter for the logs of the block. `null` if pending.
  - `transactionsroot` — the root of the transaction trie of the block.
  - `stateroot` — the root of the final state trie of the block.
  - `receiptsroot` — the root of the receipts trie of the block.
  - `miner` — the address to whom the mining rewards were given.
  - `difficulty` — the integer of the difficulty for this block, encoded as hexadecimal.
  - `totaldifficulty` — the integer of the total difficulty of the chain until this block, encoded as hexadecimal.
  - `extradata` — the extra data field of this block.
  - `size` — the size of this block in bytes as an integer value, encoded as hexadecimal.
  - `gaslimit` — the maximum gas allowed in this block, encoded as hexadecimal.
  - `gasused` — the total used gas by all transactions in this block, encoded as hexadecimal.
  - `timestamp` — the Unix timestamp for when the block was collated.
  - `transactions` — the array of transaction objects; see [eth_getTransactionByHash](/api/ethereum/eth_gettransactionbyhash) for exact shape.
  - `uncles` — the array of uncle hashes.

**Example:**

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

```js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.getBlock(
  "0xaafff6dbabc20c5c2d58f5a8f336575f22681fd23a9e53bf81e69d8130a29b9c",
  "False",
  (err, block) => {
    console.log(block);
  }
);
```

</template>
<template v-slot:py>

```py
from web3 import Web3
node_url = "CHAINSTACK_NODE_URL"
web3 = Web3(Web3.HTTPProvider(node_url))
print(web3.eth.get_block("0xaafff6dbabc20c5c2d58f5a8f336575f22681fd23a9e53bf81e69d8130a29b9c", False))
```

</template>
<template v-slot:rb>

```rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_block_by_hash("0xaafff6dbabc20c5c2d58f5a8f336575f22681fd23a9e53bf81e69d8130a29b9c",false)
puts response["result"]
```

</template>
<template v-slot:cr>

```sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getBlockByHash","params":["0xaafff6dbabc20c5c2d58f5a8f336575f22681fd23a9e53bf81e69d8130a29b9c",false],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>
