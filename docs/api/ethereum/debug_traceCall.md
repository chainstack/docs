---
meta:
  - name: description
    content: debug_traceCall JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum debug trace
---

# Ethereum debug_traceCall RPC method

Ethereum API method that lets you run `eth_call` on top of a block.

::: tip Information

Learn [how to deploy](/api/ethereum/deploy-your-ethereum-node-to-enable-debug-and-trace-api-methods) a node with the debug and trace API methods enabled.

:::

**Parameters:**

* `object` — the transaction call object with:
  * `from` — (optional) the string of the address the transaction is sent from.
  * `to` — the string of the address to which the transaction is directed.
  * `gas` — (optional) the integer of the gas provided for the transaction execution.
  * `gasprice` — (optional) the integer of the gasPrice used for each paid gas, encoded as hexadecimal.
  * `value` — (optional) the integer of the value sent with this transaction, encoded as hexadecimal.
  * `data` — (optional) the string of the hash of the method signature and encoded parameters; see the [Ethereum Contract ABI](https://solidity.readthedocs.io/en/latest/abi-spec.html).
  * `quantity or tag` — the integer block number, or the string with:
    * `latest` — the latest block that is to be validated. The Beacon Chain may reorg and the latest block can become orphaned.
    * `earliest` — the genesis block.
    * `pending` — the pending state and transactions block.

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

debug = web3.make_request('debug_traceCall', [{
    "to": "0x690B9A9E9aa1C9dB991C7721a92d351Db4FaC990"
    }, "latest"])
print(debug)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H 'Content-Type: application/json' \
  --data '{"method":"debug_traceCall","params":[{"from":null,"to":"0x6b175474e89094c44da98b954eedeac495271d0f"}, "latest"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>
