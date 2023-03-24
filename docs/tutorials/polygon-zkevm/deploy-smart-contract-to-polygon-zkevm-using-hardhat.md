---
meta:
  - name: description
    content: Learn how to develop and deploy a smart contract to Polygon zkEVM using Hardhat.
  - name: keywords
    content: tutorial polygon zkevm ethereum hardhat smart contract
---

# Deploy a smart contract to Polygon zkEVM using Hardhat

The Polygon PoS mainnet is an L2 commit chain to the Ethereum mainnet.

Bridging your existing Ethereum smart contract to the Polygon PoS commit chain allows network users to move their assets based on your contract between an Ethereum network and a Polygon PoS commit chain.

In this tutorial, you will:

* Deploy an ERC-20 smart contract on the Ethereum [Goerli testnet](/operations/ethereum/networks).
* Deploy a compatible smart contract on the Polygon PoS [Mumbai testnet](/operations/polygon/networks).
* Map the Ethereum smart contract to the Polygon PoS smart contract.

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy an Ethereum node and a Polygon PoS node.
* [Truffle Suite](https://www.trufflesuite.com/) to create and deploy contracts.
* [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts) to use the audited [ERC-20 libraries](https://docs.openzeppelin.com/contracts/erc20) to create your ERC-20 contract.

## Overview

To get from zero to a deployed ERC-20 contract on the Ethereum Goerli testnet and bridge it to the Polygon PoS Mumbai testnet, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, join the Ethereum Goerli testnet.
1. In the same project, join the Polygon PoS Mumbai testnet.
1. With Chainstack, access your Ethereum node and Polygon PoS node endpoints.
1. With OpenZeppelin, create an ERC-20 contract.
1. With Truffle, compile and deploy the contract through your Ethereum node.
1. With Truffle, compile and deploy a Polygon PoS contract through your Polygon PoS node.
1. Submit a mapping request to bridge the deployed Ethereum contract to the deployed Polygon PoS contract.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the Ethereum Goerli testnet and the Polygon PoS Mumbai testnet

See [Join a public network](/platform/join-a-public-network).

### Get your Ethereum node and Polygon PoS node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Install OpenZeppelin Contracts

See [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/).

### Install Truffle Suite

See [Truffle Suite: Installation](https://www.trufflesuite.com/docs/truffle/getting-started/installation).

### Create the root Ethereum ERC-20 contract

1. On your machine, in the contract directory, initialize Truffle:

``` sh
truffle init
```

This will generate the Truffle boilerplate structure:

``` sh
.
├── contracts
│   └── Migrations.sol
├── migrations
│   └── 1_initial_migration.js
├── test
└── truffle-config.js
```

2. Go to the `contracts` directory. In the directory, create your ERC-20 contract: `myL2token.sol`.

``` js
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract myL2token is ERC20 {
    constructor(uint256 initialSupply) ERC20("myL2token", "ML2T") {
        _mint(msg.sender, initialSupply);
    }
}
```

This is a standard [OpenZeppelin ERC-20 preset contract](https://docs.openzeppelin.com/contracts/erc20).

3. Create `2_deploy_contracts.js` in the `migrations` directory.

``` js
var myL2token = artifacts.require("./myL2token.sol");

module.exports = function(deployer) {
  deployer.deploy(myL2token, 100000000000000000000);
};
```

This will create the instructions for Truffle to deploy the contract with the supply of `100` 18-decimal `ML2T` tokens.

### Compile and deploy the root Ethereum ERC-20 contract

1. Install `HDWalletProvider`.

[HDWalletProvider](https://github.com/trufflesuite/truffle/tree/develop/packages/hdwallet-provider) is Truffle's separate npm package used to sign transactions.

Run:

``` sh
npm install @truffle/hdwallet-provider
```

2. Edit `truffle-config.js` to add:

* `HDWalletProvider`
* Your Ethereum node access and credentials
* Your Ethereum account that you will use to deploy the contract

``` js
const HDWalletProvider = require("@truffle/hdwallet-provider");
const private_key = 'PRIVATE_KEY';

module.exports = {
 networks: {
    goerli: {
        provider: () => new HDWalletProvider(private_key, "ENDPOINT"),
        network_id: 5
    }
   },

 compilers: {
    solc: {
    version: "0.8.1",
    }
  }
};
```

where

* `goerli` — any network name that you will pass to the `truffle migrate --network` command.
* `HDWalletProvider` — Truffle's custom provider to sign transactions.
* PRIVATE_KEY — the private key of your Ethereum account that will deploy the contract.
* ENDPOINT — your Ethereum node endpoint. The format is `https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d`. See also [View node access and credentials](/platform/view-node-access-and-credentials) and [Tools](/operations/ethereum/tools).
* `network_id` — the network ID of the Ethereum Goerli testnet: `5`.
* `solc` — the Solidity compiler version that Truffle must use.

3. Run:

``` sh
truffle migrate --network goerli
```

This will engage `2_deploy_contracts.js` and deploy the contract to the Ethereum Goerli testnet as specified in `truffle-config.js`.

### Verify your root Ethereum ERC-20 contract on Etherscan

Once your contract is deployed, you can view it online at [Etherscan](https://goerli.etherscan.io/).

Before you submit a mapping request to bridge your root Ethereum ERC-20 contract to the Polygon PoS commit chain, you must verify the contract on Etherscan.

1. Flatten your contract code

Since your ERC-20 contract uses imported OpenZeppelin libraries, you must put all the imports into one `.sol` file to make Etherscan be able to verify it.

Install [Truffle Flattener](https://www.npmjs.com/package/truffle-flattener).

In the `contracts` directory, run:

``` sh
npx truffle-flattener myL2token.sol > flatmyL2token.sol
```

2. Clean up the licensing information.

The flattened contract will have the same licensing note imported from each of the files. Multiple licensing notes in one file break the Etherscan verification, so you have to leave one licensing note for the entirety of the flattened contract.

The easiest way to clean up is to search for the `SPDX` mentions in the file and remove all of them except for the very first one.

3. Verify the deployed contract on Etherscan

At this point you have your flattened and cleaned up contract ready for the Etherscan verification.

1. Go to [Etherscan](https://goerli.etherscan.io/).
1. Find your deployed contract. The address of your contract should have been printed by Truffle at the end of the deployment in the `contract address` field.
1. On the contract page on Etherscan, click **Contract** > **Verify and Publish**.
1. In **Compiler Type**, select **Solidity (Single file)**.
1. In **Compiler Version**, select **v0.8.1**. This is the version this tutorial used to compile the contract.
1. In **Open Source License Type**, select **MIT License (MIT)**.
1. Click **Continue**.
1. Keep the **Optimization** option set to **No** as Truffle does not use optimization by default.
1. Paste the entirety of your flattened `.sol` contract in the **Enter the Solidity Contract Code below** field.
1. Click **Verify and Publish**.

Etherscan will take a few seconds to complie your contract, verify, and publish it.

### Create the child Polygon PoS ERC-20 contract

1. Go to the `contracts` directory. In the directory, put the default [child ERC-20 contract](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol) provided by Polygon.

2. Create `2_deploy_contracts.js` in the `migrations` directory.

``` js
var ChildERC20 = artifacts.require("./ChildERC20.sol");

module.exports = function(deployer) {
  deployer.deploy(ChildERC20, 'myL2tokenChild', 'ML2T', 18, '0x2e5e27d50EFa501D90Ad3638ff8441a0C0C0d75e');
};
```

where

* `myL2tokenChild` — the name of your ERC-20 token.
* `ML2T` — the symbol of your ERC-20 token.
* `18` — the default decimals number as used by the [OpenZeppelin ERC-20 preset contract](https://docs.openzeppelin.com/contracts/erc20).
* `0x2e5e27d50EFa501D90Ad3638ff8441a0C0C0d75e` — the [ChildChainManager](https://docs.polygon.technology/docs/develop/ethereum-polygon/pos/getting-started#steps-to-use-the-pos-bridge) address on the Polygon PoS Mumbai testnet. For the ChildChainManager contract addresses, see the addresses provided by Polygon:
  * [Testnet addresses](https://github.com/maticnetwork/static/blob/master/network/testnet/mumbai/index.json)
  * [Mainnet addresses](https://github.com/maticnetwork/static/blob/master/network/mainnet/v1/index.json)

### Compile and deploy the child Polygon PoS ERC-20 contract

Clean up the environment by moving `myL2token.sol` and `flatmyL2token.sol` to a backup directory so that Truffle does not pick them up for deployment.

1. Edit `truffle-config.js` to change to:

* Your Polygon PoS node access and credentials
* Your Polygon PoS account that you will use to deploy the contract
* The Solidity compiler version used by the default [child ERC-20 contract template](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol) provided by Polygon

``` js
const HDWalletProvider = require("@truffle/hdwallet-provider");
const private_key = 'PRIVATE_KEY';

module.exports = {
 networks: {
    mumbai: {
        provider: () => new HDWalletProvider(private_key, "ENDPOINT"),
        network_id: 80001
    }
   },

 compilers: {
    solc: {
    version: "0.6.6",
    }
  }
};
```

where

* `mumbai` — any network name that you will pass to the `truffle migrate --network` command.
* `HDWalletProvider` — Truffle's custom provider to sign transactions.
* PRIVATE_KEY — the private key of your Polygon PoS account that will deploy the contract.
* ENDPOINT — your Polygon PoS node endpoint. The format is `https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d`. See also [View node access and credentials](/platform/view-node-access-and-credentials) and [Tools](/operations/polygon/tools).
* `network_id` — the network ID of the Polygon PoS network: testnet is `80001`, mainnet is `137`,
* `solc` — the Solidity compiler version that Truffle must use. OpenZeppelin contracts have a higher version Solidity compiler requirement than the default Truffle installation, hence you must provide a specific compiler version.

2. Run:

``` sh
truffle migrate --network mumbai
```

### Verify your child Polygon PoS ERC-20 contract on the Polygon PoS explorer

Once your contract is deployed, you can view it online at the [Polygon PoS Mumbai explorer](https://mumbai.polygonscan.com/).

1. Go to the [Polygon PoS Mumbai explorer](https://mumbai.polygonscan.com/).
1. Find your deployed contract. The address of your contract should have been printed by Truffle at the end of the deployment in the `contract address` field.
1. On the contract page on the explorer, click **Contract** > **Verify and Publish**.
1. In **Compiler Type**, select **Solidity (Single file)**.
1. In **Compiler Version**, select **v0.6.6**. This is the compiler version the default child contract uses as provided by Polygon.
1. In **Open Source License Type**, select **MIT License (MIT)**.
1. Click **Continue**.
1. Keep the **Optimization** option set to **No** as Truffle does not use optimization by default.
1. Paste the entirety of your `ChildERC20.sol` contract in the **Enter the Solidity Contract Code below** field.
1. Click **Verify and Publish**.

::: tip ABI data

If on the verification attempt you get a message that the explorer cannot get the ABI data for the contract verification, do the following:

1. Go to the [online ABI encoding service](https://abi.hashex.org/).
1. In the service, provide the [ChildERC20.json](https://github.com/maticnetwork/pos-portal/blob/master/artifacts/ChildERC20.json) ABI data as ([abi]) .
1. Click **Parse**.
1. Put your constructor data by adding arguments with the data type:
   * name_: `myL2tokenChild`
   * symbol_: `ML2T`
   * decimals_: `18`
   * childChainManager: `0x2e5e27d50EFa501D90Ad3638ff8441a0C0C0d75e`
1. Copy the encoded data.
1. Paste the encoded data in the ABI constructor arguments field on the explorer.

:::

The explorer will take a few seconds to compile your contract, verify, and publish it.

### Map your Ethereum ERC-20 contract to the Polygon PoS contract

1. Go go the [token mapper](https://mapper.polygon.technology/map).
1. Select **ERC20** and **Goerli Testnet - Mumbai Testnet**.
1. Provide the address of your contract on the Ethereum Goerli testnet and on the Polygon PoS Mumbai testnet.
1. Provide an email address to be notified of when the mapping is done.
1. Click **Submit**.

### Bridge the mapped token

When your token is mapped, bridge your token from Ethereum to Polygon and back:

* [Polygon Mumbai testnet bridge](https://wallet-dev.polygon.technology/bridge)
* [Polygon mainnet bridge](https://wallet.polygon.technology/bridge)

## Conclusion

This tutorial guided you through the basics of bridging an ERC-20 contract from the Ethereum Goerli testnet to the Polygon Mumbai testnet.

The same instructions will work for the Ethereum mainnet and the Polygon mainnet.

Polygon PoS has public L2 contract templates and a network of deployed contracts monitored by [Heimdall nodes](/blockchains/polygon), all of which makes it easy to bridge assets from the Ethereum mainnet to the Polygon PoS commit chain.

::: tip See also

* [Operations: Polygon PoS](/operations/polygon/)

:::
