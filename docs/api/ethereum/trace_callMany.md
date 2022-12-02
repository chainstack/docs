---
meta:
  - name: description
    content: trace_callMany  JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum debug trace
---

# Ethereum trace_callMany RPC method

Ethereum API method that performs multiple call traces on top of the same block. i.e., transaction n will be executed on top of a pending block with all n-1 transactions applied (traced) first. Allows tracing dependent transactions.

::: tip Information

This method is available on Erigon when the `trace` namespace is enabled.

Learn [how to deploy](/api/ethereum/deploy-your-ethereum-node-to-enable-debug-and-trace-api-methods) a node with the debug and trace API methods enabled.

:::

**Parameters:**

* `array` — the type of trace, one or more of:
  * `vmTrace` — to get a full trace of virtual machine's state during the execution of the given transaction including any subcalls.
  * `trace` — to get the basic trace of the given transaction.
  * `statediff` — to get information on altered Ethereum state due to execution of the given transaction.
* `quantity or tag` — integer block number, or the string with:
  * `latest` — the latest block that is to be validated. The Beacon Chain may reorg and the latest block can become orphaned.
  * `earliest` — the genesis block.
  * `pending` — the pending state and transactions block.

**Returns:**

* `array` — the block traces that have the following object shape (all return types are hexadecimal representations of their data type unless otherwise stated):
* `Output` — string.
* `TransactionHash` — the string of the transaction hash.
* `vmtrace` — the `ParityVmTrace` object with:
  * `code` — string.
  * `operations` — the array of `ParityVmOperationTrace` objects.
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

trace = web3.make_request('trace_callMany', [
    [[{
        "from": "0x8c1b73b6061768b26d42c2d484a2ac0bf1e4b908",
        "to": "0xcbfe1217e093019bd7eeec1fd7b6165b8cd848da",
        "value": "0x58D15E17628000"
    },["trace"]],
    [{
        "from": "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
        "to": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "value": "0x186a0"
    },["trace"]]],"latest"])
print(trace)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H 'Content-Type: application/json' \
  --data '{"method":"trace_callMany","params":[[[{"from":"0x8c1b73b6061768b26d42c2d484a2ac0bf1e4b908","to":"0xcbfe1217e093019bd7eeec1fd7b6165b8cd848da","value":"0x58D15E17628000"},["trace"]],[{"from":"0x407d73d8a49eeb85d32cf465507dd71d507100c1","to":"0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b","value":"0x186a0"},["trace"]]],"latest"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>
