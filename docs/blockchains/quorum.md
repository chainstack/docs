---
meta:
  - name: description
    content: Quorum is a permissioned consortium blockchain protocol and is a fork of Go Ethereum (Geth). Learn how the Raft and IBFT consensus algorithms work.
  - name: keywords
    content: quorum geth blockchain ibft raft
---

# Quorum

Quorum is a fork of Go Ethereum.

Quorum is a permissioned consortium blockchain protocol.

## Consensus

Quorum supports the following two consensus algorithms:

* Raft — a [CFT](/glossary/cft) consensus algorithm.
* Istanbul Byzantine Fault Tolerance — a [BFT](/glossary/bft) consensus algorithm.

Raft can tolerate an **f** number of faulty nodes in **n=2f+1**, where **n** is the total number of nodes.
IBFT can tolerate an **f** number of faulty nodes in **n=3f+1**, where **n** is the total number of nodes.

In terms of costs, Raft is cheaper to run as it requires fewer nodes to stay fault-tolerant but assumes there are no adversary nodes on the network.

IBFT is more expensive to run as it requires more nodes to stay fault-tolerant but assumes there are adversary nodes on the network.

### Raft

The Raft consensus algorithm has the following key characteristics:

* Crash fault tolerance
* Transaction finality
* On-demand block creation
* Consensus nodes flexibility

#### Crash fault tolerance

Crash fault tolerance assumes that there are no adversary nodes on the network.

A Quorum Raft network has the nodes in one of the following roles:

* Minter — in Raft terminology, this is the *leader* node. In Quorum Raft terminology, this is the *minter* node.
* Verifier — in Raft terminology, this is the *follower* node. In Quorum Raft terminology, this is the *verifier* node.
* Learner — this is the *learner* node in both Raft and Quorum Raft terminology.

The minter node creates the blocks and the verifier nodes follow the minter node. The learner node is not a part of the Raft consensus. The objective of the learner node is to sync with the network and then be manually promoted to the verifier role.

By default, the very first node you deploy as part of your Raft Quorum network assumes the minter role.

If the minter node goes offline or if you force a removal of the minter node from the network, a new minter node is automatically elected from the pool of the verifier nodes.

Raft networks usually have an odd number of nodes as there is no benefit in having an even number of nodes. Raft can tolerate an **f** number of faulty nodes in **n=2f+1**, where **n** is the total number of nodes.

Example:

* A Raft network with 3 nodes can tolerate 1 node failure. The majority of nodes in a 3 node network is 2; 3=2(1)+1.
* A Raft network with 4 nodes can tolerate 1 node failure. The majority of nodes in a 4 node network is 3.
* A Raft network with 5 nodes can tolerate 2 node failure. The majority of nodes in a 5 node network is 3; 5=2(2)+1.
* A Raft network with 6 nodes can tolerate 2 node failure. The majority of nodes in a 6 node network is 4.

The minimum recommended number of nodes in a Raft network is 3.

#### Transaction finality

A Quorum Raft network reaches transaction finality on a per-block basis.

The minter node includes transactions in a block, creates the block, and sends a new log entry on the block to the verifier nodes.

The verifier nodes receive the log entry of the transaction and the new block from the minter node. The verifier nodes then message back the minter node and acknowledge the new log entry receipt.

The minter node then adds the block to the chain.

#### On-demand block creation

Since Quorum Raft is designed to run a crash tolerant system only, the blocks are only created when there is a transaction on the network. No empty blocks are created.

When there is a new transaction propagated through the network, a new block creation is triggered and the minter node creates a new block.

### IBFT

Stands for Istanbul Byzantine Fault Tolerance.

Byzantine fault tolerance assumes that there can be adversary nodes on the network. The network can still operate and reach consensus in the presence of the adversary nodes.

IBFT can tolerate up to a third of all the nodes in the network being faulty, or **n=3f+1**, where **n** is the total number of nodes and **f** is the number of faulty nodes.

Example with **f** is 3:

* Total nodes in the network: 10
* Maximum number of faulty nodes can be tolerated: 3
* The network reaches consensus with the number of non-faulty nodes: 7

The minimum recommended number of nodes in an IBFT network is 4.

#### Transaction finality

A Quorum IBFT network reaches transaction finality on a per-block basis. Every block formed in the network is validated and sealed by nodes before being added to the chain. This per-block validation and sealing provide absolute transaction finality and remove any chance of forking or any other possibility to undo a transaction.

The process of sealing and including a block in the chain is the following:

* Block proposal — a proposer submits a block for validation to the group of validator nodes. The proposer also adds the *ProposerSeal* to the proposed block.
* Block preparing — the validator nodes reach the **3f+1** consensus on the proposed block.
* Block ready — the validating nodes add their *CommittingSeals* to the block and add the block to the chain.

The transactions in the block are now final. A new round starts.

Since IBFT is designed to run even in the presence of malicious actors, the blocks are always created at regular intervals, regardless of whether there are transactions on the network. When there are no transactions, empty blocks are produced and added to the chain.

::: tip See also

* [Configuring Quorum consensus](/operations/quorum/configuring-consensus)
* <a href="https://www.goquorum.com/developers" rel="nofollow">Quorum for Developers</a>

:::
