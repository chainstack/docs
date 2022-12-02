---
meta:
  - name: description
    content: trace_filter  JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum debug trace
---

# Ethereum trace_filter RPC method

Ethereum API method that returns traces matching the given filter.

::: tip Information

This method is available on Erigon when the `trace` namespace is enabled.

Learn [how to deploy](/api/ethereum/deploy-your-ethereum-node-to-enable-debug-and-trace-api-methods) a node with the debug and trace API methods enabled.

:::

**Parameters:**

* `object` — the filter object with:
  * `fromBlock`: `Quantity` or `Tag` — (optional) from this block.
  * `toBlock`: `Quantity` or `Tag` — (optional) to this block.
  * `fromaddress`: `Array` — (optional) the addresses of the senders.
  * `toaddress`: `Address` — (optional) the address of the receivers.
  * `after`: `Quantity` — (optional) the offset trace number.
  * `count`: `Quantity` — (optional) the integer number of traces to display in a batch.

**Returns:**

* `array` — block traces that have the following object shape (all return types are hexadecimal representations of their data type unless otherwise stated):
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
* `blockhash` — the string of the block hash.
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

trace = web3.make_request('trace_filter', [{
    "fromBlock": "0xF42040",
    "toBlock": "0x6C6174657374",
    "fromAddress": ["0x864894af6b4a911f4d34c2e5aeaadfe2b012c15d"],
    "toaddress":["0xedbbf8fc4704b4ad2d1f4e13c77cccad59fbc368"]
}])
print(trace)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H 'Content-Type: application/json' \
  --data '{"method":"trace_filter","params":[{"fromBlock":"0xF42040","toBlock":"0x6C6174657374","fromAddress":["0x864894af6b4a911f4d34c2e5aeaadfe2b012c15d"]}],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>
