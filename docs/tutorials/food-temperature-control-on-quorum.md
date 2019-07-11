# Food Supply Temperature Control on Quorum

In this tutorial you will:

* Create a contract for public transactions, deploy it on your [Quorum](/blockchains/quorum) network, and run a public transaction.
* Create a contract for private transactions, deploy it on your Quorum network, and run a private transaction.

The premise of the Quorum network in this tutorial is the following:

* This is a supply chain management network for a *supermarket* and a *storage facility*.
* The supermarket and the storage facility deploy a Quorum network with three nodes.
* The storage facility monitors the temperature of the products it stores and records the temperature readings to the contract on the Quorum network.
* There is a public contract that allows any party to read the temperature off the contract.
* There is a private contract that allows only a specifically set party to read the temperature off the contract.

Sample code for this tutorial is in the [GitHub repository](https://github.com/chainstack/quorum-iot-tutorial).

## Prerequisites

* [Chainstack](https://console.chainstack.com/) account to deploy a Quorum network.

## Overview

To get from zero to a deployed Quorum network with a public contract and a private contract, do the following:

* Prepare:

  1. Deploy a Quorum network with Chainstack.
  1. Install Ethereum JavaScript API to interact with the Quorum network.
  1. Install Solidity JavaScript Compiler to format the contract for the Quorum network deployment.
  1. Install dotenv and create an `.env` file with your Quorum nodes access information.

* Create the contract.
* Deploy the contract as public and run a public transaction.
* Deploy the contract as private and run a private transaction.

## Prepare

### 1. Deploy a Quorum network

#### 1. Create a Consortium project

1. Log in to your [Chainstack](https://console.chainstack.com/) account.
1. Click **Create project**.
1. Click **Consortium**.
1. Provide **Project name** and optionally **Description**.
1. Click **Create**.

This will create a project with Chainstack.

#### 2. Deploy a Quorum network

1. Select the created project and click **Get started**.
1. Provide **Network name**.
1. Under **Blockchain protocol**, select **Quorum**.
1. Under **Consensus mechanism**, select [Raft or IBFT](/blockchains/quorum#consensus). Click **Next**.
1. Under **Cloud hosting provider**, select your preferred provider.
1. Under **Region**, select the region for your deployment.
1. Review your changes and click **Create network**.

::: warning
Currently only Asia-Pacific region is available for deployment.
:::

The network status will change from **Pending** to **Running** once deployed.

Deploy three nodes for this tutorial.

#### 3. Get your Quorum node access information

1. In your Quorum deployment project, click your Quorum network name.
1. Under **Node name**, click your node.

Under **Credentials**, you will see your Quorum node access information.

### 2. Install Ethereum JavaScript API

[Ethereum JavaScript API](https://github.com/ethereum/web3.js) is a collection of libraries to interact with your nodes.

``` sh
$ npm install web3
```

### 3. Install Solidity JavaScript Compiler

The Solidity JavaScript compiler will compile the contract, the ABI, and bytecode formats that you will deploy on your Quorum network.

::: warning
This tutorial uses Solidity Compiler 0.4.25 for web3 compatibility.
:::

``` sh
$ npm install solc@0.4.25
```

### 4. Install and configure dotenv

You will use dotenv to pass your Quorum nodes access information to deploy the contracts and run transactions.

``` sh
$ npm install dotenv
```

In your project folder, create an `.env` file:

``` js
RPC1='RPC_ENDPOINT'
PK1='CONSTELLATION_PUBLIC_KEY'
RPC2='RPC_ENDPOINT'
PK2='CONSTELLATION_PUBLIC_KEY'
RPC3='RPC_ENDPOINT'
PK3='CONSTELLATION_PUBLIC_KEY'
```

where

* RPC_ENDPOINT — your Quorum node RPC endpoint. Available under **Credentials** > **RPC endpoint**.
* CONSTELLATION_PUBLIC_KEY — your Quorum node Constellation public key. Available under **Credentials** > **Constellation public key**.

## Create the contract

In your project's `contracts` directory, create `temperatureMonitor.sol`:

``` js
pragma solidity ^0.4.25;
contract TemperatureMonitor {
  int8 public temperature;
function set(int8 temp) public {
    temperature = temp;
  }
function get() view public returns (int8) {
    return temperature;
  }
}
```

where

* `temperature` is the public variable.
* `set` is the function to write the temperature.
* `get` is the function to fetch the temperature.

## Deploy the contract as public and run a public transaction

### 1. Create a public.js file that will:

1. Format and deploy the contract through Node 1.
2. Set the temperature to `3` through Node 2.
3. Retrieve the temperature through Node 3.

``` js
const dotenv = require('dotenv');
const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');

let temperatureMonitor = {};

dotenv.config();

const raft1Node = new Web3(
  new Web3.providers.HttpProvider(process.env.RPC1), null, {
    transactionConfirmationBlocks: 1,
  },
);

const raft2Node = new Web3(
  new Web3.providers.HttpProvider(process.env.RPC2), null, {
    transactionConfirmationBlocks: 1,
  },
);

const raft3Node = new Web3(
  new Web3.providers.HttpProvider(process.env.RPC3), null, {
    transactionConfirmationBlocks: 1,
  },
);

const main = async () => {
  const {interface, bytecode} = formatContract();
  temperatureMonitor = {
    interface: JSON.parse(interface),
    bytecode: `0x${bytecode}`,
  };

  console.log('Formatted Contract:', temperatureMonitor);

  const contractAddress = await deployContract(raft1Node);
  console.log(`Contract address after deployment: ${contractAddress}`);

  const status = await setTemperature(raft2Node, contractAddress, 3);
  console.log(`Transaction status: ${status}`);

  const temp = await getTemperature(raft3Node, contractAddress);
  console.log('Retrieved contract Temperature', temp);
}

async function getContract(web3, contractAddress) {
  const address = await getAddress(web3);

  return web3.eth.Contract(temperatureMonitor.interface, contractAddress, {
    defaultAccount: address,
  });
}

function getAddress(web3) {
  return web3.eth.getAccounts().then(accounts => accounts[0]);
}

function formatContract() {
  const source = fs.readFileSync('./contracts/temperatureMonitor.sol', 'UTF8');
  return solc.compile(source, 1).contracts[':TemperatureMonitor'];
}

async function deployContract(web3) {
  const address = await getAddress(web3);
  const contract = new web3.eth.Contract(temperatureMonitor.interface);

  return contract.deploy({
    data: temperatureMonitor.bytecode,
  })
  .send({
      from: address,
      gas: '0x2CD29C0',
  })
  .on('error', console.error)
  .then((newContractInstance) => {
    return newContractInstance.options.address;
  });
}

async function setTemperature(web3, contractAddress, temp) {
  const myContract = await getContract(web3, contractAddress);

  return myContract.methods.set(temp).send({}).then((receipt) => {
    return receipt.status;
  });
}

async function getTemperature(web3, contractAddress) {
  const myContract = await getContract(web3, contractAddress);

  return myContract.methods.get().call().then(result => result);
}

main()
```

where

* `formatContract` is the function to format the contract in ABI and bytecode for deployment.
* `deployContract` is the function to deploy the contract with Ethereum JavaScript API libraries.
* `setTemperature` is the function to write the temperature value.
* `getTemperature` is the function to fetch the temperature value.
* `process.env` loads your nodes access variables from the `.env` file.

### 2. Run the transaction

``` sh
$ node public.js
```

This will deploy the contract, set the temperature value and read the temperature value.

Example output:

``` sh
Contract address after deployment: 0xf12345Ac7D7D8E986eFb2321756b5d1e8a25008F
Transaction status: true
Retrieved contract Temperature 3
```

## Deploy the contract as private and run a private transaction

### 1. Create a private.js file that will:

1. Format and deploy the contract as private through Node 1.
2. Set the temperature to `12` through Node 2.
3. Retrieve the temperature through Node 2.
4. Attempt to set the temperature through Node 3 and fail.
5. Attempt to retrieve the temperature through Node 3 and fail.

``` js
const dotenv = require('dotenv');
const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');

let temperatureMonitor = {};

dotenv.config();

const raft1Node = new Web3(
  new Web3.providers.HttpProvider(process.env.RPC1), null, {
    transactionConfirmationBlocks: 1,
  },
);

const raft2Node = new Web3(
  new Web3.providers.HttpProvider(process.env.RPC2), null, {
    transactionConfirmationBlocks: 1,
  },
);

const raft3Node = new Web3(
  new Web3.providers.HttpProvider(process.env.RPC3), null, {
    transactionConfirmationBlocks: 1,
  },
);

const main = async () => {
  const {interface, bytecode} = formatContract();
  temperatureMonitor = {
    interface: JSON.parse(interface),
    bytecode: `0x${bytecode}`,
  };

  console.log('Formatted Contract:', temperatureMonitor);

  const contractAddress = await deployContract(raft1Node, process.env.PK2);
  console.log(`Contract address after deployment: ${contractAddress}`);

  await setTemperature(raft3Node, contractAddress, process.env.PK1, 10);
  const temp = await getTemperature(raft3Node, contractAddress);
  console.log(`[Node3] temp retrieved after updating contract from external nodes: ${temp}`);

  await setTemperature(raft2Node, contractAddress, process.env.PK1, 12);
  const temp2 = await getTemperature(raft2Node, contractAddress);
  console.log(`[Node2] temp retrieved after updating contract from internal nodes: ${temp2}`);

  const temp3 = await getTemperature(raft3Node, contractAddress);
  console.log(`[Node3] temp retrieved from external nodes after update ${temp}`);
}

function getAddress(web3) {
  return web3.eth.getAccounts().then(accounts => accounts[0]);
}

function formatContract() {
  const source = fs.readFileSync('./contracts/temperatureMonitor.sol', 'UTF8');
  return solc.compile(source, 1).contracts[':TemperatureMonitor'];
}

async function getContract(web3, contractAddress) {
  const address = await getAddress(web3);

  return new web3.eth.Contract(temperatureMonitor.interface, contractAddress, {
    defaultAccount: address,
  });
}

async function deployContract(web3, publicKey) {
  const address = await getAddress(web3);
  const contract = new web3.eth.Contract(temperatureMonitor.interface);

  return contract.deploy({
    data: temperatureMonitor.bytecode,
  })
  .send({
    from: address,
    gas: '0x2CD29C0',
    privateFor: [publicKey],
  })
  .then((contract) => {
    return contract.options.address;
  });
}

async function setTemperature(web3, contractAddress, publicKey, temp) {
  const address = await getAddress(web3);
  const myContract = await getContract(web3, contractAddress);

  return myContract.methods.set(temp).send({
    from: address,
    privateFor: [publicKey],
  }).then((receipt) => {
    return receipt.status;
  });
}

async function getTemperature(web3, contractAddress) {
  const myContract = await getContract(web3, contractAddress);

  return myContract.methods.get().call().then(result => result);
}

main()
```

where

* `formatContract` is the function to format the contract in ABI and bytecode for deployment.
* `deployContract` is the function to deploy the contract with Ethereum JavaScript API libraries.
* `setTemperature` is the function to write the temperature value.
* `getTemperature` is the function to fetch the temperature value.
* `process.env` loads your nodes access variables from the `.env` file.
* `privateFor` is the Quorum specific parameter that sets the transaction private for the account idenitified by `publicKey`.

### 2. Run the transaction

``` sh
$ node private.js
```

This will deploy the contract, set the temperature value through the `publicKey` account, read the temperature value through the `publicKey` account, and fail to set and read the temperature through other accounts.

Example output:

``` sh
Contract address after deployment: 0x60b695429838abA534273396ab90e25346F571B8
[Node3] temp retrieved after updating contract from external nodes: null
[Node2] temp retrieved after updating contract from internal nodes: 12
[Node3] temp retrieved from external nodes after update null
```

::: tip See also:

* [Interacting with the blockchain](/guides/interacting-with-the-blockchain#multichain)
* [Application development](/guides/application-development)
* [Quorum: Constellation](https://docs.goquorum.com/en/latest/Privacy/Constellation/Constellation/)

:::
