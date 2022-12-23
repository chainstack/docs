---
meta:
  - name: description
    content: txpool_content JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum debug trace
---

# Ethereum txpool_content RPC method

Ethereum API method that returns all pending and queued transactions.

::: tip Information

Learn [how to deploy](/api/ethereum/deploy-your-ethereum-node-to-enable-debug-and-trace-api-methods) a node with the debug and trace API methods enabled.

:::

**Parameters:**

* `none`

**Returns:**

* `array` — the list of pending and queued transactions, with each having the following fields:
* `pending` — the array of transaction objects with:
  * `blockHash` — the hash of the block where this transaction was in. `null` in this case.
  * `blockNumber` — the block number where this transaction was added, encoded as hexadecimal. `null` in this case.
  * `from` — the address of the sender.
  * `gas` — the total amount of gas units used in the transaction.
  * `gasPrice` — the total amount of Wei that the sender is willing to pay for the transaction.
  * `hash` — the hash of the transaction.
  * `input` — the encoded transaction input data.
  * `nonce` — the number of transactions the sender has sent till now.
  * `r` — the ECDSA signature r.
  * `s` — the ECDSA signature s.
  * `to` — the address of the receiver. `null` if it is a contract creation transaction.
  * `transactionIndex` — the integer of the transactions index position in the block, encoded as hexadecimal.
  * `type` — a number between 0 and 0x7f, for a total of 128 possible transaction types.
  * `v` — the ECDSA recovery ID, encoded as hexadecimal.
  * `value` — the value transferred in Wei, encoded as hexadecimal.
* `queued` — the array of transaction objects with:
  * `accesslist` — the list of addresses and storage keys the transaction plans to access, introduced in EIP—2929.
  * `blockHash` — the hash of the block where this transaction was in. `null` in this case.
  * `blockNumber` — the block number where this transaction was added, encoded as hexadecimal. `null` in this case.
  * `chainId` — the current network/chain ID used to sign replay—protected transaction, introduced in EIP—155.
  * `from` — the address of the sender.
  * `gas` — the total amount of gas units used in the transaction.
  * `gasPrice` — the total amountof  Wei that the sender is willing to pay for the transaction.
  * `hash` — the hash of the transaction.
  * `input` — the encoded transaction input data.
  * `maxFeePerGas` — the maximum amount of gas willing to be paid for the transaction.
  * `maxPriorityFeePerGas` — the maximum amount of gas to be included as a tip to the miner.
  * `nonce` — the number of transactions the sender has sent till now.
  * `r` — the ECDSA signature r.
  * `s` — the ECDSA signature s.
  * `to` — the address of the receiver. `null` if it is a contract creation transaction.
  * `transactionIndex` — the integer of the transactions index position in the block, encoded as hexadecimal.
  * `type` — a number between 0 and 0x7f, for a total of 128 possible transaction types.
  * `v` — the ECDSA recovery ID, encoded as hexadecimal.
  * `value` — the value transferred in Wei, encoded as hexadecimal.

**Example:**

<CodeSwitcher :languages="{py:'web3.py', cr:'cURL'}">

<template v-slot:py>

``` py
from web3 import Web3
node_url = "CHAINSTACK_NODE_URL"
web3 = Web3(Web3.HTTPProvider(node_url))

pool = web3.geth.txpool.content()
print(pool)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H 'Content-Type: application/json' \
  --data '{"method":"txpool_content","params":[],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>
