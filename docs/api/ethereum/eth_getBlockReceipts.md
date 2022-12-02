---
meta:
  - name: description
    content: eth_getBlockReceipts JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py python ethereum erigon
---

# Ethereum eth_getBlockReceipts RPC method

Ethereum API method that returns all transaction receipts for a given block. This method is available on Erigon only.

## Enable Erigon client on your dedicated Ethereum node

::: tip Information

Available on the Growth subscription plan and higher.

:::

Once you have [joined a public network](/platform/join-a-public-network#join-an-ethereum-network), do the following:

1. Select the project with the network.
1. Select the network.
1. Click **Add node**.
1. Provide a node name.
1. Under **Type**, select **Dedicated**.
1. Under **Mode**, select **Archive**. With an archive node, you will be able to query historical states for the entire chain.
1. Under **Hosting**, select **Chainstack**. See [Support hosting options](/platform/supported-hosting-options).
1. For **Chainstack** hosting, select a cloud provider and a region.
1. Under **Client**, select **Erigon**.
1. Review your changes and click **Send request**.

Chainstack Sales team will reach out to your shortly.

## Enable Erigon client on your elastic Ethereum node

::: tip Information

Available on the Business subscription plan and higher.

:::

Once you have [joined a public network](/platform/join-a-public-network#join-an-ethereum-network), do the following:

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

**Parameters:**

* `quantity or tag` — the block hash, block number encoded as hexadecimal, or the string with:
    * `latest` — the latest block that is to be validated. The Beacon Chain may reorg and the latest block can become orphaned.
    * `safe` — the block that is equal to the tip of the chain and is very unlikely to be orphaned.
    * `finalized` — the block that is accepted by the two thirds of the Ethereum validators.
    * `earliest` — the genesis block.
    * `pending` — the pending state and transactions block.

**Returns:**

* `result` — the array of objects with:
  * `Transaction receipt` — the object with:
    * `blockHash` — the block hash. `null` if pending.
    * `blockNumber` — the block number.
    * `contractAddress` — the contract address created if it is a contract creation transaction; otherwise `null`.
    * `cumulativeGasUsed` — the total amount of gas used in the block when this transaction was executed.
    * `effectiveGasPrice` — the actual value of gas deducted from the sender's account.
    * `from` — the sender's address.
    * `gasUsed` — the amount of gas used by this specific transaction alone.
    * `logs` — this transaction's array of log objects generated.
    * `logsBloom` — the bloom filter for light clients to quickly retrieve related logs.
    * `status` —  the success status: `1` for success or `0` for failure.
    * `to` — the receiver's address. `null` if it is a contract creation transaction.
    * `transactionHash` — the transaction hash.
    * `transactionIndex` — the transaction index.

**Example:**

<CodeSwitcher :languages="{py:'web3.py', cr:'cURL'}">

<template v-slot:py>

``` py
from web3 import Web3
node_url = "CHAINSTACK_NODE_URL"
web3 = Web3.HTTPProvider(node_url)

block_receipts = web3.make_request('eth_getBlockReceipts', ['latest'])
print(block_receipts)
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H 'Content-Type: application/json' \
  --data '{"method":"eth_getBlockReceipts","params":["latest"], "jsonrpc":"2.0","id":1}'
```

</template>
</CodeSwitcher>
