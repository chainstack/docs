---
meta:
  - name: description
    content: Learn about which Oasis Sapphire node you can deploy using the Chainstack platform
  - name: keywords
    content: oasis sapphire paratime network full node
---

# Modes

Chainstack currently supports deploying Oasis Sapphire nodes in the full mode only.

A full Oasis Sapphire node stores the complete blockchain data and enables transactions and calls to confidential smart contracts deployed onto the network.

See [Geth JSON-RPC methods](https://eth.wiki/json-rpc/API#the-default-block-parameter) that support querying at a block number.

Query example to get the balance of an address at a block number:

``` js
> eth.getBalance("0x4EA0911033792C93639bEd297B9289E136d86F89")
924207076563996860320
```

::: tip See also

* [Networks](/operations/oasis-sapphire/networks)
* [Tools](/operations/oasis-sapphire/tools)
* [Tutorials](/tutorials/oasis-sapphire/)

:::
