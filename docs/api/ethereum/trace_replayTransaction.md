---
meta:
  - name: description
    content: trace_replayTransaction  JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum debug trace
---

# Ethereum trace_replayTransaction RPC method

Ethereum API method that replays a transaction, returning the traces.

::: tip Information

This method is available on Erigon when the `trace` namespace is enabled.

Learn [how to deploy](/api/ethereum/deploy-your-ethereum-node-to-enable-debug-and-trace-api-methods) a node with the debug and trace API methods enabled.

:::

**Parameters:**

* `data` — the raw transaction data.
* `array` — type of trace, one or more of:
  * `vmTrace` — to get a full trace of virtual machine's state during the execution of the given transaction including any subcalls.
  * `trace` — to get the basic trace of the given transaction.
  * `statediff` — to get information on altered Ethereum state due to execution of the given transaction.

**Returns:**

* `array` — block traces that have the following object shape (all return types are hexadecimal representations of their data type unless otherwise stated):
* `Output` — string.
* `transactionHash` — the string of the transaction hash.
* `vmtrace` — the `ParityVmTrace` object with:
  * `code` — string.
  * `operations` — array of the `ParityVmOperationTrace` objects.
* `action` — the `ParityTrace` object with:
  * `traceaddress` — array.
  * `calltype` — string.
  * `includeintrace` — boolean.
  * `isprecomplied` — boolean.
  * `type` — string.
  * `creationmethod` — string.
  * `from` — address.
  * `to` — address.
  * `gas` — quantity.
  * `value` — quantity.
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
* `statechanges` — array.

**Example:**

<CodeSwitcher :languages="{py:'web3.py', cr:'cURL'}">

<template v-slot:py>

``` py
from web3 import Web3
node_url = "CHAINSTACK_NODE_URL"
web3 = Web3.HTTPProvider(node_url)

trace = web3.make_request('trace_replayTransaction', ['0x96161bdfd8e2cfc5ce67d420cfbd2bbaf0cf47ae0655dae94d77d4dd4630bd95',['trace']])
print(trace)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H 'Content-Type: application/json' \
  --data '{"method":"trace_replayTransaction","params":["0x96161bdfd8e2cfc5ce67d420cfbd2bbaf0cf47ae0655dae94d77d4dd4630bd95",["trace"]],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>
