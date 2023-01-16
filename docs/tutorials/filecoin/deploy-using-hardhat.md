---
meta:
  - name: description
    content: Learn how to develop and deploy smart contracts on the Filecoin network.
  - name: keywords
    content: fil tutorial smart contract filecoin harhdat
---

# Deploy an ERC20 token on Filecoin with Hardhat

ERC-20 is the token implementation standard for smart contracts, and it defines a set of rules that a token contract must follow to be considered an ERC-20 token. These rules include how tokens are transferred, how token balances are queried, and how the total token supply is determined.

OpenZeppelin Contracts is an open-source framework for creating smart contracts. It provides a collection of reusable, tested, and community-audited smart contracts that cover various aspects of token management, such as token standards (like ERC-20 and ERC-721), access control, and token economics. This way, developers don't have to re-write standardized contracts over and over.

Hardhat is a development environment for smart contracts. Hardhat provides a set of tools that make it easy for developers to set up, run, and test their smart contracts, including a local blockchain network, an integrated development environment (IDE), and a set of plugins and utilities for testing, debugging, and deploying smart contracts.

## Prerequisites

- [Chainstack account](https://console.chainstack.com/) to deploy a Filecoin node.
- [Hardhat](https://hardhat.org/) to create and deploy contracts.
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts) to use the audited [ERC-20](https://docs.openzeppelin.com/contracts/4.x/erc20) libraries.

## Overview

To get from zero to a deployed ERC-20 contract on the Filecoin testnet, do the following:

1. With Chainstack, create a [public chain project](https://docs.chainstack.com/glossary/public-chain-project).

1. With Chainstack, [join the Filecoin testnet](https://docs.chainstack.com/platform/join-a-public-network).

1. With Chainstack, access your [Filecoin node credentials](https://docs.chainstack.com/platform/view-node-access-and-credentials).

1. Install Hardhat and create a Hardhat project.

1. Create a simple ERC-20 token smart contract using the OpenZeppelin Contracts framework.

1. Deploy the contract on the Filecoin Hyperspace testnet through a node deployed with Chainstack.

## Step-by-step

### 1. Create a public chain project

See [Create a project](https://docs.chainstack.com/platform/create-a-project).

### 2. Join the Filecoin testnet

See [Join a public network](https://docs.chainstack.com/platform/join-a-public-network).

### 3. Get your Filecoin node access and credentials

See [View node access and credentials](https://docs.chainstack.com/platform/view-node-access-and-credentials).

### 4. Install Hardhat and create a Hardhat project

You can install Hardhat using `npm` or `Yarn`

For npm:

``` sh

npm install --save-dev hardhat

```

For yarn:

``` sh

yarn add --dev hardhat

```

::: tip Information

For more information, see the Hardhat [Installation](https://hardhat.org/hardhat-runner/docs/getting-started#installation) documentation.

:::

To create a Hardhat project, in your project's folder run:

```sh

npx hardhat

```

Select `Create a JavaScript project` and answer all of the questions. This will initialize a standard Hardhat project with the following structure:

```sh

my-project/
│
├── contracts/
│   ├── MyToken.sol
│
├── tests/
│   ├── MyToken.test.js
│
├── scripts/
│   ├── deploy.js
│
├── hardhat.config.js

```

### 5. Create a simple ERC-20 token smart contract using the OpenZeppelin Contracts framework

#### Install the OpenZeppelin Contracts

In your project's directory, run the following:

```sh

npm install @openzeppelin/contracts

```

This will add the OpenZeppelin Contracts, and you can use them in your project.

#### Create the smart contract

In the contracts directory, create your ERC-20 contract: `CoinFile.sol`.

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8 .4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CoinFile is ERC20, Ownable {

    constructor() ERC20("CoinFile", "CFL") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

The contract implementation is the following:

- The contract uses OpenZeppelin audited [ERC-20 contract templates](https://docs.openzeppelin.com/contracts/4.x/erc20).
- The contract uses the `Ownable.sol` [ownership integration](https://docs.openzeppelin.com/contracts/4.x/access-control#ownership-and-ownable).
- The contract mints 1000000000 tokens when it is deployed. The owner of the smart contract can mint more tokens by calling the `mint` function.
- `CoinFile` is the name of this token; you can give any name to your token.
- `CFL` is the ticker of this token; you can give any ticker symbol to your token.

You can also create your smart contract code using the [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/4.x/wizard).

#### Compile the smart contract

Run the following command to compile the smart contracts:

```sh
npx hardhat compile
```

The console will log the following response:

```sh
Compiled 6 Solidity files successfully
```

### 6. Deploy the contract on the Filecoin Hyperspace testnet through a node deployed with Chainstack

#### Set up the deploying environment

Install the `dotenv` package:

```sh
npm install dotenv
```

And create a `.env` file with the following fields in your project's directory:

```sh
PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"
CHAINSTACK_FILECOIN_RPC="YOUR_CHAINSTACK_FILECOIN_URL"
```

Edit the `hardhat.config.js` file and paste the following:

```js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({

    path: ".env"

});

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CHAINSTACK_FILECOIN_RPC = process.env.CHAINSTACK_FILECOIN_RPC

    *
    /*** @type *import('hardhat/config').HardhatUserConfig */
    **

    module * .*exports * = {
        solidity: "0.8.17",
        networks: {
            filecoin: {
                url: CHAINSTACK_FILECOIN_RPC,
                accounts: [PRIVATE_KEY],
            },
        }
    }
```

This will securely use the data from the `.env` file and create a path for the `filecoin` network that we can use to deploy the smart contract.

#### Receive test Filecoin

Use the [Filecoin faucet](https://hyperspace.yoga/#faucet) to receive some test Filecoin tokens to use during deployment.

#### Create the deploying script

In the `scripts` directory, create `deploy.js` and paste the following code:

```js
const {
    ethers
} = require("hardhat");

require("dotenv").config({
    path: ".env"
});

// Initialize the RPC provider
const provider = new ethers.providers.JsonRpcProvider(process.env.CHAINSTACK_FILECOIN_RPC)

async function main() {

    // Retrieve the gas value from the network.
    const feeData = await provider.getFeeData();
    const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas

    /**
    A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
    so coinFile here is a factory for instances of our CoinFile contract.
    **/

    const coinFile = await ethers.getContractFactory("CoinFile")

    // here we deploy the contract, the parameter in {} is maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
    console.log(`Deploying smart contract...`)
    const deployedCoinFile = await coinFile.deploy({maxPriorityFeePerGas})

    // Wait for it to finish deploying.
    await deployedCoinFile.deployed()

    // print the address of the deployed contract*
    console.log(`The smart contract was deployed at: ${deployedCoinFile.address}`);

}

// Call the main function and catch if there is any error
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// call main

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)

    })
```

Note that you need to specify the `maxPriorityFeePerGas` to use Hardhat to deploy to the Filecoin network. To find the `maxPriorityFeePerGas`, the script calls the `getFeeData()` function from the provider, which returns gas data in the following format:

```sh
{
    lastBaseFeePerGas: BigNumber { value: "100" },
    maxFeePerGas: BigNumber { value: "1500000200" },
    maxPriorityFeePerGas: BigNumber { value: "1500000000" },
    gasPrice: BigNumber { value: "200916" }
}
```

#### Deploy the smart contract

To deploy your smart contract to the Filecoin network, run the following command:

```sh
npx hardhat run scripts/deploy.js --network filecoin
```

The console will log a message and the contract address once it is deployed.

```sh
Deploying smart contract...
The smart contract was deployed at: 0x04F819b0640B1ba3E0f3c5A21435301C389F24AA
```

You can now see your smart contract in the [Hyperspace Filecoin explorer](https://hyperspace.filfox.info/en).

## Conclusion

This tutorial guided you through the basics of creating and deploying a contract in the ERC-20 token standard.

The contract that you created is a token that can be swapped and transferred; the smart contract also allows the owner to mint more tokens.