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

The test run output should be **Passing**.

### 7. Deploy the contract to your Quorum network

1. Edit `truffle-config.js` to add your Quorum network running with Chainstack:

```js
module.exports = {
  networks: {
    development: {
        host: "127.0.0.1",
        port: 9545,
        network_id: "5777"
    },
    quorum: {
        host: "HOSTNAME",
        port: PORT,
        network_id: "*",
        gasPrice: 0,
        gas: 4500000,
        type: "quorum"
    }
   }
};
```

where

* `quorum` — any network name that you will pass to the `truflle migrate --network` command.
* HOSTNAME — your Quorum hostname available under **Credentials** > **RPC endpoint**.
* PORT — your Quorum port available under **Credentials** > **RPC endpoint**.
* `network_id` — your Quorum network ID available under **Credentials** > **Network ID**. You can set it to `*` for any.
* `gasPrice` — the setting must be `0` for the Quorum network.
* `gas` — the setting must be the default `4500000` for the Quorum network.
* `type` — the setting must be `quorum` to instruct Truffle for the Quorum network deployment.

Example:

```js
module.exports = {
  networks: {
    development: {
        host: "127.0.0.1",
        port: 9545,
        network_id: "5777"
    },
    quorum: {
        host: "nd-123-456-789.rg-123-456.int.chainstack.com",
        port: 8545,
        network_id: "*",
        gasPrice: 0,
        gas: 4500000,
        type: "quorum"
    }
   }
};
```

2. Run:

```
truffle migrate --network quorum
```

This will engage `2_deploy_contracts.js` and deploy the `loyaltyProgram.sol` contract to your Quorum network as specified in `truffle-config.js`.

## Interact with the contract

See [Interacting with Quorum node using Geth JavaScript Console](/guides/interacting-with-the-blockchain#quorum).

::: tip See also:
* [Interacting with the blockchain](/guides/interacting-with-the-blockchain#multichain)
* [Application development](/guides/application-development)
* [Truffle: Working with Quorum](https://www.trufflesuite.com/docs/truffle/getting-started/working-with-quorum)
* [Truffle: Writing Tests in JavaScript](https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript)
:::