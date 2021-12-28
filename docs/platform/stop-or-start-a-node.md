---
meta:
  - name: description
    content: Learn how to stop or start a node deployed with the Chainstack managed blockchain services.
  - name: keywords
    content: blockchain network consortium node stop start
---

# Stop or start a node

You can stop and start your deployed nodes.

A stopped node in Chainstack-provided hosting retains its state and does not incur metered compute costs but does incur storage costs.

A stopped node in private hosting does not incur maintenance costs.

A stopped node does not sync. When you start a stopped node, the node will start syncing again and will take some time to fully sync.

To stop or start a node:

1. Click your project.
1. Click a network in the project.
1. Select the node to stop or start. Click **Stop** or **Start**.

In a [consortium project](/glossary/consortium-project), stopping the first deployed [peer node](/glossary/peer-node) will stop the entire network, including the [service nodes](/glossary/service-node).

::: tip See also

* [View node and network status](/platform/view-node-and-network-status)
* [View service nodes](/platform/view-service-nodes)

:::
