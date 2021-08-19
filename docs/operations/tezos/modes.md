---
meta:
  - name: description
    content: Learn the difference between a Tezos full node and an archive node.
  - name: keywords
    content: tezos history node full archive difference
---

# Modes

Chainstack supports deploying a Tezos node on the mainnet in the following modes:

* Full node — a node that stores minimal data required to reconstruct the complete chain state since the genesis.
* Archive node — a node that stores the complete chain data and state since the genesis.

To be a part of the Tezos mainnet, you can deploy either a full node or an archive node.

With a full node, you can query any block information or operation but you cannot query the balances or staking rights before the current checkpoint. A checkpoint is automatically done every 4096 blocks. This means that with a full node you can only query the balances and staking rights from when the last checkpoint happened until the latest block within the current 4096 block cycle.

With an archive node, you can query any information stored on the chain since the genesis.

::: tip See also

* [Tezos documentation: History modes](https://tezos.gitlab.io/user/history_modes.html)
* [Networks](/operations/tezos/networks)
* [Tools](/operations/tezos/tools)
* [Tutorials](/tutorials/tezos/)

:::
