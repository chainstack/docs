# Quorum Truffle

Configure [Truffle Suite](https://truffleframework.com) to deploy contracts to your Quorum network.

1. Install [Truffle Suite](https://truffleframework.com) and create a project.

::: warning
Use Truffle >= 5.0.14 which has complete Quorum support with privacy features.
:::

2. Create a new environment in `truffle-config.js`, specify `host` and `port` of the node RPC endpoint and include the parameter `type` set to `quorum`:

``` js
module.exports = {
  networks: {
    chainstack: {
      host: "nd-123-456-789.p2pify.com",
      port: 8545,
      network_id: "*",
      gasPrice: 0,
      type: "quorum",
      gas: 4500000
    }
  }
};
```

3. Run `truffle migrate --network chainstack` and Truffle will deploy using Chainstack.

::: tip See also
* [Food supply temperature control on Quorum](/developer-materials/tutorials/food-supply-temperature-control-on-quorum)
* [Loyalty program on Quorum](/developer-materials/tutorials/loyalty-program-on-quorum)
:::