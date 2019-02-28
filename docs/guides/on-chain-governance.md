# On-chain governance

While Chainstack provides high level features to govern a consortium project 'off-chain', governance of the networks should be managed 'on-chain', on the selected blockchain protocol, using its built-in consensus mechanism.

This guide provides a brief overview of the consensus mechanisms available per blockchain protocol.
When selecting a consensus mechanism, as implemented by various blockchain protocols, members should consider:
* If the protocol permits whitelisting/blacklisting of specific member nodes
* How fault-tolerant the consensus mechanism with the blockchain protocol is, from technical failures and security breaches
* Security versus performance trade-offs
* If there is a risk that a single or group of malicious members taking control of the network

## MultiChain

### Round Robin with Mining Diversity

With a higher diversity setting, at the expense of technical malfunction risk, members can control how secure from malicious attacks a network can be.

## Quorum

### Raft

With Raft-based consensus, if BFT is not a requirement, member organizations can add as many nodes as they wish to a network without compromising the network. Any node can be a leader (minter) or follower (verifier).

### IBFT

Any member or group of members that control two-thirds of the nodes in the network with malicious intentions could compromise the network. If this is a concern, choose another consensus mechanism.

## Hyperledger Fabric

### Solo

This consensus mechanism is meant for development and testing use only, not production.

### Kafka

Any member or group of members that control one-third of the nodes in the network with malicious intentions could compromise the network. If this is a concern, choose another consensus mechanism.

## Ethereum

### Proof of Authority

On-chain, sealers can vote to grant validating permissions to other non-sealers/validators. Chainstack does not limit the number of nodes that each member organization can add to a blockchain network. There is no risk that a member owning a majority of the nodes can perform malicious activities.