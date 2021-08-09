---
meta:
  - name: description
    content: Learn how to develop and deploy a smart contract that tokenizes assets on the Ethereum network.
  - name: keywords
    content: ethereum dapp blockchain tutorial tokenize
---

# Asset tokenization with Embark

This tutorial will guide you through creating a tokenized asset contract and deploying it on Ropsten testnet.

For illustration purposes, this contract does the following:

* Creates a total supply of 1000 tokens specific to the asset.
* Sets the token price to 0.1 ether.
* Lets anyone exchange ether for the asset tokens.

This tutorial uses [Embark](https://embark.status.im/) to test and deploy the contract.

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy a Ropsten testnet node.
* [Embark](https://embark.status.im/) to test and deploy the contract.
* [Geth](https://geth.ethereum.org/) to create an Ethereum account that will deploy the contract.
* [MetaMask](https://metamask.io/) to interact with the contract.

## Overview

To get from zero to an asset tokenization contract running on Ropsten, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, deploy a Ropsten testnet node.
1. With Embark, create a project and the contract.
1. With Geth, create a new account.
1. Import the account in MetaMask and fund the account with Ropsten ether.
1. With Embark, deploy the contract through the Ropsten node.
1. With Embark, check the contract with Cockpit.
1. Interact with the contract through MetaMask.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Deploy a Ropsten node

See [Join a public network](/platform/join-a-public-network).

### Create an Embark project and the contract

1. Create a new Embark project:

    ``` sh
    embark new asset
    ```

    This will create an Embark directory called `asset`.

1. Change to the `contracts` directory of the Embark project.

1. Create an `AssetTokenized.sol` file in the `contracts` directory:

    ``` js
    pragma solidity = 0.5.0;

    contract AssetTokenized{
    uint public supply;
    uint public pricePerEth;
    mapping( address => uint ) public balance;

    constructor() public {
        supply = 1000;                    // There are a total of 1000 tokens for this asset
        pricePerEth = 100000000000000000; // One token costs 0.1 ether
      }

      function check() public view returns(uint) {
        return balance[msg.sender];
      }

      function () external payable {
        balance[msg.sender] += msg.value/pricePerEth; // adds asset tokens to how much ether is sent by the investor
        supply -= msg.value/pricePerEth;              //subtracts the remaining asset tokens from the total supply
      }
    }
    ```

### Create an Ethereum account

You will use this account to deploy the contract.

1. Create the account:

    ``` sh
    geth account new
    ```

1. Check the path to the keystore file created for the new account:

    ``` sh
    geth account list
    ```

### Import the account in MetaMask and fund the account

1. In MetaMask, click **Import Account** > **JSON File**.
1. Select the keystore file that you created earlier.
1. Fund the account with <a href="https://support.chainstack.com/hc/en-us/articles/900001458966-Ethereum-testnet-faucets" target="_blank">Ropsten ether</a>.

### Deploy the contract

1. In your Embark project directory, change to `config`.
1. Append `contracts.js` with the following configuration:

    ``` js
    chainstack: {
        deployment:{
          accounts: [
              {
                privateKeyFile:"PATH_TO_KEYSTORE",
                password:"PASSWORD"
              }
          ],
          host:"ENDPOINT",
          port:false,
          protocol:"https",
          type:"rpc"
        },
        dappConnection: [
          "$WEB3",  // uses pre existing web3 object if available (e.g in Mist)
          "ws://localhost:8546",
          "http://localhost:8545"
        ],
        gas: "auto",
      }
    ```

    where

    * PATH_TO_KEYSTORE — the location of the keystore file.
    * PASSWORD — the password you provided when creating the Ethereum account with Geth.
    * ENDPOINT — your Ropsten node endpoint. The format is `nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d`. See also [View node access and credentials](/platform/view-node-access-and-credentials).

    Contract example:

    ``` js
    chainstack: {
        deployment:{
          accounts: [
              {
                privateKeyFile:"//root/.ethereum/keystore/UTC--2019-08-01T07-24-17.754471456Z--73236c8d8aaee5263e8a32c71171030dd7a3e8e6",
                password:"123456"
              }
          ],
          host: "nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d",
          port:false,
          protocol:"https",
          type:"rpc"
        },
        dappConnection: [
          "$WEB3",  // uses pre existing web3 object if available (e.g in Mist)
          "ws://localhost:8546",
          "http://localhost:8545"
        ],
        gas: "auto",
      }
    ```

1. Deploy the contract with Embark:

    ``` sh
    embark run chainstack
    ```

    where

    * `chainstack` — the argument from the configuration file `contracts.js`.

This will deploy the contract on Ropsten.

### Check the contract with Cockpit

On contract deployment, Embark runs Cockpit which is a front-end application to test the contract.

In your browser, open:

`http://localhost:55555/explorer/contracts/CONTRACT_NAME`

where

* CONTRACT_NAME — the name of your contract. In this tutorial, the path is `http://localhost:55555/explorer/contracts/AssetTokenized`.

This will also display the contract address in the `Deployed at` line.

Test the contract by calling:

* `supply()` — to check the remaining supply of tokens on the contract.
* `check()` — to check the amount of tokens owned by the Ethereum address you are using to call the contract.
* `pricePerEth()` — to check the token price in wei.

### Interact with the contract

1. In MetaMask, send an amount of Ropsten ether to the contract address.
1. In Cockpit, call the contract functions `supply()` and `check()` after a few seconds to see a change in values returned.

::: tip See also

* [Operations: Ethereum](/operations/ethereum/)
* [Academic certificates with Truffle](/tutorials/ethereum/academic-certificates-with-truffle)
* [Trust fund account with Remix](/tutorials/ethereum/trust-fund-account-with-remix)

:::
