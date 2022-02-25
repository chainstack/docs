---
meta:
  - name: description
    content: Learn the difference between a Harmony full node and an archive node.
  - name: keywords
    content: harmony geth one node full archive difference prune
---

# Modes

Chainstack supports deploying a Harmony node on the mainnet in the following modes:

* Full node — a node that stores full blockchain data.
* Archive node — a node that stores full blockchain data and an archive of historical states.

To be a part of the Harmony mainnet, you can deploy either a full node or an archive node.

With a full node, you can query the historical state of the Harmony mainnet at only the latest 128 blocks.

To be able to query the historical state of the Harmony mainnet at any block, you need an archive node.

See [Geth JSON-RPC methods](https://eth.wiki/json-rpc/API#the-default-block-parameter) that support querying at a block number.

Query example to get the balance of an address at different block numbers through an archive node:

``` js
> eth.getBalance("0x2d4c407bbe49438ed859fe965b140dcf1aab71a9","latest")
6248866000000000000
> eth.getBalance("0x2d4c407bbe49438ed859fe965b140dcf1aab71a9","23360658")
0
```

::: tip See also

* [Networks](/operations/harmony/networks)
* [Tools](/operations/harmony/tools)
* [Tutorials](/tutorials/harmony/)

:::
