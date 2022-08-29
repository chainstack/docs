---
meta:
  - name: description
    content: Learn what the debug and trace APIs are and how to trace transactions on Fuse.
  - name: keywords
    content: fuse debug trace namespace transaction api nethermind
---

# Debug and trace APIs

A dedicated Fuse full or archive node has the `debug_*` and `trace_*` API methods enabled. For the full list of the available debug and trace API methods, see [Nethermind documentation](https://docs.nethermind.io/nethermind/ethereum-client/json-rpc).

## Usage examples

You can debug and trace transactions by replaying them in the Ethereum Virtual Machine to get the execution details in the exact same way as they happened on the chain.

Note that to debug and trace transactions, you need to have historical states on the node. Fuse full nodes keep historical states for about 10 hours worth of immediately previous blocks. Fuse archive nodes keep historical states for the entire chain. See also [Fuse modes](/operations/fuse/modes).

### debug_traceBlockByNumber

Trace all transactions included in a block with [debug_traceBlockByNumber](https://docs.nethermind.io/nethermind/ethereum-client/json-rpc/debug#debug_traceblockbynumber):

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "debug_traceBlockByNumber", "params": ["BLOCK_NUMBER"]}' ENDPOINT
```

where

* BLOCK_NUMBER — the number of the block to get the traces of included transactions.
* ENDPOINT — your node HTTPS endpoint.

See [View node access and credentials](/platform/view-node-access-and-credentials).

For example, trace all smart contract interactions in block 18651813:

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "debug_traceBlockByNumber", "params": ["18651813", {"tracer": "callTracer"}]}' https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

### trace_block

Trace all transactions included in a block with [trace_block](https://docs.nethermind.io/nethermind/ethereum-client/json-rpc/trace#trace_block):

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "trace_block", "params": ["BLOCK_NUMBER"]}' ENDPOINT
```

where

* BLOCK_NUMBER — the number of the block to get the traces of included transactions.
* ENDPOINT — your node HTTPS endpoint.

See [View node access and credentials](/platform/view-node-access-and-credentials).

For example, trace all transactions in block 18651813:

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "trace_block", "params": ["18651813"]}' https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

::: tip See also

* [EVM opcodes](https://ethereum.org/en/developers/docs/evm/opcodes)
* [Nethermind JSON-RPC](https://docs.nethermind.io/nethermind/ethereum-client/json-rpc)
* [Modes](/operations/fuse/modes)

:::
