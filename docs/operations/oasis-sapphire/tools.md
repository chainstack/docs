---
meta:
  - name: description
    content: Learn how to interact with your Oasis Sapphire node and develop DApps.
  - name: keywords
    content: oasis sapphire api dapp cli javascript geth truffle hardhat
---

# Tools

::: tip Information
Due to confidential nature of smart contracts in the Sapphire ParaTime, reading contents of smart contracts with `eth_call` is not currently supported.
:::

## Interaction tools

### Geth

Interact with your Oasis Sapphire node using [Geth](https://geth.ethereum.org/docs/getting-started).

1. Install [Geth](https://github.com/ethereum/go-ethereum).
2. Use `geth attach` command with the node endpoint.

    ``` sh
    geth attach YOUR_CHAINSTACK_ENDPOINT
    ```

    where YOUR_CHAINSTACK_ENDPOINT — your node HTTPS or WSS endpoint protected either with the key or password. See [View node access and credentials](/platform/view-node-access-and-credentials).

1. Invoke any methods from [Web3 JavaScript API (opens new window)](https://web3js.readthedocs.io/).

Example below demonstrates how to get the balance of an address in wei value and convert it to ether value:

``` js
web3.fromWei(web3.eth.getBalance("0x4EA0911033792C93639bEd297B9289E136d86F89"))
```

### MetaMask

On [node access details](/platform/view-node-access-and-credentials), click **Add to MetaMask**.

## Development tools

### Truffle

Configure [Truffle Suite](https://truffleframework.com/) to deploy contracts to your Oasis Sapphire nodes.

1. Install [Truffle Suite](https://truffleframework.com/), [HD Wallet-enabled Web3 provider](https://github.com/trufflesuite/truffle/tree/develop/packages/hdwallet-provider), and create a project.
1. Install the [sapphire-hardhat](https://www.npmjs.com/package/@oasisprotocol/sapphire-hardhat) plugin.
1. Install the [dotenv](https://www.npmjs.com/package/dotenv) package to securely load your sensitive variables from a `.env` file
1. Create a new environment, and define a new network, in `truffle-config.js`:

    ``` js
    require('dotenv').config();
    const sapphire = require("@oasisprotocol/sapphire-paratime");
    const HDWalletProvider = require("@truffle/hdwallet-provider");
    module.exports = {
      networks: {
        sapphire_testnet: {
          provider: () => {
			     sapphire.wrap(
            new HDWalletProvider([process.env.YOUR_PRIVATE_KEY], `${process.env.YOUR_CHAINSTACK_ENDPOINT}`));
               },
          network_id: 0x5aff,
        },
      },
    compilers: {
        solc: {
          version: "0.8.13",
        },
      },


    };
    ```

### Hardhat

Configure [Hardhat](https://hardhat.org/) to deploy contracts and interact through your Oasis Sapphire nodes.

1. Install [Hardhat](https://hardhat.org/) and create a project.
1. Install the [sapphire-hardhat](https://www.npmjs.com/package/@oasisprotocol/sapphire-hardhat) plugin.
2. Install the [dotenv](https://www.npmjs.com/package/dotenv) package to securely load your sensitive variables from a `.env` file
3. Create a new environment in `hardhat.config.js`:  

    ``` js
    require("@nomicfoundation/hardhat-toolbox");
    require('@oasisprotocol/sapphire-hardhat');
    require('dotenv').config();

    module.exports = {
      solidity: "0.8.18",
      defaultNetwork: "sapphire_testnet",
      networks: {
        sapphire_testnet: {
            url: `${process.env.YOUR_CHAINSTACK_ENDPOINT}`,
            accounts: [process.env.YOUR_PRIVATE_KEY],
    				chainId: 0x5aff,
        },
    },

    };
    ```

    where

    - YOUR_CHAINSTACK_ENDPOINT — your node HTTPS or WSS endpoint protected either with the key or password. See [node access details](/platform/view-node-access-and-credentials).
    - YOUR_PRIVATE_KEY — the private key of the account that you use to deploy the contract

5. Run `npx hardhat run --network sapphire_testnet scripts/deploy.js`, and Hardhat will deploy using Chainstack.

### web3.js

Build DApps using [web3.js](https://github.com/ethereum/web3.js/) and Oasis Sapphire nodes deployed with Chainstack.

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

- YOUR_CHAINSTACK_ENDPOINT — your Chainstack node endpoint protected either with the key or password. See [node access details](/platform/view-node-access-and-credentials).
- `query` — your JSON-RPC query. In this case, to get the latest block number.

### ethers.js

Build DApps using [ethers.js](https://github.com/ethers-io/ethers.js/) and Oasis Sapphire nodes deployed with Chainstack.

1. Install [ethers.js](https://www.npmjs.com/package/ethers).
2. Connect over HTTPS or WebSocket. See also [EVM node connection: HTTP vs WebSocket](https://support.chainstack.com/hc/en-us/articles/900002187586-Ethereum-node-connection-HTTP-vs-WebSocket).

#### HTTPS

Use the `JsonRpcProvider` object to connect to your node endpoint and get the balance of any address:

``` js
const ethers = require('ethers');
const NODE_URL = "YOUR_CHAINSTACK_ENDPOINT ";
const provider = new ethers.JsonRpcProvider(NODE_URL, 23295);
const eth_getBalance = async () => {
    const balance = await provider.getBalance("ACCOUNT_ADDRESS");
    console.log(balance);
  };
eth_getBalance()
```

where
- YOUR_CHAINSTACK_ENDPOINT — your node HTTPS endpoint protected either with the key or password
- `23295` — the Oasis Sapphire test network ID
- ACCOUNT_ADDRESS — the Oasis Sapphire account address

#### WebSocket

Use the `WebSocketProvider` object to connect to your node WSS endpoint and get the latest block number:

``` js
const ethers = require('ethers');
const NODE_URL = "YOUR_CHAINSTACK_ENDPOINT";
const provider = new ethers.WebSocketProvider(NODE_URL, NETWORK_ID);
const eth_getBalance = async () => {
    const balance = await provider.getBalance("ACCOUNT_ADDRESS");
    console.log(balance);
  };
eth_getBalance()
```

where
- YOUR_CHAINSTACK_ENDPOINT — your node WSS endpoint endpoint protected either with the key or password
- `23295` — the Oasis Sapphire test network ID
- ACCOUNT_ADDRESS — the Oasis Sapphire account address

### Remix IDE

To make Remix IDE interact with the network through a zkEVM node deployed with Chainstack:

1. Get [MetaMask](https://metamask.io/) and set it to interact through a Chainstack node. See [Interacting through MetaMask](#metamask).
2. In Remix IDE, navigate to the **Deploy** tab. Select **Injected Provider - MetaMask** in **Environment**.

This will engage MetaMask and make Remix IDE interact with the network through a Chainstack node.
