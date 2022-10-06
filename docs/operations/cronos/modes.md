---
meta:
  - name: description
    content: Learn the difference between a Cronos full node and an archive node. Run sample commands to see the difference.
  - name: keywords
    content: cronos node full archive difference nethermind
---

# Modes

Chainstack supports deploying a Cronos node on the mainnet in the following modes:

* Full node — a node that stores full blockchain data.
* Archive node — a node that stores full blockchain data and an archive of historical states.

To be a part of the Cronos mainnet, you can deploy either a full node or an archive node.

The full node of the Cronos mainnet stores the states of the last 100 blocks.

To be able to query the historical state of the Cronos mainnet at any block, you need an archive node.

See [Cronos JSON-RPC methods](https://docs.cronos.org/for-dapp-developers/chain-integration/json-rpc) that support querying at a block number.

::: tip See also

* [Tools](/operations/cronos/tools)
* [Tutorials](/tutorials/cronos/)

:::
