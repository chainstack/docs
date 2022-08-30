---
meta:
  - name: description
    content: Learn the difference between an Arbitrum full node and an archive node. Run sample commands to see the difference.
  - name: keywords
    content: arbitrum geth node full archive difference nitro
---

# Modes

Chainstack supports deploying an Arbitrum node on the Arbitrum One mainnet in the following modes:

* Full node — a node that stores full blockchain data.
* Archive node — a node that stores full blockchain data and an archive of historical states.

To be a part of the Arbitrum One mainnet, you can deploy either a full node or an archive node.

With a full node, you can query the historical state of the Arbitrum One mainnet at only the latest 128 blocks.

To be able to query the historical state of the Arbitrum One mainnet at any block, you need an archive node.

See [Geth JSON-RPC methods](https://eth.wiki/json-rpc/API#the-default-block-parameter) that support querying at a block number.

::: tip See also

* [Networks](/operations/arbitrum/networks)
* [Tools](/operations/arbitrum/tools)
* [Tutorials](/tutorials/arbitrum/)
* [Node API reference](/api/node-api-reference)

:::
