---
meta:
  - name: description
    content: Polygon PoS is a Layer 2 commit chain to Ethereum networks.
  - name: keywords
    content: polygon matic blockchain commit chain pos
---

# Polygon PoS

Polygon PoS is a [Layer 2](https://ethereum.org/en/developers/docs/layer-2-scaling/) commit chain to Ethereum networks.

Architecturally, Polygon PoS consists of the three following layers:

* Ethereum layer — a set of contracts on an Ethereum network.
* Heimdall layer — a set of proof-of-stake Heimdall nodes running in parallel to an Ethereum network and monitoring the set of contracts on the Ethereum network. Heimdall is a fork of Tendermint.
* Bor layer — a set of block-producing Bor nodes shuffled by Heimdall nodes. Bor is a fork of Go Ethereum.

Staking is done on the set of smart contracts on an Ethereum network. Heimdall nodes monitor the set of smart contracts for the staked tokens on the Ethereum network and select Bor nodes to produce blocks on the Polygon PoS network. Bor nodes produce blocks in rounds, called spans, based on the selection by Heimdall nodes, which in turn is done based on the staked token amounts on the Ethereum network.

## Consensus

A three-layer proof-of-stake consensus algorithm.

::: tip See also

* [Matic architecture](https://docs.matic.network/docs/home/architecture/matic-architecture)

:::
