---
meta:
  - name: description
    content: View the resources dynamically allocated to your nodes deployed with the Chainstack managed blockchain services.
  - name: keywords
    content: blockchain node resource cpu storage memory
---

# View node resources allocation

You can view the resources dynamically allocated to each of your [dedicated nodes](/glossary/dedicated-node).

To view the resources allocated to your nodes:

1. Click your project.
1. Click your network.
1. Click the node name.
1. Under **Resources**, hover over **Dynamic**.

## Understand node resources allocation

Corda:

* Node — the CPU, memory, and storage allocated to your Corda node.
* Database — the CPU, memory, and storage allocated to your [Corda node database](https://docs.corda.net/docs/corda-os/4.4/node-database.html).

Hyperledger Fabric:

* Node — the storage allocated to your peer to maintain the state and a copy of the ledger.
* Peer — the CPU and memory allocated to your peer.
* Chaincode server — the CPU and memory allocated to the chaincode external builder and launcher. See also Hyperledger Fabric documentation: [External Builders and Launchers](https://hyperledger-fabric.readthedocs.io/en/release-2.0/cc_launcher.html) and [Chaincode as an external service](https://hyperledger-fabric.readthedocs.io/en/release-2.0/cc_service.html).

Quorum:

* Node — the storage allocated to your Quorum to maintain the ledger.
* Geth — the CPU and memory allocated to Quorum Geth.
* TM — the CPU and memory allocated to the Tessera transaction manager. See also Quorum documentation: [What is Tessera](https://docs.goquorum.com/en/latest/Privacy/Tessera/Tessera/).

MultiChain:

* Node — the CPU, memory, and storage allocated to your MultiChain node.

Ethereum:

* Node — the CPU, memory, storage, and ancient storage allocated to your Ethereum node. The ancient storage is for the Geth freezer database to separately keep the ledger data older than three epochs. See also [an Ethereum blog post](https://blog.ethereum.org/2019/07/10/geth-v1-9-0/) for the detailed freezer explanation.

Bitcoin:

* Node — the CPU, memory, and storage allocated to your Bitcoin node.

::: tip See also

* [View node logs](/platform/view-node-logs)
* [View node and network status](/platform/view-node-and-network-status)
* [View activity log](/platform/view-activity-log)

:::
