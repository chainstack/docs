---
meta:
  - name: description
    content: Learn the difference between a Binance Smart Chain Geth node and an Erigon node.
  - name: keywords
    content: bsc binance node geth erigon difference
---

# Clients

Chainstack supports deploying a dedicated Binance Smart Chain archive node on the mainnet in the following client implementations:

* Geth — the [Go Ethereum](https://github.com/bnb-chain/bsc) implementation.
* Erigon — the [Erigon](https://github.com/bnb-chain/bsc-erigon) implementation.

To be a part of the Binance Smart Chain mainnet, you can deploy either a Geth node or an Erigon node.

The key differences are in size and the RPC methods available:

* Geth — bigger in size; [Geth JSON-RPC methods](https://eth.wiki/json-rpc/API).
* Erigon — smaller in size; [Erigon RPC methods](https://github.com/bnb-chain/bsc-erigon/blob/main/cmd/rpcdaemon/README.md#rpc-implementation-status).

::: tip See also

* [Networks](/operations/bsc/networks)
* [Tools](/operations/bsc/tools)
* [Tutorials](/tutorials/bsc/)

:::
