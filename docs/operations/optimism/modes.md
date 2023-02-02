---
meta:
  - name: description
    content: Learn the difference between an Optimism full node and an Optimism archive node. Run sample commands to see the difference.
  - name: keywords
    content: optimism node full archive difference
---

# Modes

Chainstack supports deploying an Optimism node on the mainnet in the following modes:

* Full node — a node that stores full blockchain data.
* Archive node — a node that stores full blockchain data and an archive of historical states.

To be a part of the Optimism testnet, you can deploy either a full node or an archive node.

With a full node, you can query the historical state of the Optimism testnet at only the latest 128 blocks.

To be able to query the historical state of the Optimism testnet at any block, you need an archive node.

See [Geth JSON-RPC methods](https://eth.wiki/json-rpc/API#the-default-block-parameter) that support querying at a block number.

Query example to get the balance of an address at different block numbers through an archive node:

``` js
> eth.getBalance("0x06908fdbe4a6af2be010fe3709893fb2715d61a6","latest")
187186839646605076
> eth.getBalance("0xc94770007dda54cF92009BFF0dE90c06F603a09f","4644316")
197218339647724796
```

::: tip See also

* [Networks](/operations/optimism/networks)
* [Tools](/operations/optimism/tools)
* [Tutorials](/tutorials/optimism/)

:::
