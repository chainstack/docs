---
meta:
  - name: description
    content: Learn the difference between a Polygon zkEVM full node and an archive node. Run sample commands to see the difference.
  - name: keywords
    content: polygon zkevm node full archive difference
---

# Modes

Chainstack currently supports deploying a Polygon zkEVM node in the full mode only.

A Polygon zkEVM full node deployed with Chaistack currently stores the full blockchain data and an archive of historical states starting from the chain genesis.

Polygon zkEVM support most of the [JSON-RPC methods](https://eth.wiki/json-rpc/API#the-default-block-parameter) that support querying at a block number. See [Polygon zkEVM documentation](https://github.com/0xPolygonHermez/zkevm-node/blob/develop/docs/json-rpc-endpoints.md) for the full list of supported methods.

Query example to get the balance of an address at different block numbers with ethers.js:

``` js
const ethers = require('ethers');
const NODE_URL = "YOUR_CHAINSTACK_ENDPOINT";
const provider = new ethers.JsonRpcProvider(NODE_URL);
const eth_getBlockNumber = async () => {
    const balance = await provider.send("eth_getBalance", ["YOUR_PUBLIC_ADDRESS", "latest"]);
    console.log(balance);
  };
eth_getBlockNumber();
```

::: tip See also

* [Networks](/operations/polygon-zkevm/networks)
* [Tools](/operations/polygon-zkevm/tools)
* [Tutorials](/tutorials/polygon-zkevm/)

:::
