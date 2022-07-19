---
meta:
  - name: description
    content: Learn the difference between a Geth node and an Erigon node.
  - name: keywords
    content: bnb bsc turbo node geth erigon difference
---

# Clients

Chainstack supports deploying BNB Smart Chain nodes in the following client implementations:

* Geth — elastic and dedicated BNB Smart Chain full nodes are deployed as the [Go Ethereum](https://github.com/bnb-chain/bsc) implementation.
* Erigon — elastic and dedicated BNB Smart Chain archive nodes are deployed as the [Erigon](https://github.com/ledgerwatch/erigon) implementation.

The key differences are in size and the RPC methods available:

* Geth — bigger in size; [Geth JSON-RPC methods](https://eth.wiki/json-rpc/API).
* Erigon — smaller in size; [Erigon RPC methods](https://github.com/ledgerwatch/erigon/blob/devel/cmd/rpcdaemon/README.md#rpc-implementation-status).

::: tip See also

* [Networks](/operations/bsc/networks)
* [Tools](/operations/bsc/tools)
* [Node API reference](/api/node-api-reference)

:::
