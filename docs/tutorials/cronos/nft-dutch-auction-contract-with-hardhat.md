---
meta:
  - name: description
    content: Learn how to deploy and run a simple Dutch auction smart contract on Cronos with Hardhat.
  - name: keywords
    content: tutorial cronos smart contract hardhat dutch auction
---

# Dutch auction smart contracts on Cronos with Hardhat

A Dutch auction is a type of an auction in which the initial price of an NFT starts at its ceiling and lowers by a small amount at set intervals. Buyers make bids at reduced prices until the end of an auction. A Dutch auction continues until either all assets are sold out or the auction time ends.

The objective of this tutorial is to familiarize you with the Cronos network, Hardhat, and Dutch auction smart contracts. In the end of the tutorial, you will be able to create a simple Dutch auction smart contract to help you sell your NFTs to the highest bidder.

Specifically, in this tutorial, you will:

* Create a Dutch auction smart contract.
* Deploy and verify the contract on the Cronos testnet through a node deployed with Chainstack.
* Interact with the deployed contract.

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy a Cronos testnet node.
* [Hardhat](https://hardhat.org/docs) to compile and deploy the contract.
* [MetaMask](https://docs.metamask.io/guide/) to interact with the contract through your Chainstack node.

## Overview

To get from zero to deploying your own Dutch auction smart contract on the Cronos testnet, do the following:

1. With Chainstack, create a [public chain project](https://docs.chainstack.com/glossary/public-chain-project).  
1. With Chainstack, join the Cronos testnet.
1. With Chainstack, access your Cronos node endpoint.
1. With Hardhat, set up your development environment.
1. With Hardhat, create and compile your Dutch auction contract.
1. With MetaMask, fund your wallet with test CRO tokens from the [Cronos official faucet](https://cronos.org/faucet).
1. With Hardhat, deploy your Dutch auction contract.
1. With [Cronos testnet explorer](https://testnet.cronoscan.com), interact with your Dutch auction contract.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the Cronos testnet

See [Join a public network](/platform/join-a-public-network).

### Get your Cronos node endpoint

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Install Hardhat

See [Hardhat documentation](https://hardhat.org/hardhat-runner/docs/getting-started#installation).

### Initialize a Hardhat project

In your project directory, run `npx hardhat`. Select **Create a JavaScript project** and agree to install the sample project's dependencies. This will create a sample project directory with a smart contract draft.

### Install additional dependencies

To complete the project, we need to install several additional dependencies.

The [OpenZeppelin Contract library](https://docs.openzeppelin.com) allows you to inherit smart contracts. To install it, run:

``` sh
npm i @openzeppelin/contracts
```

The [dotenv library](https://github.com/motdotla/dotenv) allows you to export and keep sensitive data securely. To install it, run:

``` sh
npm i dotenv
```

The [hardhat-etherscan](https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan) and [hardhat-cronoscan](https://docs.cronos.org/for-dapp-developers/cronos-smart-contract/contract-verification) plugins allow you to verify your contracts on the Cronos testnet. To install them, run:

``` sh
npm i --save-dev @nomiclabs/hardhat-etherscan@^3.1.0 @cronos-labs/hardhat-cronoscan
```

You need to create an environment file to store your sensitive data with the project. To create it, in your project directory, run:

``` sh
touch .env
```

### Create and compile the contract

1. Navigate to your previously created project directory and go to the `contracts` directory. In the directory, create your Dutch auction smart contract: `DutchAuction.sol`.

``` js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyToken is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public immutable startPrice = 10 ether;
    uint256 public immutable startAt;
    uint256 public immutable endsAt;
    uint256 public immutable endPrice = 5 ether;
    uint256 public immutable discountRate = 0.01 ether;
    uint256 public duration = 500 minutes;
    uint256 public immutable MAX_SUPPLY = 100;

     mapping (address => bool) public onlyOne;

    constructor() ERC721("CronosNFT", "CroNFT") {
        startAt = block.timestamp;
        endsAt = block.timestamp + duration;
    }

    function price() public view returns (uint256) {
        if (block.timestamp > endsAt ) {
            return endPrice;
        }

        uint256 minutesElapsed = (block.timestamp - startAt) / 60;

        return startPrice - (minutesElapsed * discountRate);
    }

    function safeMint(address to) public payable {
        require(msg.value >= price(), "Not enough ether sent");
        require(!onlyOne[msg.sender], "Sorry, Address already has 1 NFT!");
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId < MAX_SUPPLY, "No more items left.");
        _safeMint(to, tokenId + 1);
        _tokenIdCounter.increment();
        onlyOne[msg.sender]=true;

    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
```

The contract implementation is the following:

* The price of an NFT starts at 10 Ether and decreases to 5 Ether over 500 minutes. A maximum of 100 NFTs can be minted.
* The contract uses the `onlyOne` mapping to ensure that each address can only own one NFT from your collection.  
* The contract sets the values of the start and end price, which cannot be changed later on.
* The function `price()` uses `block.timestamp` to calculate the price of an NFT each time the `safeMint` function is called.  
* If all the required conditions are satisfied, the wallet address gets an NFT minted.

2. To compile the contract, in your project directory, run:

```js
npx hardhat compile
```

### Fund your account

To deploy your smart contract on the Cronos testnet, you will need some test CRO tokens. See the [Cronos faucet](https://cronos.org/faucet).

### Set up the environment and configuration files

1. In your project directory, navigate to a previously created environment file and edit it to add the following data:

* `RPC_URL` — your Cronos node HTTPS endpoint. The format is `https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d`. See also [View node access and credentials](/platform/view-node-access-and-credentials).
* `PRIVATE_KEY` — the private key of your MetaMask wallet that has a sufficient amount of TCRO tokens. See also the [Cronos faucet](https://cronos.org/faucet).
* `API_KEY` — a Cronos API key to verify the deployed smart contract using the Cronoscan and Etherscan plugins. Create an API key in the [Cronos blockchain explorer](https://docs.cronos.org/block-explorers/block-explorer-and-api-keys#creating-api-keys-on-cronoscan).

Example of the environment file data:

```sh
RPC_URL=https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
PRIVATE_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXu7
API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXG5
```

2. In your project directory, navigate to the Hardhat configuration file and replace the current data with the following data:

```js
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");
require("@cronos-labs/hardhat-cronoscan");


module.exports = {
  solidity: "0.8.10",
  networks: {
    Cronos_testnet: {
        url: `${process.env.RPC_URL}`,
        accounts: [process.env.PRIVATE_KEY]
    },
},

    etherscan: {
        apiKey: {
         cronosTestnet: `${process.env.API_KEY}`,
  },
},
};
```

where

* `dotenv` — library to import your sensitive data from the environment file securely.
* `Cronos_testnet` — the testnet to deploy the contract to.
* `url` — your Cronos node HTTPS endpoint imported from the environment file.
* `accounts` — your MetaMask wallet private key imported from the environment file.
* `etherscan` — your Cronos API key imported from the environment file to verify your contract.

### Deploy the Dutch auction contract

1. In your project directory, navigate to the `scripts` directory and create the `DeployDutch.js` file.
2. Edit the `DeployDutch.js` file to add the basic deployment script of Hardhat:

```js
const hre = require("hardhat");

async function main() {
  const CronosToken = await hre.ethers.getContractFactory("MyToken");
  console.log("Deploying your contract, please Wait.....");
  const cronosToken = await CronosToken.deploy();
  await cronosToken.deployed();

  console.log("CronosToken deployed to:", cronosToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

3. In your project directory, run the following script:

```sh
npx hardhat run scripts/DeployDutch.js --network Cronos_testnet
```

The contract will deploy and the terminal will return the contract address. Use this address to verify and interact with your contract.

### Verify your contract on the Cronos testnet

Once your contract is deployed, verify it on the Cronos testnet. In your terminal, run:

```sh
npx hardhat verify --network Cronos_testnet CONTRACT_ADDRESS
```

### Interact with the contract

Now that your contract is verified, Cronoscan is effectively a front end instance for your contract.

## Conclusion

This tutorial guided you through the basics of using Hardhat to deploy a Dutch auction smart contract to the Cronos testnet, and verify it using Etherscan and Cronoscan plugins.

This tutorial uses testnet, however the exact same instructions and sequence work on the mainnet.
