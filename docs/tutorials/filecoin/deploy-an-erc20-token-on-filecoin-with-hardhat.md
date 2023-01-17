---
meta:
  - name: description
    content: Learn how to develop and deploy smart contracts on the Filecoin network.
  - name: keywords
    content: fil tutorial smart contract filecoin harhdat
---

# Deploy an ERC-20 token on Filecoin with Hardhat

This tutorial will show you how to deploy an ERC-20 token on the Hyperspace testnet. The Hyperspace testnet supports the FEVM implementation.

## Filecoin Virtual Machine and FIlecoin EVM

The **Filecoin Virtual Machine**, or FVM, serves as the backbone of the Filecoin network, providing a powerful runtime environment for the execution of smart contracts, known as actors. Actors can be written in Solidity and, in the future, in any language that compiles to WebAssembly, empowering developers to establish and enforce a set of rules to store and retrieve data on the Filecoin network.

The FVM acts as a gatekeeper, ensuring the integrity of stored data and enforcing the terms of storage deals, such as data retention and retrieval times, making the Filecoin network a safe and reliable platform for decentralized data storage.

The **Filecoin Ethereum Virtual Machine**, or FEVM brings the power of the Ethereum Virtual Machine (EVM) to the Filecoin network. The FEVM is virtualized as a runtime layer on top of the Filecoin Virtual Machine, allowing for the execution of EVM smart contracts on the network. 

With the FEVM, developers can quickly and easily start writing actors on the Filecoin blockchain, utilizing all of the familiar tools, packages, and languages they are used to while having access to Filecoin's unique storage capabilities, opening up new possibilities and opportunities for DApp development.

Follow the FEVM implementation progress on the [Filecoin docs](https://docs.filecoin.io/developers/smart-contracts/concepts/filecoin-evm/#fevm-and-native-fvm).

## Filecoin actors

Actors on the Filecoin network serve the same purpose as smart contracts in the Ethereum Virtual Machine; they are essential components of the system. Every modification to the state of the Filecoin blockchain requires an actor method invocation to be initiated.

There are two types of actors:

* Built-in actors.
* User actors.

Built-in actors are written and deployed directly into the network by the Filecoin network team. These actors are pre-installed and can be used to perform specific actions on the network. An example of a built-in actor is the `StorageMinerActor`, which deals with storage mining operations and collects proofs.

On the other hand, user actors are contracts that developers can write and deploy to the Filecoin network using the Filecoin Virtual Machine. These actors are developed by third-party developers and can be used to perform a wide range of actions on the network.

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

    constructor() ERC20("CoinFile", "CFL") {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

The contract implementation is the following:

- The contract uses OpenZeppelin audited [ERC-20 contract templates](https://docs.openzeppelin.com/contracts/4.x/erc20).
- The contract uses the `Ownable.sol` [ownership integration](https://docs.openzeppelin.com/contracts/4.x/access-control#ownership-and-ownable).
- The contract mints 1,000,000,000 tokens when it is deployed. The owner of the smart contract can mint more tokens by calling the `mint` function.
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
require("dotenv").config({ path: ".env" });

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

#### Receive test tokens

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

    // Print the owner
    const owner = await deployedCoinFile.owner()
    console.log(`The owner is ${owner}`)

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
The smart contract was deployed at: 0x1BEb36CF3de42a2c85d962bDE1517FFF136Bf0D1
The owner is 0x0FAd74EF878Ed65Dd40b71Ea586738DF94cF1360
```

It prints the smart contract address and the owner address (the wallet that deployed the contract); this means that we can successfully interact with it. 

You can now see your smart contract in the [Hyperspace Filecoin explorer](https://hyperspace.filfox.info/en).

This `0x1BEb36CF3de42a2c85d962bDE1517FFF136Bf0D1`, is a smart contract that we deployed. If you check on the [Hyperspace Filecoin explorer](https://hyperspace.filfox.info/en/address/t410fdpvtntz54qvczbozmk66cul774jwx4gruqt2lca), you will see a few things:

The Address Overview section shows:

* The Filecoin address.
* The actor type (EVM) in this case. 
* The contract balance (I sent 1 tFIL)
* How many messages are recorded, and time details.

At the bottom, you will see a recap of the messages, showing:

* The transaction to deploy the actor calling the `CreateExternal` method.
* A [transaction I made using MetaMask](https://hyperspace.filfox.info/en/message/bafy2bzaceca4pindhk3qlvptv4huumvfztmpm7t33yqzoqqlhyym6vlwuufxg) sending 1000 CFL from the wallet back to the actor.
* A [transaction](https://hyperspace.filfox.info/en/message/bafy2bzacea5jp2xzhmb35t7l36bddvqyamfllgrlymjfwi6d4n2p4pd4ktoty) where I sent 1 tFIL to the actor.

## Conclusion

This tutorial guided you through the basics of creating and deploying a contract in the ERC-20 token standard.

The contract that you created is a token that can be swapped and transferred; the smart contract also allows the owner to mint more tokens.