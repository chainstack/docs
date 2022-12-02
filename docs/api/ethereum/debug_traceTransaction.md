---
meta:
  - name: description
    content: debug_traceTransaction JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum debug trace
---

# Ethereum debug_traceTransaction RPC method

Ethereum API method that returns all traces of the given transaction.

::: tip Information

Learn [how to deploy](/api/ethereum/deploy-your-ethereum-node-to-enable-debug-and-trace-api-methods) a node with the debug and trace API methods enabled.

:::

**Parameters:**

* `hash` — the hash of a transaction.

**Returns:**

* `array` — the block traces, which have the following object shape (all return types are hexadecimal representations of their data type unless otherwise stated):
* `results` — the trace object with:
  * `failed` — the boolean transaction result: `true` if it failed, `false` if it was successful.
  * `gas` — the quantity of the gas provided for the call, encoded as hexadecimal.
  * `returnvalue` — data.
  * `structlogs` — array with:
    * `entries` — array.
    * `storagesbydepth` — array.

**Example:**

<CodeSwitcher :languages="{py:'web3.py', cr:'cURL'}">

<template v-slot:py>

``` py
from web3 import Web3
node_url = "CHAINSTACK_NODE_URL"
web3 = Web3.HTTPProvider(node_url)

debug = web3.make_request('debug_traceTransaction', ['0x2b2156ca419a971b22385d27046c343a68fd289f3461f17afc0a4df21c2647f0'])
print(debug)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H 'Content-Type: application/json' \
  --data '{"method":"debug_traceTransaction","params":["0x2b2156ca419a971b22385d27046c343a68fd289f3461f17afc0a4df21c2647f0"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>
