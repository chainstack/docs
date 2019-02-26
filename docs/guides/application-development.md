# Application development

## Ethereum

### Prerequisites

Deploy an Ethereum node with Chainstack, and make a note of the connection details for the node.

### Connecting to Ethereum node using CLI

1. Install [geth](https://github.com/ethereum/go-ethereum) on your local machine. Once installed, [these are the commands](https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options) you can use.

2. Use `geth attach` command with the connection details for the node:

``` sh
$ geth attach https://nd-123-456-789.rg-123-456.p2pify.com:8545
                                                                                 
Welcome to the Geth JavaScript console!

instance: Geth/v1.8.22-stable-7fa3509e/linux-amd64/go1.11.5
 modules: eth:1.0 net:1.0 personal:1.0 rpc:1.0 web3:1.0
```

### Connecting to Ethereum node using Truffle

1. Install [Truffle Suite](https://truffleframework.com/), [HD Wallet-enabled Web3 provider](https://github.com/trufflesuite/truffle-hdwallet-provider) and create a project.

2. Add node connection details to `truffle-config.js`:

``` js
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = 'pattern enroll upgrade ...'
...
module.exports = {
 networks: {
    mainnet: {
        provider: () => new HDWalletProvider(mnemonic, "https://nd-123-456-789.rg-123-456.p2pify.com:8545"),
        network_id: 1
    },
   }
  }
};
```
