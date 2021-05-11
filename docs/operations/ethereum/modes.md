---
meta:
  - name: description
    content: Learn the difference between an Ethereum full node and an Ethereum archive node. Run sample commands to see the difference.
  - name: keywords
    content: ethereum node full archive difference
---

# Modes

Chainstack supports deploying an Ethereum node on the mainnet in the following modes:

* Full node — a node that stores full blockchain data.
* Archive node — a node that stores full blockchain data and an archive of historical states.

To be a part of the Ethereum mainnet, you can deploy either a full node or an archive node.

With a full node, you can query the historical state of the Ethereum mainnet at only the latest 128 blocks.

To be able to query the historical state of the Ethereum mainnet at any block, you need an archive node.

See [Geth JSON-RPC methods](https://eth.wiki/json-rpc/API#the-default-block-parameter) that support querying at a block number.

Query example to get the balance of an address at different block numbers through an archive node:

``` js
> eth.getBalance("0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest")
1032472420000000
> eth.getBalance("0xc94770007dda54cF92009BFF0dE90c06F603a09f","8228625")
0
> eth.getBalance("0xc94770007dda54cF92009BFF0dE90c06F603a09f","8116664")
1400000000000000
```

::: tip See also

* [Networks](/operations/ethereum/networks)
* [Tools](/operations/ethereum/tools)
* [Tutorials](/tutorials/ethereum/)

:::
