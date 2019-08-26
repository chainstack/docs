# Tools

## Interaction tools

### Geth

To interact with your Quorum network, you must install a Quorum Geth client.

::: tip Install Go
To be able to install Quorum Geth, you must install Go first. See [Go: Getting Started](https://golang.org/doc/install).
:::

Having installed Go, install Quorum Geth as described in [Quorum: Installing](https://docs.goquorum.com/en/latest/Getting%20Started/Installing/).

With Quorum Geth installed, you can connect to the Quorum nodes with the `geth attach` command:

``` sh
$ ./geth attach http://nd-123-456-789.rg-123-456.p2pify.com:8545

Welcome to the Geth JavaScript console!

instance: Geth/v1.8.12-stable-c6f0ae4e/linux-amd64/go1.9.7
coinbase: 0xd3c0093b308f4de81d5dc636996b62adee8f66ca
at block: 0 (Thu, 01 Jan 1970 00:00:00 UTC)
 datadir: /run-quorum/blockchain/qdata/dd
 modules: admin:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 raft:1.0 rpc:1.0 txpool:1.0 web3:1.0

>
```

Invoke any methods from [Web3 JavaScript API](https://github.com/ethereum/wiki/wiki/JavaScript-API).

Example below demonstrates how to get the current block number:

``` js
> web3.eth.blockNumber
518973
```

### JSON-RPC API

Interact with your Quorum network using [Geth JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) and [Quorum API](https://docs.goquorum.com/en/latest/Getting%20Started/api/).

Use [curl](https://curl.haxx.se) or [Postman](https://www.getpostman.com) to invoke [Geth JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) and [Quorum API](https://docs.goquorum.com/en/latest/Getting%20Started/api/).

Example below demonstrates how to get basic network information:

``` sh
$ curl -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":2}' \
  http://nd-123-456-789.p2pify.com:8545

{"jsonrpc":"2.0","id":2,"result":"0x4"}
```

## Developments tools

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

* [Food supply temperature control on Quorum](/tutorials/food-supply-temperature-control-on-quorum)
* [Loyalty program on Quorum](/tutorials/loyalty-program-on-quorum)

:::
