---
meta:
  - name: description
    content: Learn how to create, deploy, and interact with smart contracts on Ethereum Sepolia and Oasis Sapphire testnets, and how a confidential smart contract is different from an ordinary one.
  - name: keywords
    content: oasis sapphire secure smart contract confidential public
---

# Understanding confidential smart contracts using Oasis Sapphire

## Oasis Network

The Oasis Network is a proof-of-stake (PoS) based blockchain network that provides a robust, secure, and sustainable infrastructure for decentralized applications. By introducing a modular network architecture, Oasis is able to offer a high degree of scalability, interoperability, and privacy.

Oasis provides several features to protect user data. These include confidential smart contracts, which allow users to execute code without revealing sensitive information, and secure enclaves, which provide hardware-level protection for private data.

### Architecture

The modularity in the Oasis Network architecture comes from the separation of the network into two distinct layers: one handles the consensus (consensus layer) and the other takes care of the smart contract execution (ParaTime layer).

The **consensus layer** utilizes a proof-of-stake consensus mechanism that is run by a decentralized set of validator nodes. This mechanism is scalable and ensures security.

The **ParaTime layer** hosts multiple parallel runtimes (ParaTimes), each representing a separate computational environment with a shared state.

By using a parallel runtime model, the platform can process a large number of transactions in parallel, increasing its throughput and reducing latency.

### Paratimes

**ParaTime layer** is the layer of the Oasis Network that handles smart contract execution. A ParaTime is a separate computational environment with a shared state that can execute smart contracts. The Oasis network comes with multiple in-house ParaTimes, each representing a different type of computational environment. These include:

- **Emerald ParaTime** which is designed to provide a scalable and efficient environment for executing EVM-based smart contracts. It is fully compatible with the Ethereum Virtual Machine (EVM), making it easy to migrate existing Ethereum smart contracts to the Oasis Network.
- **Sapphire ParaTime** which is designed to provide an environment for executing EVM-compatible smart contracts with on-chain data confidentiality. It allows developers to execute code without revealing sensitive information. This makes it an excellent choice for applications that require high levels of privacy and security.
- **Cipher ParaTime** which is designed to provide a confidential ParaTime for executing WASM smart contracts. You can either use Rust or Go language to develop smart contracts for Cipher ParaTime.


This tutorial demonstrates the difference between confidential and non-confidential computation by analyzing the working of a Solidity smart contract on the Ethereum Sepolia Testnet and the Oasis Sapphire Testnet.

## Prerequisites

