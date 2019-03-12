# MultiChain

Developed by Coin Sciences, MultiChain is a fork of Bitcoin Core that has been adapted for permissioned blockchains. But why consider a decentralized protocol such as Bitcoin Core as a reference implementation for MultiChain’s permissioned offering?

In MultiChain’s own words,
> By forking from Bitcoin Core, the reference implementation for the bitcoin network, MultiChain builds on the years of hard-earned stability and security which come from stewarding billions of dollars in cryptocurrency value on the open Internet.

Another reason cited for its compatibility with Bitcoin Core is the ready availability of the rich ecosystem of tools.

A node in Bitcoin Core, or any other protocol, is only one part of the big picture. Wallets, key management solutions, and libraries for decoding, signing, and encryption of messages play a very important part in working with the protocol. By leveraging Bitcoin Core’s rich set of freely available tools, MultiChain can extend them to its own user base on a permissioned network. Further MultiChain adds value by making the entire process of working with the protocol, which traditionally can be quite cryptic, simple and fast.

## Features

### Move value or data, easy peasy

MultiChain comes with two key concepts that make the transfer of something of value or mere data equally easy. Assets refer to something of value that can be exchanged and that, as a result, changes ownership. Streams refer to use cases where data storage and retrieval are required.

A specific asset  can be issued and transferred between participants using API commands; all units of this particular asset are considered fungible. If the issuer wants one asset to be distinguished from another asset, then MultiChain requires that a completely new asset be issued.

Streams, on the other hand, are a versatile  tool for when you want to store, retrieve, and archive data. Their versatility comes from their ability to be represented as a key-value store, a timestamped database, or a database where entries are classified according to the author.

Streams can also be used to maintain confidentiality. By default, each node in the blockchain can see the contents of every other node on the blockchain. By employing a combination of streams, public keys can be distributed to a select group of participants, data can be published to those streams, and data access made available to only those participants.

### Privacy goes cold

Private keys are the ‘open sesame’ in the blockchain world. And a common thread that runs throughout sections of privacy across any number of articles or books exhorts keeping one’s private keys safe. MultiChain comes with an [API to create a cold node and wallet that is away from the network](https://www.multichain.com/developers/cold-nodes-wallets/).

A node created this way is unable to connect to its peers removing any possibility of it being accidentally marked ‘hot’ and thereby accessible to peer nodes. Further, the cold node and wallet is in a demarcated area preventing any accidental sharing of wallets with other hot nodes.

A cold node, moreover, is not just a container for private keys. It can also sign transactions offline. This is because although a cold node cannot connect to peers, it can accept requests via a JSON-RPC API.

### BitTorrent finds a new home

Confidentiality and Scalability are two aspects of any blockchain whether public or permissioned. Even in permissioned networks, questions related to confidentiality of transactions play an important part in various design choices such as the adoption of channels in Fabric or the privateFor parameter in Quorum. As for scalability, keeping modest amounts of data on the blockchain without adversely impacting performance appears possible. But start considering how to achieve scalability in the light of large amounts of data such as scanned documents, and suddenly scalability takes a severe beating.

Well, MultiChain’s answer to both confidentiality and scalability is via an odd but powerful combination of hashes, streams and popular P2P file sharing techniques like Napster and BitTorrent. While this entire process is a series of rapidly executing steps, broadly speaking, this is how it happens:

* Publisher stores the payload locally; the payload is now off-chain.
* Publisher embeds a hash of the off-chain item’s payload inside the chain. Publisher also includes item’s keys and some metadata.
* Publisher propagates payload to the stream’s subscribers using P2P file sharing techniques. Publisher also provides on-chain hash for verification.

As stated best in [MultiChain’s own words](https://www.multichain.com/blog/2018/06/scaling-blockchains-off-chain-data/), the result of this process is "... a huge improvement in the scalability and performance of blockchains used to record large amounts of information, where some of this information is only of interest to certain participants."

## Privacy

In MultiChain private transactions between participants are hidden from all participants using streams.

## Consensus

MultiChain uses a distributed consensus between identified block validators. It's close in spirit to something like PBFT (Practical Byzantine Fault Tolerance), but instead of multiple validators per block, there is one validator per block, working in a round-robin manner. A fixed ratio of admins approves privilege changes. The longest valid blockchain is adopted by global consensus.

### Fault tolerance

With diversity set to 0, any block-adder can add any block: this is very tolerant but also increases the risk that a single or small group of block-adders can compromise the system. With a diversity setting of 1, once a block is added,  every other block-adder needs to add a block before you can add again. This stops single or groups of block-adders from creating forks, but if a node goes offline then at some point no further blocks will be able to be added while the network waits for that node to add the next block. The diversity setting scale lets you choose the balance between security and technical malfunction risk.

## Performance

The supported rate of transactions per second is barely affected by the number of nodes, since each node independently processes all transactions. You will see more latency as transactions and blocks have to make more hops to propagate to the entire network.
