# Interacting with the blockchain

## MultiChain

### Prerequisites

Deploy an MultiChain node on Chainstack, and make a note of the connection details for the node.

### Interacting with MultiChain node using JSON-RPC API

Tools like [curl](https://curl.haxx.se) or [Postman](https://www.getpostman.com) can be used to invoke [MultiChain API methods](https://www.multichain.com/developers/json-rpc-api/).

Example below demonstrates how to get basic network information:

``` sh
$ curl -H "Content-Type: application/json" \
  -u amazing-crier:puppy-amino-volhard-dash-baggie-marrow
  -d '{"method":"getinfo","params":[],"id":1,"chain_name":"nw-123-456-7"}' \
  https://nd-123-456-789.p2pify.com:8545

{"result":{"version":"2.0","nodeversion":20000901,"protocolversion":20004,"chainname":"nw-123-456-7", ...}
```

## Quorum

### Prerequisites

Deploy an Quorum node on Chainstack, and make a note of the connection details for the node.

### Interacting with Quorum node using Geth JavaScript Console

::: tip
Quorum includes a fork of [Geth](https://github.com/ethereum/go-ethereum/wiki/geth), and as such, Quorum nodes can be inspected using [Geth JavaScript Console](https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console).
:::

1. Install [Geth](https://github.com/ethereum/go-ethereum)

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

### Interacting with Quorum node using JSON-RPC API

Tools like [curl](https://curl.haxx.se) or [Postman](https://www.getpostman.com) can be used to invoke [Geth](https://github.com/ethereum/wiki/wiki/JSON-RPC) or [Quorum-specific](https://docs.goquorum.com/en/latest/api/) API methods.

Example below demonstrates how to get the current number of blocks in the blockchain:

``` sh
$ curl -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":2}' \
  http://nd-123-456-789.p2pify.com:8545

{"jsonrpc":"2.0","id":2,"result":"0x4"}
```

## Ethereum

### Prerequisites

Deploy an Ethereum node on Chainstack, and make a note of the connection details for the node.

### Interacting with Ethereum node using Geth JavaScript Console

1. Install [Geth](https://github.com/ethereum/go-ethereum)

2. Use `geth attach` command with the node RPC endpoint:

``` sh
$ geth attach https://nd-123-456-789.p2pify.com:8545
                                                                                 
Welcome to the Geth JavaScript console!

instance: Geth/v1.8.22-stable-7fa3509e/linux-amd64/go1.11.5
 modules: eth:1.0 net:1.0 rpc:1.0 web3:1.0

>
```

3. Invoke any methods from [Web3 JavaScript API](https://github.com/ethereum/wiki/wiki/JavaScript-API)

Example below demonstrates how to get the balance of an address in wei value and convert it to ether value:

``` js
> web3.fromWei(web3.eth.getBalance("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae"))
642538.078574759898951277
```
