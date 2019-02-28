# Hyperledger Fabric

Hyperledger Fabric, or simply Fabric, is a blockchain framework that is part of Hyperledger’s list of projects. Hyperledger is an open-source collaboration that includes The Linux Foundation and several leading players from the enterprise sector.

Projects under Hyperledger can be in one of several stages: Proposal, Incubation, Active, First Major Release, Deprecated. Fabric is the first project, from Hyperledger’s portfolio of projects, to exit Incubation and move into Active status.

## Features

According to Hyperledger documentation, ‘Fabric has been designed for enterprise use from the outset’. Here are some key features to consider as you explore Fabric.

### Modularity all the way

While exploring Fabric, two words that you will come across often are ‘pluggable’ and ‘modularity’. Because enterprise use cases are diverse and unique, Fabric has tried to avoid a ‘one size fits all’ approach. Instead, it aims to be as versatile as possible by emphasizing a modular architecture.

Fabric offers pluggable consensus, pluggable identity management, and pluggable key management protocols. For enterprises, this means great flexibility in choosing their options.

Take the case of consensus mechanisms for example. In Fabric, enterprises can choose between Byzantine Fault Tolerant (BFT) consensus mechanism or Crash Fault Tolerant (CFT) consensus mechanism. But if the enterprise is part of a consortium that involves known participants with a high degree of trust, then BFT is not really necessary.

BFT is primarily used to tackle the possibility of any malicious nodes in the network. Using BFT as a consensus mechanism can adversely impact throughput and performance as a result of the high number of encrypted messages that need to be passed among nodes. In the  case of a trusted network, therefore, CFT would be a better choice, and Fabric makes it easy to plug this mechanism in.

### Smart contracts in a popular programming language

Smart contracts in Fabric universe are known as ‘chaincode’. They contain business logic and execute depending on certain conditions. Smart contracts need to be deterministic. And to be able to do so, smart contracts have historically been programmed in Solidity, a non-standard language that eliminates the possibility of any non-determinism. But the need to learn a non-standard language can impede an enterprise’s rapid ability to adopt blockchain.
Fabric, however, has tackled the possibility of non-determinism through a new approach to transactions. As a result, smart contracts in Fabric can be written in a popular programming language such as Go or Node.js, and there could even be support for Java in future.

For enterprises, the significantly larger pool of talent, who can now also craft business logic on a blockchain using their existing programming knowledge can only boost consortium-wide adoption plans.

### Privacy, privacy, privacy

Fabric is a permissioned network. At a fundamental level, therefore, privacy is baked in, because it requires explicit authorization to participate in the network and authorization to participate in transactions; but Fabric offers more.
Fabric offers the following three mechanisms to address the sophisticated need for privacy and confidentiality among enterprises.

### Channels

Channels are essentially sub-blockchain networks atop the main blockchain network and are used to conduct transactions that involve confidential data. Several such channels can be created, with each channel maintaining its own ledger and its own set of data.

For example a supplier of dairy products to several large retailers in a country could create channels with each of those retailers. This assumes its transactions with those retailers are large enough to warrant the creation of a channel. Each channel now shields its entire set of transactions from parties outside that channel.
Channels are ideal for when a subgroup of participants have to transact among themselves regularly and have no need to access for data outside that channel.

### Private data or collections

So channels are great right! Not entirely. It’s great for all the above-mentioned reasons. It’s not for the simple fact that now if you want to share some data only among a sub-group of participants on a channel, there’s no way to do that - unless you create another channel. But creating one channel after another brings with it overheads in terms of maintaining access policies, chaincode versions, etc. The solution - private data or collections of private data that offer privacy at a more fine-grained level than channels.

Starting version 1.2, Fabric allows for the creation of private data collections. which can be accessed only by  a subset of participants on a channel. So now participants have the choice of using a channel when the entire set of transactions needs to be kept confidential among all participants of that channel. But they can use to choose private data collections, when only a subset of organizations on that channel need to access certain data.

### Zero-knowledge proofs (ZKP)

ZKP enables one party, the prover, to prove to another party, the verifier, that it’s in possession of a secret, which satisfies certain properties - all this without revealing the actual secret (therefore zero-knowledge).
In Fabric, ZKP will be used for:
1. Anonymous Client Authentication using Identity Mixer, and
2. Exchange of assets using Zero-Knowledge Asset Transfer

