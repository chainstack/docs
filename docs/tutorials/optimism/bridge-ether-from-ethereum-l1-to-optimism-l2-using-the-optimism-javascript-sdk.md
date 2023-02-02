---
meta:
  - name: description
    content: Learn how to use the Optimism SDK to bridge ether from L1 to L2.
  - name: keywords
    content: eth tutorial ethers optimism goerli bridge l1 l2
---

# Bridge ether from Ethereum L1 to Optimism L2 using the Optimism JavaScript SDK

This tutorial will show you how to use the [Optimism JavaScript SDK](https://sdk.optimism.io/) to bridge ether from L1 to L2.

## Optimism

Optimism is a next-generation solution that enhances the Ethereum blockchain by providing a supplementary layer 2 network. Optimism streamlines the transaction process on Ethereum, resulting in significantly lower fees and fast execution. The beauty of Optimism lies in its seamless integration with Ethereum—each transaction takes place on the Optimism network, yet its validity is confirmed via the Ethereum blockchain.

## Optimism's inner working

Optimism leverages the breakthrough technology of optimistic rollups, a sophisticated compression technique developed by the team at the Optimism Foundation. Rollups are a new way to scale the Ethereum blockchain and come in optimistic rollups and zero-knowledge rollups (ZK rollups).

Optimistic rollups streamline the transaction process by taking the bulk of data off-chain, resulting in faster processing times. Despite this off-chain approach, a small amount of data is still recorded on the Ethereum network for security purposes.

What sets optimistic rollups apart from other scaling solutions is that they do not require cryptographic proofs to validate off-chain transactions. Instead, they rely on a system of fraud proofs and utilize the Optimistic Virtual Machine (OVM)—a sandboxed environment—to ensure secure and deterministic smart contract execution.

The OVM acts as the interface between Layers 1 and 2, much like the Ethereum Virtual Machine (EVM). However, the OVM only executes computation, while the EVM handles all execution. The OVM and EVM work together through the Execution Manager to execute transactions in a virtualized environment.

Learn more about the Optimism network in [Optimism blockchain – Ethereum Layer 2 scaling solution](https://chainstack.com/an-overview-of-optimism-and-communication-between-l2-and-l1/) on the Chainstack blog.

## Prerequisites

* [Chainstack account](https://console.chainstack.com/) to deploy nodes on the Ethereum Goerli testnet and Optimism Goerli testnet.
* Node.js ^16.17.0 — [install Node.js](https://nodejs.org/en/download/).

### Dependencies

* @eth-optimism/sdk: ^1.10.1
* dotenv: ^16.0.3
* Ethers: ^5.7.2

## Overview

To get from zero to a functioning bridge between Ethereum L1 and Optimism L2, do the following:

1. With Chainstack, create a public chain project.
1. With Chainstack, join the Ethereum Goerli testnet and Optimism Goerli testnet.
1. With Chainstack, access your nodes' credentials.
1. Create an `npm` project.
1. Install the required dependencies.
1. Create a `.env` file to store the secrets.
1. With the Ethers library, create provider and wallet instances.
1. With Optimism JavaScript SDK, bridge ether between L1 and L2.
1. Run the script.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the Ethereum Goerli testnet and Optimism Goerli testnet

See [Join a public network](/platform/join-a-public-network).

### Get endpoints for your Ethereum Goerli testnet and Optimism Goerli testnet

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Create an npm project

In your project directory, open the terminal and run `npm init`. Answer the questions in the terminal to create a sample `package.json` file for your project.

### Install the required dependencies

To install the libraries and tools required for this bridge project, run:

```sh
npm i @eth-optimism/sdk ethers dotenv
```

### Create a `.env` file to store the secrets

Create a `.env` file in the root directory of your project and paste and fill the following:

```sh
PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"
GOERLI_CHAINSTACK="YOUR_CHAINSTACK_GOERLI_ENDPOINT"
OPTIMISM_GOERLI_CHAINSTACK="YOUR_CHAINSTACK_OPTIMISM_GOERLI_ENDPOINT"
```

### Use the Ethers library to create provider and wallet instances

Create an `index.js` file in your project's root directory.

The first step is to import the required packages and create the global variables. To do that, at the top of the file, paste the following:

```js
const ethers = require("ethers")
const optimismSDK = require("@eth-optimism/sdk")
require('dotenv').config()

// Environment variables
const GOERLI_CHAINSTACK = process.env.GOERLI_CHAINSTACK;
const OPTIMISM_GOERLI_CHAINSTACK = process.env.OPTIMISM_GOERLI_CHAINSTACK;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Provider instances
const l1Provider = new ethers.providers.JsonRpcProvider(GOERLI_CHAINSTACK);
const l2Provider = new ethers.providers.JsonRpcProvider(OPTIMISM_GOERLI_CHAINSTACK);

// Init Signers
async function getSigners() {
  const privateKey = PRIVATE_KEY;
  const l1Wallet = new ethers.Wallet(privateKey, l1Provider);
  const l2Wallet = new ethers.Wallet(privateKey, l2Provider);

  return [l1Wallet, l2Wallet];
}
```

This part of the code does the following:

* Imports libraries and tools.
* Declares the required constants using the environment variables.
* Creates provider instances for L1 (Ethereum Goerli testnet) and L2 (Optimism Goerli testnet).
* Creates wallet instances. The `getSigners()` function uses the private key to create wallet instances with the Ethers library. These instances will be used to query balances and sign transactions.

### Use the Optimism JavaScript SDK to bridge ether between L1 and L2

Create a function to retrieve the networks' chain IDs and a `CrossChainMessenger` instance using the Optimism JavaScript SDK:

```js
// Get Chain IDs using ethers
async function chainIds() {
  const l1Network= await l1Provider.getNetwork();
  const l2Network = await l2Provider.getNetwork();

  const l1ChainId = l1Network.chainId
  const l2ChainId = l2Network.chainId

  return [l1ChainId, l2ChainId]

}

// Init crossChainMessenger using the Chain IDs and wallet instances
async function initialize() {

  const [l1Signer, l2Signer] = await getSigners()
  const [l1ChainId, l2ChainId] = await chainIds()

  crossChainMessenger = new optimismSDK.CrossChainMessenger({
      l1ChainId: l1ChainId,    
      l2ChainId: l2ChainId,   
      l1SignerOrProvider: l1Signer,
      l2SignerOrProvider: l2Signer
  })
}  
```

The `chainIds()` function uses the Ethers library to query the Chainstack endpoints and retrieve the chain IDs that will then be used to create the `crossChainMessenger` instance.

The `initialize()` function uses the `getSigners()` and `chainIds()` functions to retrieve the parameters required to create the `crossChainMessenger` using the Optimism JavaScript SDK. The [crossChainMessenger](https://sdk.optimism.io/classes/crosschainmessenger) instance allows us to interact with the L1 and L2 networks.

#### Function to retrieve the wallets balances

Add the following function to retrieve the wallet balances and display them in the console:

```js
// Display balances from L1 and L2 using the Optimism SDK crossChainMessenger provider instance
async function showBalances() {
  const l1Balance = (await crossChainMessenger.l1Signer.getBalance()).toString();
  const l2Balance = (await crossChainMessenger.l2Signer.getBalance()).toString();

  console.log(`Balance on L1: ${ethers.utils.formatEther(l1Balance).slice(0,-14)} ETH`);
  console.log(`Balance on L2: ${ethers.utils.formatEther(l2Balance).slice(0,-14)} ETH`);
  console.log("----------------------------------");
}  
```

::: tip Information

Note that the `console.log` statements with the `-` are there only to make the response in the console more legible.

:::

#### Function to transfer ether between L1 and L2

Now you can create a function to bridge the ether between L1 and L2:

```js
// Transfer an amount of ether from L1 to L2
async function bridgeEth() {

  const wei = BigInt(100000000000000000); // 0.1 ETH in Wei
  console.log("Fetching current balances...");

  await showBalances();
  console.log("Initiating ETH transfer from L1 to L2...");

  const depositResponse = await crossChainMessenger.depositETH(wei);
  console.log(`Transaction hash for deposit from L1 to L2: ${depositResponse.hash}`);
  console.log(`See on Goerli Etherscan: https://goerli.etherscan.io/tx/${depositResponse.hash}`);

  await depositResponse.wait();
  console.log("Waiting for deposit transaction to be relayed...");
  console.log("----------------------------------");

  await crossChainMessenger.waitForMessageStatus(
    depositResponse.hash,
    optimismSDK.MessageStatus.RELAYED
  );
  console.log("ETH transfer from L1 to L2 is complete.");
  console.log("Updating current balances...");
  console.log("----------------------------------");

  await showBalances();
}
```

Note that the `const wei` holds the amount that will be transferred, expressed in the Wei unit.

The default for this script is set to 0.1 ether, equivalent to 100,000,000,000,000,000 Wei. You can use a [Wei converter](https://eth-converter.com/) to include other amounts, or you can use the following:

* 1 ether = 1,000,000,000,000,000,000 Wei
* 0.1 ether = 100,000,000,000,000,000 Wei
* 0.01 ether = 10,000,000,000,000,000 Wei
* 0.001 ether = 1,000,000,000,000,000 Wei

The `bridgeEth()` function transfers the amount of ethers specified in the `wei` constant from Ethereum (L1) to Optimism (L2). It uses the [depositEth](https://sdk.optimism.io/classes/crosschainmessenger#depositETH-2) method of the `crossChainMessenger` instance.

It then waits for the `MessageStatus` to become `RELAYED`. The `RELAYED` status indicates that a message has been successfully transmitted from one network to another and is under processing on the recipient network.

::: tip Information

Find the different message statuses in the [Optimism JavaScript SDK docs](https://sdk.optimism.io/enums/messagestatus).

:::

After that, the `bridgeEth()` function gives some updates and retrieves the balances again.

At the bottom of the file, add the `main` function and call it:

```js
// Main function
async function main() {
    await initialize()
    await bridgeEth()
}

// Run the main function and catch any error
main().then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
```

At this point, the entire code will look like this:

```js
const ethers = require("ethers")
const optimismSDK = require("@eth-optimism/sdk")
require('dotenv').config()

// Environment variables
const GOERLI_CHAINSTACK = process.env.GOERLI_CHAINSTACK;
const OPTIMISM_GOERLI_CHAINSTACK = process.env.OPTIMISM_GOERLI_CHAINSTACK;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Provider instances
const l1Provider = new ethers.providers.JsonRpcProvider(GOERLI_CHAINSTACK);
const l2Provider = new ethers.providers.JsonRpcProvider(OPTIMISM_GOERLI_CHAINSTACK);

// Init Signers
async function getSigners() {
    const privateKey = PRIVATE_KEY;
    const l1Wallet = new ethers.Wallet(privateKey, l1Provider);
    const l2Wallet = new ethers.Wallet(privateKey, l2Provider);

    return [l1Wallet, l2Wallet];
}

// Get Chain IDs
async function chainIds() {
    const l1Network = await l1Provider.getNetwork();
    const l2Network = await l2Provider.getNetwork();

    const l1ChainId = l1Network.chainId
    const l2ChainId = l2Network.chainId

    return [l1ChainId, l2ChainId]

}

// Init crossChainMessenger using the Chain IDs and wallet instances
async function initialize() {

    const [l1Signer, l2Signer] = await getSigners()
    const [l1ChainId, l2ChainId] = await chainIds()

    crossChainMessenger = new optimismSDK.CrossChainMessenger({
        l1ChainId: l1ChainId,
        l2ChainId: l2ChainId,
        l1SignerOrProvider: l1Signer,
        l2SignerOrProvider: l2Signer
    })
}

// Display balances from L1 and L2
async function showBalances() {
    const l1Balance = (await crossChainMessenger.l1Signer.getBalance()).toString();
    const l2Balance = (await crossChainMessenger.l2Signer.getBalance()).toString();

    console.log(`Balance on L1: ${ethers.utils.formatEther(l1Balance).slice(0,-14)} ETH`);
    console.log(`Balance on L2: ${ethers.utils.formatEther(l2Balance).slice(0,-14)} ETH`);
    console.log("----------------------------------");
}

// Transfer an amount of ether from L1 to L2
async function bridgeEth() {

    const wei = BigInt(100000000000000000); // 0.1 ETH in Wei
    console.log("Fetching current balances...");

    await showBalances();
    console.log("Initiating ETH transfer from L1 to L2...");

    const depositResponse = await crossChainMessenger.depositETH(wei);
    console.log(`Transaction hash for deposit from L1 to L2: ${depositResponse.hash}`);
    console.log(`See on Goerli Etherscan: https://goerli.etherscan.io/tx/${depositResponse.hash}`);

    await depositResponse.wait();
    console.log("Waiting for deposit transaction to be relayed...");
    console.log("----------------------------------");

    await crossChainMessenger.waitForMessageStatus(
        depositResponse.hash,
        optimismSDK.MessageStatus.RELAYED
    );
    console.log("ETH transfer from L1 to L2 is complete.");
    console.log("Updating current balances...");
    console.log("----------------------------------");

    await showBalances();
}

// Main function
async function main() {
    await initialize()
    await bridgeEth()
}

// Run the main function
main().then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
```

### Run the script

Now it's time to run the script and bridge some ether from L1 to L2. To do this, you will need some Goerli ETH in your wallet. To get some testnet ETH, you can use the following faucet:

* [Paradigm's MultiFaucet](https://faucet.paradigm.xyz/)

Once you have received some Goerli ETH, pick the amount you want to send and update the `wei` constant.

To start the script, run the following command:

```sh
node index
```

The console will log all of the steps and it will look similar to the following:

```sh
Fetching current balances...
Balance on L1: 9.7844 ETH
Balance on L2: 0.9314 ETH
----------------------------------      
Initiating ETH transfer from L1 to L2...
Transaction hash for deposit from L1 to L2: 0x97455a64eb1c496f4ecc937ffcf2d9294228d9658504a16ab9dbfa638d32693a
See on Goerli Etherscan: https://goerli.etherscan.io/tx/0x97455a64eb1c496f4ecc937ffcf2d9294228d9658504a16ab9dbfa638d32693a
Waiting for deposit transaction to be relayed...
----------------------------------
ETH transfer from L1 to L2 is complete.
Updating current balances...
----------------------------------
Balance on L1: 9.6842 ETH
Balance on L2: 1.0314 ETH
----------------------------------
```

As you can see, it prints the transaction hash and the link to check the transaction details using Goerli Etherscan.

See the details of one of the already [completed transactions on Etherscan](https://goerli.etherscan.io/tx/0x97455a64eb1c496f4ecc937ffcf2d9294228d9658504a16ab9dbfa638d32693a).

## Conclusion

This tutorial guided you through creating a basic L1 => L2 bridge using the Optimism JavaScript SDK.
