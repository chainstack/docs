---
meta:
  - name: description
    content: Learn the difference between an Avalanche C-Chain full node and an archive node. Run sample commands to see the difference.
  - name: keywords
    content: avalanche avax node full archive difference
---

# Modes

Chainstack supports deploying an Avalanche node on the mainnet in the following modes:

* Full node — a node that stores full blockchain data.
* Archive node — a node that stores full blockchain data and an archive of historical states on C-Chain.

To be a part of the Avalanche mainnet, you can deploy either a full node or an archive node.

With a full node, you can query the historical state of the Avalanche mainnet on C-Chain at only the latest 128 blocks.

To be able to query the historical state of the Avalanche mainnet on C-Chain at any block, you need an archive node.

See [Geth JSON-RPC methods](https://eth.wiki/json-rpc/API#the-default-block-parameter) that support querying at a block number.

Query example to get the balance of an address on C-Chain at different block numbers through an archive node:

``` js
> eth.getBalance("0xbFF78BC8ecA925CD5096057634C4FC087f3dD3a9","latest")
995856452000000000
> eth.getBalance("0xbFF78BC8ecA925CD5096057634C4FC087f3dD3a9","5505829")
0
```

::: tip See also

* [Networks](/operations/avalanche/networks)
* [Tools](/operations/avalanche/tools)
* [Tutorials](/tutorials/avalanche/)

:::