Identity Mixer will be available as a release feature in version 1.2 and will be used to protect the privacy of users when signing, authenticating, and during the transfer of certified attributes. Because it leverages ZKP, it will guarantee that nothing is revealed about the client’s identity (its secret) beyond whether the corresponding statement is true.

In a yet to be announced release, Fabric will also offer ZKP-powered asset management (ZKAT) that could be of particular interest to financial organizations. ZKAT is a mechanism for use cases where assets need to be transferred without exposing one’s business model and, yet, the entire transfer needs to be auditable.

Banks, for instance, have arbitrage as their core business model - they borrow at a low rate and lend at a higher rate. With ZKAT, a bank on a blockchain can transfer assets and have them recorded on the shared ledger without the fear of exposing what is being transferred or who is the sender and recipient.

### From ledger to DBMS

Remember how we discussed ‘modularity’ and ‘pluggability’? Well it extends even to the choice of the database. But before we touch upon that, let’s start with the ledger.

In Fabric, the blockchain ledger is where it all starts and comprises the blockchain and the world state. The blockchain logs all transactions and updates the world state, which is implemented as a database that holds current values of the ledger. The world state can be stored on either LevelDB or CouchDB.

By default, Fabric comes embedded with LevelDB, which is good enough for simple key-value pairs. CouchDB, on the other hand, would be the right choice for ledger states structured as JSON and that needs to take into account richer data types typically found in business transactions. Both support chaincode operations such as getting and setting and key and querying based on keys. CouchDB, though, has the additional advantage of complex queries using CouchDB JSON query language.

To conclude, by offering pluggable database options, Fabric provides much needed leeway to an enterprise in configuring its world state database. An enterprise can now take a  call on whether it needs a sophisticated relational or graph-oriented data store or one that is merely timestamp-based.

## Privacy

In Hyperledger Fabric business can create multiple private channels and through the DLT application participants can commit confidential transactions over these channels.

## Consensus

There are three types of nodes in Fabric — an Orderer, a Peer, and a Client. It’s the Orderer node that is responsible for establishing consensus. Further, there are multiple Orderers, so an Orderer being the single point of failure in a Fabric network can be ruled out. In the current stable version, Fabric supports two consensus mechanisms Solo and Kafka. 

### Solo

As per [this paper](https://www.nctatechnicalpapers.com/Paper/2017/2017-comparing-blockchain-implementations),
> Consensus protocol that doesn't perform consensus but still processes all consensus messages. Simply for development and test purposes, and to provide an example of how to create a consensus model plugin.

#### Ordering

Solo is the Hyperledger Fabric ordering mechanism most typically used by developers experimenting with Hyperledger Fabric networks. Solo involves a single ordering node.

### Kafka

Kafka is primarily a distributed, horizontally-scalable, fault-tolerant, commit log.

#### Fault tolerance

The crash-tolerance mechanism comes into play by replication of the partitions among the multiple Kafka brokers. Thus if one broker dies, due to a software or a hardware fault, data is preserved. What follows is, of course, a leader-follower system, wherein the leader owns a partition, and the follower has a replication of the same. When the leader dies, the follower becomes the new leader. Kafka uses a fault-tolerant distributed streaming platform called Apache Kafka. It also enables distributed ordering service, so that we can have multiple Orderer nodes to avoid a single point of failure.

#### Ordering

Consensus in blockchain involves nodes agreeing on the same order of transactions. Ordering nodes send to Kafka transactions, and receive from Kafka transactions in the same order, since Kafka presents an abstraction of a shared queue.

#### Performance

As per [this article](https://medium.com/blockchainspace/trust-your-competitor-how-you-can-do-with-hyperledger-fabric-5939bacffe76),
> The Kafka orderer can efficiently order high numbers of transactions. It is composed of multiple virtual nodes forming a so called “Kafka cluster”. This decentralization makes the Kafka orderer tolerant to the failure of single nodes (e.g. through power shortages, software failures). Therefore it is considered Fault-tolerant. However, the Kafka orderer is not Byzantine-Fault-tolerant as it can be compromised by a malicious node in the network.
