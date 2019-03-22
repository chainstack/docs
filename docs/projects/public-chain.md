# Public chain

Users can join a public blockchain network by deploying a new node or getting access to an existing node.

## Networks

A public chain network comes in various flavors. There’s the mainnet, where the actual network lives and where users transact data and cryptocurrency. Not unlike a typical staging environment, there are also various testnets, which are ideal for smart contract development and testing.

Chainstack currently supports joining Ethereum mainnet. Support for joining testnets such as Ropsten and Kovan will follow.

## Node types

When choosing deployment options for a public chain node, a user can also choose between a dedicated and a shared node. Similar to dedicated and shared hosting, a dedicated node is one that is deployed exclusively for a particular user. Access to shared node will, however, be shared with other users. Shared nodes are great tool for developers to experiment and test their DApp ideas, while a dedicated node can be safely used in production. We believe this flexibility in terms of node choice should help users select the option that best addresses their requirements.

Read more about the difference in their pricing [here](https://chainstack.com/pricing/).

## Synchronization

Joining a public chain network essentially means having a node that is a copy of every other node on that decentralized network. Synchronizing a node to the public chain is no mean task. It requires a lot of manual set up, command line operations, and is not for the faint-hearted. For example, as of the time of writing, synchronizing a 200 GB Ethereum node could take several hours to days. Yet again, there’s no guarantee that the synchronization will go smoothly. The slightest of network instability can botch the entire synchronization process.

On Chainstack, users can deploy a full Ethereum node of 200 GB in as little as 10 minutes! Bolt, our node synchronization technology takes care of all the complex node operations in the background. The end result: guaranteed node sync on the cloud of your choice with a huge amount of hours and effort saved.
