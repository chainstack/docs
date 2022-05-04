---
meta:
  - name: description
    content: Learn the difference between a Geth node and an Erigon node.
  - name: keywords
    content: ethereum turbo node geth erigon difference
---

# Clients

Chainstack supports deploying a dedicated Ethereum archive node on the mainnet in the following client implementations:

* Geth — the [Go Ethereum](https://github.com/ethereum/go-ethereum) implementation.
* Erigon — the [Erigon](https://github.com/ledgerwatch/erigon) implementation.

To be a part of the Ethereum mainnet, you can deploy either a Geth node or an Erigon node.

The key differences are in size and the RPC methods available:

* Geth — bigger in size; [Geth JSON-RPC methods](https://eth.wiki/json-rpc/API).
* Erigon — smaller in size; [Erigon RPC methods](https://github.com/ledgerwatch/erigon/blob/devel/cmd/rpcdaemon/README.md#rpc-implementation-status).

::: tip See also

* [Networks](/operations/ethereum/networks)
* [Tools](/operations/ethereum/tools)
* [Tutorials](/tutorials/ethereum/)

:::
