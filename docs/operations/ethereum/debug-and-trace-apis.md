---
meta:
  - name: description
    content: Learn what the debug and trace APIs are and how to trace transactions on Ethereum.
  - name: keywords
    content: ethereum debug trace namespace transaction api geth erigon
---

# Debug and trace APIs

## Elastic nodes

You can deploy an [elastic](/glossary/elastic-node) Ethereum archive node with the enabled debug and trace APIs starting from the <a href="https://chainstack.com/pricing/" target="_blank">Business plan</a> as the Erigon [client implementation](/operations/ethereum/clients).

An elastic Ethereum archive node deployed as Erigon with the enabled debug and trace APIs exposes the `debug_*` and `trace_*` methods.

For the full list of the available debug and trace API methods, see [Erigon: RPC implementation status](https://github.com/ledgerwatch/erigon/blob/stable/cmd/rpcdaemon/README.md#rpc-implementation-status).

## Dedicated nodes

You can deploy [dedicated](/glossary/dedicated-node) Ethereum archive nodes starting from the <a href="https://chainstack.com/pricing/" target="_blank">Growth plan</a> as the Geth or Erigon [client implementation](/operations/ethereum/clients).

A dedicated Ethereum archive node deployed as Geth exposes the `debug_*` API methods.

A dedicated Ethereum archive node deployed as Erigon exposes the `debug_*` and `trace_*` API methods.

For the full list of the available debug and trace API methods, see:

* [Geth: debug namespace](https://geth.ethereum.org/docs/rpc/ns-debug)
* [Erigon: RPC implementation status](https://github.com/ledgerwatch/erigon/blob/stable/cmd/rpcdaemon/README.md#rpc-implementation-status)

## Usage examples

You can debug and trace transactions by replaying them in the Ethereum Virtual Machine to get the execution details in the exact same way as they happened on the chain.

### debug_traceBlockByNumber

Trace all transactions included in a block with [debug_traceBlockByNumber](https://geth.ethereum.org/docs/rpc/ns-debug#debug_traceblockbynumber):

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "debug_traceBlockByNumber", "params": ["BLOCK_NUMBER"]}' ENDPOINT
```

where

* BLOCK_NUMBER — the number of the block to get the traces of included transactions.
* ENDPOINT — your node HTTPS endpoint.

See [View node access and credentials](/platform/view-node-access-and-credentials).

For example, trace all smart contract interactions in [block 14976695](https://etherscan.io/txsInternal?block=14976695):

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "debug_traceBlockByNumber", "params": ["14976695", {"tracer": "callTracer"}]}' https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

See a reverted transaction in the output:

``` js
"calls": [
        {
          "type": "DELEGATECALL",
          "from": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
          "to": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
          "gas": "0x38ed0",
          "gasUsed": "0x31147",
          "input": "0x472b43f30000000000000000000000000000000000000000000000000429d069189e00000000000000000000000000000000000000000000000000160d962fcdfd0bb02400000000000000000000000000000000000000000000000000000000000000800000000000000000000000000b5ec97d9a8a9941a28a88084a1f670c62bd8bf40000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000b00b2e950d7ef8bdc49377c49676d1550deab982",
          "error": "execution reverted"
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

For example, trace all smart contract interactions in [block 14976695](https://etherscan.io/txsInternal?block=14976695):

``` sh
curl -H "Content-Type: application/json" -d '{"id": 1, "method": "trace_transaction", "params": ["0x4fb839363cb2d823b889386314ae3940378f3b4566112709259f9cc986e4493d"]}' https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

See a reverted transaction in the output:

``` js
 "action": {
        "from": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
        "callType": "delegatecall",
        "gas": "0x38ed0",
        "input": "0x472b43f30000000000000000000000000000000000000000000000000429d069189e00000000000000000000000000000000000000000000000000160d962fcdfd0bb02400000000000000000000000000000000000000000000000000000000000000800000000000000000000000000b5ec97d9a8a9941a28a88084a1f670c62bd8bf40000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000b00b2e950d7ef8bdc49377c49676d1550deab982",
        "to": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
        "value": "0x429d069189e0000"
      },
      "blockHash": "0x03a83bf066e81498804f26caf5d49e47820f6a0e92fd1c9cb7dc3b87bf46cf0f",
      "blockNumber": 14976695,
      "error": "Reverted"
```

::: tip See also

* [EVM opcodes](https://ethereum.org/en/developers/docs/evm/opcodes)
* [Geth: debug namespace](https://geth.ethereum.org/docs/rpc/ns-debug)
* [Erigon: RPC implementation status](https://github.com/ledgerwatch/erigon/blob/stable/cmd/rpcdaemon/README.md#rpc-implementation-status)

:::
