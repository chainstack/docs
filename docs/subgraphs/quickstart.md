---
meta:
  - name: description
    content: Introduction to Subgraphs and instructions on creating a new subgraph and querying.
  - name: keywords
    content: subgraph graph deploy query graphql indexing data
---

# Quickstart

## Introduction

This guide provides you with a brief overview of how to initialize and create a subgraph from an existing smart contract, deploy the subgraph on Chainstack, and how to query subgraph data.

::: tip Information
If you're not familiar with The Graph, we recommend that you read [The Graph documentation](https://thegraph.com/docs/en/about/) before proceeding.
:::

1. [**Create your subgraph in the Chainstack console**](./subgraphs.md#create-a-subgraph-in-the-chainstack-console)
2. [**Install the Graph CLI**](./subgraphs.md#install-the-graph-cli)
3. [**Initialize the subgraph**](./subgraphs.md#initialize-the-subgraph)
4. [**Write the subgraph definition**](./subgraphs.md#write-the-subgraph-definition)
5. [**Deploy the subgraph**](./subgraphs.md#deploy-the-subgraph)
6. [**Query your subgraph**](./subgraphs.md#query-the-subgraph)

### Create a subgraph in the Chainstack console

::: tip Information
Subgraphs must be associated with a project; if you don’t already have a project to add the subgraph to, see [create a project](/platform/create-a-project).
:::

1. In <a href="https://console.chainstack.com/subgraphs" target="_blank">Subgraphs</a>, click **Add subgraph**. The **Add subgraph** page is displayed.
2. In the **Choose network** section:
   * Choose a **Blockchain protocol**. Currently, the following protocols are supported:
   * * Ethereum
   * * Polygon
   * * BNB Smart Chain
   * * Avalanche
   * Choose the **Network**.
   * Choose the **Type**. ----Note: if you select the Dedicated indexer option, and email is sent to support and they will contact you with the details of how to proceed.----
   * Click **Next**. The **Create subgraph** section is displayed.
3. In the **Create subgraph** section:
     * Enter a **Name** for the subgraph.
     * Select the **Project** that you want to assign your subgraph to.
     * Click **Add subgraph**. The details page of the new subgraph is displayed.
  
The subgraph details page includes information such as the **Owner**, **Creation date**, **Region**, and **Protocol**. You can view the **Metrics** about the requests made in the subgraph, view the **Subgraph Query URLs**, and the **Subgraph Deployment command**, which you require to deploy the subgraph.

### Install the Graph CLI

To install the Graph CLI, run:

``` sh
npm install -g @graphprotocol/graph-cli
```

### Initialize the subgraph

Open a new directory in your terminal and run:

``` sh
graph init
```

Configure all the required parameters that are displayed in the CLI. The Graph will download your smart contract’s ABI and install all the dependencies by running `npm install` automatically.

### Write the subgraph definition

The previous two steps create a scaffold subgraph that you can use to build your subgraph descrition using the following files:

* Manifest (subgraph.yaml) - The manifest defines what datasources your subgraphs will index.
* Schema (schema.graphql) - The GraphQL schema defines what data you wish to retreive from the subgraph.
* AssemblyScript Mappings (mapping.ts) - This is the code that translates data from your datasources to the entities defined in the schema.

For more information about these files, see [Create a subgraph](/subgraphs/create-a-subgraph.md).

when you've written your subgraph, to generate AssemblyScript types for the entities defined in your schema file, in your root directory, run:

``` sh
graph codegen
```

When your mappings file is configured, run:

``` sh
graph build
```

When your subgraph compiles successfully, you are now ready to deploy your subgraph.

### Deploy the subgraph

**Deploy your new subgraph**:

1. In <a href="https://console.chainstack.com/subgraphs" target="_blank">Subgraphs</a>, open the details page of the subgraph you created in [the first step](./subgraphs.md#create-a-subgraph-in-the-chainstack-console) and copy the **Deployment command**, which will have the following format:

    ``` sh
    graph deploy --node https://api.graph-eu.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/deploy --ipfs https://api.graph-eu.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/ipfs my_subgraph_v1_0
    ```

1. Paste and run the command in your CLI.
1. Enter a version label for your subgraph (you can use any number/letter character combination). If the subgraph is successfully deployed, you will receive a response like the following example:

    ``` sh
    Deployed to https://chainstack.com/subgraphs/SG-123-456-789

    Subgraph endpoints:
    Queries (HTTP):     https://ethereum-mainnet.graph-eu.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/my_subgraph_v1_0
    ```

In the subgraph details page, the status of the subgraph will change to **Deployed. Initial sync in progress** and will continuously provide feedback on the progress of the synchronization process. When it completes, the status will change to **Up to date**.

::: tip Information
If the subgraph is in the **Failed** state, click **Logs** to view messages generated by the indexer and check its status.
:::

### Deploy an existing subgraph

You can also use Chainstack Subgraphs to deploy an already completed subgraph project. To do so:

* Make sure your code is thoroughly tested and ready to go.
* Go to your project’s directory on your local machine. If your code is deployed on a remote repository, clone it to your system using the git clone command:

``` sh
git clone <insert repo URL>
```

From a terminal pointing to the root of the project, run any one of these two commands:

``` sh
yarn
```

OR

``` sh
npm install
```

This will install all the dependencies of your subgraph project as referenced in the `package.json`.

To generate the subgraph schema and AssemblyScript types for your smart contracts, run:

``` sh
graph codegen
```

To compile your subgraph, run:

``` sh
graph build
```

If everything in your project is configured correctly, your subgraph should now be compiled and ready to be deployed.

To deploy your subgraph, copy and run the deploy command from your deployed subgraph on Chainstack, as shown in the previous secton.

## Query the subgraph

To query a subgraph, you can choose from either of the following **Subgraph query** options in the subgraph details page:

* **Query URL** — use this URL to query in the CLI.
* **GraphQL UI URL** — use this URL to query in the GraphQL UI.

### Query URL in CLI

To query your subgraph in the CLI, copy the **Query URL** from the subgraph details page and add it to the query. For example, to query transactions:

``` sh
curl -g \\
-X POST \\
-H "Content-Type: application/json" \\
-d '{"query":"{myTransactions(first: 5) { id  _value _from _to}}"}' \\
     https://ethereum-mainnet.graph-eu.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/my_subgraph_v1_0
```

### GraphQL UI URL query in browser

To query the subgraph using the GraphQL UI, locate the GraphQL UI URL in the subgraph details page, hover your mouse over the URL, and click the **Open** button that's displayed. The GraphQL UI open in your browser, where you can enter the details of your query.

For more detailed information about the rules and best practices for writing GraphQL queries, see [Query Subgraphs](../subgraphs/query-a-subgraph.md).

::: tip See also

* [Create a subgraph](/subgraphs/create-a-subgraph.md)
* [Graph documentation — Creating a subgraph](https://thegraph.com/docs/en/developing/creating-a-subgraph/)

:::
