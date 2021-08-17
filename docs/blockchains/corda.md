---
meta:
  - name: description
    content: Corda is an open-source blockchain platform. Learn about the Corda consensus, network structure, transactions, contracts and flows that make CorDapps.
  - name: keywords
    content: corda blockchain cordapp contract node
---

# Corda

Corda is an open-source blockchain platform.

Corda is different from public *permissionless* blockchain protocols in that it provides:

* Transactions between identifiable parties.
* Transaction privacy between parties.
* Legal certainty for the transactions.

Corda is different from *permissioned* consortium blockchain protocols in that it provides:

* The ability for a diverse user-base with vastly different business-logic and flow requirements to co-exist and interoperate on the same network.
* The ability for the nodes to have direct peer-to-peer communication over TLS for transaction privacy.

## Consensus

* Single Notary — one notary node runs the [notary service](#notary-service) for the deployed network.
* Raft — a [CFT](/glossary/cft) consensus implementation on [Atomix](https://atomix.io/). See [Crash fault-tolerant (experimental)](https://docs.corda.net/running-a-notary.html#crash-fault-tolerant-experimental).
* BFT-SMaRt — a [BFT](/glossary/bft) consensus implementation. See [Byzantine fault-tolerant (experimental)](https://docs.corda.net/running-a-notary.html#byzantine-fault-tolerant-experimental).

## Network structure

The Corda network has the following foundational components:

* Node
* Network map service
* Notary service

### Node

A node is a JVM instance.

Each node has a unique identity on the network in the form of:

* A certificate issued to the node.
* The node's IP address.

Each node has two communication interfaces:

* Node to node communication implemented as [AMQP 1.0](https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-overview-v1.0-os.html) over TLS using [Apache ActiveMQ Artemis](https://activemq.apache.org/components/artemis/).
* Node to owner communication implemented as RPC.

Each node keeps historic (consumed) and current (unconsumed) states of on-ledger facts shared between nodes participating in transactions. No node on the network has read access to the entirety of the [ledger](#ledger). Two or more nodes participating in a transaction always have the same read access to the subset of the ledger relevant to the transaction.

Each node can be configured to be:

* A regular node — a node with a certificate, two communication interfaces, a ledger, and one or more CorDapps.
* A node with a [notary service](#notary-service) — a notary node.

### Network map service

The network map service is the catalog of all nodes on a [compatibility zone](#compatibility-zones) with the information on the node identities, node certificates, and node IP addresses.

### Notary service

A notary service is a part of a node on the Corda network that turns a regular node into a notary node.

The objective of a notary node is to check transactions for double-spending. If the transaction is unique and is not a double-spend attempt, the notary node signs the transaction. If the transaction is a double-spend attempt, the notary node rejects the transaction.

## Network operation

The Corda network has the following operational components and concepts:

* CorDapp
* Ledger
* States
* Transactions
* Contracts
* Flows
* Compatibility zones
* Certificates

### CorDapp

A CorDapp is a Corda Distributed Application.

A CorDapp is an application running on a node that defines the logic of updating the ledger and on-ledger facts. Since updating the ledger requires achieving consensus, a CorDapp must run on at least two nodes participating in a transaction.

Each CorDapp has the two following major components:

* Contract — a set of rules for a transaction to be considered valid and accepted. See [Contracts](#contracts).
* Flow — an automated set of actions for the node to run on receiving an RPC request from the node owner. See [Flows](#flows).

### Ledger

On the Corda network, a ledger is an on-ledger subset of a database maintained by each node. The node database keeps both on-ledger and off-ledger data.

The on-ledger data is always available to at least two nodes participating in a transaction. The on-ledger data available to at least two nodes is referred to as on-ledger facts.

No node on the network has read access to the entirety of the ledger.

### States

A state is an object representing an on-ledger fact.

A state can be:

* Historic (consumed)
* Current (unconsumed)

A consumed state is a past state of an on-ledger fact.

An unconsumed state is the current state of an on-ledger fact.

As each state is immutable, it does not change as an object. Instead, each state goes through a state sequence where it has a new version of the state appended to the chain of states. The latest version of the state is considered unconsumed; all prior versions are considered consumed.

A new state version is appended to the chain of states with a valid and accepted transaction between nodes.

### Transactions

A transaction is a message between at least two nodes that acts as a proposal to update the ledger.

A transaction is considered valid and updates the ledger if:

* The transaction does not have a double-spend as verified by the [notary service](#notary-service).
* The transaction meets the [contract](#contracts) rules as part of a CorDapp running on all nodes that are a part of the transaction.
* The transaction is signed by all nodes participating in the transaction.

### Contracts

A contract is a set of rules written in a JVM programming language. A contract is running on a node as a part of a CorDapp.

Each transaction must meet the set of rules defined in the contract to be considered contractually valid.

### Flows

A flow is an automated set of actions that a node runs on receiving an RPC request from the node owner.

A flow is basically an automated business process split into a sequence of specific actions that the node owner does not have to manually initiate each time.

### Compatibility zones

A compatibility zone is a deployed network instance that is managed by a network operator.

There are compatibility zones managed by [Corda Network Foundation](https://corda.network/governance/index.html):

* [Corda Network](https://corda.network/) — the production Corda network.
* [Corda Pre-Production Network](https://corda.network/participation/preprod) — the pre-production Corda network.

There are also non-Corda Network Foundation managed compatibility zones. These are networks that rely on custom network map and doorman services to discover the nodes and control network permissions. These zones are managed by organizations deploying the zones and acting as network operators for the zones.

::: tip See also

* [Corda documentation](https://docs.corda.net)
* <a href="https://chainstack.com/build-better-with-corda/" target="_blank">Build better with Corda</a>

:::
