---
meta:
  - name: description
    content: Introduction to the Subgraphs feature and a summary of the section of the documentation.
  - name: keywords
    content: subgraph graph quickstart deploy query graphql blockchain node network
---

# Introduction

Chainstack Subgraphs remove the complexity of extracting and processing data from archive nodes and deliver an intuitive UI for Web3 developers to easily filter and query data. When you deploy a subgraph and configure the query criteria, all successful hits are indexed and the results are stored in a PostgreSQL database. A GraphQL endpoint is created that you can use to access the most recent data from your subgraph, synchronized to the latest block.

Coupled with Chainstack elastic archive nodes, Chainstack Subgraphs is the most powerful blockchain data indexing solution available. It provides extremely fast sync times and near-zero latency to keep your subgraphs at the latest block. Enterprise-grade infrastructure reliability and support will ensure you get the best of the data indexing with Chainstack.

## Supported protocols

Currently, Chainstack Subgraphs support the following protocols:

* Ethereum
* Polygon
* BNB Smart Chain
* Avalanche

## Pricing

*	**Elastic archive**—It costs $0.1/h for computing (each subgraph) and there are different numbers of included resources per plan:
* * **Developer plan**—Subgraphs is not available.
* * **Growth plan**—up to 3 subgraphs and 50k requests included.
* * **Business plan**—up to 10 subgraphs and 350k requests included. NOTE: If you exceed the allotted requests in your plan, you can upgrade to another plan.
* * **Enterprise extra**—unlimited subgraphs and 1M included requests on Enterprise Extra requests. NOTE: When you exceed the allowance, it's $0.00025 per request ($250 per million requests or $0.25 per thousand requests)
*	**Dedicated indexer**—the dedicated indexer pricing has the following types on offer:
* * **Standard**—$4,015 per month - ~40 sub-graphs, 100RPS
* * **Medium**—$8,030 per month - ~100 sub-graphs, 200-500RPS
* * **Large**—$19,527 per month - ~500 sub-graphs, 1000RPS

::: tip See also
Learn about Chainstack Subgraphs and indexing and querying data from the blockchain:

* [Create a subgraph](/subgraphs/create-a-subgraph.md)—useful information about The Graph and subgraph description files, and links to where you can find more detailed information.
* [Query subgraphs](/subgraphs/query-a-subgraph.md)—details and best practices for writing queries for subgraphs and links to where you can find more information.
* [Quickstart](/subgraphs/quickstart.md)—a short guide to get you up and running quickly with Chainstack Subgraphs.
*	[Manage your Subgraphs](/subgraphs/manage-your-chainstack-subgraph.md)—helpful "How to" information about managing your subgraphs in the Chainstack console.
*	[Tutorial](/subgraphs/tutorial/README.md)—a step-by-step tutorial about how to deploy the Lido subgraph with Chainstack.

:::