# Quorum

[Quorum](https://www.jpmorgan.com/global/Quorum) is an enterprise blockchain platform based on Ethereum and spearheaded by JP Morgan Chase.

Because of its origin as a project from a major financial institution, it is no surprise that Quorum is viewed as a blockchain platform particularly suited for the financial industry. Quorum, like Ethereum, is open source. Further, by maintaining its status as a minimal or lightweight fork of Ethereum, Quorum’s creators and maintainers hope to quickly leverage the advances in Ethereum from time to time.

An obvious question is: Why use Quorum at all? Or, why not simply use Ethereum?

Though based on a permissionless platform such as Ethereum, Quorum is targeted specifically at the enterprise and therefore at permissioned networks looking to adopt distributed ledger technology. Further, JP Morgan has been able to inject Quorum with important performance parameters related to privacy and transactions processing. These strengths make Quorum an attractive option for organizations and consortia keen to exploit Ethereum’s power of smart contracts but uncompromising when it comes to privacy and throughput.

## Features

### Make It Private or Take It Public

Quorum, because of its Ethereum origins, naturally supports transactions that are visible to all participants of a network. But the importance of transactions, which are visible only to certain participants on a network can’t be overstated. After all, we are talking of financial institutions and businesses as possible adopters here.

In addressing this need for private transactions, the Quorum team has not had to reinvent the wheel. Quorum simply extends Ethereum’s basic transaction model by now including a privateFor parameter that specifies the public keys of intended recipients. Simply put, privateFor is not a new transaction type but a label.

It bears mentioning that public transactions in Quorum are not equivalent to public transactions on an Ethereum network. Ethereum transactions are visible to all who join the network, which any one can. Quorum public transactions, however, are more aptly termed ‘common’ or ‘global’ and are visible to all participants in the permissioned network. Private transactions, further, restrict the transaction visibility to only a specified group of participants .

This public-private dichotomy also applies to the world of smart contracts. In Quorum, as in Ethereum, you can use Solidity to write smart contracts. These contracts, unless specified using the privateFor parameter, would be viewable and executable by all participants on the network.

In summary, Quorum makes the process of turning one’s network and smart contracts into a public or private one quite straightforward. What’s also worth considering is that companies can leverage the vast pool of Ethereum developers available worldwide to develop smart contracts on their Quorum network. The availability of such a talent pool is expected to speed up development time.

### A Raft (or IBFT) to consensus shores

Ethereum relies on a PoW consensus mechanism to protect the network from attacks. While known for its reliability, PoW consumes massive amounts of power. In a permissioned network, however, using PoW compares to getting a bazooka to swat a fly. Perhaps there are easier, faster, and less energy-intensive ways to achieve consensus in a network where participants are known, where it’s highly probable that nodes may fail, but not as likely that nodes will turn Byzantine.

If you have read the section on Hyperledger, remember that they too grappled with the best way to achieve consensus in a permissioned model. For that matter, any permissioned network would have to confront such questions before deciding on what consensus mechanism to use.

In Quorum the choices offered are an [etcd implementation of Raft](https://raft.github.io/) and IBFT. By default Raft is used to provide a consensus mechanism that is Crash Fault Tolerant, and IBFT is its  Byzantine Fault Tolerant counterpart.

Raft is recommended for a situation where all parties in a network are trusted and follows a leader-follower model. As mentioned earlier in the section on Hyperledger, achieving consensus in the presence of Byzantine nodes is a relatively time consuming process. This is because of the number of encrypted messages that need to be passed back and forth to tackle any Byzantine node. In the absence of a Byzantine scenario, however, Raft delivers faster block times and transaction finality.

IBFT, on the other hand, is used in situations where you want to run a network despite the presence of mutually distrusting nodes. Consider a scenario where you are forming a consortium that includes competitors. The possibility of a competitor-owned node being compromised or tuning malicious cannot be ruled out. ‘Don’t trust, but verify’ is the refrain that comes to mind here, and Quorum offers IBFT for such scenarios.

For a detailed performance benchmarking study comparing Raft and IBFT on Quorum, refer to [this paper](https://www.persistent.com/wp-content/uploads/2018/07/research-paper-performance-evaluation-of-the-quorum-blockchain-platform.pdf).

### Quorum geths performance

A common thread across Quorum is its Go-Ethereum pedigree. As mentioned before, the advantages of standing on the shoulders of Ethereum is that Quorum’s developers can quickly leverage the advancements introduced in Ethereum. Another advantage is the access to Ethereum’s pool of smart contract developers. But what about transaction speed?

Ethereum currently hovers around 15 transactions per second, something that is far from suitable for most businesses, let alone financial ones.

But Quorum does things differently and in the right direction. First of all the very fact that Quorum is a permissioned network implies that that there are a lot fewer nodes as part of the network; and not every node needs to validate every transaction. For instance, private transactions need to be validated only by nodes that are part of the private network. And even if we are talking of public transactions, it only refers to all the available nodes on that Quorum network.

Moreover the choice of consensus mechanisms, whether its Raft or IBFT as opposed to Ethereum’s PoW, contributes to faster block times and transaction finality. One benchmarking study, in particular, has found Quorum, to quote from its white paper, is therefore "able to process dozens to hundreds of transactions per second, depending on system configuration; enough to support institutional volumes".

## Privacy 

In Quorum private transactions between participants are hidden from all participants.

## Consensus

In Quorum the choices offered are Raft and IBFT. By default Raft is used to provide a consensus mechanism that is Crash Fault Tolerant, and IBFT is its Byzantine Fault Tolerant counterpart.

### Raft

The Raft consensus model is based on majority voting. Each node can be of one of the 2 types: leader or a follower. There is just 1 leader. The remaining nodes are all followers. In Raft, the leader is assumed to always act correctly (honestly). All the followers blindly replicate the entries proposed by the leader with no questions asked. 

Raft is recommended for a situation where all parties in a network are trusted and follow a leader-follower model. Achieving consensus in the presence of Byzantine nodes is a relatively time consuming process. This is because of the number of encrypted messages that need to be passed back and forth to tackle any Byzantine node. In the absence of a Byzantine scenario, however, Raft delivers faster block times and transaction finality.

#### Fault tolerance

If there are 2n+1 nodes, up to n can fail without the network losing its consistency. Basically, >50% of the network needs to be online. If the leader crashes, the remainder of the network will automatically elect a new leader after a set period of timeout, and the network will continue to function. 

#### Ordering

A synchronization between the leader and other nodes is made to make sure the orders of transactions are the same for all nodes, before executing them.

#### Performance    

Fast blocktimes (empty blocks are not minted), transaction finality, and on-demand block creation.

### Istanbul Byzantine Fault Tolerance (IBFT)

IBFT is used in situations where you want to run a network despite the presence of mutually distrusting nodes (a Byzantine situation). Consider a scenario where you are forming a consortium that includes competitors. The possibility of a competitor-owned node being compromised or turning malicious cannot be ruled out. You might want to consider IBFT for such scenarios.

IBFT is inspired by PBFT algorithm and is based on the same three-phase consensus: pre-prepare, prepare and commit. Each block requires multiple rounds of voting by a group of validators to arrive at a mutual agreement.

A validator never assumes the 'leader', or 'block proposer', to be correct or honest. To add or evict a validator, at least 2/3 of the existing validators need to pass a vote. Nodes which are elected as block ‘validators’ pick a ‘proposer’ node to propose a new block in a consensus round.

To select a proposer two policies are available:
* Round robin: in a round robin setting, proposer will change in every block and round change. 
* Sticky proposer: in a sticky proposer setting, propose will change only when a round change happens.

#### Fault tolerance

The system can tolerate at most of F faulty nodes in a N validator nodes network, where N = 3F + 1. Basically, >66% of validators need to be online.

#### Ordering

IBFT ensures a single, agreed-upon ordering for transactions in the blockchain.

#### Performance    

Blocks are minted at a constant rate, even if they are empty. Performance may decrease as further validator nodes are added to the network.

