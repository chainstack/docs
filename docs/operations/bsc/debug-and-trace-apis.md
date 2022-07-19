---
meta:
  - name: description
    content: Learn what the debug and trace APIs are and how to trace transactions on BNB Smart Chain.
  - name: keywords
    content: bsc bnb debug trace namespace transaction api geth erigon
---

# Debug and trace APIs

A dedicated BNB Smart Chain full node is deployed as the Geth [client implementation](/operations/ethereum/clients) and has the `debug_*` API methods enabled.

A dedicated BNB Smart Chain archive node is deployed as the Erigon [client implementation](/operations/ethereum/clients) and has the  `debug_*` and `trace_*` API methods enabled.

You can deploy [dedicated](/glossary/dedicated-node) BNB Smart Chain nodes starting from the <a href="https://chainstack.com/pricing/" target="_blank">Business plan</a>.

## Usage examples

You can debug and trace transactions on BNB Smart Chain by replaying them in the Ethereum Virtual Machine to get the execution details in the exact same way as they happened on the chain.

Note that to debug and trace transactions, you need to have historical states on the node. BNB Smart Chain full nodes keep historical states for the immediately previous 128 blocks. BNB Smart Chain archive nodes keep historical states for the entire chain.

### debug_traceBlockByNumber

Trace all transactions included in a block with [debug_traceBlockByNumber](https://geth.ethereum.org/docs/rpc/ns-debug#debug_traceblockbynumber):

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "debug_traceBlockByNumber", "params": ["BLOCK_NUMBER"]}' ENDPOINT
```

where

* BLOCK_NUMBER — the number of the block to get the traces of included transactions. For Geth, you need to provide the block number in hex.
* ENDPOINT — your node HTTPS endpoint.

See [View node access and credentials](/platform/view-node-access-and-credentials).

For example, trace all smart contract interactions in block 19649707:

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "debug_traceBlockByNumber", "params": ["19649707", {"tracer": "callTracer"}]}' https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
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

For example, trace all smart contract interactions in block 19649707:

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "trace_transaction", "params": ["0xb6e4eaeb09731a948a305c2dafdbb41093fb8f9a3625bfa5bd4ca66f654ba695"]}' https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

::: tip See also

* [EVM opcodes](https://ethereum.org/en/developers/docs/evm/opcodes)
* [Geth: debug namespace](https://geth.ethereum.org/docs/rpc/ns-debug)
* [Modes](/operations/bsc/modes)
* <a href="https://support.chainstack.com/hc/en-us/articles/900003400806-Tracing-EVM-transactions" target="_blank">Tracing EVM transactions</a>
* <a href="https://chainstack.com/evm-nodes-a-dive-into-the-full-vs-archive-mode/" target="_blank">EVM nodes: A dive into the full vs. archive mode </a>

:::
