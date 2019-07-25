# Asset tokenization on Ethereum

This tutorial will guide you through creating a tokenized asset contract and deploying it on Ropsten testnet.

For illustration purposes, this contract does the following:

* Creates a total supply of 1000 tokens specific to the asset.
* Sets the token price to 0.1 Ether.
* Lets anyone exchange Ether for the asset tokens.

This tutorial uses [Embark](https://embark.status.im/) to test and deploy the contract.

## Prerequisites

* [Chainstack account](https://console.chainstack.com/) to deploy a Ropsten testnet node.
* [Embark](https://embark.status.im/) to test and deploy the contract.
* [Geth](https://geth.ethereum.org/) to create an Ethereum account that will deploy the contract.
* [Metamask](https://metamask.io/) to interact with the contract.

## Overview

To get from zero to an asset tokenization contract running on Ropsten, do the following:

1. With Chainstack, create a [Public chain project](/glossary/public-chain-project).
1. With Chainstack, deploy a Ropsten testnet node.
1. With Embark, create a project and the contract.
1. With Geth, create a new account.
1. Import the account in Metamask and fund the account with Ropsten Ether.
1. With Embark, deploy the contract through the Ropsten node.
1. With Embark, check the contract with Cockpit.
1. Interact with the contract through Metamask.

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
        balance[msg.sender] += msg.value/pricePerEth; // adds asset tokens to how much Ether is sent by the investor
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

### Import the account in Metamask and fund the account

1. In Metamask, click **Import Account** > **JSON FIle**.
1. Select the keystore file that you created earlier.
1. Fund the account with Ropsten Ether at [Ropsten Ethereum Faucet](https://faucet.ropsten.be/).

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
          host:"RPC_ENDPOINT",
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
    * RPC_ENDPOINT — your Ropsten node RPC endpoint. Available under **Credentials** > **RPC endpoint**.  

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

* `supply()` to check the remaining supply of tokens on the contract.
* `check()` to check the amount of tokens owned by the Ethereum address you are using to call the contract.
* `pricePerEth()` to check the token price in wei.

### Interact with the contract

1. In Metamask, send an amount of Ropsten Ether to the contract address.
1. In Cockpit, call the contract functions `supply()` and `check()` after a few seconds to see a change in values returned.

::: tip See also
* [Operations: Ethereum](/operations/ethereum/introduction)
:::