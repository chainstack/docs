---
meta:
  - name: description
    content: Learn how to interact with your Polygon zkEVM node, deploy smart contracts through your node, and develop DApps.
  - name: keywords
    content: polygon zkevm truffle web3 dapp geth hardhat
---

# Tools

## Interaction tools

### Erigon

Chainstack uses [Erigon](https://github.com/ledgerwatch/erigon) to give your Polygon zkEVM node access to L1.

Erigon is smaller in size and can be interacted with by using [Erigon RPC methods](https://github.com/ledgerwatch/erigon/blob/devel/cmd/rpcdaemon/README.md#rpc-implementation-status).

### MetaMask

On [node access details](/platform/view-node-access-and-credentials), click **Add to MetaMask**.

## Development tools

### Truffle

Configure [Truffle Suite](https://truffleframework.com/) to deploy contracts to your Polygon zkEVM nodes.

1. Install [Truffle Suite](https://truffleframework.com/), [HD Wallet-enabled Web3 provider](https://github.com/trufflesuite/truffle/tree/develop/packages/hdwallet-provider), and create a project.
2. Install the [dotenv](https://www.npmjs.com/package/dotenv) package to securely load your sensitive variables from a `.env` file
3. Create a new environment, and define a new network, in `truffle-config.js`:

    ``` js
    require('dotenv').config();
    const HDWalletProvider = require("@truffle/hdwallet-provider");
    module.exports = {
      networks: {
        zkEVMTestnet: {
          provider: () => {
            return new HDWalletProvider([process.env.YOUR_PRIVATE_KEY], `${process.env.YOUR_CHAINSTACK_ENDPOINT}`);
          },
          network_id: 1442,
        },

      },
      compilers: {
        solc: {
          version: "0.8.17",
          settings: {
            optimizer: {
              enabled: true,
              runs: 50,
            },
          },
        },
      },


    };
    ```

### Hardhat

Configure [Hardhat](https://hardhat.org/) to deploy contracts and interact through your Polygon zkEVM nodes.

1. Install [Hardhat](https://hardhat.org/) and create a project.
2. Install the [dotenv](https://www.npmjs.com/package/dotenv) package to securely load your sensitive variables from a `.env` file
3. Create a new environment in `hardhat.config.js`:  

    ``` js
    require("@nomicfoundation/hardhat-toolbox");
    require('dotenv').config();

    module.exports = {
      solidity: "0.8.18",
      defaultNetwork: "zkEVM_testnet",
      networks: {
        zkEVM_testnet: {
            url: `${process.env.YOUR_CHAINSTACK_ENDPOINT}`,
            accounts: [process.env.YOUR_PRIVATE_KEY]
        },
    },

    };
    ```

### web3.js

Build DApps using [web3.js](https://github.com/ethereum/web3.js/) and Polygon zkEVM nodes deployed with Chainstack.

1. Install [web3.js](https://web3js.readthedocs.io/).
2. Connect over HTTP or WebSocket.

#### HTTPS

Use the `HttpProvider` object to connect to your node HTTPS endpoint and get the latest block number:

``` js
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('YOUR_CHAINSTACK_ENDPOINT'));

web3.eth.getBlockNumber().then(console.log);

```

where YOUR_CHAINSTACK_ENDPOINT is your node HTTPS endpoint protected either with the key or password.

#### WSS

Use the `WebsocketProvider` object to connect to your node WSS endpoint and get the latest block number:

``` js
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.WebsocketProvider('YOUR_CHAINSTACK_ENDPOINT'));

web3.eth.getBlockNumber().then(console.log);

```

where YOUR_CHAINSTACK_ENDPOINT is your node WSS endpoint protected either with the key or password.

### web3.py

Build DApps using [web3.py](https://github.com/ethereum/web3.py) and Polygon zkEVM nodes deployed with Chainstack.

1. Install [web3.py](https://web3py.readthedocs.io/).
2. Connect over HTTP or WebSocket. See also [EVM node connection: HTTP vs WebSocket](https://support.chainstack.com/hc/en-us/articles/900002187586-Ethereum-node-connection-HTTP-vs-WebSocket).

#### HTTPS

Use `HTTPProvider` to connect to your node endpoint and get the latest block number.

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` py
from web3 import Web3

web3 = Web3(Web3.HTTPProvider('YOUR_CHAINSTACK_ENDPOINT'))
print(web3.eth.block_number)
```

</template>
<template v-slot:pp>

``` py
from web3 import Web3

web3 = Web3(Web3.HTTPProvider('https://%s:%s@%s'% ("USERNAME", "PASSWORD", "HOSTNAME")))
print(web3.eth.block_number)
```

</template>
</CodeSwitcher>

where

- YOUR_CHAINSTACK_ENDPOINT — your node HTTPS endpoint protected either with the key or password
- HOSTNAME — your node HTTPS endpoint hostname
- USERNAME — your node access username (for password-protected endpoints)
- PASSWORD — your node access password (for password-protected endpoints)

#### WSS

Use the `WebsocketProvider` object to connect to your node WSS endpoint and get the latest block number.

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` py
from web3 import Web3

web3 = Web3(Web3.WebsocketProvider('YOUR_CHAINSTACK_ENDPOINT'))
print(web3.eth.block_number)
```

</template>
<template v-slot:pp>

``` py
from web3 import Web3

web3 = Web3(Web3.WebsocketProvider('wss://%s:%s@%s'% ("USERNAME", "PASSWORD", "HOSTNAME")))
print(web3.eth.block_number)
```

</template>
</CodeSwitcher>

where

- YOUR_CHAINSTACK_ENDPOINT — your node WSS endpoint protected either with the key or password
- HOSTNAME — your node WSS endpoint hostname
- USERNAME — your node access username (for password-protected endpoints)
- PASSWORD — your node access password (for password-protected endpoints)

See also [WebSocket connection to an EVM node](https://support.chainstack.com/hc/en-us/articles/900001918763-WebSocket-connection-to-an-Ethereum-node).

### Node.js

You can build a web app to query data using node.js and [axios](https://www.npmjs.com/package/axios):

``` js
const axios = require("axios");

const payload = {
    jsonrpc: "2.0",
    id: 0,
    method: "eth_blockNumber",
    params: []

};

(async () => {
    const response = await axios.post(`YOUR_CHAINSTACK_ENDPOINT`, payload)
    console.log(response.data)
})();
```

- YOUR_CHAINSTACK_ENDPOINT — your Chainstack node endpoint protected either with the key or password. See node access details.
- `query` — your JSON-RPC query. In this case, to get the latest block number.

### ethers.js

Build DApps using [ethers.js](https://github.com/ethers-io/ethers.js/) and Polygon zkEVM nodes deployed with Chainstack.

1. Install [ethers.js](https://www.npmjs.com/package/ethers).
2. Connect over HTTPS or WebSocket. See also [EVM node connection: HTTP vs WebSocket](https://support.chainstack.com/hc/en-us/articles/900002187586-Ethereum-node-connection-HTTP-vs-WebSocket).

#### HTTPS

Use the `JsonRpcProvider` object to connect to your node endpoint and get the balance of any address:

``` js
const ethers = require('ethers');
const NODE_URL = "YOUR_CHAINSTACK_ENDPOINT ";
const provider = new ethers.JsonRpcProvider(NODE_URL, 1442);
const eth_getBalance = async () => {
    const balance = await provider.getBalance("0x439356Ad40D2f2961c99FFED4453f482AEC453Af");
    console.log(balance);
  };
eth_getBalance()
```
where
- YOUR_CHAINSTACK_ENDPOINT — your node HTTPS endpoint protected either with the key or password
- `1442` — the Polygon zkEVM test network ID

#### WebSocket

Use the `WebSocketProvider` object to connect to your node WSS endpoint and get the latest block number:

``` js
const ethers = require('ethers');
const NODE_URL = "YOUR_CHAINSTACK_ENDPOINT";
const provider = new ethers.WebSocketProvider(NODE_URL, 1442);
const eth_getBalance = async () => {
    const balance = await provider.getBalance("0x439356Ad40D2f2961c99FFED4453f482AEC453Af");
    console.log(balance);
  };
eth_getBalance()
```
where
- YOUR_CHAINSTACK_ENDPOINT — your node WSS endpoint endpoint protected either with the key or password
- `1442` — the Polygon zkEVM test network ID

### Brownie

1. Install [Brownie](https://eth-brownie.readthedocs.io/en/stable/install.html).
2. Use the `brownie networks add` command with the node endpoint:

    ``` sh
    brownie networks add Ethereum ID name="NETWORK_NAME" host=YOUR_CHAINSTACK_ENDPOINT chainid=NETWORK_ID
    ```

    where

    - ID — any name that you will use as the network tag to run a deployment. For example, `chainstack-testnet`.
    - NETWORK_NAME — any name that you want to identify the network by in the list of networks. For example, `zkEVM`.
    - YOUR_CHAINSTACK_ENDPOINT — your node HTTPS or WSS endpoint protected either with the key or password
    - NETWORK_ID — Polygon zkEVM network ID:
        - Polygon zkEVM testnet: `1442`

Example to run the deployment script:

``` sh
brownie run deploy.py --network chainstack-testnet
```

### Remix IDE

To make Remix IDE interact with the network through a zkEVM node deployed with Chainstack:

1. Get [MetaMask](https://metamask.io/) and set it to interact through a Chainstack node. See [Interacting through MetaMask](#metamask).
2. In Remix IDE, navigate to the **Deploy** tab. Select **Injected Provider - MetaMask** in **Environment**.

This will engage MetaMask and make Remix IDE interact with the network through a Chainstack node.
