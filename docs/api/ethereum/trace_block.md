---
meta:
  - name: description
    content: trace_block JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum debug trace
---

# Ethereum trace_block RPC method

Ethereum API method that returns traces created at a given block.

::: tip Information

This method is available on Erigon when the `trace` namespace is enabled.

Learn [how to deploy](/api/ethereum/deploy-your-ethereum-node-to-enable-debug-and-trace-api-methods) a node with the debug and trace API methods enabled.

:::

**Parameters:**

* `quantity or tag` — the integer block number, or the string with:
  * `latest` — the latest block that is to be validated. The Beacon Chain may reorg and the latest block can become orphaned.
  * `earliest` — the genesis block.
  * `pending` — the pending state and transactions block.

**Returns:**

* `array` — the block traces that have the following object shape (all return types are hexadecimal representations of their data type unless otherwise stated):
* `action` — the trace object with:
  * `traceaddress` — array.
  * `calltype` — string.
  * `includeintrace` — boolean.
  * `isprecomplied` — boolean.
  * `type` — string.
  * `creationmethod` — string.
  * `from` — address.
  * `to` — address.
  * `gas` — quantity.
  * `value` — amount.
  * `input` — data.
  * `result` — the `ParityTraceResult` object with:
      * `gasused` — quantity.
      * `output` — data.
      * `address` — address.
      * `code` — data.
  * `subtraces` — array.
  * `author` — address.
  * `rewardtype` — string.
  * `error` — string.  
* `blockhash` — string.
* `blocknumber` — quantity.
* `result` — the `ParityTraceResult` object with:
  * `gasused` — quantity.
  * `output` — data.
  * `address` — address.
  * `code` — data.
* `subtraces` — quantity.
* `traceaddress` — array.
* `transactionhash` — hash.
* `transactionposition` — quantity.
* `type` — string.
* `error` — string.

**Example:**

<CodeSwitcher :languages="{py:'web3.py', cr:'cURL'}">

<template v-slot:py>

``` py
from web3 import Web3
node_url = "CHAINSTACK_NODE_URL"
web3 = Web3.HTTPProvider(node_url)

trace = web3.make_request('trace_block', [15998560])
print(trace)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H 'Content-Type: application/json' \
  --data '{"method":"trace_block","params":["0xF41E60"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>
