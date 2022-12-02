---
meta:
  - name: description
    content: Introduction to Subgraphs and instructions on creating a new subgraph and querying.
  - name: keywords
    content: subgraph graph query graphql indexing data
---

# Subgraphs

::: details
This is a closed beta. If you want to participate, contact *kirill.balakhonov@chainstack.com*
:::

## Introduction

Subgraphs remove the complexity of extracting and processing data from archive nodes and deliver an intuitive UI for Web3 developers to easily filter and query data. When you deploy a subgraph and configure the query criteria, all successful hits are indexed, and the results are stored in a PostgreSQL database. A GraphQL endpoint is created that you can use to access the most recent data from your subgraph, synchronised to the latest block.

This document provides you with an introduction to Subgraphs and walks you through how to add, create, and deploy a subgraph, and how to query subgraph data.

## Set up a subgraph

To set up a subgraph, complete the following steps:

1. [**Add a subgraph**](./subgraphs.md#add-a-subgraph)
1. [**Create and configure a subgraph**](./subgraphs.md#create-and-configure-a-subgraph)
1. [**Deploy a subgraph**](./subgraphs.md#deploy-a-subgraph)

### Add a subgraph

In <a href="https://console.chainstack.com/subgraphs" target="_blank">Subgraphs</a>, you can view a list of all existing subgraphs and can filter the view using the **Protocol** drop-down list. You can create a new subgraph using the **Add subgraph** button and view the details of a subgraph by clicking on the subgraph name.

Subgraphs must be associated with a project; if you don’t already have a project to add the subgraph to, see [create a project](/platform/create-a-project).

**To add a subgraph:**

1. Click **Add subgraph**. The **Add subgraph** page is displayed.
1. In the **Choose network** section:
   * Choose a **Blockchain protocol**.
   * Choose the **Network**. Currently, **Mainnnet** is supported.
   * Choose the **Type**.
   * Click **Next**. The **Create subgraph** section is displayed.
1. In the **Create subgraph** section:
     * Enter a **Name** for the subgraph.
     * Select the **Project** that you want to assign your subgraph to. The **Estimated cost** of your subgraph is displayed.
     * Click **Add subgraph**. The details page of the new subgraph is displayed.
  
The subgraph details page includes information such as the **Owner**, **Creation date**, **Region**, and **Protocol**. You can view the **Metrics** about the requests made in the subgraph, view the **Subgraph Query URLs**, and the **Subgraph Deployment command**, which you require to deploy the subgraph.

### Create and configure a subgraph

**Before you begin**: you must have Graph CLI installed globally to build and deploy subgraphs. You can install it with npm as follows:

``` sh
npm install -g @graphprotocol/graph-cli
```

To check if the Graph CLI was installed correctly, run:

``` sh
graph –v
```

**To create and configure a subgraph:**

1. Open a new directory in your terminal and run:

    ``` sh
    graph init
    ```

1. Configure all the required parameters that are displayed in the CLI. The Graph will download your smart contract’s ABI and install all the dependencies by running `npm install` automatically.
1. Set up your `schema.graphql` file to define all the entities and key-value pairs that you want to query.
1. Go to your manifest file (`subgraph.yaml`) and make sure all the deployment parameters are correctly defined. We recommended that you only start indexing data from the block number of the first transaction that you want to track as this can save a lot of indexing time.
1. To generate AssemblyScript types for the entities defined in your schema file, in your root directory, run:

    ``` sh
    graph codegen
    ```

1. When your mappings file is configured, run:

   ``` sh
    graph build
    ```

    When your subgraph compiles successfully, you are now ready to deploy your subgraph.

### Deploy a subgraph

**To deploy your new subgraph**:

1. In <a href="https://console.chainstack.com/subgraphs" target="_blank">Subgraphs</a>, open the details page of your new subgraph and copy the **Deployment command**, which will have the following format:

    ``` sh
    graph deploy --node https://graph.chainstack.com/3c6e0b8a9c15224a8228b9a98ca1531d/deploy --ipfs https://graph.chainstack.com/3c6e0b8a9c15224a8228b9a98ca1531d/ipfs my_subgraph_v1_0
    ```

1. Paste and run the command in your CLI.
1. Enter a version label for your subgraph (you can use any number/letter character combination). If the subgraph is successfully deployed, you will receive a response like the following example:

    ``` sh
    Deployed to https://chainstack.com/subgraphs/SGR-123-456-789

    Subgraph endpoints:
    Queries (HTTP):     https://elastic-subgraphs.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/my_subgraph_v1_0
    ```

In the subgraph details page, the status of the subgraph will change to **Deployed. Initial sync in progress** and will continuously provide feedback on the progress of the synchronization process. When it completes, the status will change to **Up to date**.

::: tip
If the subgraph is in the **Failed** state, click **Logs** to view four levels of messages generated by the indexer and troubleshoot the issue.
:::


## Query a subgraph

To query a subgraph, you can choose from two the either of the following **Subgraph query** options in the subgraph details page:

* **Query URL** — use this URL to query in the CLI.
* **GraphQL UI URL** — use this URL to query in the GraphQL UI.

### Query URL in CLI

To query your subgraph in the CLI, copy the **Query URL** from the subgraph details page and add it to the query. For example, to query transactions:

``` sh
curl -g \\
-X POST \\
-H "Content-Type: application/json" \\
-d '{"query":"{myTransactions(first: 5) { id  _value _from _to}}"}' \\
     https://elastic-subgraphs.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/my_subgraph_v1_0
```

### GraphQL UI URL query in browser

To query the subgraph using the GraphQL UI, copy the GraphQL UI URl from the subgraph details page and paste it in your browser. The GraphQL UI is displayed, where you can enter the details of your query.

::: tip See also

* [The Graph documentation](https://thegraph.com/docs/en/about/)

:::
