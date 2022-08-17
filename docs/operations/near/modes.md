---
meta:
  - name: description
    content: Learn the difference between a NEAR full node and an archive node. Run sample commands to see the difference.
  - name: keywords
    content: near node full archive difference
---

# Modes

Chainstack supports deploying a NEAR node on the mainnet in the following modes:

* Full node — a node that stores full blockchain data.
* Archive node — a node that stores full blockchain data and an archive of historical states on NEAR.

To be a part of the NEAR mainnet, you can deploy either a full node or an archive node.

With a full node, you can query the historical state of the NEAR mainnet at only the latest 5 [epochs](https://docs.near.org/concepts/basics/epoch).

To be able to query the historical state of the NEAR mainnet at any block, you need an archive node.

See [NEAR RPC API methods](https://docs.near.org/api/rpc/introduction) that support querying at a block number.

Query example to retrieve block contents through an archive node past the immediately previous 5 epochs:

``` sh
curl -H 'Content-Type: application/json' \
  -d '{"jsonrpc": "2.0", "id": "1", "method": "block", "params": {"block_id": 70000000}}' \
  https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

::: tip See also

* [Networks](/operations/near/networks)
* [Tools](/operations/near/tools)
* [Tutorials](/tutorials/near/)

:::
