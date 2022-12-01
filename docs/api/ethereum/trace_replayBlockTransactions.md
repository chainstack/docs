---
meta:
  - name: description
    content: trace_replayBlockTransactions  JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum debug trace
---

# Ethereum trace_replayBlockTransactions RPC method

Ethereum API method that replays all transactions in a block returning the requested traces for each transaction.

::: tip Information

This method is available on Erigon when the `trace` namespace is enabled.

:::

**Parameters:**

* `data` — the raw transaction data.
* `array` — the type of trace, one or more of:
  * `vmTrace` — to get a full trace of virtual machine's state during the execution of the given transaction, including any subcalls.
  * `trace` — to get the basic trace of the given transaction.
  * `statediff` — to get information on altered Ethereum state due to execution of the given transaction.

**Returns:**

* `array` — the block traces that have the following object shape (all return types are hexadecimal representations of their data type unless otherwise stated):
* `Output` — string.
* `transactionHash` — the string of the transaction hash.
* `vmtrace` — the `ParityVmTrace` object with:
  * `code` — string.
  * `operations` — the array of the `ParityVmOperationTrace` objects.
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

result = web3.make_request('trace_replayBlockTransactions', ['0xF42043',['trace']])
print(result)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H 'Content-Type: application/json' \
  --data '{"method":"trace_replayBlockTransactions","params":["0xF42043",["trace"]],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>
