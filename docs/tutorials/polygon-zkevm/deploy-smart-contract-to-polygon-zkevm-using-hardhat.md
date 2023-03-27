---
meta:
  - name: description
    content: Learn how to develop and deploy a smart contract to Polygon zkEVM using Hardhat.
  - name: keywords
    content: tutorial polygon zkevm ethereum hardhat smart contract
---

# Deploy a smart contract to Polygon zkEVM using Hardhat

Polygons zkEVM is the first ever EVM-compatible zero-knowledge rollup to hit the market. This means that developers can leverage existing Web3 tooling and zero-knowledge proofs to deploy smart contracts and execute transactions on the Ethereum network cheaper than ever before.

Polygon zkEVM is a layer 2 scaling solution that aims to make Ethereum transactions faster and more efficient using special math called zero-knowledge proofs to ensure transactions are valid and quickly finalized.

ZK-Rollups execute smart contracts transparently by sharing zero-knowledge proofs of their validity. Polygon zkEVM works seamlessly with the Ethereum Virtual Machine.
If you want to read more about ZK-EVMs and ZK-rollups, you can check out our [blog](https://chainstack.com/zkevm-and-zkrollups-explained/).

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy a Polygon zkEVM node
* [Node.js](https://nodejs.org/en) as the JavaScript framework

## Dependencies

* Hardhat: ^2.13.0
* @nomicfoundation/hardhat-toolbox: ^2.0.2
* dotenv: ^16.0.3

## Overview

The integration between Ethereum and Polygon zkEVM is completely seamless. In this tutorial we will go over how to bridge funds between Goerli and zkEVM testnet, as well as how to deploy a smart contract to the testnet using Hardhat. Here is a brief overview of the tutorial:

1. With Chainstack, create a public chain project.
2. With Chainstack, join the Polygon zkEVM testnet.
3. With Chainstack, access your nodes' credentials.
4. Bridge funds between the Goerli testnet and the zkEVM testnet.
5. Create a Hardhat project using node.js .
6. Install the required dependencies.
7. Create a `.env` file to store the secrets.
8. Edit the Hardhat config file.
9. Write the smart contract.
10. Write and run the deployment script.
11. Deploy smart contracts to the zkEVM testnet.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the Ethereum Goerli testnet and the Polygon PoS Mumbai testnet

See [Join a public network](/platform/join-a-public-network).

### Get your Polygon zkEVM node endpoint

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Fund your wallet

Before diving into the project, make sure to top up your wallet with Goerli ether. You can use this [faucet](https://goerli-faucet.pk910.de/).

### Bridging Goerli ETH to zkEVM testnet

We can easily move assets between Ethereum (L1) and Polygon zkEVM (L2) using the zkEVM bridge. The UI interface for the bridge is available at [public.zkevm-test.net](https://public.zkevm-test.net/login).

To bridge assets between L1 and L2, the user has to lock up any amount of those assets in the original network using the zkEVM bridge. An equivalent amount of wrapped tokens are then minted in the other chain.

Let us go through the process of obtaining zkEVM ETH:

1. Add the Polygon zkEVM to your MetaMask wallet.
   You can do that by simply creating a Polygon zkEVM node with Chainstack, and adding the network to your MetaMask by clicking on the ‘*Add to MetaMask*’. See [Chainstack console](https://console.chainstack.com/).
3. Make sure that your wallet is connected to the Goerli Testnet and has sufficient Goerli ETH.
4. Navigate to the [zkEVM bridge interface](https://public.zkevm-test.net/login).
5. Follow the instructions on the bridge to mint some ETH to the zkEVM testnet.

   ::: tip Information
   After submitting the transaction, it is necessary to wait until the **Finalize** button is activated. Without finalizing, the bridge operation won't be complete.
   :::

### Create a Hardhat project

Create a new directory for your project, then run the following from a terminal:

``` sh
npm init -y && npm install --save-dev hardhat
```

After Hardhat is installed, run:

``` sh
npx hardhat
```

This will launch the Hardhat CLI, which will prompt you to configure a starter project. For this tutorial, click **Yes** on all the prompts Hardhat offers you.

### Set up environment variables

This project uses the [dotenv](https://github.com/motdotla/dotenv) package to safely use environment variables.

Run the following command in your root directory to install the dotenv package:

``` sh
npm install dotenv
```

In your project's root directory, create a new file and name it `.env`. Here is where you will set up the environment variables for your Chainststack Polygon zkEVM endpoint and your wallet's private key.

```
YOUR_CHAINSTACK_ENDPOINT="YOUR_CHAINSTACK_POLYGON_ZKEVM_ENDPOINT"
YOUR_PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"
```

Save the file after you added your information. Now run the following command to load all the environment variables:

``` sh
source .env
```

### Edit the Hardhat configuration file

You will find a file named `hardhat.config.js` in the root directory. This file is used to configure various settings for your Hardhat projects, such as the network you want to deploy your contracts on, the compilers you want to use, and the plugins you want to enable.

Delete the default code in the file and replace it with the following:

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

Let's break down what each part of the file does:

- `require("@nomicfoundation/hardhat-toolbox");` imports the Hardhat Toolbox plugin, which provides several useful tools and utilities for Hardhat projects.
- `require("dotenv").config();` loads environment variables from a `.env` file using the `dotenv` package.
- `module.exports = { ... }` exports a JavaScript object containing the configuration for the Hardhat project.
- `solidity: "0.8.18",` sets the Solidity compiler version to 0.8.18.
- `networks: { ... }` defines the network configurations for the Hardhat project.
- `defaultNetwork: { ... }` defines the default network that Hardhat will use.
- `zkEVM_testnet: { ... }` defines the configuration for the `zkEVM` network.
- `url: ${process.env.YOUR_CHAINSTACK_ENDPOINT},` sets the RPC URL for the zkEVM network.
- `accounts: [process.env.YOUR_PRIVATE_KEY],` sets the accounts for the `zkEVM` network using the `YOUR_PRIVATE_KEY` environment variable. This will allow the Hardhat project to deploy contracts and interact with the zkEVM testnet using the specified private key.

### Create the simple vault smart contract

In the root directory, you will find a directory named `contracts`. Create a new file named `SimpleVault.sol`, and paste the following code inside it:

``` js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title SimpleVault
 * @dev A simple vault contract for the exclusive use of its owner.
 * The owner can deposit and withdraw ether.
 */
contract SimpleVault {
    address payable public owner;

    // Event emitted when ether is deposited
    event Deposit(address indexed depositor, uint256 amount);

    // Event emitted when ether is withdrawn
    event Withdrawal(address indexed owner, uint256 amount);

    /**
     * @dev Sets the contract deployer as the owner.
     */
    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev Modifier to check if the caller is the owner of the contract.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    /**
     * @notice Allows the owner to deposit ether into the contract.
     * @dev The deposit function must be marked as payable to receive ether.
     */
    function deposit() external payable onlyOwner {
        require(msg.value > 0, "You must send some ether to deposit");
        emit Deposit(msg.sender, msg.value);
    }

    /**
     * @notice Allows the owner to withdraw a specified amount of ether.
     * @param amount The amount of ether to be withdrawn in wei.
     */
    function withdraw(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Not enough Ether in the vault");
        owner.transfer(amount);
        emit Withdrawal(owner, amount);
    }

    /**
     * @notice Returns the balance of the contract in ether.
     * @return The balance of the contract in wei.
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
```

This is a simple smart contract that allows us to deposit and withdraw ETH. All the functions are commented for a better understanding.

### Create and run the deployment script

In the `scripts` directory inside the root of your project, you will find a file named `deploy.js`. Replace its content with the following:

``` js
const hre = require("hardhat");

async function main() {
  const SimpleVault = await hre.ethers.getContractFactory("SimpleVault");
  console.log("Deploying your contract, please Wait.....");
  const simplevault = await SimpleVault.deploy();
  await simplevault.deployed();
  console.log("Vault Contract deployed to:", simplevault.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

This is a simple deploy script that deploys the `SimpleVault` smart contract to the zkEVM testnet, and returns the address of the newly deployed contract in the terminal. You can search for your contract on the [Polygon zkEVM testnet explorer](https://explorer.public.zkevm-test.net/).

To run this script, execute the following command in the terminal:

``` sh
npx hardhat run --network zkEVM_testnet scripts/deploy.js
```

### Interact with the smart contract

We can interact with a deployed smart contract through Hardhat in two ways:

- Write a script to programmatically send a series of transactions to the smart contract.
- Interact with the smart contract right from the terminal.

Let us do a bit of both.

Create a new file named `interact.js` inside the scripts directory. Paste the following code inside it:

``` js
require('dotenv').config();
const { ethers } = require('hardhat');
const hre = require("hardhat");

async function main() {

const address = 'CONTRACT_ADDRESS';
const Vault = await ethers.getContractFactory('SimpleVault');
const vault = await Vault.attach(address);

const value = await vault.getBalance();
console.log('The current value stored in the vault is', value.toString());

console.log('Now let us send 1 ETH to the vault');

const newValue = await vault.deposit({value: ethers.utils.parseEther('1.0')});

// const withdrawValue = await vault.withdraw(ethers.utils.parseEther('0.5'));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

- In this script, we will attach the address of the deployed smart contract to a local instance we initialize via Hardhat. We can then use the RPC URL and the private key we configured in the config file to send transactions and call functions to and from the contract.
- You can see that we send 1 ETH to the contract. To execute the script, run the following command in the terminal:

  ``` js
  npx hardhat run --network zkEVM_testnet scripts/interact.js
  ```

- Open another terminal inside the same directory and run the following command:

  ``` js
  npx hardhat console --network zkEVM_testnet
  ```

- This will open up a Hardhat console that will allow us to interact with our smart contract via the command line. To connect the console to the deployed smart contract, run:

  ``` js
  const address = 'CONTRACT_ADDRESS';
  const Vault = await ethers.getContractFactory('SimpleVault');
  const vault = await Vault.attach(address);
  ```

- You can read the locked vault value from the smart contract by simply running this command in the console:

  ``` js
  await vault.getBalance();
  ```

- You can withdraw locked ETH from the console by running this command in the terminal:

  ``` js
  await vault.withdraw(ethers.utils.parseEther('0.5'))
  ```

And just like that, we used a Hardhat script to deposit ETH into a deployed smart contract, and used the Hardhat console to interact with the smart contract.

## Conclusion

This tutorial guided you through bridging funds between the Goerli testnet and the Polygon zkEVM testnet. We also deployed a smart contract to the zkEVM testnet using Hardhat.
