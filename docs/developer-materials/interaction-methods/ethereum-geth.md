# Ethereum Geth

Interact with your Ethereum node using [Geth](https://github.com/ethereum/go-ethereum/wiki/geth).

1. Install [Geth](https://github.com/ethereum/go-ethereum).

2. Use `geth attach` command with the node RPC endpoint:

``` sh
$ geth attach https://nd-123-456-789.p2pify.com:8545
                                                                                 
Welcome to the Geth JavaScript console!

instance: Geth/v1.8.22-stable-7fa3509e/linux-amd64/go1.11.5
 modules: eth:1.0 net:1.0 rpc:1.0 web3:1.0

>
```

3. Invoke any methods from [Web3 JavaScript API](https://github.com/ethereum/wiki/wiki/JavaScript-API).

Example below demonstrates how to get the balance of an address in wei value and convert it to ether value:

``` js
> web3.fromWei(web3.eth.getBalance("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae"))
642538.078574759898951277
```

::: tip See also
* [Ethereum Truffle](/developer-materials/development-tools/ethereum-truffle)
* [Ethereum Embark](/developer-materials/development-tools/ethereum-embark)
:::