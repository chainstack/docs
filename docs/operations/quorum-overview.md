# Quorum overview

This section outlines the fundamentals that you need to consider when running a Quorum network.

## Governance

Quorum supports the following two consensus algorithms:

* Raft
* Istanbul Byzantine Fault Tolerance

Raft is a [CFT](/glossary#cft) consensus algorithm.

Istanbul Byzantine Fault Tolerance is a [BFT](/glossary#bft) consensus algorithm.

### Raft

The Raft consensus algorithm has the following key characteristics:

* Crash fault tolerance
* Transaction finality
* On-demand block creation
* Consensus nodes flexibility

#### Crash fault tolerance

Crash fault tolerance assumes that there no adversary nodes on the network.

A Raft Quorum network always has the nodes in one of the following roles:

* Minter — in Raft terminology, this is the *leader* node. In Raft Quorum terminology, this is the *minter* node.
* Verifier — in Raft terminology, this is the *follower* node. In Raft Quorum terminology, this is the *verifier* node.

The minter node creates the blocks and the verifier nodes follow the minter node.

By default, the very first node you deploy with Chainstack as part of your Raft Quorum network assumes the minter role.

Each subsequent node that you deploy as part of the same network assumes the verifier role.

If the minter node goes offline or if you force a removal of the minter node from the network, a new minter node is automatically elected from the pool of the verifier nodes.

#### Transaction finality

A Raft Quorum network reaches transaction finality on a per-block basis.

The minter node includes transactions in a block, creates the block, and sends a new log entry on the block to the verifier nodes.

The verifier nodes receive the log entry of the transaction and the new block from the minter node. The verifier nodes then message back the minter node and acknowledge the new log entry receipt.

The minter node then adds the block to the chain.

#### On-demand block creation

Since Raft Quorum is designed to run a crash tolerant system only, the blocks are only created when there is a transaction on the network. No empty blocks are created.

When there is a new transaction propagated through the network, a new block creation is triggered and the minter node creates a new block.

#### Consensus nodes flexibility

You can always remove the existing verifier nodes or a minter node from the network. You can also always add new verifier nodes to the network.

To get the list of current minter and verifier nodes:

``` js
raft.cluster
```

To get the enode of the minter node:

``` js
raft.leader
```

To add a verifier node:

``` js
raft.addPeer('enode://ENODE@NODE_IP:P2P_PORT?discport=0&raftport=RAFT_PORT')
```

where 

* ENODE is the hexadecimal node ID.
* NODE_IP is the IP address of the node.
* P2P_PORT is the port of the node.
* RAFT_PORT is the Raft port of the node.

You can get all of the node information by running `raft.cluster`.

To remove a node:

``` js
raft.removePeer(RAFT_ID)
```

where

* RAFT_ID is the Raft ID of the node. You can get the ID by running `raft.cluster`.

### Istanbul Byzantine Fault Tolerance

The Istanbul Byzantine Fault Tolerance (IBFT) consensus algorithm has the following key characteristics:

* Byzantine fault tolerance
* Transaction finality
* Consensus nodes flexibility

#### Byzantine fault tolerance

Byzantine fault tolerance assumes that there can be adversary nodes on the network. The network can still operate and reach consensus in the presence of the adversary nodes.

IBFT can tolerate up to a third of all the nodes in the network being faulty, or **3f+1**, where **f** is the number of faulty nodes.

Example with **f** is 3:

* Total nodes in the network: 10
* Maximum number of faulty nodes can be tolerated: 3
* The network reaches consensus the number of non-faulty nodes: 7

#### Transaction finality

An IBFT Quorum network reaches transaction finality on a per-block basis. Every block formed in network is validated and sealed by nodes before being added to the chain. This per-block validation and sealing provide absolute transaction finality and remove any chance of forking or any other possibility to undo a transaction.

All nodes in a Quorum network deployed with Chainstack have the following two roles at the same time:

* Validator — the node is a part of the group of nodes that validate the block to seal it and include in the chain.
* Proposer — the node proposes a block to the group of the validator nodes.

The process of sealing and including a block in the chain is the following:

* Block proposal — Proposer submits a block for validation to the group of validator nodes. The proposer also adds the *ProposerSeal* to the proposed block.
* Block preparing — the validator nodes reach the **3f+1** consensus on the proposed block.
* Block ready — the validating nodes add their *CommittingSeals* to the block and add the block to the chain.

The transactions in the block are now final. A new round starts.

Since IBFT is designed to run even in the presence of malicious actors, the blocks are always created at regular intervals, regardless of whether there are transactions on the network. When there are no transactions, empty blocks are produced and added to the chain.

#### Consensus nodes flexibility

The group of validator nodes can always be changed on the network to ensure that only valid nodes are present and the faulty nodes can be removed.

To get the list of current validator nodes:

``` js
istanbul.getValidators()
```

To add a new validator node:

``` js
istanbul.propose("DEFAULT_WALLET_ADDRESS", true)
```

where

* DEFAULT_WALLET_ADDRESS is the node's address. See [View node access and credentials](/platform/view-node-access-and-credentials).
* `true` is the parameter to add the node to the validator group.

To remove a validator node:

``` js
istanbul.propose("DEFAULT_WALLET_ADDRESS", false)
```

where

* DEFAULT_WALLET_ADDRESS is the node's address. See [View node access and credentials](/platform/view-node-access-and-credentials).
* `false` is the parameter to remove the node from the validator group.

## Addresses

When you deploy a Quorum network with Chainstack, the very first address that comes with the first node has the default Quorum balance of `1000000000000000000000000000`.

All subsequent nodes are deployed with the addresses with the balance `0`.

## Key management

By default, you can view your Quorum wallet addresses and keys specific to the node that you deployed, provided that you are logged in as the same user with Chainstack. See [View node access and credentials](/platform/view-node-access-and-credentials).

You can use the default wallet addresses and key pairs for development and testing purposes.

If you are moving your Quorum network to production, you are strongly recommended to use secure key management. [MetaMask](https://metamask.io/) is one of the more popular choices with the Quorum community.