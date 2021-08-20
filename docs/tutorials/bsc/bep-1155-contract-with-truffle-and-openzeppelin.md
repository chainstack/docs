---
meta:
  - name: description
    content: Learn how to develop and deploy a BEP-1155 smart contract with both fungible and non-fungible tokens on the Binance Smart Chain network.
  - name: keywords
    content: tutorial binance bsc bep 1155 nft truffle openzeppelin
---

# BEP-1155 contract with Truffle and OpenZeppelin

BEP-1155 is the multi-token standard for smart contracts that combines the fungibility of BEP-20 and the non-fungibility of BEP-721 in one contract.

With a single BEP-1155 contract, you can deploy an ecosystem that has both fungible tokens (currency) and non-fungible tokens (NFTs).

In this tutorial, you will:

* Create a BEP-1155 contract that has a supply of fungible tokens and one non-fungible token.
* Deploy the contract on the Binance Smart Chain testnet through a node deployed with Chainstack.
* Interact with the deployed contract.

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy a Binance Smart Chain node.
* [Truffle Suite](https://www.trufflesuite.com/) to create and deploy contracts.
* [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts) to use the audited [ERC-1155 libraries](https://docs.openzeppelin.com/contracts/erc1155) to create your BEP-1155 contract.

## Overview

To get from zero to a deployed BEP-1155 contract on the Binance Smart Chain testnet, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, join the Binance Smart Chain testnet.
1. With Chainstack, access your Binance Smart Chain node credentials.
1. With OpenZeppelin, create a BEP-1155 contract.
1. With Truffle, compile and deploy the contract through your Binance Smart Chain node.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the Binance Smart Chain testnet

See [Join a public network](/platform/join-a-public-network).

### Get your Binance Smart Chain node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Install OpenZeppelin Contracts

See [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/).

### Install Truffle Suite

See [Truffle Suite: Installation](https://www.trufflesuite.com/docs/truffle/getting-started/installation).

### Create the contract

1. On your machine, in the contract directory, initialize Truffle:

``` sh
truffle init
```

This will generate the Truffle boilerplate structure:

``` sh
.
├── contracts
│   └── Migrations.sol
├── migrations
│   └── 1_initial_migration.js
├── test
└── truffle-config.js
```

2. Go to the `contracts` directory. In the directory, create your BEP-1155 contract: `BinanceSmartChain1155.sol`.

``` js
pragma solidity ^0.8;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract BinanceSmartChain1155 is ERC1155 {
    uint256 public constant FUNGIBLE = 0;
    uint256 public constant NON_FUNGIBLE = 1;

    constructor() ERC1155("JSON_URI") {
        _mint(msg.sender, FUNGIBLE, 100, "");
        _mint(msg.sender, NON_FUNGIBLE, 1, "");
    }
}
```

The contract implementation is the following:

* The contract uses OpenZeppelin audited [ERC-1155 contract templates](https://docs.openzeppelin.com/contracts/erc1155).
* The contract creates two tokens: 100 fungible units of the currency called `FUNGIBLE` and 1 non-fungible unit called `NON-FUNGIBLE`. In the BEP-1155 standard, setting a token issuance to `1` makes it non-fungible.
* The contract also has `JSON_URI` which is a locator for the metadata of your tokens hosted externally. For example, `https://token-cdn-domain/{id}.json`. See [EIP-1155](https://github.com/ethereum/eips/issues/1155) for details.

3. Create `2_deploy_contracts.js` in the `migrations` directory.

``` js
var BinanceSmartChain1155 = artifacts.require("./BinanceSmartChain1155.sol");

module.exports = function(deployer) {
var BinanceSmartChain1155 = artifacts.require("./BinanceSmartChain1155.sol");
  deployer.deploy(BinanceSmartChain1155);
};
```

This will create the contract deployment instructions for Truffle.

### Compile and deploy the contract

1. Install `HDWalletProvider`.

[HDWalletProvider](https://github.com/trufflesuite/truffle/tree/develop/packages/hdwallet-provider) is Truffle's separate npm package used to sign transactions.

Run:

``` sh
npm install @truffle/hdwallet-provider
```

2. Edit `truffle-config.js` to add:

* `HDWalletProvider`
* Your Binance Smart Chain node access and credentials
* Your Binance Smart Chain account that you will use to deploy the contract

``` js
const HDWalletProvider = require("@truffle/hdwallet-provider");
const private_key = 'PRIVATE_KEY';

module.exports = {
 networks: {
    testnet: {
        provider: () => new HDWalletProvider(private_key, "ENDPOINT"),
        network_id: 97,
        confirmations: 3,
        timeoutBlocks: 200,
        skipDryRun: true
    }
   },

 compilers: {
    solc: {
    version: "0.8.2",
    }
  }
};
```

where

* `testnet` — any network name that you will pass to the `truffle migrate --network` command.
* `HDWalletProvider` — Truffle's custom provider to sign transactions.
* PRIVATE_KEY — the private key of your Binance Smart Chain account that will deploy the contract. The account must have enough BNB funds to run the deployment. See also [Binance Smart Chain Faucet](https://testnet.binance.org/faucet-smart).
* ENDPOINT — your Binance Smart Chain node HTTPS endpoint. The format is `https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d`. See also [View node access and credentials](/platform/view-node-access-and-credentials) and [Tools](/operations/bsc/tools).
* `network_id` — the network ID of the Binance Smart Chain network: mainnet is `56`, testnet is `97`.
* `solc` — the Solidity compiler version that Truffle must use. OpenZeppelin contracts have a higher version Solidity compiler requirement than the default Truffle installation, hence you must provide a specific compiler version.

3. Run:

``` sh
truffle migrate --network testnet
```

This will engage `2_deploy_contracts.js` and deploy the contract to the Binance Smart Chain testnet as specified in `truffle-config.js`.

## Interact with the contract

Once your contract is deployed, you can view it online at [BscScan testnet](https://testnet.bscscan.com/).

Network explorers, including BscScan, do not display the NFT standards by default, so you will have to perform additional steps to check the balance of your issued tokens. Namely, you must verify the contract on BscScan to interact with it online.

### Flatten your contract code

Since your BEP-1155 contract uses imported OpenZeppelin libraries, you must put all the imports into one `.sol` file to make BscScan be able to verify it.

1. Install [Truffle Flattener](https://www.npmjs.com/package/truffle-flattener).

Run:

``` sh
npm install truffle-flattener
```

2. Flatten the contract.

In the `contracts` directory, run:

``` sh
npx truffle-flattener BinanceSmartChain1155.sol > FlatBinanceSmartChain1155.sol
```

3. Clean up the licensing information.

The flattened contract will have the same licensing note imported from each of the files. Multiple licensing notes in one file break the BscScan verification, so you have to leave one licensing note for the entirety of the flattened contract.

The easiest way to clean up is to search for the `SPDX` mentions in the file and remove all of them except for the very first one.

### Verify the deployed contract on BscScan

At this point you have your flattened and cleaned up contract ready for the BscScan verification.

1. Go to [BscScan testnet](https://testnet.bscscan.com/).
1. Find your deployed contract. The address of your contract should have been printed by Truffle at the end of the deployment in the `contract address` field.
1. On the contract page on BscScan, click **Contract** > **Verify and Publish**.
1. In **Compiler Type**, select **Solidity (Single file)**.
1. In **Compiler Version**, select **v0.8.2**. This is the version this tutorial used to compile the contract.
1. In **Open Source License Type**, select **MIT License (MIT)**.
1. Click **Continue**.
1. Keep the **Optimization** option set to **No** as Truffle does not use optimization by default.
1. Paste the entirety of your flattened `.sol` contract in the **Enter the Solidity Contract Code below** field.
1. Click **Verify and Publish**.

BscScan will take a few seconds to complie your contract, verify, and publish it.

### Check the balance

Now that your BEP-1155 contract is verified, you can check your balance of the issued tokens on BscScan.

1. On BscScan, on your contract, click **Contract**.
1. Click **Read Contract**.
1. Scroll to the **balanceOf** field.
1. In the **account** field, provide the address of the account you used to deploy the contract.
1. In the **id** field, put `0` to check your fungible balance and put `1` to check your non-fungible balance.

## Conclusion

This tutorial guided you through the basics of creating and deploying a contract in the BEP-1155 multi-token standard. The BEP-1155 is useful in that it can deploy an ecosystem of currencies and NFTs in one go—you can add however many fungible and non-fungible tokens to your contract.

You also verified your deployed contract online and interacted with it.

This tutorial uses testnet, however the exact same instructions and sequence will work on the mainnet as well.

::: tip See also

* [Operations: Binance Smart Chain](/operations/bsc/)

:::
