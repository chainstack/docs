# Loyalty program on Quorum

This tutorial will guide you through creating a simple loyalty program contract and deploying it on your [Quorum](/blockchains/quorum) network.

The loyalty program does the following:

* Rewards each account that joins the program with 10 Ether.
* Lets each account check their loyalty program balance.

This tutorial uses Truffle as [Truffle officially supports Quorum](https://www.trufflesuite.com/docs/truffle/getting-started/working-with-quorum).

The contract and the Truffle configuration are in the [Chainstack GitHub repository](https://github.com/chainstack/quorum-loyalty-program-tutorial).

## Prerequisites

* [Chainstack account](https://console.chainstack.com/) to deploy a Quorum network.
* [Truffle Suite](https://www.trufflesuite.com/) to create and deploy contracts.

## Overview

To get from zero to a deployed Quorum network with the running contract, do the following:

1. With Chainstck, create a [Consortium](/projects/consortium) project.
2. With Chainstack, deploy a Quorum network.
3. With Chainstack, access your Quorum node credentials.
4. With Truffle, create and compile the contract.
5. With Truffle, deploy the contract to your local development network.
6. With Truffle, test the contract.
7. With Truffle, deploy the contract to your Quorum network running with Chainstack.

## Step-by-step

### 1. Create a Consortium project

1. Log in to your [Chainstack account](https://console.chainstack.com/).
2. Click **Create project**.
3. Click **Consortium**.
3. Provide **Project name** and optionally **Description**.
4. Click **Create**.

This will create a project with Chainstack.

### 2. Deploy a Quorum network

1. Select the created project and click **Get started**.
2. Provide **Network name**.
3. Under **Blockchain protocol**, select **Quorum**.
4. Under **Consensus mechanism**, select [Raft or IBFT](/blockchains/quorum#consensus). Click **Next**.
5. Under **Cloud hosting provider**, select your preferred provider.
6. Under **Region**, select the region for your deployment.

  ::: warning
  Currently only **Asia-Pacific** is available.
  :::

7. Review your changes and click **Create network**.

The network status will change from **Pending** to **Running** once deployed.

### 3. Get your Quorum node access information

1. In your Quorum deployment project, click your Quorum network name.
2. Under **Node name**, click your node.

Under **Credentials**, you will see your Quorum node access information.

### 4. Create and compile the contract

1. On your machine, create a directory for the contract. Initialize Truffle in the directory:

```
truffle init
```

This will generate the Truffle boilerplate structure:

```
.
├── contracts
│   └── Migrations.sol
├── migrations
│   └── 1_initial_migration.js
├── test
└── truffle-config.js
``` 

2. Go to the `contracts` directory. Create a `loyaltyProgram.sol` file in the directory.

```js
pragma solidity ^0.5.8;

contract loyaltyProgram {
    mapping (address => uint) private balances;
    address public owner;

    constructor() public payable {
        /* Set the owner to the creator of this contract */
        owner = msg.sender;
    }
    
    /// Join a customer with the loyalty program, 
    /// give 10 ether as reward
    function join() public returns (uint){
        address user = msg.sender;
        balances[user] = 10 ether; 
        return user.balance;
    }

    /// Reads balance of the account requesting
    function balance() public view returns (uint) {
        return balances[msg.sender];
    }
}
```

* `join` gives 10 Ether to the address that joins the program.
* `balance` returns the loyalty program balance associated with the address.
* `msg.sender` is the address that calls the function.

3. Create `2_deploy_contracts.js` in the `migrations` directory.

```js
var loyaltyProgram = artifacts.require("./loyaltyProgram.sol");

module.exports = function(deployer) {
  deployer.deploy(loyaltyProgram);
};
```

This will create the `loyaltyProgram.sol` contract deployment instructions for Truffle.

4. Compile the contract.

Run:

```
truffle compile
```

This will compile the contract and put it in your `build/contracts` directory in the `.json` format.

### 5. Deploy the contract to your local development network

1. Start the local development network.

   1. Edit `truffle-config.js` to add your local development network:

     ```js
     module.exports = {
     networks: {
     development: {
         host: "127.0.0.1",
         port: 9545,
         network_id: "5777"
       }
      }
     };
     ```

   2. Run:

     ```
     truffle develop
     ```
     This will run the development network on your machine.

2. Deploy the contract to the local development network.

Run:

```
truffle migrate --network development
```

This will deploy the contract to the development network as specified in `truffle-config.js`.

### 6. Test the contract

1. Navigate to the `tests` directory.
2. Create a `loyaltyProgramTest.js` file:

```js
var loyaltyProgram = artifacts.require("./loyaltyProgram.sol");

const ether = 10**18; // 1 ether = 1000000000000000000 wei
const reward = 10 * ether;

contract("loyaltyProgram", function(accounts) {
  const account = accounts[0]

  it("should reward joiner with 10 balance", async () => {
    const program = await loyaltyProgram.deployed();

    await program.join({from: account});
    const accountBalance = await program.balance({from: account});
    assert.equal(accountBalance, reward, "initial balance is incorrect");
  });
});
```

::: tip See also:
* [Truffle: Writing Tests in JavaScript](https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript)
:::

3. Run the test:

```
truffle test
```

The test run output should be `Passing`.

### 7. Deploy the contract to your Quorum network

1. Install `HDWalletProvider`.

[HDWalletProvider](https://www.npmjs.com/package/truffle-hdwallet-provider) is Truffle's separate npm package used to sign transactions.

Run:

```console
npm install truffle-hdwallet-provider --save
```

2. Edit `truffle-config.js` to add:

* `HDWalletProvider`
* Your Quorum network running with Chainstack

```js
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = 'word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12 word13 word14 word15';

module.exports = {
  networks: {
    development: {
        host: "127.0.0.1",
        port: 9545,
        network_id: "5777"
    },
    quorum: {
        provider: function() {
        return new HDWalletProvider("mnemonic", "RPC_ENDPOINT");
        },
        network_id: "12345",
        gasPrice: 0,
        gas: 4500000,
        type: "quorum"
    }
   }
};
```

where

* `quorum` — any network name that you will pass to the `truflle migrate --network` command.
* `HDWalletProvider` — Truffle's custom provider to sign transactions.
* `mnemonic` — your mnemonic that generates your accounts. You can also generate a mnemonic online with [Mnemonic Code Converter](https://iancoleman.io/bip39/).
* RPC_ENDPOINT — your Quorum node RPC endpoint. Available under **Credentials** > **RPC endpoint**.
* `network_id` — your Quorum network ID. Available under **Credentials** > **Network ID**. You can set it to `*` for any.
* `gasPrice` — the setting must be `0` for the Quorum network.
* `gas` — the setting must be the default `4500000` for the Quorum network.
* `type` — the setting must be `quorum` to instruct Truffle for the Quorum network deployment.

Example:

```js
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = 'word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12 word13 word14 word15';

module.exports = {
  networks: {
    development: {
        host: "127.0.0.1",
        port: 9545,
        network_id: "5777"
    },
    quorum: {
        provider: function() {
        return new HDWalletProvider("mnemonic", "http://nd-123-456-789.rg-123-456.int.chainstack.com:8545");
        },
        network_id: "12345",
        gasPrice: 0,
        gas: 4500000,
        type: "quorum"
    }
   }
};
```

3. Run:

```
truffle migrate --network quorum
```

This will engage `2_deploy_contracts.js` and deploy the `loyaltyProgram.sol` contract to your Quorum network as specified in `truffle-config.js`.

You can view the deployed contract and the contract address in your Chainstack control panel by navigating to your Quorum project > **Explorer** > **Contracts**.

## Interact with the contract

See [Interacting with Quorum node using Geth JavaScript Console](/guides/interacting-with-the-blockchain#quorum).

The following contract interaction example is done with Geth.

### 1. Connect to a node in your Quorum network

Run:

```console
geth attach RPC_ENDPOINT
```

where

* RPC_ENDPOINT — your Quorum node RPC endpoint. Available under **Credentials** > **RPC endpoint**.

Example:

```console
geth attach http://nd-123-456-789.rg-123-456.int.chainstack.com:8545
```

This will put you in the Geth console interactive mode.

### 2. Set the ABI variable for the contract

Truffle creates the contract's ABI when you run `truffle compile` and saves it to your project's `/build/contracts` directory in `.json` format. Navigate to the directory and get the ABI.

Run:

```js
> var abi = CONTRACT_ABI
```

where

* CONTRACT_ABI — your contract's ABI in one line.

ABI for `loyaltyProgram.sol`:

```js
> var abi = [{"constant":false,"inputs":[],"name":"join","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type": "constructor"},{"constant":true,"inputs":[],"name":"balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant": true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]
```

### 3. Set the contract address

Set the address of the deployed contract.

Run:

```js
> var address = CONTRACT_ADDRESS
```

where

* CONTRACT_ADDRESS — the address of the deployed contract. Get the address by navigating in your Chainstack control panel to your Quorum project > **Explorer** > **Contracts**.

Example:

```js
> var address = "0x1bF2345B6789BcC1234567aE89cedFE1Ef2E34B5"
```

### 4. Set a variable to the contract at the address

Run:

```js
> var CONTRACT_NAME = eth.contract(abi).at(address)
```

where

* CONTRACT_NAME is any name you want to call the contract.

Example:

```js
> var loyaltyProgram = eth.contract(abi).at(address)
```

### 5. Set the default Quorum address and unlock it

Set the default Quorum address to interact with the contract.

Run:

```js
> eth.defaultAccount="QUORUM_ADDRESS"
```

where

* QUORUM_ADDRESS — an address created with one of the node deployments. Available in your Chainstack control panel under **Credentials** > **Default wallet address**.

Example:

```js
> eth.defaultAccount="0x12d34fe5f67ff89f1c23456c78d9123df45cb67a"
```

Unlock the account:

```js
> personal.unlockAccount(eth.defaultAccount)
```

### 6. Call the contract

As the `loyaltyProgram.sol` contract has the `join` function to reward an address for joining, call `join`:

```js
> loyaltyProgram.join()
```

This will create a transaction and give you the transaction ID.

Now check the balance:

```js
> loyaltyProgram.balance()
```

This will display the 10 Ether balance in wei:

```console
10000000000000000000
```

::: tip See also:
* [Interacting with the blockchain](/guides/interacting-with-the-blockchain#multichain)
* [Application development](/guides/application-development)
* [Truffle: Working with Quorum](https://www.trufflesuite.com/docs/truffle/getting-started/working-with-quorum)
* [Truffle: Writing Tests in JavaScript](https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript)
:::