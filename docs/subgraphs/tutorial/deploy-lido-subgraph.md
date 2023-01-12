---
meta:
  - name: description
    content: Learn to deploy a subgraph to Chainstack Subgraphs and query data.
  - name: keywords
    content: subgraph graph lido deploy query graphql indexing data
---

# Deploying a Lido subgraph with Chainstack

Lido is a liquid staking solution with smart contracts deployed on multiple blockchains, with Ethereum being its main focus.  

In this tutorial, we will learn how to deploy a subgraph to Chainstack.

## Prerequisites

* A [Chainstack account](https://console.chainstack.com/user/login) to deploy your subgraph.
* A basic understanding of The Graph protocol. [The Graph docs](https://thegraph.com/docs/en/) are an excellent place to start.

## Overview

To get from zero to a deployed subgraph with Chainstack:

* Create a [subgraph](https://console.chainstack.com/subgraphs) in your project.
* Set up a subgraph development environment in your system.
* Configure your subgraph by creating new entities and handler functions.
* Deploy the subgraph using your Chainstack console.
* Query the subgraph using Chainstack’s Query URL or GraphQL UI URL.

## Step-by-step

### Create a subgraph project

::: tip Information
Subgraphs must be associated with a project; if you don’t already have a project to add the subgraph to, see [create a project](/platform/create-a-project).
:::

1. In <a href="https://console.chainstack.com/subgraphs" target="_blank">Subgraphs</a>, click **Add subgraph**. The **Add subgraph** page is displayed.
1. In the **Choose network** section:
   * Choose a **Blockchain protocol**.
   * Choose the **Network**.
   * Choose the **Type**.
   * Click **Next**. The **Create subgraph** section is displayed.
1. In the **Create subgraph** section:
     * Enter a **Name** for the subgraph.
     * Select the **Project** that you want to assign your subgraph to.
     * Click **Add subgraph**. The details page of the new subgraph is displayed.

### Set up a subgraph development environment

**Before you begin**
You need to have the following packages installed globally:

* A recent version of [Node JS](https://nodejs.org/en/). We recommend that you install the current LTS version globally.
* [graph-cli](https://www.npmjs.com/package/@graphprotocol/graph-cli) to compile and deploy subgraphs from the command line.

1. Open up your terminal in the directory you want to create your project in. Then run:

    ```bash
    graph init
    ```

1. This will open up a UI interface inside your command line. Set up your subgraph project with the following prompts:

    ```bash
    Protocol: Ethereum
    Product for which to initialize: Subgraph-studio
    Subgraph slug: (**You can leave this empty**)
    Directory to create the subgraph in: LidoChainstack
    Ethereum network: mainnet
    Contract address: 0x47EbaB13B806773ec2A2d16873e2dF770D130b50
    Contract Name: Lido
    Index contract events as entities: Y
    ```

1. The graph-cli will now download the ABI of the smart contract we provided and install all the dependencies of our project automatically. This might take a while.
1. You will now be asked if you want to add another smart contract to your subgraph. This is because a single subgraph can actually index multiple smart contracts. Say ‘*false*’, and then move your terminal into the directory of your newly created project.

Before moving on, let us take a look at what we did here. The original Lido smart contract is deployed [here](https://etherscan.io/address/0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84). You will notice that this is different from the address we used just now. This is because the Lido contract uses the EIP-897 DelegateProxy concept to implement an upgradeable smart contract. 

This means if we use the actual smart contract address to set up our subgraph project, we will download the ABI of the proxy contract, which is not what we need.
The implementation contract is deployed [here](https://etherscan.io/address/0x47ebab13b806773ec2a2d16873e2df770d130b50).

### Configure the subgraph

A subgraph project consists of three main files:

* `schema.graphql`: this file defines the data sources we actually want to index, and how to query said data.
* `subgraph.yaml`: the subgraph manifest YAML file contains references to the contract ABIs, Graph QL schemas, and assembly script mappings, amongst other things.
* `Subgraph mappings`: mappings define event handlers in charge of managing and storing data on The Graph node.

Let us define a query for our subgraph.

1. The graph tries to generate some queries for us automatically by looking at the smart contract. Go to the schema.graphql file and delete everything. Now define a new entity as follows:

   ```bash
    type ApprovalQuery @entity(immutable: true) {
      id: ID!
      owner: Bytes!
      spender: Bytes!
      value: BigInt!
    }
    ```

    An entity can be thought of as an object that contains data. The data in our case comes from the Lido smart contract.

1. Go to `subgraph.yaml` and delete everything. Paste the following code inside it.

   ```yaml
    specVersion: 0.0.5
    schema:
      file: ./schema.graphql
    dataSources:
      - kind: ethereum
        name: Lido
        network: mainnet
        source:
          address: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84"
          abi: Lido
          startBlock: 11473216
        mapping:
          kind: ethereum/events
          apiVersion: 0.0.7
          language: wasm/assemblyscript
          entities:
            - ApprovalQuery
          abis:
            - name: Lido
              file: ./abis/Lido.json
          eventHandlers:
            - event: Approval(indexed address,indexed address,uint256)
              handler: ApprovalHandler
          file: ./src/lido.ts
    ```

    Here are the major changes we made to the YAML file:

    * Changed the contract address to the original address.
    * Added a start block property. This means that our subgraph will start indexing data only from this specific block number, which saves us indexing time and resources. The Lido contract was deployed at this block number, thus it makes no sense to index data older than this.
    * Referenced the name of our entity under the ‘entities’ object.
    * Our entity will index data that is emitted every time the Approval event is triggered in the Lido contract. For each event handler that is defined in the `subgraph.yaml`, we need to create a handler function in the `src/lido.ts` file. This file in each subgraph project is generally referred to as the mappings file.

    Whenever we update the schema file, the graph needs to generate some AssemblyScript code using the updated schema and the contract ABI. To do so, run:

    ```yaml
    graph codegen
    ```

1. Go to `src/lido.ts` and delete everything inside. Now paste the following code inside it:

   ```yaml
    import {
      Approval
    } from "../generated/Lido/Lido"
    import {
      ApprovalQuery
    } from "../generated/schema"

    export function ApprovalHandler(event: Approval): void {
      let entity = new ApprovalQuery(
        event.transaction.hash.toHex() + '-' + event.logIndex.toString()
      )

      entity.owner = event.params.owner
      entity.spender = event.params.spender
      entity.value = event.params.value

      entity.save()
    }
   ```

    The approval event is triggered whenever an address allows another address to spend some tokens on its behalf. In this code, we export a single function. This function declares a new object called `entity` that has three properties to mirror the emitted data from the approval event. We save this entity using `entity.save()`. Also, note that we use the transaction hash and logIndex to generate a unique id for all our entities. You can read more about this in [The Graph](https://thegraph.com/docs/en/developing/creating-a-subgraph/#recommended-ids-for-creating-new-entities) documentation.

1. Save all your files and run this command in your terminal:

    ```yaml
    graph build
    ```

    This command compiles your subgraph. And that’s it. We are now ready to deploy our subgraph.

Please note that this is a basic subgraph built to index data from the Lido smart contract. Lido has several smart contracts deployed on Ethereum, and they also have a Github repo for the subgraph they built to monitor their smart contracts. If you want to have a more detailed look at their contracts/subgraph, you can start [here](https://github.com/lidofinance/lido-subgraph).

### Deploy to Chainstack Subgraphs

1. Open your Chainstack Subgraphs console.
1. To deploy your subgraph, copy the deployment command and run it in a terminal at the root of your project directory.

    The deployment command from the Chainstack console will look like the following:

    ```solidity
    graph deploy --node https://api.graph-eu.p2pify.com/API_KEY/deploy --ipfs https://api.graph-eu.p2pify.com/API_KEY/ipfs PROJECT_NAME
    ```

1. Run the command. Enter any version number of your choice and press Enter.
1. If your subgraph is successfully deployed, your terminal will look like this:

    ```jsx
    Deployed to https://chainstack.com/subgraphs/SG-123-456-789

    Subgraph endpoints:
    Queries (HTTP):     https://ethereum-mainnet.graph-eu.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/my_subgraph_v1_0
    ```

### Query your Subgraph

You can use the Query URL to interact directly with your subgraph from within the terminal. Alternatively, you can use the GraphQL UI URL from your console to interact with your subgraph using your browser.

To use the Query URL, open your terminal and run the following CURL command:

```bash
curl -g \-X POST \-H "Content-Type: application/json" \-d '{"query":"{approvalQueries {id owner spender value} }"}' \<Your https Chainstack Query URL>
```

To use GraphQL UI URL, copy the URL and open it in your browser. 

Now run the following query:

```bash
{
  approvalQueries{
    id
    owner
    spender
    value
  }
}
```

This query will give us the requested data from any transaction that leads to the approval event being invoked from the main Lido contract.

## Conclusion

This tutorial guided you through creating a new subgraph project and deploying it to your dedicated, super-fast Chainstack infrastructure.

You can follow more tutorials on our docs, or you can check out our <a href="https://chainstack.com/blog/" target="_blank">blog</a>.