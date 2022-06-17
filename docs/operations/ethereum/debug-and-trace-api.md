---
meta:
  - name: description
    content: Learn what the debug and tracing API is and how to trace transactions on Ethereum.
  - name: keywords
    content: ethereum debug trace namespace transaction api
---

# Debug and trace API

You can debug and trace transactions by replaying them in the Ethereum Virtual Machine to get the execution details at the opcode level in the exact same way as they happened on the chain.

The Ethereum mainnet archive nodes deployed with Chainstack expose the `debug_*` and `trace_*` methods for your debugging and tracing needs.

For the full list of the available debug and trace methods, see [Erigon: RPC implementation status](https://github.com/ledgerwatch/erigon/blob/stable/cmd/rpcdaemon/README.md#rpc-implementation-status).

## Example

Trace a transaction with [debug_traceTransaction](https://geth.ethereum.org/docs/rpc/ns-debug#debug_tracetransaction):

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "debug_traceTransaction", "params": ["TRANSACTION_HASH"]}' ENDPOINT
```

where

* TRANSACTION_HASH — the hash of the transaction your are tracing.
* ENDPOINT — your node HTTPS endpoint.

See [View node access and credentials](/platform/view-node-access-and-credentials).

For example, trace a [reverted MEV bot transaction](https://etherscan.io/tx/0x4fb839363cb2d823b889386314ae3940378f3b4566112709259f9cc986e4493d):

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "debug_traceTransaction", "params": ["0x4fb839363cb2d823b889386314ae3940378f3b4566112709259f9cc986e4493d"]}' https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

See the [revert opcode](https://eips.ethereum.org/EIPS/eip-140) in the output:

``` js
...
{
         "pc":1048,
         "op":"REVERT",
         "gas":865305,
         "gasCost":0,
         "depth":1,
         "stack":[
            "0x1cff79cd",
            "0x253",
            "0xd4b6cb2331045c9f37c6768111773e3442731bab",
            "0x80",
            "0x0",
            "0x1",
            "0x0",
            "0x0"
         ]
      }
```

::: tip See also

* [EVM opcodes](https://ethereum.org/en/developers/docs/evm/opcodes)

:::
