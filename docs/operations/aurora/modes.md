---
meta:
  - name: description
    content: Learn the difference between an Aurora full node and an archive node.
  - name: keywords
    content: aurora node full archive difference near
---

# Modes

Chainstack supports deploying an Aurora node on the NEAR mainnet in the following modes:

* Full node — a node that stores full blockchain data.
* Archive node — a node that stores full blockchain data and an archive of historical states.

To be a part of the NEAR mainnet, you can deploy either a full node or an archive node.

With a full node, you can query the historical state of the NEAR mainnet at only the latest [5 epochs](https://docs.near.org/concepts/basics/epoch).

To be able to query the historical state of the NEAR mainnet at any block, you need an archive node.

See [Aurora JSON-RPC methods](https://doc.aurora.dev/compat/rpc/) that support querying at a block number.

::: tip See also

* [Tools](/operations/aurora/tools)
* [Tutorials](/tutorials/aurora/)

:::
