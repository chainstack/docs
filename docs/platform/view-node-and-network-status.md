---
meta:
  - name: description
    content: View the status of your nodes and networks deployed with the Chainstack managed blockchain services.
  - name: keywords
    content: blockchain node network status monitor
---

# View node and network status

You can view the node and network status in the **Status** column of your nodes list or your networks list.

## Node statuses

| Node status | Description                              |
|-------------|------------------------------------------|
| Running     | The node is running without any issues.  |
| Pending     | The node is being deployed.              |
| Maintenance | The node is in maintenance mode.         |
| Stopped     | The node is stopped.                     |
| Stopping    | The node is stopping.                    |
| Starting    | The node is starting.                    |
| Failed      | The node has failed to deploy.           |
| Error       | The node is running with errors.         |

## Consortium network statuses

| Network status | Description                                                                                                             |
|----------------|-------------------------------------------------------------------------------------------------------------------------|
| OK             | At least one of the nodes is `Running`. Other nodes can be `Stopped`, `Stopping`, `Starting`, `Pending`, `Maintenance`. |
| Pending        | The network is being deployed.                                                                                          |
| Stopped        | All nodes are `Stopped`.                                                                                                |
| Stopping       | At least one of the nodes is `Stopping`. Other nodes are `Stopped`.                                                     |
| Starting       | The first node of the stopped network is `Starting`.                                                                   |
| Warning        | At least one of the nodes is `Failed` or in `Error`.                                                                    |
| Failed         | The network has failed to deploy.                                                                                       |

## Public chain network status

| Network status | Description                                                                                                             |
|----------------|-------------------------------------------------------------------------------------------------------------------------|
| OK             | At least one of the nodes is `Running`. Other nodes can be `Stopped`, `Stopping`, `Starting`, `Pending`, `Maintenance`. |
| Warning        | At least one of the nodes is `Failed` or in `Error`.                                                                    |

::: tip
In the unlikely case that a node enters a failed state or an error state, there is no action required on your part as the Chainstack team will be immediately alerted and resolve the issue.
:::

::: tip See also

* [View activity log](/platform/view-activity-log)
* [Consortium project](/glossary/consortium-project)
* [Public chain project](/glossary/public-chain-project)

:::
