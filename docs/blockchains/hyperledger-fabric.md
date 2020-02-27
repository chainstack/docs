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

See [Hyperledger Fabric 2.0: Raft concepts](https://hyperledger-fabric.readthedocs.io/en/release-2.0/orderer/ordering_service.html#raft-concepts).

## Network structure

Hyperledger Fabric has the following foundational components:

* Peers
* Certificate Authority (CA)
* Membership Service Provider (MSP)
* Ordering service

### Peers

Peers are nodes in a Hyperledger Fabric network.

Peers host ledgers and [chaincodes](#chaincode).

See [Hyperledger Fabric 2.0: Peers](https://hyperledger-fabric.readthedocs.io/en/release-2.0/peers/peers.html).

### Certificate Authority

The Certificate Authority component manages the digital identities of the Hyperledger Fabric network participants.

See [Hyperledger Fabric 2.0: Certificate Authorities](https://hyperledger-fabric.readthedocs.io/en/release-2.0/identity/identity.html#certificate-authorities).

### Membership Service Provider

The Membership Service Provider component identifies the network participants, their roles, and access privileges based on the Certificate Authority and by listing the participant identities.

See [Hyperledger Fabric 2.0: Membership](https://hyperledger-fabric.readthedocs.io/en/release-2.0/membership/membership.html).

### Ordering service

Any transaction in a Hyperledger Fabric network goes through the ordering service before being packaged in a block, distributed to peers, and committed to the ledger by peers.

The ordering service consists of orderer nodes. The orderer nodes form the Raft consensus of the network.

See [Hyperledger Fabric 2.0: The Ordering Service](https://hyperledger-fabric.readthedocs.io/en/release-2.0/orderer/ordering_service.html).

## Chaincode

In Hyperledger Fabric terminology, a packaged and deployed smart contract is called a chaincode.

See [Hyperledger Fabric 2.0: Smart Contracts and Chaincode](https://hyperledger-fabric.readthedocs.io/en/release-2.0/smartcontract/smartcontract.html).

::: tip See also

* [Tools](/operations/hyperledger-fabric/tools)

:::
