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

Raft — a [CFT](/glossary/cft) consensus implementation in [etcd](https://etcd.io/).

Hyperledger Fabric uses [orderer nodes](#ordering-service) to form consensus.

See [Hyperledger Fabric: Raft concepts](https://hyperledger-fabric.readthedocs.io/en/latest/orderer/ordering_service.html#raft-concepts).

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

* Peer to peer communication that implements [gossip data dissemination protocol](https://hyperledger-fabric.readthedocs.io/en/latest/gossip.html) over [TLS](https://hyperledger-fabric.readthedocs.io/en/latest/enable_tls.html).
* Node to owner communication implemented as gRPC.

See [Hyperledger Fabric: Peers](https://hyperledger-fabric.readthedocs.io/en/latest/peers/peers.html).

### Certificate Authority

The Certificate Authority component manages the digital identities of the Hyperledger Fabric network participants.

See [Hyperledger Fabric: Certificate Authorities](https://hyperledger-fabric.readthedocs.io/en/latest/identity/identity.html#certificate-authorities).

### Membership Service Provider

The Membership Service Provider component identifies the network participants, their roles, and access privileges based on the Certificate Authority and by listing the participant identities.

See [Hyperledger Fabric: Membership](https://hyperledger-fabric.readthedocs.io/en/latest/membership/membership.html).

### Ordering service

Any transaction in a Hyperledger Fabric network goes through the ordering service before being packaged in a block, distributed to peers, and committed to the ledger by peers.

The ordering service consists of orderer nodes. The orderer nodes form the Raft consensus of the network.

See [Hyperledger Fabric: The Ordering Service](https://hyperledger-fabric.readthedocs.io/en/latest/orderer/ordering_service.html).

## Chaincode

In Hyperledger Fabric terminology, a packaged and deployed smart contract is called a chaincode.

See [Hyperledger Fabric: Smart Contracts and Chaincode](https://hyperledger-fabric.readthedocs.io/en/latest/smartcontract/smartcontract.html).

::: tip See also

* [Tools](/operations/fabric/tools)
* <a href="https://chainstack.com/build-better-with-fabric/" target="_blank">Build better with Hyperledger Fabric</a>

:::
