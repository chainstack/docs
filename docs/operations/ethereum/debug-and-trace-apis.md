---
meta:
  - name: description
    content: Learn what the debug and trace APIs are and how to trace transactions on Ethereum.
  - name: keywords
    content: ethereum debug trace namespace transaction api geth erigon
---

# Debug and trace APIs

## Elastic nodes

You can deploy an [elastic](/glossary/elastic-node) Ethereum archive node starting from the <a href="https://chainstack.com/pricing/" target="_blank">Business plan</a> as the Erigon [client implementation](/operations/ethereum/clients).

An elastic Ethereum archive node deployed as Erigon exposes the `debug_*` and `trace_*` API methods.

For the full list of the available debug and trace API methods, see [Erigon: RPC implementation status](https://github.com/ledgerwatch/erigon/blob/stable/cmd/rpcdaemon/README.md#rpc-implementation-status).

## Dedicated nodes

You can deploy [dedicated](/glossary/dedicated-node) Ethereum archive nodes starting from the <a href="https://chainstack.com/pricing/" target="_blank">Growth plan</a> as the Geth or Erigon [client implementation](/operations/ethereum/clients).

A dedicated Ethereum archive node deployed as Geth exposes the `debug_*` API methods.

A dedicated Ethereum archive node deployed as Erigon exposes the `debug_*` and `trace_*` API methods.

For the full list of the available debug and trace API methods, see:

* [Geth: debug namespace](https://geth.ethereum.org/docs/rpc/ns-debug)
* [Erigon: RPC implementation status](https://github.com/ledgerwatch/erigon/blob/stable/cmd/rpcdaemon/README.md#rpc-implementation-status)

## Usage example

You can debug and trace transactions by replaying them in the Ethereum Virtual Machine to get the execution details in the exact same way as they happened on the chain.

### debug_traceTransaction

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

### trace_transaction

Trace a transaction with [trace_transaction](https://openethereum.github.io/JSONRPC-trace-module#trace_transaction):

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "trace_transaction", "params": ["TRANSACTION_HASH"]}' ENDPOINT
```

where

* TRANSACTION_HASH — the hash of the transaction your are tracing.
* ENDPOINT — your node HTTPS endpoint.

See [View node access and credentials](/platform/view-node-access-and-credentials).

For example, trace a [reverted MEV bot transaction](https://etherscan.io/tx/0x4fb839363cb2d823b889386314ae3940378f3b4566112709259f9cc986e4493d):

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "trace_transaction", "params": ["0x4fb839363cb2d823b889386314ae3940378f3b4566112709259f9cc986e4493d"]}' https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

See the [revert opcode](https://eips.ethereum.org/EIPS/eip-140) in the output:

``` js
...
 {
    "action": {
      "from": "0x4cb18386e5d1f34dc6eea834bf3534a970a3f8e7",
      "callType": "delegatecall",
      "gas": "0xd153c",
      "input": "0xfcaf671c00000000000000000000000000000000000000000000033d96a473f23aa29f4d000000000000000000000000000000000000000ddc06976a3420c92748c60000000000000000000000000000000000000000000007ba39328ab11bff8f8525c10000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000062abe5200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007bb7d1de6ab30738d221a62",
      "to": "0xd4b6cb2331045c9f37c6768111773e3442731bab",
      "value": "0xae07"
    },
    "blockHash": "0x03a83bf066e81498804f26caf5d49e47820f6a0e92fd1c9cb7dc3b87bf46cf0f",
    "blockNumber": 14976695,
    "error": "Reverted",
    "result": null,
    "subtraces": 1,
    "traceAddress": [
      0
    ],
    "transactionHash": "0x4fb839363cb2d823b889386314ae3940378f3b4566112709259f9cc986e4493d",
    "transactionPosition": 43,
    "type": "call"
  }
```

::: tip See also

* [EVM opcodes](https://ethereum.org/en/developers/docs/evm/opcodes)
* [Geth: debug namespace](https://geth.ethereum.org/docs/rpc/ns-debug)
* [Erigon: RPC implementation status](https://github.com/ledgerwatch/erigon/blob/stable/cmd/rpcdaemon/README.md#rpc-implementation-status)

:::
