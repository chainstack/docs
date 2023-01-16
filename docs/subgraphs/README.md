---
meta:
  - name: description
    content: Introduction to the Subgraphs feature and a summary of the section of the documentation.
  - name: keywords
    content: subgraph graph quickstart deploy query graphql blockchain node network
---

# Introduction

Chainstack Subgraphs remove the complexity of extracting and processing data from archive nodes and deliver an intuitive UI for web3 developers to easily filter and query data. When you deploy a subgraph and configure the query criteria, all successful hits are indexed and the results are stored in a PostgreSQL database. A GraphQL endpoint is created that you can use to access the most recent data from your subgraph, synchronized to the latest block.

Coupled with Chainstack elastic archive nodes, Chainstack Subgraphs is the most powerful blockchain data indexing solution available. It provides extremely fast sync times and near-zero latency to keep your subgraphs at the latest block. Enterprise-grade infrastructure reliability and support will ensure you get the best of the data indexing with Chainstack.

## Supported protocols

Currently, Chainstack Subgraphs support the following protocols:

**Elastic**:

| Ethereum    | Polygon     | BNB Smart Chain | Avalanche |
| :---------------- | :---------| :-------  | :---------- |

**Dedicated**:

| Gnosis Chain    | Near     | Polygon  | Celo        |
| :---------------- | :---------| :-------  | :---------- |
| **Arbitrum**        | **Avalanche** | **Fantom**   | **Fuse**        |
| **Moonriver**        | **Aurora**   | **Moonbeam** | **Boba Network**|
| **BNB Smart Chain** | **Optimism** | **Harmony**  | *And any other EVM compatible chain* |

## Plans and pricing

* **Elastic archive** — Elastic archive subgraphs cost $0.1/h for computing and our subscription plans include the following resources:
  * **Developer plan** — Subgraphs is not available.
  * **Growth plan** — up to 3 subgraphs and 50k requests included.
  * **Business plan** — up to 10 subgraphs and 350k requests included.
  * **Enterprise extra** — unlimited subgraphs and 1M included requests on Enterprise Extra requests. When you exceed the allowance, it's $0.00025 per request ($250 per million requests or $0.25 per thousand requests).

* **Dedicated indexer** — a dedicated indexer can deploy multiple subgraphs across different chains. The available dedicated indexer types and their hardware requirements are:

| Setup        | Postgres  (CPUs) | Postgres  (memory in GB) | Postgres  (disk in TBs) | VMs  (CPUs) | VMs  (memory in GB) |
| ------------ | ---------------- | ------------------------ | ----------------------  | ----------- | ------------------- |
| Standard     | 8                | 30                       | 1                       | 12          | 46                  |
| Medium       | 16               | 64                       | 2                       | 32          | 64                  |
| Large        | 72               | 468                      | 3.5                     | 48          | 184                 |

Contact our support team for more information about setting up a Dedicated indexer.

::: tip See also
Learn about Chainstack Subgraphs and indexing and querying data from the blockchain:

* [Get started with Subgraphs](/subgraphs/quickstart.md) — a guide to get you up and running with Chainstack Subgraphs.
* [Manage your Subgraphs](/subgraphs/manage-your-chainstack-subgraph.md) — information about managing your subgraphs in the Chainstack console.
* [Tutorial](/subgraphs/tutorial/README.md) — a step-by-step tutorial about how to deploy the Lido subgraph with Chainstack.

:::
