---
meta:
  - name: description
    content: Learn how to develop and deploy a simple loyalty program smart contract on the Quorum blockchain protocol.
  - name: keywords
    content: quorum blockchain dapp tutorial truffle
---

# Loyalty program with Truffle

This tutorial will guide you through creating a simple loyalty program contract and deploying it on your [Quorum](/blockchains/quorum) network.

The loyalty program does the following:

* Joins each account that calls the contract.
* Lets each account check their loyalty program balance.

This tutorial uses Truffle as [Truffle officially supports Quorum](https://www.trufflesuite.com/docs/truffle/getting-started/working-with-quorum).

The contract and the Truffle configuration are in the [GitHub repository](https://github.com/chainstack/quorum-loyalty-program-tutorial).

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy a Quorum network.
* [Truffle Suite](https://www.trufflesuite.com/) to create and deploy contracts.

## Overview

To get from zero to a deployed Quorum network with the running contract, do the following:

1. With Chainstack, create a [consortium project](/glossary/consortium-project).
1. With Chainstack, deploy a Quorum network.
1. With Chainstack, access your Quorum node credentials.
1. With Truffle, create and compile the contract.
1. With Truffle, deploy the contract to your local development network.
1. With Truffle, test the contract.
1. With Truffle, deploy the contract to your Quorum network running with Chainstack.

## Step-by-step

### Create a consortium project

See [Create a project](/platform/create-a-project).

### Deploy a Quorum network

See [Deploy a consortium network](/platform/deploy-a-consortium-network).

### Get your Quorum node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Create and compile the contract

1. On your machine, create a directory for the contract. Initialize Truffle in the directory:

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

2. Go to the `contracts` directory. Create a `loyaltyProgram.sol` file in the directory.

``` js
pragma solidity ^0.5.8;

contract loyaltyProgram {
    mapping (address => uint) private balances;
    address public owner;

    constructor() public payable {
        /* Set the owner to the creator of this contract */
        owner = msg.sender;
    }

    /// Join a customer with the loyalty program
    function join() public view returns (uint){
        address user = msg.sender;
        return user.balance;
    }

    /// Reads balance of the account requesting
    function balance() public view returns (uint) {
        return balances[msg.sender];
    }
}
```

* `join` joins the address with the program.
* `balance` returns the loyalty program balance associated with the address.
* `msg.sender` is the address that calls the function.

3. Create `2_deploy_contracts.js` in the `migrations` directory.

``` json
var loyaltyProgram = artifacts.require("./loyaltyProgram.sol");

module.exports = function(deployer) {
  deployer.deploy(loyaltyProgram);
};
```

This will create the `loyaltyProgram.sol` contract deployment instructions for Truffle.

4. Compile the contract.

Run:

``` sh
truffle compile
```

This will compile the contract and put it in your `build/contracts` directory in the `.json` format.

### Deploy the contract to your local development network

1. Start the development network on your machine:

``` sh
truffle develop
```

2. Without exiting the Truffle console, deploy the contract to the local development network:

``` js
truffle(develop)>  migrate
```

This will deploy the contract to the development network as specified in `truffle-config.js`.

### Test the contract

1. Navigate to the `test` directory.
2. Create a `loyaltyProgramTest.js` file:

``` js
var loyaltyProgram = artifacts.require("./loyaltyProgram.sol");

contract("loyaltyProgram", function(accounts) {
  const account = accounts[0]

  it("should join the address with the program", async () => {
    const program = await loyaltyProgram.deployed();

    await program.join({from: account});
  });
});
```

::: tip See also

* [Truffle: Writing Tests in JavaScript](https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript)

:::

3. Start the local development network:

``` sh
truffle develop
```

3. Without exiting the Truffle console, run the test:

``` js
truffle(develop)> test
```

The test run output should be `Passing`.

### Deploy the contract to your Quorum network

1. Install `HDWalletProvider`.

[HDWalletProvider](https://github.com/trufflesuite/truffle/tree/develop/packages/hdwallet-provider) is Truffle's separate npm package used to sign transactions.

Run:

``` sh
npm install @truffle/hdwallet-provider
```

2. Edit `truffle-config.js` to add:

* `HDWalletProvider`
* Your Quorum network running with Chainstack

``` js
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12 word13 word14 word15";

module.exports = {
  networks: {
    development: {
        host: "127.0.0.1",
        port: 9545,
        network_id: "5777"
    },
    quorum: {
        provider: () => new HDWalletProvider(mnemonic, "ENDPOINT"),
        network_id: "*",
        gasPrice: 0,
        gas: 4500000,
        type: "quorum"
    }
   }
};
```

where

* `quorum` — any network name that you will pass to the `truffle migrate --network` command.
* `HDWalletProvider` — Truffle's custom provider to sign transactions.
* `mnemonic` — your mnemonic that generates your accounts. You can also generate a mnemonic online with [Mnemonic Code Converter](https://iancoleman.io/bip39/). Make sure you generate a 15 word mnemonic.
* ENDPOINT — your Quorum node HTTPS endpoint. The format is `https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d`. See [View node access and credentials](/platform/view-node-access-and-credentials).
* `network_id` — your Quorum network ID. See [Default network ID](/operations/quorum/default-network-id). You can set it to `*` for any.
* `gasPrice` — the setting must be `0` for the Quorum network.
* `gas` — the setting must be the default `4500000` for the Quorum network.
* `type` — the setting must be `quorum` to instruct Truffle for the Quorum network deployment.

Example:

``` js
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12 word13 word14 word15";

module.exports = {
  networks: {
    development: {
        host: "127.0.0.1",
        port: 9545,
        network_id: "5777"
    },
    quorum: {
        provider: () => new HDWalletProvider(mnemonic, "https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d"),
        network_id: "*",
        gasPrice: 0,
        gas: 4500000,
        type: "quorum"
    }
   }
};
```

3. Run:

``` sh
truffle migrate --network quorum
```

This will engage `2_deploy_contracts.js` and deploy the `loyaltyProgram.sol` contract to your Quorum network as specified in `truffle-config.js`.

You can view the deployed contract and the contract address on the Chainstack platform by navigating to your Quorum project > **Explorer** > **Contracts**.

## Interact with the contract

The following contract interaction example is done with GoQuorum. For GoQuorum installation instructions, see [Tools](/operations/quorum/tools).

### Connect to a node in your Quorum network

Run:

``` sh
./geth attach ENDPOINT
```

where

* ENDPOINT — your Quorum node HTTPS endpoint. The format is `https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d`.

Example:

``` sh
./geth attach https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

This will put you in the GoQuorum console interactive mode.

### Set the ABI variable for the contract

Truffle creates the contract's ABI when you run `truffle compile` and saves it to your project's `/build/contracts` directory in `.json` format. Navigate to the directory and get the ABI.

Run:

``` js
var abi = JSON.parse('CONTRACT_ABI')
```

where

* CONTRACT_ABI — your contract's ABI in one line.

ABI for `loyaltyProgram.sol`:

``` js
var abi = JSON.parse('[{"constant":true,"inputs":[],"name": "owner","outputs":[{"name":"","type":"address"}],"payable": false,"stateMutability":"view","type":"function"},{"inputs":[],"payable": true,"stateMutability": "payable","type": "constructor"},{"constant":false,"inputs":[],"name": "join","outputs":[{"name":"","type": "uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs": [],"name":"balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]')
```

### Set the contract address

Set the address of the deployed contract.

Run:

``` js
eth.contract(abi).at('CONTRACT_ADDRESS')
```

where

* CONTRACT_ADDRESS — the address of the deployed contract. Get the address by navigating on the Chainstack platform to your Quorum project > **Explorer** > **Contracts**.

Example:

``` js
eth.contract(abi).at('0x1bF2345B6789BcC1234567aE89cedFE1Ef2E34B5')
```

### Set a variable to the contract at the address

Run:

``` js
var CONTRACT_NAME = eth.contract(abi).at('CONTRACT_ADDRESS')
```

where

* CONTRACT_NAME — any name you want to call the contract.
* CONTRACT_ADDRESS — the address of the deployed contract. Get the address by navigating on the Chainstack platform to your Quorum project > **Explorer** > **Contracts**.

Example:

``` js
var loyaltyProgram = eth.contract(abi).at('0x1bF2345B6789BcC1234567aE89cedFE1Ef2E34B5')
```

### Set the default Quorum address to interact with the contract

Run:

``` js
eth.defaultAccount = "QUORUM_ADDRESS"
```

where

* QUORUM_ADDRESS — an address created with one of the node deployments. Available on the Chainstack platform under **Access and credentials** > **Default wallet** > **Address**.

Example:

``` js
eth.defaultAccount = "0x12d34fe5f67ff89f1c23456c78d9123df45cb67a"
```

### Call the contract

As the `loyaltyProgram.sol` contract has the `join` function, call `join`:

``` js
loyaltyProgram.join()
```

This will create a transaction and give you the transaction ID.

Now check the balance:

``` js
loyaltyProgram.balance()
```

This will display the balance:

``` js
0
```

::: tip See also

* [Operations: Quorum](/operations/quorum/)
* [Truffle: Working with Quorum](https://www.trufflesuite.com/docs/truffle/getting-started/working-with-quorum)
* [Truffle: Writing Tests in JavaScript](https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript)

:::
