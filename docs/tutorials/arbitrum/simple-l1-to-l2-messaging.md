---
meta:
  - name: description
    content: Learn how to deploy contracts and send a message from the Ethereum chain to the Arbitrum chain.
  - name: keywords
    content: tutorial arbitrum hardhat l1 l2 message
---

# Simple L1 to L2 messaging

Sending a message from the Ethereum chain (L1) to the Arbitrum chain (L2) does not involve the state challenge period and is as fast as the block confirmation time on L1 and L2 combined.

In this tutorial, you will:

* Deploy greeter contracts on Ethereum and on Arbitrum.
* Send a message from the greeter contract deployed on Ethereum (L1) to the greeter contract deployed on Arbitrum (L2).

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy an Ethereum node and an Arbitrum node.
* [MetaMask](https://metamask.io/) to fund your account on L2 with GoerliETH.

## Overview

To get from zero to your first L1 to L2 message, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, join the Ethereum Goerli testnet.
1. With Chainstack, join the Arbitrum Goerli testnet.
1. Set up your MetaMask to work through the Chainstack Ethereum and Arbitrum nodes.
1. Fund your account through a faucet on the Ethereum Goerli testnet and on the Arbitrum Goerli testnet.
1. Run the tutorial script to deploy the contracts on L1 and L2 and send the message from L1 to L2.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the Ethereum and Arbitrum Goerli testnets

Deploy a node on the Ethereum Goerli testnet and a node on the Arbitrum Goerli testnet.

See [Join a public network](/platform/join-a-public-network).

### Get the access and credentials to your deployed nodes

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Set up MetaMask

See [Arbitrum tools: MetaMask](/operations/arbitrum/tools).

### Fund your account

Your account will need GoerliETH on both the Ethereum Goerli testnet and the Arbitrum Goerli testnet as you will deploy a contract on each of the chains.

* Ethereum Goerli faucet: see [Paradigm faucet](https://faucet.paradigm.xyz/).
* Arbitrum Goerli faucet: see *Nitro Goerli Rollup* in the [Arbitrum documentation](https://developer.offchainlabs.com/docs/Public_Chains#get-some-native-currency).

The default Arbitrum Goerli faucet may fund your account with 0.001 GoerliETH, which is not enough to deploy the greeter contract on L2.

If you do not have enough GoerliETH on L2, you may bridge some more from the Ethereum Goerli testnet using the [Arbitrum bridge](https://bridge.arbitrum.io/).

### Clone and prepare the tutorials repository

You will use the [Offchain Labs tutorials repository](https://github.com/OffchainLabs/arbitrum-tutorials.git) to deploy the contracts and send the message.

Clone the repostory:

``` sh
git clone https://github.com/OffchainLabs/arbitrum-tutorials.git
```

Change to `arbitrum-tutorials/packages/greeter`.

Install dependencies by running `yarn`.

Set up the `.env` file by renaming the sample one in `arbitrum-tutorials/packages/greeter`:

``` sh
cp .env-sample .env
```

In the `.env` file, add your account key and the endpoints:

* DEVNET_PRIVKEY — the private key of your account that has GoerliETH both on the Ethereum Goerli testnet and the Arbitrum Goerli testnet.
* L2RPC — the HTTPS endpoint of your Arbitrum node deployed on the Arbitrum Goerli testnet.
* L1RPC — the HTTPS endpoint of your Ethereum node deployed on the Ethereum Goerli testnet.

Example:

``` env
DEVNET_PRIVKEY=0c063793280014e85be24e84c79f88edd269c6de8d3790c16dd3d8cbd19c8c59
L2RPC=https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
L1RPC=https://nd-987-654-321.p2pify.com/d1351ac89a9b8228a42251c9a8b0e6c3
```

### Deploy the contract and send the message from L1 to L2

You are now all set to run the tutorial script that will deploy the greeter contracts and send a message from L1 to L2.

In `arbitrum-tutorials/packages/greeter`, run:

``` sh
yarn run greeter
```

The script will:

* Deploy the L1 greeter contract on the Ethereum Goerli testnet. Example: [0x9B4F541D6A82Beb594Ee2A1EfF14d88f2898176c](https://goerli.etherscan.io/address/0x9B4F541D6A82Beb594Ee2A1EfF14d88f2898176c).
* Deploy the L2 greeter contract on the Arbitrum Goerli testnet. Example: [0x890443aB733bd527F0036aEd3E249358a30Ff3ce](https://goerli-rollup-explorer.arbitrum.io/address/0x890443aB733bd527F0036aEd3E249358a30Ff3ce).
* On the L1 contract, [set the L2 contract address](https://goerli.etherscan.io/tx/0xbd20609976a96ce791eae71dae0e87a254f542eab1ab400ce8b4681cc4f6b5aa).
* On the L2 contract, [set the L1 contract address](https://goerli-rollup-explorer.arbitrum.io/tx/0x98dcfec500561985cdaf0f3933f1b361b3106edc055e0a2644c0f67396596d42/internal-transactions).
* Retrieve the current gas costs for the transaction off the [ArbRetryableTx contract on L2](https://goerli-rollup-explorer.arbitrum.io/address/0x000000000000000000000000000000000000006E/read-contract). See also [Arbitrum documentation: Messaging Between Layers](https://developer.offchainlabs.com/docs/L1_L2_Messages).
* Using the retrieved gas cost values, [submit the message transaction on L1](0xa39ecbb53844d009dc121825c26b0608def2c4117d81a6ebeb6000fcf304ac9e). The transaction will send the message to the [inbox contract on L1](https://goerli.etherscan.io/address/0x6BEbC4925716945D46F0Ec336D5C2564F419682C#readProxyContract). See also [Arbitrum documentation: Contract addresses](https://developer.offchainlabs.com/docs/Useful_Addresses).
* The transaction will then be submitted as a retryable ticket by the [ArbRetryableTx contract on L2](https://goerli-rollup-explorer.arbitrum.io/address/0x000000000000000000000000000000000000006E/). [Example](https://goerli-rollup-explorer.arbitrum.io/tx/0xac1f89c9d449145aaa6a715bfb7a678009654191b379c03d20bd0a27b8f6968f).
* Then the retryable ticket will be redeemed and change the state in the greeter contract on L2 with the message from the greeter contract on L1. [Example](0x6c8dd56c1ef93064b7b219154327361c051588dfadf716cc23e9d5e3ed610814).

## Conclusion

This tutorial guided you through the basics of creating and deploying a simple greeter contract that sends a message from the Ethereum chain to the Arbitrum chain. The tutorial also provided the examples and an explanation of the step-by-step state changes and the contracts involved in the L1 to L2 messaging.

All done through the Chainstack-deployed Ethereum and Arbitrum nodes.

::: tip See also

* [Operations: Arbitrum](/operations/arbitrum/)

:::
