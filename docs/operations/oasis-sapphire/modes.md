---
meta:
  - name: description
    content: Learn the difference between the Oasis Sapphire full node and an archive node. Run sample commands to see the difference.
  - name: keywords
    content: oasis network node full archive difference sapphire paratime
---

# Modes

Chainstack currently supports deploying an Oasis Sapphire node in the full mode only.

Chainstack supports deploying Oasis Sapphire ParaTime which currently stores the full blockchain data and an archive of historical states starting from the chain genesis.

See [Geth JSON-RPC methods](https://eth.wiki/json-rpc/API#the-default-block-parameter) that support querying at a block number.

Query example to get the balance of an address at a block number:

``` js
> eth.getBalance("0xFBe030f83C3646cdAEAaA476c02f4b370611a8c")
11254009838320900265
```

::: tip See also

* [Networks](/operations/oasis-sapphire/networks)
* [Tools](/operations/oasis-sapphire/tools)
* [Tutorials](/tutorials/oasis-sapphire/)

:::
