---
meta:
  - name: description
    content: Hyperledger Fabric is an open-source permissioned distributed ledger platform. Learn about the Hyperledger Fabric consensus, network structure, and chaincodes.
  - name: keywords
    content: hyperledger fabric blockchain consensus chaincode
---

# Hyperledger Fabric

Hyperledger Fabric is an open-source permissioned distributed ledger platform.

Hyperledger Fabric is different from public *permissionless* blockchain protocols in that it provides:

* Privacy for transactions and confidentiality for organization data.
* Membership services that allow for permissioned and identifiable network participant enrollment.

Hyperledger Fabric is different from *permissioned* consortium blockchain protocols in that it provides:

* A modular architecture that allows customization for particular use cases and trust models.

## Consensus

Raft — a [CFT](/glossary/cft) consensus implementation in <a href="https://etcd.io/" rel="nofollow">etcd</a>.

Hyperledger Fabric uses [orderer nodes](#ordering-service) to form consensus.

See <a href="https://hyperledger-fabric.readthedocs.io/en/release-2.0/orderer/ordering_service.html#raft-concepts" rel="nofollow">Hyperledger Fabric 2.0: Raft concepts</a>.

## Network structure

Hyperledger Fabric has the following foundational components:

* Peers
* Certificate Authority (CA)
* Membership Service Provider (MSP)
* Ordering service

### Peers

Peers are nodes in a Hyperledger Fabric network.

Peers host ledgers and [chaincodes](#chaincode).

Each peer has two communication interfaces:

* Peer to peer communication that implements <a href="https://hyperledger-fabric.readthedocs.io/en/release-2.0/gossip.html" rel="nofollow">gossip data dissemination protocol</a> over <a href="https://hyperledger-fabric.readthedocs.io/en/release-2.0/enable_tls.html" rel="nofollow">TLS</a>.
* Node to owner communication implemented as gRPC.

See <a href="https://hyperledger-fabric.readthedocs.io/en/release-2.0/peers/peers.html" rel="nofollow">Hyperledger Fabric 2.0: Peers</a>.

### Certificate Authority

The Certificate Authority component manages the digital identities of the Hyperledger Fabric network participants.

See <a href="https://hyperledger-fabric.readthedocs.io/en/release-2.0/identity/identity.html#certificate-authorities" rel="nofollow">Hyperledger Fabric 2.0: Certificate Authorities</a>.

### Membership Service Provider

The Membership Service Provider component identifies the network participants, their roles, and access privileges based on the Certificate Authority and by listing the participant identities.

See <a href="https://hyperledger-fabric.readthedocs.io/en/release-2.0/membership/membership.html" rel="nofollow">Hyperledger Fabric 2.0: Membership</a>.

### Ordering service

Any transaction in a Hyperledger Fabric network goes through the ordering service before being packaged in a block, distributed to peers, and committed to the ledger by peers.

The ordering service consists of orderer nodes. The orderer nodes form the Raft consensus of the network.

See <a href="https://hyperledger-fabric.readthedocs.io/en/release-2.0/orderer/ordering_service.html" rel="nofollow">Hyperledger Fabric 2.0: The Ordering Service</a>.

## Chaincode

In Hyperledger Fabric terminology, a packaged and deployed smart contract is called a chaincode.

See <a href="https://hyperledger-fabric.readthedocs.io/en/release-2.0/smartcontract/smartcontract.html" rel="nofollow">Hyperledger Fabric 2.0: Smart Contracts and Chaincode</a>.

::: tip See also

* [Tools](/operations/fabric/tools)
* [Build better with Hyperledger Fabric](https://chainstack.com/build-better-with-fabric/)

:::
