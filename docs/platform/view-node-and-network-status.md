---
meta:
  - name: description
    content: View the status of your nodes and networks deployed with the Chainstack managed blockchain services.
  - name: keywords
    content: blockchain node network status monitor
---

# View node and network status

You can view the node and network status in the **Status** column of your nodes list or your networks list.

[Consortium project](/glossary/consortium-project):

| Node status | Network status | Description                              |
|-------------|----------------|------------------------------------------|
| Running     | Running        | All network nodes are running.           |
| Maintenance | Running        | The node is in maintenance mode.         |
| Failed      | Error          | The node has failed to deploy.           |
| Error       | Error          | The node is deployed but malfunctioning. |

[Public chain project](/glossary/public-chain-project):

| Node status | Network status | Description                              |
|-------------|----------------|------------------------------------------|
| Running     | OK             | Your nodes are running.                  |
| Maintenance | OK             | The node is in maintenance mode.         |
| Failed      | OK             | The node has failed to deploy.           |
| Error       | OK             | The node is deployed but malfunctioning. |

In the unlikely case that a node enters a failed state or an error state, there is no action required on your part as the Chainstack team will be immediately alerted and resolve the issue.

::: tip See also

* [View activity log](/platform/view-activity-log)
* [Consortium project](/glossary/consortium-project)
* [Public chain project](/glossary/public-chain-project)

:::