- [Chainstack account](https://console.chainstack.com/) to deploy an Oasis Sapphire node
- [Node.js](https://nodejs.org/en/download/) ^16.17.0 as the JavaScript framework
- MetaMask wallet

### Dependencies

- Hardhat: ^2.12.7
- dotenv: ^16.0.3

## Overview

1. Log in to your Chainstack account and create a public chain project.
2. With Chainstack, join the Ethereum Sepolia Testnet and the Sapphire Testnet.
3. With Chainstack, access your nodes' credentials.
4. Add the details of the Oasis Sapphire node to your MetaMask wallet.
5. Fund your accounts with test tokens.
6. Set up a Hardhat project.
7. Install the required dependencies.
8. Create a `.env` file to store the private key of your MetaMask account and node endpoints.
9. Create a Solidity contract in your Hardhat project.
10. Write the Hardhat scripts for deploying and interacting with the contract.
11. Deploy the contract onto the Ethereum Sepolia Testnet.
12. Deploy the contract onto the Oasis Sapphire Testnet.
13. Analyze the difference in the functioning of the contract.

## Step-by-Step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the Ethereum Sepolia Testnet and the Oasis Sapphire Testnet

See [Join a public network](/platform/join-a-public-network).

### Get endpoints for your Ethereum Sepolia Testnet and Oasis Sapphire Testnet

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Add the details of the Oasis Sapphire network to your MetaMask wallet

See [Oasis Sapphire Tools: MetaMask](/operations/oasis-sapphire/tools#metamask).

### Fund your accounts with test tokens

To get test tokens for your Oasis Sapphire Testnet account, do the following:

- Go to the official [Oasis Network Testnet Faucet](https://faucet.testnet.oasis.dev/).
- In the drop-down list, click `Sapphire`.
- Go to your MetaMask wallet and change the network to *Sapphire testnet*.
- On the faucet page, copy your MetaMask account address and paste it into the field below the drop-down list.
- Click `Request Test Token`.
- 10 test tokens will be sent to your account.

To get test tokens for your Ethereum Sepolia account, use the [Ethereum Sepolia Faucet](https://sepolia-faucet.pk910.de/).

### Set up a Hardhat project

1. Create a new directory for your project.
1. In your project directory, initialize the npm project:

    ``` sh
    npm init -y
    ```

    This command creates a `package.json` file with default settings.

1. Install Hardhat locally:

    ``` sh
    npm install --save-dev hardhat
    ```

1. Initialize the Hardhat project:

    ``` sh
    npx hardhat init
    ```

    This command will prompt you to choose a template for your project. Select `Create an empty hardhat.config.js` if you want to start from scratch.

1. In your project root directory, create two directories: `/contracts` and `/scripts`. This is where you will store the contracts and deployment scripts respectively.

By now, your Hardhat project directory will have the following structure:

``` sh
├── contracts
├── node_modules
├── hardhat.config.js
├── package.json
└── scripts
```

### Install the dependencies

In the root directory of your project run the following command:

``` js
npm install --save-dev @nomicfoundation/hardhat-toolbox @oasisprotocol/sapphire-hardhat
```

This command will install the `hardhat-toolbox` plugin which, along with other useful functionalities, lets you use libraries and frameworks like ethers.js, Mocha, and Chai for developing and testing your smart contracts.

The `sapphire-hardhat` plugin helps port your application onto the Oasis Sapphire by *wrapping* the provider used in the project. This will help your application interact with the Oasis Sapphire network by enabling functionalities like transaction encryption and signing.

In this project, you also require the `dotenv` package for handling the environment variables. To install the package, run the following command:

``` sh
npm install dotenv
```

### Create a `.env` file

In order to deploy and interact with the smart contract on various networks, you need to provide access to the network accounts via the account private key. Since Ethereum accounts are compatible with the Oasis Sapphire, you can use a single MetaMask account to interact with both Ethereum and Oasis testnets. Do the following:

1. Get the private key of your MetaMask account.
2. In the root directory of your project, create a new `.env` file.
3. Save the private key by pasting the following into the `.env` file:

    ``` sh
    PRIVATE_KEY="YOUR_PRIVATE_KEY"
    ```


Once the account private key is added, you may also add the endpoints of your Ethereum and Oasis testnets nodes deployed with Chainstack to the `.env` file:

``` sh
PRIVATE_KEY="YOUR_PRIVATE_KEY"
SEPOLIA_ENDPOINT="YOUR_ETHEREUM_SEPOLIA_NODE_ENDPOINT"
SAPPHIRE_TESTNET_ENDPOINT="YOUR_OASIS_SAPPHIRE_ENDPOINT"
```
### Create and compile a Solidity contract in your Hardhat project

In the `/contracts` directory of your Hardhat project, create a new file named `SecretNumberGame.sol` and add the following code to it:

``` js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SecretNumberGame
 * @dev A simple game where participants submit secret numbers.
 * The game ends when the maximum number of entries is reached.
 * The participant with the highest secret number wins.
 */
contract SecretNumberGame {
    uint256 highestNumber;
    uint256 public constant maxEntries = 5;
    uint256 public entryCount;
    address public winner;

    // Entry structure to store participant's address and submitted number
    struct Entry {
        address sender;
        uint256 number;
    }

    Entry[] public entries;

    // Event to declare the winner when the game ends
    event WinnerDeclared(address winner, uint256 highestNumber);

    // Modifier to check if the game is still accepting entries
    modifier gameInProgress() {
        require(entryCount < maxEntries, "Game is over");
        _;
    }

    /**
     * @notice Submit a secret number to the game.
     * @dev Participants can submit secret numbers while the game is in progress.
     * The game ends when maxEntries is reached.
     * @param number The secret number to submit.
     */
    function submitNumber(uint256 number) external gameInProgress {
        Entry memory newEntry = Entry(msg.sender, number);
        entries.push(newEntry);
        entryCount++;

        // Update the winner and the highest number if the submitted number is greater than the current highest number
        if (number > highestNumber) {
            highestNumber = number;
            winner = msg.sender;
        }

        // If maxEntries is reached, the game is over, and the winner is determined
        if (entryCount == maxEntries) {
            emit WinnerDeclared(winner, highestNumber);
        }
    }

    /**
     * @notice Get the entry at a specific index.
     * @dev This function returns the participant's address and submitted number at the given index.
     * @param index The index of the entry to fetch.
     * @return The entry's sender address and number.
     */
    function getEntry(uint256 index) external view returns (address, uint256) {
        require(index < entryCount, "Index out of bounds");
        Entry memory entry = entries[index];
        return (entry.sender, entry.number);
    }
}
```

The `SecretNumberGame` contract is a simple game where participants submit secret numbers. The game ends when the maximum number of entries is reached, and the participant with the highest secret number wins. The smart contract includes a modifier to check if the game is still accepting entries and an event to declare the winner when the game ends. The contract also includes functions to submit a secret number, get an entry at a specific index, and retrieve the submitted entries.

Once you add the contract, open a terminal and use the following command to compile the smart contract:

``` sh
npx hardhat compile
```

If the contract is successfully compiled, you will see a corresponing message, and the output will be stored in the newly generated `/artifacts` directory at the root of your project.

### Write the Hardhat scripts for deploying and interacting with the contract

Once the contract is set, you can create a new file, `deploy.js`, in the `/scripts` directory of the project and add the following code to it:

``` js
const hre = require("hardhat");

/**
 * @notice Fetch the storage data at a given slot number for a specified contract address.
 * @param _address The contract address.
 * @param _slotNumber The slot number of the storage.
 * @return The decimal state data at the specified slot.
 */
async function getStorageAt(_address, _slotNumber) {
  const provider = ethers.provider;
  const result = await provider.send("eth_getStorageAt", [
    _address,
    _slotNumber,
    "latest",
  ]);
  const decimalStateData =
    result === "0x0" ? "0" : ethers.BigNumber.from(result).toString();
  return decimalStateData;
}

/**
 * @notice Decode the transaction input data using the ABI.
 * @param _abi The ABI of the contract.
 * @param _inputData The input data of the transaction.
 * @return The decoded transaction data, or an empty object if decoding fails.
 */
function decodeTransactionInput(_abi, _inputData) {
  try {
    const iface = new ethers.utils.Interface(_abi);
    const decodedData = iface.parseTransaction({ data: _inputData });
    return decodedData;
  } catch (error) {
    console.error("Error decoding transaction input:", error.message);
    return {args : []};
  }
}

async function main() {
  // Compile and deploy the SecretNumberGame contract
  await hre.run("compile");
  const SecretNumberGame = await hre.ethers.getContractFactory(
    "SecretNumberGame"
  );
  const secretNumberGame = await SecretNumberGame.deploy();
  await secretNumberGame.deployed();
  console.log("SecretNumberGame deployed to:", secretNumberGame.address);

  // Submit a secret number (1000) from the single account
  const secretNumber = 1000;
  const tx = await secretNumberGame.submitNumber(secretNumber);
  await tx.wait();
  console.log(`Account submitted secret number ${secretNumber}`);

  // Decode the transaction input data
  const decodedInput = decodeTransactionInput(
    SecretNumberGame.interface.format(),
    tx.data
  );
  console.log(`Decoded Transaction Input: ${decodedInput.args}`);

  // Fetch the state data of the highestNumber variable using eth_getStorageAt method
  const stateData = await getStorageAt(secretNumberGame.address, "0x0");
  console.log("State Data of highestNumber variable:", stateData);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

This Hardhat script performs the following actions:

1. Compiles and deploys the `SecretNumberGame` contract to an Ethereum network.
2. Submits a secret number (1,000) from a single account.
3. Decodes the transaction input data using the contract's ABI.
4. Fetches the state data of the `highestNumber` variable using the `eth_getStorageAt` method.

The script includes two utility functions:

- `getStorageAt` — it fetches the storage data at a given slot number for a specified contract address.
- `decodeTransactionInput` — it decodes the transaction input data using the contract's ABI.

The `main` function contains the core logic of the script. It first compiles and deploys the contract, then submits a secret number, decodes the transaction input data, and finally fetches the state data of the `highestNumber` variable.

### Deploy the contract onto the Ethereum Sepolia Testnet

To deploy the contract onto the Ethereum Sepolia Testnet, add the following details to your `hardhat.config.js` file in the root directory of the project:

``` js
// Import necessary modules
require("@nomicfoundation/hardhat-toolbox");
// Load environment variables from .env file
require('dotenv').config({path:__dirname+'/.env'})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // Specify Solidity version for compiling the contracts
  solidity: "0.8.18",
  networks: {
    // Specify the network used for deployment
    sepolia_testnet: {
      // HTTPS endpoint of the Chainstack Sepolia testnet node
      url: process.env.SEPOLIA_ENDPOINT? process.env.SEPOLIA_ENDPOINT: "",
      // Accounts used for deployment
      accounts:
        // Use the private key defined in the .env file for deployment
				process.env.PRIVATE_KEY? [process.env.PRIVATE_KEY]: [],    },
  }
};
```

The `hardhat.config.js` file is a key configuration file used in this project. It is used to configure the project settings, such as the Solidity version, networks, and other customizations.

In this specific file, the Solidity version is set to `0.8.18`, indicating that the project uses the specified version of Solidity for compiling the contracts.

The `networks` object in the file specifies the test network used for deployment, which in this case is the Sepolia Testnet. The `url` key is used to specify the URL of the Sepolia Testnet node used for deployment.

Additionally, the `accounts` key specifies the accounts used for deployment. This key uses an environment variable `PRIVATE_KEY` and checks if it is defined in the `.env` file. If it is defined, the private key is used for deployment.

Once the `hardhat.config.js` file is modified, open a terminal in the root directory of your project and use the following command for deploying and interacting with your contract:

``` sh
npx hardhat run scripts/deploy.js --network sepolia_testnet
```

This will automatically execute the `deploy.js` file that we created. The script will produce the following output:

``` sh
SecretNumberGame deployed to: 0xf4bFc2e6f51F64D3328Cdd3570F48e9962009c82
Account submitted secret number 1000
Decoded Transaction Input: 1000
State Data of highestNumber variable: 1000
```

As you can see in this output, every aspect of the transaction including the input and state data is easily accessible, and given the nature of the game, running the contract on the Ethereum Sepolia testnet presents a few challenges:

1. Data transparency. In Ethereum, all contract data and transactions are public, which means that anyone can inspect the submitted secret numbers. This can compromise the secrecy of the game, as participants could inspect the submitted numbers and choose their bids accordingly.
2. The prospect of cheating. Due to the data transparency, participants could monitor the submitted numbers and wait until the last moment to submit their bids. This would allow them to submit a number slightly higher than the current highest number, which could be considered an unfair advantage.

Now, let us look at how a confidential execution environment like Oasis Sapphire fares against these challenges.

### Deploy the contract onto the Oasis Sapphire Testnet

To deploy the contract onto the Oasis Sapphire Testnet, add the following details to the `hardhat.config.js` file:

``` js
// Import necessary modules
require("@nomicfoundation/hardhat-toolbox");
// import the sapphire-hardhat module
require('@oasisprotocol/sapphire-hardhat');

// Load environment variables from .env file
require('dotenv').config({path:__dirname+'/.env'})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // Specify Solidity version for compiling the contracts
  solidity: "0.8.18",
  networks: {
    // Specify the network used for deployment
		 sepolia_testnet: {
      // HTTPS endpoint of the Chainstack Sepolia testnet node
      url: process.env.SEPOLIA_ENDPOINT? process.env.SEPOLIA_ENDPOINT: "",
      // Accounts used for deployment
      accounts:
        // Use the private key defined in the .env file for deployment
				process.env.PRIVATE_KEY? [process.env.PRIVATE_KEY]: [],
    },
    // Specify the Oasis Sapphire testnet network for deployment
    sapphire_testnet: {
      // URL of the Chainstack Oasis Sapphire node used for deployment
      url: process.env.SAPPHIRE_TESTNET_ENDPOINT? process.env.SAPPHIRE_TESTNET_ENDPOINT: "",
      // Accounts used for deployment
      accounts: process.env.PRIVATE_KEY? [process.env.PRIVATE_KEY]: [],
      // Chain ID of the Sapphire Testnet
      chainId: 0x5aff,
    },
  }
};
```

Here, we have added the details of the Oasis Sapphire Testnet. Apart from the network details, we have also imported the `@oasisprotocol/sapphire-hardhat` package onto the config file. This package handles the encryption of transactions and calls to the contract and thus ensuring the confidentiality and safety of the data involved.

Once the `hardhat.config.js` file is modified, open a terminal in the root directory of your project and use the following command for deploying and interacting with your contract:

``` sh
npx hardhat run scripts/deploy.js --network sapphire_testnet
```

This will generate the following output:

``` sh
SecretNumberGame deployed to: 0xB7bcE348F31972B7d062B7bb234786F150A3FCE7
Account submitted secret number 1000
Error decoding transaction input: no matching function (argument="sighash", value="0xa264626f", code=INVALID_ARGUMENT, version=abi/5.7.0)
Decoded Transaction Input:
State Data of highestNumber variable: 0
```

Here, as you can see, we are facing errors while trying to decode the transaction inputs and the state data is given as zero. This is due to the fact that in Oasis Sapphire, transactions and calls are end-to-end encrypted into the contract. Only the caller and the contract can see the data sent to or received from Oasis, also, the contract state is only visible to the contract that initially defined it. This means that no external entities can directly access the state value and thus the function returns the default value instead (0, in our case).

The only way to access the value of `highestNumber` variable is to write explicit *getter* functions in the contract. To demonstrate this, we have included the `getEntry` function within the contract. The function takes in an index value and returns the details of the `Entry` struct instance stored against that index in the `entries` list. To call the function, add the following code to your `deploy.js` script and execute it:

``` js
//fetch the entry at a specific index
  const index = 0
  const entry = await secretNumberGame.getEntry(index);
  console.log(`Entry at index ${index} : ${entry}`)
```

This will return the following output:

``` sh
SecretNumberGame deployed to: 0x41024F891ae49c0CA459bA41e34e15024209FB82
Account submitted secret number 1000
Error decoding transaction input: no matching function (argument="sighash", value="0xa264626f", code=INVALID_ARGUMENT, version=abi/5.7.0)
Decoded Transaction Input:
State Data of highestNumber variable: 0
Entry at index 0 : 0x459AC2794A3386cD5a8ca7aeAed07D9525e600Ed,1000
```

Apart from explicit *getter* functions, in Oasis Sapphire, we can also expose the state data using contract logs/events. Thus, one should be cautious with the design of the contact so as to avoid any unnecessary data exposure.

## Conclusion

The mechanics of the `SecretNumberGame` resembles a typical auction/bidding contract, and as we saw previously, the contract also faces similar challenges. Now, with the `SecretNumberGame`, the user stakes are pretty much nonexistent, but if we re-imagine the scenario and add in an NFT bid or a token exchange, the challenges that we saw earlier will gain a greater impact.

Running this contract on Ethereum Sepolia Testnet and the Oasis Sapphire Testnet reveals differences in data privacy, security, and efficiency. Ethereum Sepolia is a public blockchain, meaning all contract data and transactions are public. This transparency could compromise the game's secrecy.

In contrast, the Oasis Sapphire emphasizes confidentiality and data privacy through advanced encryption techniques and confidential data storage. These features, when applied in a wider scope, provide unparalleled data protection and can even prevent common challenges like front/back running, which are especially relevant in decentralized finance (DeFi) and non-fungible token (NFT) markets.
