---
meta:
  - name: description
    content: Deploy Nimbus for the consensus layer and Geth or Erigon for the execution layer on Ethereum.
  - name: keywords
    content: ethereum nimbus node geth erigon difference
---

# Clients

Chainstack supports deploying Ethereum nodes in the following client implementations:

## Consensus layer

* Nimbus — the [Nim implementation](https://github.com/status-im/nimbus-eth2) of the Ethereum Beacon Chain client.

## Execution layer

* Geth — the [Go Ethereum](https://github.com/ethereum/go-ethereum) implementation.
* Erigon — the [Erigon](https://github.com/ledgerwatch/erigon) implementation.

To be a part of the Ethereum mainnet, you can deploy either a Geth node or an Erigon node.

The key differences are in size and the RPC methods available:

* Geth — bigger in size; [Geth JSON-RPC methods](https://eth.wiki/json-rpc/API).
* Erigon — smaller in size; [Erigon RPC methods](https://github.com/ledgerwatch/erigon/blob/devel/cmd/rpcdaemon/README.md#rpc-implementation-status).

::: tip See also

* [Ethereum API reference](/api/ethereum/ethereum-api-reference)
* [Networks](/operations/ethereum/networks)
* [Tools](/operations/ethereum/tools)
* [Tutorials](/tutorials/ethereum/)

:::
