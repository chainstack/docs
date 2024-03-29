---
meta:
  - name: description
    content: eth_getBlockByNumber JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum
---

# Ethereum eth_getBlockByNumber RPC method

An Ethereum API method that allows you to retrieve information about a specific block on the Ethereum blockchain. The `eth_getBlockByNumber` method is called by sending an HTTP POST request to the Ethereum node with a JSON payload that includes the following parameters.

**Parameters:**

1. `blockNumber` — the block identifier that can be one of the following:
   - `quantity` — string representing the block number that you want to retrieve, encoded either as integer or hexadecimal.
   - `tag` — the string that means one of the following block's states:
    - `latest` — the latest block that is to be validated. The Beacon Chain may reorg and the latest block can become orphaned.
    - `safe` — the block that is equal to the tip of the chain and is very unlikely to be orphaned.
    - `finalized` — the block that is accepted by the two thirds of the Ethereum validators.
    - `earliest` — the genesis block.
    - `pending` — the pending state and transactions block.
1. `fullTransactionObjects` — a boolean value indicating whether you want to include full transaction objects in the returned block data. If `true`, the method will return the full transaction objects for each transaction in the block. If `false`, it will only return the transaction hashes:

**Returns:**

- `object` — the block object, or `null` when no block was found with the `eth_getBlockByNumber` call.
    - `number` — the block number of the requested block, encoded as hexadecimal. `null` if pending.
    - `hash` — the block hash of the requested block. `null` if pending.
    - `parenthash` — the hash of the parent block.
    - `nonce` — the hash of the generated proof-of-work. `null` if pending.
    - `sha3uncles` — SHA-3 of the uncles' data in the block.
    - `logsbloom` — the bloom filter for the logs of the block. `null` if pending.
    - `transactionsroot` — the root of the transaction trie of the block.
    - `stateroot` — the root of the final state trie of the block.
    - `receiptsroot` — the root of the receipts trie of the block.
    - `miner` — the address to whom the mining rewards were given.
    - `difficulty` — the integer of the difficulty for this block, encoded as hexadecimal.
    - `totaldifficulty` — the integer of the total difficulty of the chain until this block, encoded as hexadecimal.
    - `extradata` — the extra data field of this block.
    - `size` — the size of this block in bytes as an integer value, encoded as hexadecimal.
    - `gaslimit` — the maximum gas allowed in this block, encoded as hexadecimal.
    - `gasused` — the total used gas by all transactions in this block, encoded as hexadecimal.
    - `timestamp` — the Unix timestamp for when the block was collated.
    - `transactions` — the array of transaction objects; see [eth_getTransactionByHash](https://docs.chainstack.com/api/ethereum/eth_gettransactionbyhash) for exact shape.
    - `uncles` — the array of uncle hashes.

::: tip Information
cURL needs a `HEX String` starting with `0x` to identify the block if you want to use a hex integer block number as a parameter.
For example, block number `14000000` will be `0xD59F80`.
:::

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

```js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.getBlock("latest", "False", (err, block) => {
  console.log(block);
});
```

</template>
<template v-slot:py>

```py
from web3 import Web3
node_url = "CHAINSTACK_NODE_URL"
web3 = Web3(Web3.HTTPProvider(node_url))
print(web3.eth.get_block("latest", False))
```

</template>
<template v-slot:rb>

```rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_block_by_number("latest",false)
puts response["result"]
```

</template>
<template v-slot:cr>

```sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getBlockByNumber","params":["latest",false],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>
