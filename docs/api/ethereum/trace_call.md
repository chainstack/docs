---
meta:
  - name: description
    content: trace_call JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum debug trace
---

# Ethereum trace_call RPC method

Ethereum API method that executes a new message call and returns a number of possible traces.

::: tip Information

This method is available on Erigon when the `trace` namespace is enabled.

Learn [how to deploy](/api/ethereum/deploy-your-ethereum-node-to-enable-debug-and-trace-api-methods) a node with the debug and trace API methods enabled.

:::

**Parameters:**

* `object` — the transaction call object with:
  * `from` — (optional) the string of the address the transaction is sent from.
  * `to` — the string of the address to which the transaction is directed.
  * `gas` — (optional) the integer of the gas provided for the transaction execution.
  * `gasprice` — (optional) the integer of the gas price used for each paid gas, encoded as hexadecimal.
  * `value` — (optional) the integer of the value sent with this transaction, encoded as hexadecimal.
  * `data` — (optional) the string of the hash of the method signature and encoded parameters; see the [Ethereum Contract ABI](https://solidity.readthedocs.io/en/latest/abi-spec.html).

**Returns:**

* `array` — the block traces that have the following object shape (all return types are hexadecimal representations of their data type unless otherwise stated):
* `Output` — string.
* `TransactionHash` — string.
* `vmtrace` — the `ParityVmTrace` object with:
  * `code` — string.
  * `operations` — array of the `ParityVmOperationTrace` objects.
* `action` — the trace object with:
  * `traceaddress` — array.
  * `calltype` — string.
  * `includeintrace` — boolean.
  * `isprecomplied` — boolean.
  * `type` — string.
  * `creation method` — string.
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

trace = web3.make_request('trace_call', [{
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "data": "0x000000000000000000000000000000000000000000000000003ae5d476b8d489"
    },["trace"], "latest"])
print(trace)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H 'Content-Type: application/json' \
  --data '{"method":"trace_call","params":[{"from":null,"to":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","data":"0x000000000000000000000000000000000000000000000000003ae5d476b8d489"},["trace"], "latest"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>
