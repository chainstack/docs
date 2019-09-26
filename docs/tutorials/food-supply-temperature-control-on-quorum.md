# Food supply temperature control on Quorum

In this tutorial, you will:

* Create a contract that sets and retrieves through your [Quorum](/blockchains/quorum) nodes.
* Deploy the contract on your Quorum network, and run a public transaction.
* Deploy the contract on your Quorum network, and run a private transaction.
* Deploy the contract on your Quorum network, externally sign a public transaction, and run the public transaction.
* Deploy the contract on your Quorum network, externally sign a private transaction, and run the private transaction.

The premise of the Quorum network in this tutorial is the following:

* This is a supply chain management network for a *supermarket* and a *storage facility*.
* The supermarket and the storage facility deploy a Quorum network with at least three nodes.
* The storage facility monitors the temperature of the products it stores and records the temperature readings to the contract on the Quorum network.
* There is a public contract that allows any party to read the temperature off the contract.
* There is a private contract that allows only a specifically set party to read the temperature off the contract.

This tutorial uses [Quorum Tessera](https://docs.goquorum.com/en/latest/Privacy/Tessera/Tessera/) for private contracts.

Sample code for this tutorial is in the [GitHub repository](https://github.com/chainstack/quorum-iot-tutorial).

## Prerequisites

* [Chainstack account](https://console.chainstack.com/) to deploy a Quorum network.

## Overview

To get from zero to a deployed Quorum network with a public contract and a private contract, do the following:

* Prepare:

  1. With Chainstack, deploy a Quorum network.
  1. Install Ethereum JavaScript API to interact with the Quorum network.
  1. Install Solidity JavaScript Compiler to format the contract for the Quorum network deployment.
  1. Install dotenv and create an `.env` file with your Quorum nodes access and credentials.

* Create the contract.
* Deploy the contract as public and run a public transaction.
* Deploy the contract as private and run a private transaction.
* Deploy the contract as public, externally sign the contract, and run a public transaction.
* Deploy the contract as private, externally sign the contract, and run a private transaction.

## Prepare

### Deploy a Quorum network

#### Create a Consortium project

See [Create a project](/platform/create-a-project).

#### Deploy a Quorum network

See [Deploy a consortium network](/platform/deploy-a-consortium-network).

Deploy at least three nodes for this tutorial.

See also [Quorum](/blockchains/quorum) for recommendations on the number of nodes.

#### Get your Quorum node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Install Ethereum JavaScript API

[Ethereum JavaScript API](https://github.com/ethereum/web3.js) is a collection of libraries to interact with your nodes.

``` sh
npm install web3
```

### Install Solidity JavaScript Compiler

The Solidity JavaScript compiler will compile the contract, the ABI, and bytecode formats that you will deploy on your Quorum network.

``` sh
npm install solc
```

### Install and configure dotenv

You will use dotenv to pass your Quorum nodes access and credentials to deploy the contracts and run transactions.

``` sh
npm install dotenv
```

In your project folder, create an `.env` file:

``` js
// Node 1
RPC1='RPC_ENDPOINT'

WALLET_ADDRESS1='DEFAULT_WALLET_ADDRESS'
WALLET_KEY1='DEFAULT_WALLET_PRIVATE_KEY'

TM_PUBLIC_KEY1='TRANSACTION_MANAGER_PUBLIC_KEY'
TM1='TRANSACTION_MANAGER_ENDPOINT'

// Node 2
RPC2='RPC_ENDPOINT'

WALLET_ADDRESS2='DEFAULT_WALLET_ADDRESS'
WALLET_KEY2='DEFAULT_WALLET_PRIVATE_KEY'

TM_PUBLIC_KEY2='TRANSACTION_MANAGER_PUBLIC_KEY'
TM2='TRANSACTION_MANAGER_ENDPOINT'

// Node 3
RPC3='RPC_ENDPOINT'

WALLET_ADDRESS3='DEFAULT_WALLET_ADDRESS'
WALLET_KEY3='DEFAULT_WALLET_PRIVATE_KEY'

TM_PUBLIC_KEY3='TRANSACTION_MANAGER_PUBLIC_KEY'
TM3='TRANSACTION_MANAGER_ENDPOINT'
```

where

* RPC_ENDPOINT — your Quorum node RPC endpoint. The format is `https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com`.
* DEFAULT_WALLET_ADDRESS — your Quorum node default wallet address to deploy the contract. Available under **Access and credentials** > **Default wallet address**.
* DEFAULT_WALLET_PRIVATE_KEY — a private key to your Quorum node default wallet address to sign the transaction. Available under **Access and credentials** > **Default wallet private key**.
* TRANSACTION_MANAGER_PUBLIC_KEY — your Quorum node Tessera public key. The contract will use this key to make the contract private for the node that signs the contract transaction with the Tessera private key from this public-private key pair. Available under **Access and credentials** > **Transaction manager public key**.
* TRANSACTION_MANAGER_ENDPOINT — an endpoint to the Tessera node deployed with your Quorum node. Available under **Access and credentials** > **Transaction manager endpoint**.

See also [View node access and credentials](/platform/view-node-access-and-credentials).

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

* `temperature` — the public variable.
* `set` — the function to write the temperature.
* `get` — the function to fetch the temperature.

## Deploy the contract as public and run a public transaction

### Create a public.js file

Create a `public.js` file that will:

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

  return new web3.eth.Contract(temperatureMonitor.interface, contractAddress, {
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
  await web3.eth.personal.unlockAccount(address,'',1000)
  const contract = new web3.eth.Contract(temperatureMonitor.interface);
  return contract.deploy({
    data: temperatureMonitor.bytecode,
  })
  .send({
      from: address,
      gas: '0x2CD29C0',
  })
  .on('transactionHash',console.log)
  .on('error', console.error)
  .then((newContractInstance) => {
    return newContractInstance.options.address;
  });
}

async function setTemperature(web3, contractAddress, temp) {
  const myContract = await getContract(web3, contractAddress);
  const address = await getAddress(web3);
  await web3.eth.personal.unlockAccount(address,'',1000)
  return myContract.methods.set(temp).send({
    from: address
  }).then((receipt) => {
    return receipt.status;
  });
}

async function getTemperature(web3, contractAddress) {
  const myContract = await getContract(web3, contractAddress);
  const address = await getAddress(web3);
  await web3.eth.personal.unlockAccount(address,'',1000)
  return myContract.methods.get().call().then(result => result);
}

main()

```

where

* `formatContract` — the function to format the contract in ABI and bytecode for deployment.
* `deployContract` — the function to deploy the contract with Ethereum JavaScript API libraries.
* `setTemperature` — the function to write the temperature value.
* `getTemperature` — the function to fetch the temperature value.
* `process.env` — loads your nodes access variables from the `.env` file.

### Run the transaction

``` sh
node public.js
```

This will deploy the contract, set the temperature value, and read the temperature value.

Example output:

``` sh
Contract address after deployment: 0xf12345Ac7D7D8E986eFb2321756b5d1e8a25008F
Transaction status: true
Retrieved contract Temperature 3
```

## Deploy the contract as private and run a private transaction

### Create a private.js file

The `private.js` file will:

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
  await web3.eth.personal.unlockAccount(address,'',1000)
  return new web3.eth.Contract(temperatureMonitor.interface, contractAddress, {
    defaultAccount: address,
  });
}

async function deployContract(web3, publicKey) {
  const address = await getAddress(web3);
  await web3.eth.personal.unlockAccount(address,'',1000)
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
  await web3.eth.personal.unlockAccount(address,'',1000)
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
  const address = await getAddress(web3);
  await web3.eth.personal.unlockAccount(address,'',1000)
  return myContract.methods.get().call()
  .then(result => result)
  .catch(error => null)
}

main()
```

where

* `formatContract` — the function to format the contract in ABI and bytecode for deployment.
* `deployContract` — the function to deploy the contract with Ethereum JavaScript API libraries.
* `setTemperature` — the function to write the temperature value.
* `getTemperature` — the function to fetch the temperature value.
* `process.env` — loads your nodes access variables from the `.env` file.
* `privateFor` — the Quorum specific parameter that sets the transaction private for the account identified by `publicKey`.

### Run the transaction

``` sh
node private.js
```

This will deploy the contract, set the temperature value through the `publicKey` account, read the temperature value through the `publicKey` account, and fail to set and read the temperature through other accounts.

Example output:

``` sh
Contract address after deployment: 0x60b695429838abA534273396ab90e25346F571B8
[Node3] temp retrieved after updating contract from external nodes: null
[Node2] temp retrieved after updating contract from internal nodes: 12
[Node3] temp retrieved from external nodes after update null
```

::: tip See also

* [Operations: Quorum](/operations/quorum/)

:::
