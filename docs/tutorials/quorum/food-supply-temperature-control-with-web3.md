---
meta:
  - name: description
    content: Learn how to develop and deploy a food supply temperature control solution with Web3 on the Quorum blockchain protocol.
  - name: keywords
    content: quorum blockchain dapp tutorial web3
---

# Food supply temperature control with Web3

In this tutorial, you will:

* Create a [Quorum](/blockchains/quorum) network.
* Create a contract that sets and retrieves through your nodes.
* Deploy the contract on your Quorum network, and run a public transaction.
* Deploy the contract on your Quorum network, and run a private transaction.
* Deploy the contract on your Quorum network, externally sign a public transaction, and run the public transaction.
* Deploy the contract on your Quorum network, externally sign a private transaction, and run the private transaction.

The premise of the Quorum network in this tutorial is the following:

* This is a supply chain management network for a *supermarket* and a *storage facility*.
* The supermarket and the storage facility deploy a Quorum network with at least three nodes.
* The storage facility monitors the temperature of the products it stores and records the temperature readings to the contract on the Quorum network.
* There is a public contract that allows any party to read the temperature off the contract.
* There is a private contract that allows only an explicitly set party to read the temperature off the contract.

This tutorial uses [Quorum Tessera](https://docs.tessera.consensys.net/) for private contracts.

Sample code for this tutorial is in the [GitHub repository](https://github.com/chainstack/quorum-iot-tutorial).

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy a Quorum network.

## Overview

To get from zero to a deployed Quorum network with a public contract and a private contract, do the following:

* Prepare:
  * With Chainstack, deploy a Quorum network.
  * Install additional Node.js packages.
  * Create helper Node.js scripts.
* Create the contract.
* Deploy the contract as public and run a public transaction.
* Deploy the contract as private and run a private transaction.
* Deploy the contract as public, externally sign the contract, and run a public transaction.
* Deploy the contract as private, externally sign the contract, and run a private transaction.

## Prepare

### Deploy a Quorum network

#### Create a consortium project

See [Create a project](/platform/create-a-project).

#### Deploy a Quorum network

See [Deploy a consortium network](/platform/deploy-a-consortium-network).

Deploy at least three nodes for this tutorial.

See also [Quorum](/blockchains/quorum) for recommendations on the number of nodes.

#### Get your Quorum node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Install Node.js packages

::: tip Install all packages at once
If you do not want go through installing each of the packages separately, you can install all of them by cloning the [tutorial repository](https://github.com/chainstack/quorum-iot-tutorial) and running `npm install`.
:::

#### Install Ethereum JavaScript API

[Ethereum JavaScript API](https://github.com/ethereum/web3.js) is a collection of libraries to interact with your nodes.

Install in your project directory:

``` sh
npm install web3@2.0.0-alpha.1
```

#### Install Solidity JavaScript Compiler

The Solidity JavaScript compiler will compile the contract into bytecode.

Install in your project directory:

``` sh
npm install solc@0.5.11
```

#### Install ethereumjs-tx

[Ethereumjs-tx](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/tx) is a module to create and sign transactions.

Install in your project directory:

``` sh
npm install @ethereumjs/tx
```

#### Install Quorum.js

[Quorum.js](https://github.com/ConsenSys/quorum.js/) is an extension to [Ethereum JavaScript API](https://github.com/ethereum/web3.js) to support private transactions on Quorum.

Install in your project directory:

``` sh
npm install quorum-js
```

#### Install request-promise-native

[Request-promise-native](https://github.com/request/request-promise-native) is a simplified HTTP request client with Promise support.

Install in your project directory:

``` sh
npm install request-promise-native
```

#### Install and configure dotenv

You will use dotenv to pass your Quorum nodes access and credentials to deploy the contracts and run transactions.

Install in your project directory:

``` sh
npm install dotenv
```

In your project directory, create a `.env` file:

``` js
// Node 1
RPC1='ENDPOINT'

WALLET_ADDRESS1='DEFAULT_WALLET_ADDRESS'
WALLET_KEY1='DEFAULT_WALLET_PRIVATE_KEY'

TM_PUBLIC_KEY1='TRANSACTION_MANAGER_PUBLIC_KEY'
TM1='TRANSACTION_MANAGER_ENDPOINT'

NETWORK_ID1=NETWORK_ID

// Node 2
RPC2='ENDPOINT'

WALLET_ADDRESS2='DEFAULT_WALLET_ADDRESS'
WALLET_KEY2='DEFAULT_WALLET_PRIVATE_KEY'

TM_PUBLIC_KEY2='TRANSACTION_MANAGER_PUBLIC_KEY'
TM2='TRANSACTION_MANAGER_ENDPOINT'

NETWORK_ID2=NETWORK_ID

// Node 3
RPC3='ENDPOINT'

WALLET_ADDRESS3='DEFAULT_WALLET_ADDRESS'
WALLET_KEY3='DEFAULT_WALLET_PRIVATE_KEY'

TM_PUBLIC_KEY3='TRANSACTION_MANAGER_PUBLIC_KEY'
TM3='TRANSACTION_MANAGER_ENDPOINT'

NETWORK_ID3=NETWORK_ID
```

where

* ENDPOINT — your Quorum node HTTPS endpoint. The format is `https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d`. Available under **Access and credentials** > **HTTPS endpoint**.
* DEFAULT_WALLET_ADDRESS — your Quorum node default wallet address to deploy the contract. Available under **Default wallet** > **Address**.
* DEFAULT_WALLET_PRIVATE_KEY — a private key to your Quorum node default wallet address to sign the transaction. Available under **Default wallet** > **Private key**.
* TRANSACTION_MANAGER_PUBLIC_KEY — your Quorum node Tessera public key. The contract will use this key to make the contract private for the node that signs the contract transaction with the Tessera private key from this public-private key pair. Available under **Transaction manager enclave** > **Public key**.
* TRANSACTION_MANAGER_ENDPOINT — an endpoint to the Tessera node deployed with your Quorum node. The format is `https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d`. Available under **Access and credentials** > **TM endpoint**.
* NETWORK_ID — your Quorum network ID. See [Default network ID](/operations/quorum/default-network-id).

See also [View node access and credentials](/platform/view-node-access-and-credentials).

### Create helper scripts

In your project's `utils` directory, create the following scripts:

* `compiler.js` — a script to compile the contract into the bytecode and interface formats.
* `environment.js` — a script to set up the environment with a Web3 instance a Tessera transaction manager instance for the scripts executing the contract deployment and transactions.
* `helper.js` — a script to serialize and sign transactions.
* `jsonRPC.js` — a script to execute RPC calls to GoQuorum directly.

#### Create compiler.js

This script will compile the contract into bytecode and interface formats.

In your project's `utils` directory, create `compiler.js`:

``` js
const path = require('path');
const fs = require('fs');
const solc = require('solc');

const getConfigTemplate = () => ({
  language: 'Solidity',
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
});

const findImport = name => {
  const contents = fs.readFileSync(
    path.resolve(__dirname, '../contracts', name),
    'utf8',
  );

  return {
    contents,
  };
};

const compileContract = name => {
  const contractPath = path.resolve(__dirname, '../contracts', name);
  const source = fs.readFileSync(contractPath, 'UTF-8');

  const contractSource = getConfigTemplate();
  contractSource.sources = {
    [name]: {
      content: fs.readFileSync(
        path.resolve(__dirname, '../contracts', name),
        'utf8',
      ),
    },
  };

  let contract = JSON.parse(
    solc.compile(JSON.stringify(contractSource), findImport),
  ).contracts[name];

  contract = contract[Object.keys(contract)[0]];

  return {
    interface: contract.abi,
    bytecode: `0x${contract.evm.bytecode.object}`,
  };
};

module.exports = {
  compileContract,
};
```

#### Create environment.js

This script will set up your environment with a Web3 instance and a Tessera transaction manager instance for the scripts to deploy the contract and sign the transactions.

In your project's `utils` directory, create `environment.js`:

``` js
const Web3 = require('web3');
const quorumjs = require('quorum-js');
const dotenv = require('dotenv');

dotenv.config();
const node1 = {
  NETWORK_ID: process.env.NETWORK_ID1,
  RPC: process.env.RPC1,
  TM_PK: process.env.TM_PUBLIC_KEY1,
  TM_URL: process.env.TM1,
  WALLET_ADDRESS: process.env.WALLET_ADDRESS1,
  WALLET_KEY: process.env.WALLET_KEY1,
};

const node2 = {
  NETWORK_ID: process.env.NETWORK_ID2,
  RPC: process.env.RPC2,
  TM_PK: process.env.TM_PUBLIC_KEY2,
  TM_URL: process.env.TM2,
  WALLET_ADDRESS: process.env.WALLET_ADDRESS2,
  WALLET_KEY: process.env.WALLET_KEY2,
};

const node3 = {
  NETWORK_ID: process.env.NETWORK_ID3,
  RPC: process.env.RPC3,
  TM_PK: process.env.TM_PUBLIC_KEY3,
  TM_URL: process.env.TM3,
  WALLET_ADDRESS: process.env.WALLET_ADDRESS3,
  WALLET_KEY: process.env.WALLET_KEY3,
};

const mountWeb3 = (RPC) => new Web3(
  new Web3.providers.HttpProvider(RPC),
  null,
  { transactionConfirmationBlocks: 1 },
);

const mountTransactionManager = (web3, privateUrl) => quorumjs.RawTransactionManager(
  web3,
  { privateUrl },
);

node1.web3 = mountWeb3(node1.RPC);
node1.txManager = mountTransactionManager(node1.web3, node1.TM_URL);

node2.web3 = mountWeb3(node2.RPC);
node2.txManager = mountTransactionManager(node2.web3, node2.TM_URL);

node3.web3 = mountWeb3(node3.RPC);
node3.txManager = mountTransactionManager(node3.web3, node3.TM_URL);


module.exports = {
  node1,
  node2,
  node3,
};
```

#### Create helper.js

This script will serialize and sign the transactions.

In your project's `utils` directory, create `helper.js`:

``` js
const EthereumTx = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common').default;
const { getNonce } = require("./jsonRPC.js");

const customConfig = (id) => Common.forCustomChain(
  'mainnet',
  {
    networkId: id,
    chainId: id,
  },
  'homestead',
);

const serializePayload = async (node, { to, data }) => {
  const nonce = await getNonce(node.WALLET_ADDRESS, node.RPC);

  const rawTransaction = {
    data,
    nonce,
    to,
    gasPrice: 0,
    gasLimit: 4300000,
    value: 0,
  };

  const common = customConfig(node.NETWORK_ID);
  const tx = new EthereumTx(rawTransaction, { common });
  tx.sign(Buffer.from(node.WALLET_KEY, 'hex')); // WALLET PRIVATE KEY

  return `0x${tx.serialize().toString('hex')}`;
};

const setPrivate = (txManager, payload) => {
  const privateSignedTx = txManager.setPrivate(payload);

  return `0x${privateSignedTx.toString('hex')}`;
};

const serializeAndSign = async (node, payload) => {
  const serializedPayload = await serializePayload(node, payload);

  return setPrivate(node.txManager, serializedPayload);
};

module.exports = {
  serializePayload,
  serializeAndSign,
};
```

#### Create jsonRPC.js

This script will execute RPC call to GoQuorum directly.

In your project's `utils` directory, create `jsonRPC.js`:

``` js
const rp = require('request-promise-native');

const getAccount = uri =>
  rp({
    method: 'POST',
    uri,
    json: true,
    body: {
      jsonrpc: '2.0',
      method: 'eth_accounts',
      params: [],
      id: 1,
    },
  })
    .then(res => res.result[0])
    .catch(error => new Error(error));

const getNonce = async (address, uri) => {
  return rp({
    method: 'POST',
    uri,
    json: true,
    body: {
      jsonrpc: '2.0',
      method: 'eth_getTransactionCount',
      params: [
        address,
        'pending',
      ],
      id: 1,
    },
  }).then(res => res.result)
  .catch(error => new Error(error));
};

module.exports = {
  getAccount,
  getNonce,
};
```

## Create the contract

In your project's `contracts` directory, create `temperatureMonitor.sol`:

``` js
pragma solidity ^0.5.11;

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

## Review the project structure

At this point, you should have the following project structure with all the required Node.js packages installed:

``` sh
.
├── contracts
│   └── temperatureMonitor.sol
├── utils
│   └── compiler.js
│   └── environment.js
│   └── helper.js
│   └── jsonRPC.js
├── node_modules
├── .env
└── package.json
```

## Deploy the contract as public and run a public transaction

### Create a public.js file

In your project's root directory, create a `public.js` file that will:

1. Compile and deploy the contract through Node 1.
2. Set the temperature to `3` through Node 2.
3. Retrieve the temperature through Node 3.

``` js
const { compileContract } = require('./utils/compiler.js');
const {
  node1,
  node2,
  node3,
} = require('./utils/environment.js');

let temperatureMonitor = {};

const main = async () => {
  const {interface, bytecode} = compileContract('temperatureMonitor.sol');
  temperatureMonitor = {
    interface,
    bytecode,
  };

  const contractAddress = await deployContract(node1);
  console.log(`Contract address after deployment: ${contractAddress}`);

  const status = await setTemperature({
    node: node2,
    contractAddress,
    temp: 3,
  });
  console.log(`Transaction status: ${status}`);

  const temp = await getTemperature({
    node: node3,
    contractAddress,
  });
  console.log('Retrieved contract Temperature', temp);
}

function getContract(web3, contractAddress) {
  return new web3.eth.Contract(temperatureMonitor.interface, contractAddress);
}

async function deployContract(node) {
  await node.web3.eth.personal.unlockAccount(node.WALLET_ADDRESS, '', 1000);
  const contract = new node.web3.eth.Contract(temperatureMonitor.interface);

  return contract.deploy({
    data: temperatureMonitor.bytecode,
  })
  .send({
      from: node.WALLET_ADDRESS,
      gas: '0x1dcd6500',
      gasPrice: '0',
  })
  .on('error', console.error)
  .then((newContractInstance) => {
    return newContractInstance.options.address;
  });
}

async function setTemperature({ node, contractAddress, temp }) {
  await node.web3.eth.personal.unlockAccount(node.WALLET_ADDRESS, '', 1000);

  const myContract = getContract(node.web3, contractAddress);

  return myContract.methods.set(temp).send({
    from: node.WALLET_ADDRESS,
  })
  .on('error', console.error)
  .then((receipt) => {
    return receipt.status;
  });
}

async function getTemperature({ node, contractAddress }) {
  const myContract = getContract(node.web3, contractAddress);

  return myContract.methods.get().call().then(result => result);
}

main()
```

where

* `deployContract` — the function to deploy the contract.
* `setTemperature` — the function to write the temperature value.
* `getTemperature` — the function to fetch the temperature value.

### Run the transaction

``` sh
node public.js
```

This will deploy the contract, set the temperature value, and read the temperature value.

Example output:

``` sh
Contract address after deployment: 0x06eF93bf30Bf7f265361c1893141f400617AC135
Transaction status: true
Retrieved contract Temperature 3
```

## Deploy the contract as private and run a private transaction

### Create a private.js file

The `private.js` file will:

1. Compile a contract that is private for Node 2; deploy the contract through Node 1.
1. Attempt to set the temperature through Node 3, pass the transaction, and fail to update the contract value.
1. Attempt to retrieve the temperature through Node 3 and receive null instead of the contract value.
1. Set the temperature to 18 through Node 2.
1. Retrieve the temperature through Node 2.

``` js
const { compileContract } = require('./utils/compiler.js');
const {
  node1,
  node2,
  node3,
} = require('./utils/environment.js');

let temperatureMonitor = {};

const main = async () => {
  const {interface, bytecode} = compileContract('temperatureMonitor.sol');
  temperatureMonitor = {
    interface,
    bytecode,
  };

  const contractAddress = await deployContract({
    node: node1,
    privateFor: [node2.TM_PK],
  });
  console.log(`Contract address after deployment: ${contractAddress}`);

  const unauthorizedStatus = await setTemperature({
    contractAddress,
    node: node3,
    privateFor: [node1.TM_PK],
    temp: 3,
  });
  console.log(`Unauthorized - Transaction status: ${unauthorizedStatus}`);

  const unauthorizedTemp = await getTemperature({
    contractAddress,
    node: node3,
  });
  console.log('Unauthorized - Retrieved contract Temperature', unauthorizedTemp);

  const authorizedStatus = await setTemperature({
    contractAddress,
    node: node2,
    privateFor: [node1.TM_PK],
    temp: 18,
  });
  console.log(`Authorized - Transaction status: ${authorizedStatus}`);

  const authorizedTemp = await getTemperature({
    node: node2,
    contractAddress,
  });
  console.log('Authorized - Retrieved contract Temperature', authorizedTemp);
}

function getContract(web3, contractAddress) {
  return new web3.eth.Contract(temperatureMonitor.interface, contractAddress);
}

async function deployContract({ node, privateFor }) {
  await node.web3.eth.personal.unlockAccount(node.WALLET_ADDRESS, '', 1000);
  const contract = new node.web3.eth.Contract(temperatureMonitor.interface);

  return contract.deploy({
    data: temperatureMonitor.bytecode,
  })
  .send({
      from: node.WALLET_ADDRESS,
      gasPrice: 0,
      gasLimit: 4300000,
      privateFor,
      value: 0,
  })
  .on('error', console.error)
  .then((newContractInstance) => {
    return newContractInstance.options.address;
  });
}

async function setTemperature({ node, contractAddress, privateFor, temp }) {
  await node.web3.eth.personal.unlockAccount(node.WALLET_ADDRESS, '', 1000);

  const myContract = getContract(node.web3, contractAddress);

  return myContract.methods.set(temp).send({
    from: node.WALLET_ADDRESS,
    privateFor,
  })
  .on('error', console.error)
  .then((receipt) => {
    return receipt.status;
  });
}

async function getTemperature({ node, contractAddress }) {
  const myContract = getContract(node.web3, contractAddress);

  return myContract.methods.get().call().then(result => result);
}

main()
```

where

* `deployContract` — the function to deploy the contract.
* `setTemperature` — the function to write the temperature value.
* `getTemperature` — the function to fetch the temperature value.
* `privateFor` — the Quorum specific parameter that sets the transaction private for an account in your `.env` file.

### Run the transaction

``` sh
node private.js
```

This will deploy the contract, attempt and fail to set and read the temperature through the `Node 3` account defined in your `.env` file. Then the script will successfully set and read the temperature through the `Node 2` account.

Example output:

``` sh
Contract address after deployment: 0xB89FBFE18E1169b5236A87A526e330e9AF101973
Unauthorized - Transaction status: true
Unauthorized - Retrieved contract Temperature null
Authorized - Transaction status: true
Authorized - Retrieved contract Temperature 18
```

## Deploy the contract as public and run an externally signed public transaction

### Create a public-externalSign.js file

In your project's root directory, create a `public-externalSign.js` file that will:

1. Compile, sign the deployment transaction externally, and deploy the contract through Node 1.
2. Set the temperature to `3` through Node 2.
3. Retrieve the temperature through Node 3.

``` js
const { compileContract } = require('./utils/compiler.js');
const { getNonce } = require("./utils/jsonRPC.js");
const {
  node1,
  node2,
  node3,
} = require('./utils/environment.js');
let temperatureMonitor = {};

const main = async () => {
  const { interface, bytecode } = compileContract('temperatureMonitor.sol');
  temperatureMonitor = {
    interface,
    bytecode,
  };

  const contractAddress = await deployContract(node3);
  console.log(`Contract deployed at address: ${contractAddress}`);

  const status = await setTemperature({
    node: node2,
    contractAddress,
    temp: 3,
  });
  console.log(`Transaction status: ${status}`);

  const temp = await getTemperature({
    node: node3,
    contractAddress,
  });
  console.log('Retrieved contract Temperature', temp);
};

async function deployContract(node) {
  // encode contract
  const contract = new node.web3.eth.Contract(temperatureMonitor.interface);
  const encodedABI = contract
    .deploy({
      data: temperatureMonitor.bytecode,
    })
    .encodeABI();

  const nonce = await getNonce(node.WALLET_ADDRESS, node.RPC);

  return node.web3.eth.accounts.signTransaction({
    nonce,
    gasPrice: 0,
    gasLimit: 4300000,
    value: 0,
    data: encodedABI,
  }, node.WALLET_KEY)
    .then(payload => {
      return node.web3.eth.sendSignedTransaction(payload.rawTransaction)
        .then(receipt => receipt.contractAddress)
        .catch(error => error.message);
    });
}

async function setTemperature({ node, contractAddress, temp }) {
  const encodedABI = node.web3.eth.abi.encodeFunctionCall(
    temperatureMonitor.interface.find(x => x.name === 'set'),
    [temp],
  );

  const nonce = await getNonce(node.WALLET_ADDRESS, node.RPC);

  return node.web3.eth.accounts.signTransaction({
    nonce,
    to: contractAddress,
    gasLimit: '0x47b760',
    gasPrice: "0x0",
    data: encodedABI,
  }, node.WALLET_KEY)
    .then(payload => {
      return node.web3.eth.sendSignedTransaction(payload.rawTransaction)
        .then(receipt => receipt.status)
        .catch(error => error.message);
    });
}

async function getTemperature({ contractAddress, node }) {
  const contract = new node.web3.eth.Contract(
    temperatureMonitor.interface,
    contractAddress,
  );

  return contract.methods
    .get().call({
      from: node.WALLET_ADDRESS,
    })
    .then(data => data)
    .catch(error => error.message);
}

main();
```

where

* `deployContract` — the function to deploy the contract.
* `setTemperature` — the function to write the temperature value.
* `getTemperature` — the function to fetch the temperature value.
* `node.web3.eth.accounts.signTransaction` — externally signs the transaction.

### Run the transaction

``` sh
node public-externalSign.js
```

Example output:

``` sh
Contract deployed at address: 0xdA9b9ce46FAA89e025e91696f46AbC5CA2557dF8
Transaction status: true
Retrieved contract Temperature 3
```

## Deploy the contract as private and run an externally signed private transaction

### Create a private-externalSign.js file

The `private-externalSign.js` file will:

1. Compile a contract that is private for Node 2; sign the deployment transaction externally and deploy the contract through Node 1.
1. Attempt to set the temperature through Node 3, pass the transaction, and fail to update the contract value.
1. Attempt to retrieve the temperature through Node 3 and receive null instead of the contract value.
1. Set the temperature to 22 through Node 2.
1. Retrieve the temperature through Node 2.

``` js
const { compileContract } = require('./utils/compiler.js');
const { serializeAndSign } = require('./utils/helper.js');

const {
  node1,
  node2,
  node3,
} = require('./utils/environment.js');
let temperatureMonitor = {};

const main = async () => {
  const { interface, bytecode } = compileContract('temperatureMonitor.sol');
  temperatureMonitor = {
    interface,
    bytecode,
  };

  const contractAddress = await deployContract({
    node: node1,
    privateFor: [node2.TM_PK],
  });
  console.log(`Contract deployed at address: ${contractAddress}`);

  const statusUnAuthorized = await setTemp({
    to: contractAddress,
    node: node3,
    privateFor: [node1.TM_PK],
    temp: 8,
  });

  console.log(`Set Temp status from unauthorized node: ${statusUnAuthorized}`);
  const resultUnAuthorized = await getTemp({
    contractAddress,
    node: node3,
  });
  console.log(`Contract temperature: ${resultUnAuthorized}`);

  const status = await setTemp({
    to: contractAddress,
    node: node2,
    privateFor: [node1.TM_PK],
    temp: 22,
  });
  console.log(`Set temp status from authorized node: ${status}`);
  const result = await getTemp({
    contractAddress,
    node: node2,
  });
  console.log(`Contract temperature after update: ${result}`);
};

async function deployContract( {node, privateFor }) {
  // encode contract
  const contract = new node.web3.eth.Contract(temperatureMonitor.interface);
  const encodedABI = contract
    .deploy({
      data: temperatureMonitor.bytecode,
    })
    .encodeABI();

  // store the bytecode in tessera using the storeRawRequest API
  const rawTxHash = await node.txManager.storeRawRequest(
    encodedABI,
    node.TM_PK,
  );

  const privateSignedTxHex = await serializeAndSign(node, {
    to: null,
    data: `0x${rawTxHash}`,
  });

  return node.txManager
    .sendRawRequest(privateSignedTxHex, privateFor)
    .then(tx => {
      return tx.contractAddress;
    })
    .catch(error => error.message);
}

async function setTemp({ to, node, privateFor, temp}) {
  const encodedABI = node.web3.eth.abi.encodeFunctionCall(
    temperatureMonitor.interface.find(x => x.name === 'set'),
    [temp],
  );

  const rawTxHash = await node.txManager.storeRawRequest(encodedABI, node.TM_PK);

  const privateSignedTxHex = await serializeAndSign(node, {
    to,
    data: `0x${rawTxHash}`,
  });

  return node.txManager
    .sendRawRequest(privateSignedTxHex, privateFor)
    .then(tx => {
      return `${tx.status} - ${tx.blockHash}`;
    })
    .catch(error => error.message);
}

async function getTemp({ contractAddress, node }) {
  const contract = new node.web3.eth.Contract(
    temperatureMonitor.interface,
    contractAddress,
  );

  return contract.methods
    .get().call({
      from: node.WALLET_ADDRESS,
    })
    .then(data => data)
    .catch(error => error.message);
}

main();
```

where

* `deployContract` — the function to deploy the contract.
* `setTemperature` — the function to write the temperature value.
* `getTemperature` — the function to fetch the temperature value.
* `serializeAndSign` — externally signs the transaction.
* `privateFor` — the Quorum specific parameter that sets the transaction private for an account.

### Run the transaction

``` sh
node private-externalSign.js
```

This will deploy the contract, attempt and fail to set and read the temperature through the `Node 3` account defined in your `.env` file. Then the script will successfully set and read the temperature through the `Node 2` account.

Example output:

``` sh
Contract deployed at address: 0x6D6D30b9C46E4415183EeE6E9A7A31a7E1A67368
Set Temp status from unauthorized node: true - 0xedfb9381ca9f2c3d887106f9ced8f19a18d629139f55cc7e771fdcffa16185ea
Contract temperature: null
Set temp status from authorized node: true - 0x60809f2fe330fbf24d2b37a71326c3ae413bba3efa8168e08d20421fd4436f69
Contract temperature after update: 22
```

::: tip See also

* [Operations: Quorum](/operations/quorum/)

:::
