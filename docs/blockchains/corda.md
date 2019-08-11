# Corda

Corda is an open-source blockchain platform.

Corda is different from public *permissionless* blockchain protocols in that it provides:

* Transactions between identifiable parties.
* Transaction privacy parties.
* Legal certainty for the transactions.

Corda is different from *permissioned* consortium blockchain protocols in that it provides:

* The ability for a diverse user-base with vastly different business-logic and flow requirements to co-exist and interoperate on the same network.
* The ability for the nodes to have direct peer-to-peer communication over TLS for transaction privacy.

## Corda network structure

The Corda network has the following major components:

* Node
* CorDapp
* Network map service
* Identity service

The Corda network has the following major concepts:

* Ledger
* States
* Transactions
* Contracts
* Flows
* Certificates
* Notary services

### Components

#### Node

A node is a JVM instance.

Each node has a unique identity on the network in the form of:

* A certificate issued to the node by the [identity service](/blockchains/corda#identity-service).
* The node's IP address.

Each node has two communication interfaces:

* Node to node communication implemented as [AMQP 1.0](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-overview-v1.0-os.html) over TLS using [Apache ActiveMQ Artemis](https://activemq.apache.org/components/artemis/).
* Node to owner communication implemented as RPC.

Each node keeps historic (consumed) and current (unconsumed) states of on-ledger facts shared between nodes participating in transactions. No node on the network has read access to the entirety of the ledger. Two or more nodes participating in a transaction always have the same read access to the subset of the ledger relevant to the transaction.

Each node can be configured to be:

* A regular node — a node with a certificate, two communication interfaces, and a ledger.
* A node with CorDapp — a distributed application running a [contract](/blockchains/corda#contracts) and a [flow](/blockchains/corda#flows).
* A node with a [notary service](/blockchains/corda#notary-services) — a notary node.

#### CorDapp

A CorDapp is a Corda Distributed Application.

A CorDapp is an application running on a node that defines the logic of updating the ledger and on-ledger facts. Since updating the ledger requires achieving consensus, a CorDapp must run on at least two nodes participating in a transaction.

Each CorDapp has the two following major components:

* Contract — a set of rules for a transaction to be considered valid and accepted. See [Contracts](/blockchains/corda#contracts).
* Flow — an automated set of actions for the node to run on receiving an RPC request from the node owner. See [Flows](/blockchains/corda#flows).

#### Network map service

The network map service is the catalog of all nodes on the Corda network with the information on the node identities, node certificates, and node IP addresses.

Each node on the Corda network keeps a copy of the network map.

Each node entry in the network map is signed by the node it represents; this makes each entry tamper-proof.

#### Identity service

A [Corda Network Foundation](https://corda.network/governance/index.html) service that signs the [root network certificates](/blockchains/corda#certificates) and admits the nodes to the Corda network.

### Concepts

#### Ledger

On the Corda network, a ledger is an on-ledger subset of a database maintained by each node. The node database keeps both on-ledger and off-ledger data.

The on-ledger data is always available to at least two nodes participating in a transaction. The on-ledger data available to at least two nodes is referred to as on-ledger facts.

No node on the network has read access to the entirety of the ledger.

#### States

A state is an object representing an on-ledger fact.

A state can be:

* Historic (consumed)
* Current (unconsumed)

A consumed state is a past state of an on-ledger fact.

An unconsumed state is the current state of an on-ledger fact.

As each state is immutable, it does not change as an object. Instead, each state goes through a state sequence where it has a new version of the state appended to the chain of states. The latest version of the state is considered unconsumed; all prior versions are considered consumed.

A new state version is appended to the chain of states with a valid and accepted transaction between nodes.

#### Transactions

A transaction is a message between at least two nodes that acts as a proposal to update the ledger.

A transaction is considered valid and updates the ledger if:

* The transaction does not have a double-spend as verified by the [notary service](/blockchains/corda#notary-services).
* The transaction meets the [contract](/blockchains/corda#contracts) rules as part of a CorDapp running on all nodes that are a part of the transaction.
* The transaction is signed by all nodes participating in the transaction.

#### Contracts

A contract is a set of rules written in a JVM programming language. A contract is running on a node as a part of a CorDapp.

Each transaction must meet the set of rules defined in the contract to be considered contractually valid.

#### Flows

A flow is an automated set of actions that a node runs on receiving an RPC request from the node owner.

A flow is basically an automated business process split into a sequence of specific actions that the node owner does not have to manually initiate each time.

#### Certificates

The Corda network has three types of certificates:

* The root network certificate. This is the certificate signed by [Corda Network Foundation](https://corda.network/governance/index.html) and acts as admission to the Corda network.
* The doorman certificate. This is the certificate signed by the entities with the root network certificate.
* Node-signed certificates. This is the certificate that can be signed by any node admitted to the Corda network.

#### Notary services

A notary service is a part of a node on the Corda network that turns a regular node into a notary node.

The objective of a notary node is to check transactions for double-spending. If the transaction is unique and is not a double-spend attempt, the notary node signs the transaction. If the transaction is a double-spend attempt, the notary node rejects the transaction.

Notary nodes can run in a cluster. Each notary node cluster has a consensus algorithm. Notary node clusters on the Corda network can have different consensus algorithms.

Corda currently comes with the following consensus implementations:

* Single-node — the default single-node notary verification. Recommended for production.
* Raft — an experimental [CFT](/glossary/cft) implementation. Not recommended for production.
* BFT-Smart — an experimental [BFT](/glossary/bft) implementation. Not recommended for production.

::: tip See also

* [Corda documentation](https://docs.corda.net)

:::
