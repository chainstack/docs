---
meta:
  - name: description
    content: Learn how to develop and deploy an ERC-721 smart contract the Fantom network.
  - name: keywords
    content: tutorial fantom ftm erc 721 nft truffle openzeppelin artion
---

# ERC-721 collection contract with Truffle and OpenZeppelin

ERC-721 is the non-fungible token (NFT) standard for smart contracts.

In this tutorial, you will:

* Create a simple ERC-721 collection contract that allows anyone to mint new non-fungible tokens in the collection.
* Deploy the contract on the Fantom testnet through a node deployed with Chainstack.
* Interact with the deployed contract.
* See that you can register your collection on an NFT market.

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy a Fantom node.
* [Truffle Suite](https://www.trufflesuite.com/) to create and deploy contracts.
* [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts) to use the audited [ERC-721 libraries](https://docs.openzeppelin.com/contracts/erc721) to create your ERC-721 collection contract.

## Overview

To get from zero to a deployed ERC-721 contract on the Fantom testnet, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, join the Fantom testnet.
1. With Chainstack, access your Fantom node credentials.
1. With OpenZeppelin, create an ERC-721 contract.
1. With Truffle, compile and deploy the contract through your Fantom node.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the Fantom testnet

See [Join a public network](/platform/join-a-public-network).

### Get your Fantom node access and credentials

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

2. Go to the `contracts` directory. In the directory, create your ERC-721 contract: `Fantom721Collection.sol`.

``` js
pragma solidity ^0.8;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Fantom721Collection is ERC721URIStorage {
    uint256 public tokenCounter;
    constructor () public ERC721 ("COLLECTION_NAME", "COLLECTION_TICKER"){
        tokenCounter = 0;
    }

    function createCollectible(string memory tokenURI) public returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCounter = tokenCounter + 1;
        return newItemId;
    }

}
```

The contract implementation is the following:

* The contract uses OpenZeppelin audited [ERC-721 contract templates](https://docs.openzeppelin.com/contracts/erc721).
* The contract is a mintable collection. Anyone can add a token to the collection through `createCollectible`.
* COLLECTION_NAME — any name to give to your collection.
* COLLECTION_TICKER — any ticker for your collection.

3. Create `2_deploy_contracts.js` in the `migrations` directory.

``` js
module.exports = function(deployer) {
var Fantom721Collection = artifacts.require("./Fantom721Collection.sol");
  deployer.deploy(Fantom721Collection);
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

* `HDWalletProvider`.
* Your Fantom node access and credentials.
* Your Fantom account that you will use to deploy the contract.

``` js
const HDWalletProvider = require("@truffle/hdwallet-provider");
const private_key = 'PRIVATE_KEY';

module.exports = {
 networks: {
    testnet: {
        provider: () => new HDWalletProvider(private_key, "ENDPOINT"),
        network_id: 4002
    }
   },

 compilers: {
    solc: {
    version: "0.8.9",
    }
  }
};
```

where

* `testnet` — any network name that you will pass to the `truffle migrate --network` command.
* `HDWalletProvider` — Truffle's custom provider to sign transactions.
* PRIVATE_KEY — the private key of your Fantom account that will deploy the contract. The account must have enough FTM funds to run the deployment. See also [Fantom Testnet Faucet](https://faucet.fantom.network/).
* ENDPOINT — your Fantom node HTTPS endpoint. The format is `https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d`. See also [View node access and credentials](/platform/view-node-access-and-credentials) and [Tools](/operations/fantom/tools).
* `network_id` — the network ID of the Fantom network: mainnet is `250`, testnet is `4002`.
* `solc` — the Solidity compiler version that Truffle must use.

3. Run:

``` sh
truffle migrate --network testnet
```

This will engage `2_deploy_contracts.js` and deploy the contract to the Fantom testnet as specified in `truffle-config.js`.

## Interact with the contract

Once your contract is deployed, you can view it online at [FTMScan testnet](https://testnet.ftmscan.com/).

For an easy way to interact with your deployed contract, verify it on FTMScan.

### Flatten your contract code

Since your ERC-721 contract uses imported OpenZeppelin libraries, you must put all the imports into one `.sol` file to make FTMScan be able to verify it.

1. Install [Truffle Flattener](https://www.npmjs.com/package/truffle-flattener).

Run:

``` sh
npm install truffle-flattener
```

2. Flatten the contract.

In the `contracts` directory, run:

``` sh
npx truffle-flattener Fantom721Collection.sol > FlatFantom721Collection.sol
```

3. Clean up the licensing information.

The flattened contract will have the same licensing note imported from each of the files. Multiple licensing notes in one file break the FTMScan verification, so you have to leave one licensing note for the entirety of the flattened contract.

The easiest way to clean up is to search for the `SPDX` mentions in the file and remove all of them except for the very first one.

### Verify the deployed contract on FTMScan

At this point you have your flattened and cleaned up contract ready for the FTMScan verification.

1. Go to [FTMScan testnet](https://testnet.ftmscan.com/).
1. Find your deployed contract. The address of your contract should have been printed by Truffle at the end of the deployment in the `contract address` field.
1. On the contract page on FTMScan, click **Contract** > **Verify and Publish**.
1. In **Compiler Type**, select **Solidity (Single file)**.
1. In **Compiler Version**, select **v0.8.9**. This is the version this tutorial used to compile the contract.
1. In **Open Source License Type**, select **MIT License (MIT)**.
1. Click **Continue**.
1. Keep the **Optimization** option set to **No** as Truffle does not use optimization by default.
1. Paste the entirety of your flattened `.sol` contract in the **Enter the Solidity Contract Code below** field.
1. Click **Verify and Publish**.

FTMScan will take a few seconds to complie your contract, verify, and publish it.

### Interact with the contract

Now that your ERC-721 contract is verified, FTMScan is effectively a front end instance for your contract.

#### Mint an NFT in the collection

You can use any account to call the `createCollectible` function.

Make sure you have:

* MetaMask installed and unlocked as you will need it to call the contract. See [Fantom tools: MetaMask](/operations/fantom/tools#metamask).
* Testnet FTM on the account to pay for the transaction. See [Fantom Testnet Faucet](https://faucet.fantom.network/).

1. On FTMScan, on your contract, click **Contract**.
1. Click **Write Contract**.
1. Click **Connect to Web3**.
1. Under **createCollectible**, in the **tokenURI** field, provide any string to serve as metadata for this specifc NFT. See also [OpenZeppelin ERC-721](https://docs.openzeppelin.com/contracts/erc721) for a metadate example.
1. Click **Write**

This will send a transaction to mint in NFT in your contract collection and distribute the token to the account that called `createCollectible`.

#### Check the balances

Check the NFT balance of an address:

1. On FTMScan, on your contract, click **Contract**.
1. Click **Read Contract**.
1. Scroll to the **balanceOf** field.
1. In the **owner (address)** field, provide the address of the account you used to deploy the contract.
1. Click **Query**.

Check the number of minted NFTs

1. On FTMScan, on your contract, click **Contract**.
1. Click **Read Contract**.
1. Check the **tokenCounter** field.

## Listing on an NFT market

Having gone through the tutorial to understand the basics of creating an NFT collection, you can amend the contract to your needs and deploy it on the Fantom mainnet.

Once deployed, you can list the collection at an NFT marketplace—[Artion](https://artion.io/).

See [Artion: Register Collection](https://artion.io/collection/register).

## Conclusion

This tutorial guided you through the basics of creating and deploying a contract in the ERC-721 non-fungible token standard. 

The contract that you created is a collection that anyone on the Fantom network can interact with to add their tokens to the collection.

When you are ready, you can also deploy your own ERC-721 contract on the Fantom mainnet and list the collection on a Fantom NFT marketplace.

This tutorial uses testnet, however the exact same instructions and sequence work on the mainnet.

::: tip See also

* [Operations: Fantom](/operations/fantom/)

:::
