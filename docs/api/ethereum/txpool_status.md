---
meta:
  - name: description
    content: txpool_status JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum debug trace
---

# Ethereum txpool_status RPC method

Ethereum API method that returns the number of transactions in pending and queued state.

::: tip Information

Learn [how to deploy](/api/ethereum/deploy-your-ethereum-node-to-enable-debug-and-trace-api-methods) a node with the debug and trace API methods enabled.

:::

**Parameters:**

* `none`

**Returns:**

* `object` — the object having the following fields:
  * `pending` — the number of pending transactions in the txpool, encoded as hexadecimal.
  * `queued` — the number of queued transactions in the txpool, encoded as hexadecimal.

**Example:**

<CodeSwitcher :languages="{py:'web3.py', cr:'cURL'}">

<template v-slot:py>

``` py
from web3 import Web3
node_url = "CHAINSTACK_NODE_URL"
web3 = Web3(Web3.HTTPProvider(node_url))

pool = web3.geth.txpool.status()
print(pool)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H 'Content-Type: application/json' \
  --data '{"method":"txpool_status","params":[],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>
