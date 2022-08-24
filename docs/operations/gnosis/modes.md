---
meta:
  - name: description
    content: Learn the difference between a Gnosis Chain full node and an archive node. Run sample commands to see the difference.
  - name: keywords
    content: gnosis xdai node full archive difference nethermind
---

# Modes

Chainstack supports deploying a Gnosis Chain node on the mainnet in the following modes:

* Full node — a node that stores full blockchain data.
* Archive node — a node that stores full blockchain data and an archive of historical states.

To be a part of the Gnosis Chain mainnet, you can deploy either a full node or an archive node.

The full node stores in cache 1024 MB worth of historical states. This means you can query the historical state of the Gnosis Chain mainnet at about 10 hours worth of immediately previous blocks.

To be able to query the historical state of the Gnosis Chain mainnet at any block, you need an archive node.

See [Nethermind JSON-RPC methods](https://docs.nethermind.io/nethermind/ethereum-client/json-rpc) that support querying at a block number.

::: tip See also

* [Debug and trace APIs](/operations/gnosis/debug-and-trace-apis)
* [Tools](/operations/gnosis/tools)
* [Tutorials](/tutorials/gnosis/)
* [Nethermind pruning](https://docs.nethermind.io/nethermind/ethereum-client/configuration/pruning)

:::
