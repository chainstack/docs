---
meta:
  - name: description
    content: View the logs of your nodes deployed with the Chainstack managed blockchain services.
  - name: keywords
    content: blockchain node logs logging network
---

# View node logs

You can view the logs for your [dedicated nodes](/glossary/dedicated-node) on the Growth, Business, and Enterprise <a href="https://chainstack.com/pricing/" target="_blank">subscription plans</a>.

To view the node logs:

1. Click your project.
1. Click your network.
1. Click the node name.
1. Click **Logs**.

For Hyperledger Fabric, you additionally filter the logs by:

* Peer — the logs of your Hyperledger Fabric [peer](/blockchains/fabric#peers).
* Chaincode server — logs of your chaincode external builder and launcher. See also Hyperledger Fabric documentation: [External Builders and Launchers](https://hyperledger-fabric.readthedocs.io/en/release-2.0/cc_launcher.html) and [Chaincode as an external service](https://hyperledger-fabric.readthedocs.io/en/release-2.0/cc_service.html).

For Quorum, you additionally filter the logs by:

* Geth — the logs of your instance of Quorum Geth.
* Transaction manager — the logs of your instance of the Tessera transaction manager. See also Quorum documentation: [What is Tessera](https://docs.goquorum.com/en/latest/Privacy/Tessera/Tessera/).

The timestamps in the log entries are displayed in your local time.

The logs are stored for 7 days. Logs older than 7 days are automatically deleted.

::: tip See also

* [View node and network status](/platform/view-node-and-network-status)
* [View node resources allocation](/platform/view-node-resources-allocation)
* [View activity log](/platform/view-activity-log)

:::
