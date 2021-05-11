---
meta:
  - name: description
    content: Learn the difference between a Polygon PoS full node and an archive node. Run sample commands to see the difference.
  - name: keywords
    content: polygon matic node full archive difference
---

# Modes

Chainstack supports deploying a Polygon PoS node on the mainnet in the following modes:

* Full node — a node that stores full blockchain data.
* Archive node — a node that stores full blockchain data and an archive of historical states.

To be a part of the Polygon PoS mainnet, you can deploy either a full node or an archive node.

With a full node, you can query the historical state of the Polygon PoS mainnet at only the latest 128 blocks.

To be able to query the historical state of the Polygon PoS mainnet at any block, you need an archive node.

See [Geth JSON-RPC methods](https://eth.wiki/json-rpc/API#the-default-block-parameter) that support querying at a block number.

Query example to get the balance of an address at different block numbers through an archive node:

``` js
> eth.getBalance("0x948cC5fB27455565dE5845AC630F5e318ac9f2f1","latest")
995856452000000000
> eth.getBalance("0x948cC5fB27455565dE5845AC630F5e318ac9f2f1","1411478")
0
```

::: tip See also

* [Networks](/operations/polygon/networks)
* [Tools](/operations/polygon/tools)
* [Tutorials](/tutorials/polygon/)

:::
