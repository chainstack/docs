---
meta:
  - name: description
    content: eth_getBlockByHash JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb ethers javascript python ruby ethereum
---

# Ethereum eth_getBlockByHash RPC method

Ethereum API method that returns information about the block matching the given block hash. This method can be useful for analyzing a block and its transactions.

**Parameters:**

- `hash` — the block hash.
- `boolean` — if `true`, it returns the detail of each transaction. If `false`, returns only the hashes of the transactions.

**Returns:**

- `object` — a block object, or `null` when no block was found.
  - `number` — the block number of the requested block. Encoded as hexadecimal. `null` if the block is pending.
  - `hash` — the block hash of the requested block. `null` if the block pending.
  - `parenthash` — hash of the previous block that was used to generate the current block. Also known as the "parent block".
  - `nonce` — the hash used to demonstrate proof-of-work. `null` if the block pending. It returns `0x0000000000000000` when the consensus is proof-of-stake.
  - `sha3uncles` — the hash of the list of uncles included in the block. It is used to uniquely identify the block and to verify the integrity of the block's data.
  - `logsbloom` — the bloom filter for the logs of the block—a data structure that allows for efficient membership testing of elements in a set, in this case, the logs included in the block. `null` if pending.
  - `transactionsroot` — the root of the transaction trie of the block. The `transactionsRoot` field allows Ethereum nodes to verify the integrity of the transactions in a block.
  - `stateroot` — the root of the final state trie of the block. The `stateroot` field is included in the block header and is used to verify the integrity of the state at the time the block was processed
  - `receiptsroot` — the root of the receipts trie of the block, as a 32-byte hash. It is used to verify the integrity of the receipts data for all transactions in the block.
  - `miner` — the address of the miner receiving the reward.
  - `difficulty` — a measure of how hard it is to find a valid block for the Ethereum blockchain. It is a number that increases as more miners join the network and more blocks are added to the chain. Encoded as hexadecimal.
  - `totaldifficulty` — the cumulative sum of the difficulty of all blocks that have been mined in the Ethereum network since the inception of the network. It is used to measure the overall security and integrity of the Ethereum network.
  - `extradata` — additional data included in a block by the miner who mined it. It is often used to include messages or other information related to the block.
  - `size` — the size of this block in bytes as an integer value, encoded as hexadecimal.
  - `gaslimit` — the maximum gas allowed in this block, encoded as hexadecimal.
  - `gasused` — the total used gas by all transactions in this block, encoded as hexadecimal.
  - `timestamp` — the Unix timestamp for when the block was collated.
  - `transactions` — the array of transaction objects; see [eth_getTransactionByHash](/api/ethereum/eth_gettransactionbyhash) for the exact shape.
  - `uncles` — the array of uncle hashes.

## Example:

<CodeSwitcher :languages="{js:'web3.js', eth:'ethers.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
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
<template v-slot:eth>

``` js
const ethers = require('ethers');
const node_url = "CHAINSTACK_NODE_URL";
const provider = new ethers.providers.JsonRpcProvider(node_url);

const eth_getBlockByHash = async () => {
    const blockByHash = await provider.send("eth_getBlockByHash", ["0x318cea2bfd5925bf2e5366aba9353fbc0c1678b2d73a2d540f7f7f8b8ce0a29e",false]);
     console.log(blockByHash);
   };

eth_getBlockByHash();
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

## Use case

The `eth_getBlockByHash` method is excellent for analytics purposes. For example, it can be used to quickly find out the hashes of transactions that create new smart contracts. The `transactions` field, an array of all the transactions contained within the block, is returned in the response. By iterating through this array and examining each transaction's `to` field, a user can determine which transactions in the block are creating new smart contracts.

The following example uses the `web3.js` library to create a function to extract this data:

```js
const Web3 = require("web3");

async function getSmartContractCreations(blockHash) {

  const web3 = new Web3(new Web3.providers.HttpProvider(node_url))

  // Retrieve the block using eth_getBlockByHash
  const block = await web3.eth.getBlock(blockHash, true);

  // Iterate over the transactions in the block
  for (const tx of block.transactions) {

    // Check if the transaction creates a contract (to field = null)
    if (tx.to === null) {

      // This is a contract creation transaction, print the hash of that transaction
      console.log(`This transaction deployed a smart contract: ${tx.hash}`);
    }
  }
}

const node_url = "CHAINSTACK_NODE_URL" // We used a Sepolia node and block hash for this example

// Use the block hash as parameter
getSmartContractCreations("0xc094c7e8f667b9a5f9c80b9d5ef16e1cc534957ebf7beef71067e668196cf8fa");
```

The previous example shows how the `eth_getBlockByHash` method might be used to know which transactions create a smart contract. When a new smart contract is created, the `to` field will be `null`. Running this function on a block hash with the transactions detail field set to `true` will inspect each transaction's `to` field. If the field is `null`, the transaction creates a smart contract, printing the transaction hash, which can then be used for further analysis.
