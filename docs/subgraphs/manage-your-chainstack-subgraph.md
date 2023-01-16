---
meta:
  - name: description
    content: Managing your subgraphs in Chainstack.
  - name: keywords
    content: subgraphs graph deploy query graphql indexing data
---

# Manage your Subgraphs

## View your Subgraphs

In <a href="https://console.chainstack.com/subgraphs" target="_blank">Subgraphs</a>, you can view a list of all existing subgraphs and can filter the view using the **Protocol** drop-down list.
Click on a subgraph to open the subgrpah details. The subgraph details includes information such as the **Owner**, **Creation date**, **Region**, and **Protocol**. You can view the **Metrics** about the requests made in the subgraph, view the **Subgraph Deployment command**, and the **Subgraph Query URLs**.

## Monitor your subgraph status

The status of a subgraph is displayed in the **Status** column of the <a href="https://console.chainstack.com/subgraphs" target="_blank">Subgraphs</a> list. The status will be one of the following:

* **Not deployed** — this status is displayed when you create a subgraph in the console but not yet deployed a subgraph.
* **Syncing** — the subgraph is in the process of being deployed and is syncing data.
* **Running** — the subgraph has been successfully deployed.
* **Failed** — the subgraph deployment was unsuccessful.

When you click on a subgraph and open the subgraph details, you will see more information about the progress of the subgraph at the top of the page. The status will be **Deployed. Initial sync in progress** and you can view the percentage completion and the quantity of data that has synced. You can click **Logs** for real time status information about the progress of the sync.<!--  By default, the **Info** filter is selected, and the logs displayed are for the previous .....???minutes....--> You can also filter the logs by **Error**, **Warn**, and **Debug**, and can click **Load older logs** to change the time frame of the logs displayed.

## Delete a subgraph

To delete a subgraph, in the subgraph details page, click **Delete** and confirm by clicking **Yes, I am sure**. Your subgraph is deleted and you return to the <a href="https://console.chainstack.com/subgraphs" target="_blank">Subgraphs</a> section of the console.

## Subgraph billing details

You can view your Subgraphs usage details under <a href="https://console.chainstack.com/subgraphs" target="_blank">Billing</a>. In the **Usage** section, the **Managed Graph requests** table provides the number of requests included in your plan, the number that you have used, and the number that you have used in excess of your allowance. The **Total subgraph hours** shows the total number of hours that your subgraphs have been active.

For information about how to change your Chainstack subscription plan to increase your allowance of included requests, see [Manage your organization subscription plan and support level](../platform/manage-your-organization-subscription-plan-and-support-level.md).

For and changes to dedicated indexers, contact our support team....

## Import my existing subgraph from the hosted service?

Hosted service is being sunset: https://thegraph.com/blog/sunsetting-hosted-service/
we have an import tool: https://github.com/chainstack/graph-tools

<!--  
## PRIVILIGES - on hold - Who else can view and access my subgraphs?

How do I view and change user privileges in the Chainstack console?
PRIVILEGES - ADMINISTERING YOUR CONSOLE, NEED TO ADD INFO HERE ABOUT PRIVILEGES AND PROTECTING API KEYS, AND DEPLOYMENT COMMANDS NOT BEING ABLE TO BE RAN BY JUST ANYONE.
CHAINGING USERS, ROLES, ETC.
-->
::: tip See also

* [Get started with Subgraphs](../subgraphs/quickstart.md)
* [Tutorial - Deploy a Lido subgraph with Chainstack](/subgraphs/tutorial/)

:::
