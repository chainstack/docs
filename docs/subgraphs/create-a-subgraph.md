---
meta:
  - name: description
    content: Detailed overview of the main files in subgraphs and what is required to create a subgraph.
  - name: keywords
    content: schema mapping assemblyscript typescript entities data subgraph graph deploy query graphql indexing data
---

# Create a subgraph

## About The Graph

The Graph is a protocol for indexing and querying data from blockchains using GraphQL. It's backed by the open source implementation of [Graph node](https://github.com/graphprotocol/graph-node).

To index specific transactions on The Graph and make them available to query, you create and define subgraphs.

## Subgraphs definition

The subgraph definition consists of the following 3 main files that you need to interact with:

* **subgraph.yaml**: the subgraph manifest file is a YAML file that defines the data sources that the subgraph indexes.
* **schema.graphql**: the schema file is where you define what data is stored for your subgraph, and how to retrieve that data using GraphQL.
* **AssemblyScript Mappings**: the mappings file is the AssemblyScript code that translates from the event data to the entities defined in your schema

### The Subgraph Manifest

The subgraph manifest `subgraph.yaml` defines the smart contracts your subgraph indexes, which events from these contracts to recognize, and how to map event data to entities that the Graph Node stores and allows to query. For details of the complete specification for subgraph manifests, see [here](https://github.com/graphprotocol/graph-node/blob/master/docs/subgraph-manifest.md).

### The GraphQL Schema

The schema for your subgraph is in the file `schema.graphql`. GraphQL schemas are defined using the GraphQL interface definition language. If you're new to writing GraphQL schema, we recommended that you check out the [GraphQL documentation](https://graphql.org/learn/). The Graph documentation provides reference documentation for GraphQL schemas in the [GraphQL API](https://thegraph.com/docs/en/querying/graphql-api/) section.

### The AssemblyScript Mappings

Mappings are written in a subset of [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) called [AssemblyScript](https://github.com/AssemblyScript/assemblyscript/wiki) which can be compiled to WASM ([WebAssembly](https://webassembly.org/)). The mappings transform the data your mappings are sourcing into entities defined in your schema.

For each event handler that is defined in `subgraph.yaml` under `mapping.eventHandlers`, you create an exported function of the same name. Each handler must accept a single parameter called `event` with a type corresponding to the name of the event which is being handled.

## Install the Graph CLI

The starting point for working with subgraphs is to install the [Graph CLI](https://github.com/graphprotocol/graph-cli). You must have Graph CLI installed globally to build and deploy subgraphs.

The `graph init` command sets up a new subgraph project from an existing contract on any of the public Ethereum networks. When you have written the subgraph manifest, you use the graph CLI to store the subgraph definition in IPFS and tell the indexer to begin indexing your subgraph data.

Once you've successfully deployed the subgraph, you can start to query the subgraph data.

::: tip Information
For an example of how to modify the subgraph definition files in a subgraph, how to build and deploy the subgraph, and how to query data, see our tutorial on [deploying the Lido subgraph](../subgraphs/tutorial/README.md).
:::

::: tip See also

* For more detailed information on creating a subgraph, see The Graph documentation [Creating a Subgraph](https://thegraph.com/docs/en/developing/creating-a-subgraph/).
  
* You can find a full list of subgraphs on the [Graph Explorer](https://thegraph.com/explorer).
  
:::
