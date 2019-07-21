# Quorum Geth

Interact with your Quorum network using [Quorum Geth](https://github.com/jpmorganchase/quorum/releases/).

1. Install [Quorum Geth](https://github.com/jpmorganchase/quorum/releases/).

2. Use `geth attach` command with the node RPC endpoint:

``` sh
$ geth attach http://nd-123-456-789.p2pify.com:8545
                                                                                 
Welcome to the Geth JavaScript console!

instance: Geth/v1.8.12-stable-c6f0ae4e/linux-amd64/go1.9.7
coinbase: 0x0e7ed4494fe7744f5eeeb5425acd4218df3163f0
at block: 0 (Thu, 01 Jan 1970 07:30:00 +0730)
 datadir: /run-quorum/blockchain/qdata/dd
 modules: admin:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 raft:1.0 rpc:1.0 txpool:1.0 web3:1.0

>
```

3. Invoke any methods from [Web3 JavaScript API](https://github.com/ethereum/wiki/wiki/JavaScript-API)

Example below demonstrates how to get the current block number:

``` js
> web3.eth.blockNumber
518973
```

::: tip See also
* [Quorum Truffle](/developer-materials/development-tools/quorum-truffle)
* [Quorum JSON-RPC API](/developer-materials/interaction-methods/quorum-json-rpc)
:::