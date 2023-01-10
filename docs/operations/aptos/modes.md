---
meta:
  - name: description
    content: Learn the difference between a Aptos full node and an archive node. Run sample commands to see the difference.
  - name: keywords
    content: aptos node full archive difference nethermind
---

# Modes

Chainstack supports deploying an Aptos node on the mainnet in the following modes:

* Full node — a node that stores full blockchain data.
* Archive node — a node that stores full blockchain data and an archive of historical states.

To be a part of the Aptos mainnet, you can deploy either a full node or an archive node.

The full node of the Aptos mainnet stores the states of the last 100,000,000 transactions.

To be able to query the historical state of the Aptos mainnet at any block, you need an archive node.

See [Aptos RESTful API methods](https://fullnode.devnet.aptoslabs.com/v1/spec#/) that support querying at a block height.

::: tip See also

* [Tools](/operations/aptos/tools)
* [Tutorials](/tutorials/aptos/)

:::
