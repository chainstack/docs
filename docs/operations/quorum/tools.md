# Tools

## Interaction tools

### Geth

To interact with your Quorum network, you must install a [Quorum Geth client](https://github.com/jpmorganchase/quorum/releases/).

Quorum Geth is a fork of [Geth](https://github.com/ethereum/go-ethereum/).

This section guides you through downloading the latest release of Quorum Geth and building it on Ubuntu.

1. Install Go

To be able to build Quorum Geth, you must install [Go](https://golang.org/).

Install Go from the `longsleep/golang-backports` PPA:

``` sh
sudo add-apt-repository ppa:longsleep/golang-backports
sudo apt-get update
sudo apt-get install golang-go
```

2. Build Quorum Geth

Download the latest [Quorum Geth release](https://github.com/jpmorganchase/quorum/releases/):

``` sh
wget https://github.com/jpmorganchase/quorum/archive/v2.2.4.tar.gz
```

Unpack the downloaded archive:

``` sh
tar -xvzf v2.2.4.tar.gz
```

Change to the Quorum Geth directory:

``` sh
cd quorum-2.2.4
```

Run `make` to build Quorum Geth:

``` sh
make geth
```

This will create a standalone `geth` executable in `/quorum-2.2.4/build/bin/`. You can run it from the folder or move anywhere you want.

You can now connect to the Quorum nodes with the `geth attach` command:

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

Invoke any methods from [Web3 JavaScript API](https://github.com/ethereum/wiki/wiki/JavaScript-API)

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
