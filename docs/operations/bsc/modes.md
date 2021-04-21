---
meta:
  - name: description
    content: Learn the difference between a Binance Smart Chain full node and an archive node. Run sample commands to see the difference.
  - name: keywords
    content: bsc binance node full archive difference
---

# Modes

Chainstack supports deploying a Binance Smart Chain node on the mainnet in the following modes:

* Full node — a node that stores full blockchain data.
* Archive node — a node that stores full blockchain data and an archive of historical states.

To be a part of the Binance Smart Chain mainnet, you can deploy either a full node or an archive node.

With a full node, you can query the historical state of the Binance Smart Chain mainnet at only the latest 128 blocks.

To be able to query the historical state of the Binance Smart Chain mainnet at any block, you need an archive node.

See [Geth JSON-RPC methods](https://github.com/ethereum/wiki/wiki/JSON-RPC#the-default-block-parameter) that support querying at a block number.

Query example to get the balance of an address at different block numbers through an archive node:

``` js
> eth.getBalance("0x2d4c407bbe49438ed859fe965b140dcf1aab71a9","latest")
6248866000000000000
> eth.getBalance("0x2d4c407bbe49438ed859fe965b140dcf1aab71a9","6179273")
0
```

::: tip See also

* [Networks](/operations/bsc/networks)
* [Tools](/operations/bsc/tools)
* [Tutorials](/tutorials/bsc/)

:::
