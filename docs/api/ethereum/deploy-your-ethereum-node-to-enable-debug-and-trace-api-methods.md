---
meta:
  - name: description
    content: Learn how to deploy an Ethereum node that supports debug and trace API methods.
  - name: keywords
    content: ethereum debug trace namespaces json rpc methods node deploy
---

# Deploy your Ethereum node to enable debug and trace API methods

## Introduction

The debug and trace API methods are special RPC methods that allow you to replay transactions in the Ethereum Virtual Machine to get the execution details in the exact same way as they happened on the chain.

To get the debug and trace API methods enabled on your Chainstack node, you must deploy a node of a certain configuration which will also depend on your [subscription plan](/platform/manage-your-organization-subscription-plan-and-support-level). Node configurations distribute between the subscription plans as follows:

| API methods | Subscription plan | Node type | Node mode | Client |
| ----------- | ----------------- | --------- | --------- | ------ |
| `debug_*`   | Growth and higher | Dedicated | Full | Geth |
| `debug_*`   | Growth and higher | Dedicated | Archive | Geth |
| `debug_*` and `trace_*` | Growth and higher | Dedicated | Archive | Erigon |
| `debug_*` and `trace_*` | Business and higher | Elastic | Archive | Erigon |

## Deploy a dedicated Ethereum node for the debug and trace API methods

Once you have [joined a public network](/platform/join-a-public-network#join-an-ethereum-network), deploy your dedicated Ethereum node with the `debug_*` or both `debug_*` and `trace_*` API methods enabled:

1. Select the project with the network.
1. Select the network.
1. Click **Add node**.
1. Provide a node name.
1. Under **Type**, select **Dedicated**.
1. Under **Mode**, select one of the following [modes](/operations/ethereum/modes):
   * **Full** — will enable the `debug_*` API method on your node by default. With a full node, you will be able to query historical states for the immediately previous 128 blocks.
   * **Archive** — with an archive node, you will be able to query historical states for the entire chain.
1. Under **Hosting**, select **Chainstack**. See [Support hosting options](/platform/supported-hosting-options).
1. For **Chainstack** hosting, select a cloud provider and a region.
1. If you are deploying a dedicated archive node, under **Client**, select one of the following:
   * **Geth** — to enable the `debug_*` API method on your node.
   * **Erigon** — to enable both `debug_*` and `trace_*` API methods on your node.
1. Review your changes and click **Send request**.

Chainstack Sales team will reach out to your shortly.

## Deploy an elastic Ethereum node for the debug and trace APIs methods

Once you have [joined a public network](/platform/join-a-public-network#join-an-ethereum-network), deploy your elastic Ethereum node with both `debug_*` and `trace_*` API methods enabled:

1. Select the project with the network.
1. Select the network.
1. Click **Add node**.
1. Provide a node name.
1. Under **Type**, select **Elastic**.
1. Under **Mode**, select **Archive**. With an archive node, you will be able to query historical states for the entire chain.
1. Under **Debug and trace APIs**, select **On**.
1. Under **Hosting**, select **Chainstack**.
1. For Chainstack hosting, select a cloud provider and a region.
1. Review your changes and click **Add node**.

The node status will change from **Pending** to **Running** once deployed. You will also see the **Debug and trace** tag next to the node name.

::: tip See also

* [Ethereum API reference](/api/ethereum/ethereum-api-reference)
* [Operations: Ethereum](/operations/ethereum)

:::
