---
meta:
  - name: description
    content: Learn how to deploy and run a simple Aave flash loan on Avalanche with Brownie.
  - name: keywords
    content: tutorial avalanche avax aave flash loan brownie fuji
---

# Aave flash loans with Brownie

An Aave flash loan is an uncollateralized loan for any available amount from an Aave lending pool to your contract that is borrowed and returned within one transaction. If the borrower cannot return the borrowed amount and the loan fee within one transaction, the transaction is reverted.

For detailed documentation, see Aave Developers: [Flash Loans](https://docs.aave.com/developers/guides/flash-loans).

The objective of this tutorial is to make you familiar with the [Avalanche C-Chain](/blockchains/avalanche), the [Brownie framework](/operations/avalanche/tools#brownie), and the [Aave flash loans](https://aave.com/flash-loans/).

Specifically, in this tutorial, you will:

* Deploy an Avalanche node on the Fuji testnet.
* Scaffold an Aave flash loan project with Brownie.
* Run a flash loan on the Fuji testnet through an Avalanche node deployed with Chainstack.

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy an Avalanche node.
* [Brownie](https://eth-brownie.readthedocs.io/) to create and deploy contracts.

## Overview

To get from zero to an executed Aave flash loan on the Avalanche Fuji C-Chain testnet, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, join the Avalanche Fuji testnet.
1. With Chainstack, access your Avalanche node endpoint.
1. With Brownie, scaffold and set up an Aave flash loan project.
1. With Brownie, execute the flash loan through your Avalanche node.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the Avalanche Fuji testnet

See [Join a public network](/platform/join-a-public-network).

### Get your Avalanche node endpoint

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Install Brownie

See [Installing Brownie](https://eth-brownie.readthedocs.io/en/stable/install.html).

### Point Brownie to your Avalanche node

See [Avalanche tools: Brownie](/operations/avalanche/tools#brownie).

### Scaffold an Aave flash loan project

With Brownie, you can scaffold projects using [Brownie mixes](https://github.com/brownie-mix/).

This tutorial uses the [Aave flash loan mix](https://github.com/brownie-mix/aave-flashloan-mix).

To scaffold, run in your project directory:

``` sh
brownie bake aave-flashloan
```

This will initialize the project with the Aave flash loan contracts and scripts.

### Fund your account

You need AVAX on your account to:

* Pay for the gas for the transactions.
* Wrap AVAX as the loan fee is paid in wrapped AVAX.

Use the [AVAX Fuji testnet faucet](https://faucet.avax-test.network/) to fund your account.

### Update the OpenZeppelin dependency

The default Aave flash loan Brownie mix uses the outdated `3.0.0` version dependency that will not compile the contracts.

Update the dependency requirement to `4.4.1` or higher by editing the `brownie-config.yaml` file.

Example of the updated `brownie-config.yaml` file:

``` yaml
...
dependencies:
  - OpenZeppelin/openzeppelin-contracts@4.4.1
...
```

### Add the wrapped AVAX and lending pool addresses

You need to add the wrapped AVAX address and the Aave lending pool address to the configuration file for the scripts to run.

For the addresses, see Aave Developers: [Avalanche market](https://docs.aave.com/developers/v/2.0/deployed-contracts/avalanche-market).

The addresses on the Fuji testnet that you need are:

* [LendingPoolAddressesProvider](https://docs.aave.com/developers/v/2.0/the-core-protocol/addresses-provider): 0x7fdC1FdF79BE3309bf82f4abdAD9f111A6590C0f
* WAVAX: 0xd00ae08403B9bbb9124bB305C09058E32C39A48c

In your baked `aave-flashloan` project directory, open for editing `brownie-config.yaml`.

In `brownie-config.yaml`, under `networks`, append the networks with the Brownie Avalanche network ID and Aave Avalanche Fuji testnet addresses:

* Brownie Avalanche network ID — the same Brownie network ID you assigned when pointing Brownie to your Avalanche node. See also [Avalanche tools: Brownie](/operations/avalanche/tools#brownie).
* `aave_lending_pool_v2` — the Aave LendingPoolAddressesProvider on the Avalanche Fuji testnet. See also Aave Developers: [Avalanche market](https://docs.aave.com/developers/deployed-contracts/avalanche-market).
* `weth` — the wrapped AVAX contract used by Aave on the Avalanche Fuji testnet. See also Aave Developers: [Avalanche market](https://docs.aave.com/developers/deployed-contracts/avalanche-market).

Example of the `networks` part of the appended `brownie-config.yaml` file with the Avalanche Fuji testnet addresses:

``` yaml
...
networks:
  default: mainnet-fork
  mainnet-fork:
    aave_lending_pool_v2: "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5"
    weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  kovan:
    aave_lending_pool_v2: "0x88757f2f99175387ab4c6a4b3067c77a695b0349"
    weth: "0xd0a1e359811322d97991e03f863a0c30c2cf029c"
  mainnet:
    aave_lending_pool_v2: "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5"
    weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  avalanche-testnet:
    aave_lending_pool_v2: "0x7fdC1FdF79BE3309bf82f4abdAD9f111A6590C0f"
    weth: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c"
...
```

### Add your account private key

Add the private key from your funded account to the environment:

``` sh
export PRIVATE_KEY="KEY"
```

where KEY is the private key of your funded Avalanche account.

Note that if you are exporting your private key from MetaMask, you need to prepend the value with `0x`.

Example:

``` sh
export PRIVATE_KEY="0xa2c3fcc3c551ba0ef90bf89d732a25eb73ef003bf5b3d8f68bec9dede804444f"
```

### Get wrapped AVAX

At this point, your account has AVAX that you need to wrap. The Aave lending pool accepts wrapped AVAX for the loan fee. If the flash loan contract that you are going to deploy does not have enough wrapped AVAX, the flash loan transaction will revert.

To wrap your AVAX, change to the `scripts` directory and run the `get_weth.py` script:

``` sh
brownie run get_weth.py --network BROWNIE_NETWORK_ID
```

where BROWNIE_NETWORK_ID is the same ID you provided in the  `brownie-config.yaml` file.

Example:

``` sh
brownie run get_weth.py --network avalanche-testnet
```

This will send 1 AVAX from your account to the [wrapped AVAX contract](https://testnet.snowtrace.io/address/0xd00ae08403B9bbb9124bB305C09058E32C39A48c) on the Fuji testnet and the contract will send back to your account 1 wrapped AVAX.

### Deploy the flash loan contract

The flash loan contract is pre-configured to borrow 1 wrapped AVAX from the Aave lending pool and pay it back with a loan fee. However, for this tutorial on the Fuji testnet, you will need to lower that amount since the Aave contract does not allow you to borrow that much in this case. 

The contract that you will deploy is `aave-flashloan/contracts/v2/FlashloanV2.sol`.

The 1 wrapped AVAX loan value is set in the contract with the following code:

``` sol
...
function flashloan(address _asset) public onlyOwner {
        bytes memory data = "";
        uint amount = 1 ether;
...
```

We recommend lowering the amount to 0.01 or lower. However, remember that you will need to [convert it to Wei](https://eth-converter.com/) since Solidity does not work with decimals.

``` sol

// Flash loan 10000000000000000 wei (0.01) worth of `_asset`

...
function flashloan(address _asset) public onlyOwner {
        bytes memory data = "";
        uint amount = 10000000000000000;
...
```

To deploy the contract, change to the `scripts` directory and run the `deployment_v2.py` script:

``` sh
brownie run deployment_v2.py --network BROWNIE_NETWORK_ID
```

where BROWNIE_NETWORK_ID is the same ID you provided in the  `brownie-config.yaml` file.

Example:

``` sh
brownie run deployment_v2.py --network avalanche-testnet
```

This will deploy the flash loan contract.

### Run the flash loan

At this point you have everything set up to run the actual flash loan:

* Your Brownie instance is pointing to your Avalanche node deployed with Chainstack.
* Your Brownie instance is configured to use the Aave lending pool on Avalanche.
* Your account has wrapped AVAX that you need to fund your flash loan contract.
* Your flash loan contract is deployed and ready to borrow 1 wrapped AVAX from the Aave lending pool and pay the borrowed wrapped AVAX and the loan fee back to the pool.

To run the flash loan, change to the `scripts` directory and run the `run_flash_loan_v2.py` script:

``` sh
brownie run run_flash_loan_v2.py --network BROWNIE_NETWORK_ID
```

where BROWNIE_NETWORK_ID is the same ID you provided in the  `brownie-config.yaml` file.

Example:

``` sh
brownie run run_flash_loan_v2.py --network avalanche-testnet
```

On the first run, the `run_flash_loan_v2.py` script will produce two transactions:

* Flash loan contract funding transaction — your account will send 1 wrapped AVAX to the flash loan contract you deployed at the previous step. The contract must be funded with wrapped AVAX as the contract will pay the loan fee to the Aave lending pool in wrapped AVAX.
* The flash loan transaction — the actual flash loan transaction that consists of the following three events:
  * Transfer of 1 wrapped AVAX from the Aave lending pool to your deployed flash loan contract.
  * Minting of shares for the protocol's interest to the Aave collector address. This is part of Aave's solvency risk mitigation mechanism. See also Aave's Risk Framework: [Reserve Factor](https://docs.aave.com/risk/asset-risk/risk-parameters#reserve-factor).
  * Transfer of 1 wrapped AVAX plus the loan fee from the flash loan contract back to the Aave lending pool.

Each subsequent run of the `run_flash_loan_v2.py` script will produce the flash loan transaction.

## Conclusion

This tutorial guided you through setting up Brownie to work with the Chainstack nodes and using the Aave flash loan Brownie mix to run your own flash loan transaction on the Avalanche network.

This tutorial uses testnet, however the exact same instructions and sequence will work on the mainnet as well.

::: tip See also

* [Operations: Avalanche](/operations/avalanche/)

:::
