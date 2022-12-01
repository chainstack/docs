---
meta:
  - name: description
    content: debug_traceBlockByHash JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum debug trace
---

# Ethereum debug_traceBlockByHash RPC method

Ethereum API method that replays the block that is already present in the database.

**Parameters:**

* `hash` — the hash of the block to be traced.

**Returns:**

* `array` — the block traces that have the following object shape (all return types are hexadecimal representations of their data type unless otherwise stated):
* `results` — the trace object with:
  * `calls` — the array of transactions in the block with:
  * `from` — the address of the sender.
  * `gas` — the quantity of the gas provided for the call, encoded as hexadecimal.
  * `gas used` — the quantity of the gas used for the call, encoded as hexadecimal.
  * `input` — the call data.
  * `output` — the return data.
  * `to` — the address of the receiver. `null` if it is a contract creation transaction.
  * `type` — the type of the transaction, can be `CALL` or `CREATE`.
  * `value` — the amount of value for the transfer, encoded as hexadecimal.

**Example:**

<CodeSwitcher :languages="{py:'web3.py', cr:'cURL'}">

<template v-slot:py>

``` py
from web3 import Web3
node_url = "CHAINSTACK_NODE_URL"
web3 = Web3.HTTPProvider(node_url)

debug = web3.make_request('debug_traceBlockByHash', ['0x02409f8fcc7944a10903840ce1afb1df4559aba8c82ec6849f99b3a8cd3d7490', {'tracer': 'callTracer'}])
print(debug)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H 'Content-Type: application/json' \
  --data '{"method":"debug_traceBlockByHash","params":["0x02409f8fcc7944a10903840ce1afb1df4559aba8c82ec6849f99b3a8cd3d7490", {"tracer": "callTracer"}],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>
