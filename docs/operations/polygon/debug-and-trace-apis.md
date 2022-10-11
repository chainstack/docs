---
meta:
  - name: description
    content: Learn what the debug and trace APIs are and how to trace transactions on Polygon.
  - name: keywords
    content: polygon debug trace namespace transaction api geth bor
---

# Debug and trace APIs

You can deploy an [elastic](/glossary/elastic-node) Polygon archive node with the enabled debug and trace APIs starting from the <a href="https://chainstack.com/pricing/" target="_blank">Business plan</a> as the Erigon [client implementation](/operations/ethereum/clients).

An elastic Polygon archive node deployed as Erigon with the enabled debug and trace APIs exposes the `debug_*` and `trace_*` methods.

For the full list of the available debug and trace API methods, see [Erigon: RPC implementation status](https://github.com/ledgerwatch/erigon/blob/stable/cmd/rpcdaemon/README.md#rpc-implementation-status).


You can deploy [dedicated](/glossary/dedicated-node) Polygon nodes starting from the <a href="https://chainstack.com/pricing/" target="_blank">Business plan</a>.

## Usage examples

You can debug and trace transactions by replaying them in the Ethereum Virtual Machine to get the execution details in the exact same way as they happened on the chain.

Note that to debug and trace transactions, you need to have historical states on the node. Polygon full nodes keep historical states for the immediately previous 128 blocks. Polygon archive nodes keep historical states for the entire chain.

### debug_traceBlockByNumber

Trace all transactions included in a block with [debug_traceBlockByNumber](https://geth.ethereum.org/docs/rpc/ns-debug#debug_traceblockbynumber):

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "debug_traceBlockByNumber", "params": ["BLOCK_NUMBER", {"tracer": "callTracer"}]}' ENDPOINT
```

where

* BLOCK_NUMBER — the number of the block to get the traces of included transactions.
* ENDPOINT — your node HTTPS endpoint.

See [View node access and credentials](/platform/view-node-access-and-credentials).

For example, trace all smart contract interactions in block 34203213:

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "debug_traceBlockByNumber", "params": ["34203213", {"tracer": "callTracer"}]}' https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```
See a reverted transaction in the output:

``` js
"calls": [{
    "type": "DELEGATECALL",
    "from": "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    "to": "0x490e379c9cff64944be82b849f8fd5972c7999a7",
    "gas": "0x338a",
    "gasUsed": "0x338a",
    "input": "0xa9059cbb000000000000000000000000103e408505ddb4fcd04af781e9202749bdf5be63000000000000000000000000000000000000000000000002fb474098f67c0000",
    "output": "0x"
}]
, {
    "type": "CALL",
    "from": "0x103872786cf534c9da5e39e432b4018fab8011aa",
    "to": "0xc8f87f00206469c15dd9b4f1608c0845ccac9d6a",
    "value": "0x0",
    "gas": "0x2d6d7c",
    "gasUsed": "0x107be",
    "input": "0x9ddecbf6021401002710271004537f43f6add7b1b60cab199c7a910024ee05947ceb23fd6bc0add59e62ac25578270cff1b9f619150001271027100387dbd5e8504938edf4b38eacbf77a1d0394a1b2791bca1f2de4661ed88a30c99a7a9449aa8417406034724b2e0d70770bf3e2a4c694063452fe5",
    "output": "0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000023a28000000000000000000000000000000000000000000000000000000000000",
    "error": "execution reverted"
    }
```

### trace_block

Trace all transactions included in a block with [trace_block](https://openethereum.github.io/JSONRPC-trace-module#trace_block):

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "trace_block", "params": ["BLOCK_NUMBER"]}' ENDPOINT
```

where

* BLOCK_NUMBER — the number of the block to get the traces of included transactions.
* ENDPOINT — your node HTTPS endpoint.

See [View node access and credentials](/platform/view-node-access-and-credentials).

For example, trace all smart contract interactions in block 33957809:

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "trace_block", "params": ["33957809"]}' https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

See a reverted transaction in the output:

``` js
"action": {
    "from": "0x032f37307eb1ab1f43be3408f92103c4bcfeaef7",
    "callType": "call",
    "gas": "0x2b35c",
    "input": "0x38ed1739000000000000000000000000000000000000000000000000b7a9c779f83a580000000000000000000000000000000000000000000000000000000000012bfc4e00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000032f37307eb1ab1f43be3408f92103c4bcfeaef700000000000000000000000000000000000000000000000000000000633d81b000000000000000000000000000000000000000000000000000000000000000020000000000000000000000009e25126ebcd57c8eb6eb6c2ffc67810d365cfc3e000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f",
    "to": "0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff",
    "value": "0x0"
  },
  "blockHash": "0x2752a9a60df086ef5bde3b07a677f4d583f337c15d8839c7596182fee036db6f",
  "blockNumber": 33957809,
  "error": "Reverted"
```

::: tip See also

* [EVM opcodes](https://ethereum.org/en/developers/docs/evm/opcodes)
* [Geth: debug namespace](https://geth.ethereum.org/docs/rpc/ns-debug)
* [Modes](/operations/polygon/modes)
* <a href="https://support.chainstack.com/hc/en-us/articles/900003400806-Tracing-EVM-transactions" target="_blank">Tracing EVM transactions</a>
* <a href="https://chainstack.com/evm-nodes-a-dive-into-the-full-vs-archive-mode/" target="_blank">EVM nodes: A dive into the full vs. archive mode </a>

:::
