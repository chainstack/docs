---
meta:
  - name: description
    content: Learn how to develop and deploy a smart contract that registers academic certificates on the Ethereum network.
  - name: keywords
    content: tutorial ethereum blockchain dapp truffle
---

# Academic certificates with Truffle

In this tutorial, you will:

* Create a DApp that generates an academic certificate.
* Deploy the DApp on a public Ethereum node using Chainstack.

The contract and the Truffle configuration are in the [GitHub repository](https://github.com/chainstack/ethereum-certificates-tutorial).

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy an Ethereum node.
* [Truffle Suite](https://www.trufflesuite.com/) to create and deploy contracts.

## Overview

To get from zero to a deployed DApp on the Ethereum mainnet, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, join the Ethereum mainnet.
1. With Chainstack, access your Ethereum node credentials.
1. With Truffle, create and compile the DApp contract.
1. With Truffle, deploy the contract to your local development network.
1. With Truffle, interact with the contract on your local development network.
1. With Truffle, create and run the contract test.
1. With Truffle, deploy the contract to your Ethereum node running with Chainstack.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the Ethereum mainnet

See [Join a public network](/platform/join-a-public-network).

### Get your Ethereum node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Create and compile the contracts

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

2. Go to the `contracts` directory. In the directory, create two files: `Ownable.sol` and `DocStamp.sol`.

``` js
// Ownable.sol

pragma solidity ^0.5.0;

contract Ownable {
  address public owner;
  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function transferOwnership(address newOwner) onlyOwner public {
    require(newOwner != address(0));
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }
}
```

This is an ownable contract. The contract implementation is the following:

* Only an authority can generate a certificate. On contract deployment, the authority is the account that deploys the contract. The authority is the contract owner.
* The contract owner can transfer their authority.

``` js
// DocStamp.sol

pragma solidity ^0.5.0;

import './Ownable.sol';

contract DocStamp is Ownable {
  mapping (bytes32 => address) public records;

  event CertificateIssued(bytes32 indexed record, uint256 timestamp, bool returnValue);

  function issueCertificate(string calldata name, string calldata details) external onlyOwner {
    bytes32 certificate = keccak256(abi.encodePacked(name, details));
    require(certificate != keccak256(abi.encodePacked("")));
    records[certificate] = msg.sender;
    emit CertificateIssued(certificate, block.timestamp, true);
  }

  function owningAuthority() external view returns (address) {
    return owner;
  }

  function verifyCertificate(string calldata name, string calldata details, bytes32 certificate) external view returns (bool) {
    bytes32 certificate2 = keccak256(abi.encodePacked(name, details));
    // are certificates the same?
    if (certificate == certificate2) {
      // does the certificate exist on the blockchain?
      if (records[certificate] == owner) {
        return true;
      }
    }
    return false;
  }
}
```

This is the main contract. The contract handles the generation and verification of certificates.

* `issueCertificate()` — generates a certificate by calculating a hash of the student name and details.
  * Can be called only by the owner.
  * Emits a certificate generation event with the timestamp.
  * The issuer puts the certificate on the blockchain by storing it in the global variable `records` by passing `records[certificate] = msg.sender`.
* `owningAuthority()` — returns the address of issuer/authority.
* `verifyCertificate()` — calculates a hash of the student name and details, and checks if the contract is on the blockchain.
  * Can be called by anyone.

3. Create `2_deploy_contracts.js` in the `migrations` directory.

``` js
var DocStamp = artifacts.require("./DocStamp.sol");

module.exports = function(deployer) {
  deployer.deploy(DocStamp);
};
```

This will create the contracts deployment instructions for Truffle.

::: tip
Since **DocStamp** inherits from **Ownable**, **Ownable** will be deployed together with **DocStamp**.
:::

4. Compile the contracts:

``` sh
truffle compile
```

This will compile the contracts and put them in your `build/contracts` directory in the `.json` format.

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

### Interact with the contract on your local development network

1. In your Truffle console, create an instance of the deployed contract:

``` js
let instance = await DocStamp.deployed()
```

You can run `instance` to see the contract object ABI, bytecode, and methods.

2. Declare the contract owner:

``` js
let owner = await instance.owningAuthority()
```

You can run `owner` to see the account that deployed the contract and owns the contract.

3. Issue the certificate:

``` js
let result = await instance.issueCertificate("John", "graduate", {from: owner})
```

This issues the certificate.

Run `result.logs` to view the full certificate details.

::: warning
Running `result` will not print the certificate details in Truffle console. You must run `result.logs`.

See also [Processing transaction results](https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts#processing-transaction-results).
:::

Example output:

``` js
logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0xb3ef241d76bd4d3a3d92ad4fd382785589033a4f561baa2895136a3315b3561b',
    blockHash: '0x29343b9fc5b88bb8c85287463a37a00e8fecce36553880365ca5395d9fb18eeb',
    blockNumber: 7,
    address: '0x3113Aa54D455142a254b43b83FB16c18eD30ba33',
    type: 'mined',
    id: 'log_dbbbec7e',
    event: 'CertificateIssued',
    args: Result {
      '0': '0x837e31a66aa8eec0d7adfd41f84175803ddcae69afd451598f2672f652b2c153',
      '1': [BN],
      '2': true,
      __length__: 3,
      record: '0x837e31a66aa8eec0d7adfd41f84175803ddcae69afd451598f2672f652b2c153',
      timestamp: [BN],
      returnValue: true
```

Note the `record` value in the output. This is the hash of the certificate values: name and details. You will need this hash to create the contract test later in this tutorial.

4. Run the certificate verification:

``` js
let verify = await instance.verifyCertificate("NAME", "DETAILS", "CERTIFICATE_HASH", {from: owner})
```

where

* NAME — the student name on the certificate.
* DETAILS — any details.
* CERTIFICATE_HASH — the hash of DETAILS and NAME. You should have received this hash in the `record` field at the previous step by running `result.logs`.

Example:

``` js
let verified = await instance.verifyCertificate("John", "graduate", "0x837e31a66aa8eec0d7adfd41f84175803ddcae69afd451598f2672f652b2c153", {from: owner})
```

Running `verify` will now print `true` if there is a match, and `false` if there is no match.

### Test the contract

1. Navigate to the `test` directory.
2. Create a `test.js` file:

``` js
const DocStamp = artifacts.require('./DocStamp.sol')

contract('DocStamp', function(accounts) {
  it('should issue a certificate', async function() {
    const account = accounts[0]

    try {
      const instance = await DocStamp.deployed()
      await instance.issueCertificate("NAME", "DETAILS")
      const authority = await instance.owningAuthority()

      assert.equal(authority, account)
    } catch(error) {
      assert.equal(error, undefined)
    }
  })

  it('should verify a certificate', async function() {
    const account = accounts[0]

    try {
      const instance = await DocStamp.deployed()
      const verified = await instance.verifyCertificate("NAME", "DETAILS", "CERTIFICATE_HASH")

      assert.equal(verified, true)
    } catch(error) {
      assert.equal(error, undefined)
    }
  })
})
```

where

* NAME — the student name on the certificate.
* DETAILS — any details.
* CERTIFICATE_HASH — the hash of DETAILS and NAME. You should have received this hash in the `record` field at the previous step by running `result.logs`.

Example:

``` js
const DocStamp = artifacts.require('./DocStamp.sol')

contract('DocStamp', function(accounts) {
  it('should issue a certificate', async function() {
    const account = accounts[0]

    try {
      const instance = await DocStamp.deployed()
      await instance.issueCertificate("John", "graduate")
      const authority = await instance.owningAuthority()

      assert.equal(authority, account)
    } catch(error) {
      assert.equal(error, undefined)
    }
  })

  it('should verify a certificate', async function() {
    const account = accounts[0]

    try {
      const instance = await DocStamp.deployed()
      const verified = await instance.verifyCertificate("John", "graduate", "0x837e31a66aa8eec0d7adfd41f84175803ddcae69afd451598f2672f652b2c153")

      assert.equal(verified, true)
    } catch(error) {
      assert.equal(error, undefined)
    }
  })
})
```

3. Run the test:

``` sh
truffle test
```

The test run output should be `Passing`.

::: tip See also

* [Truffle: Writing Tests in JavaScript](https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript)

:::

### Deploy the contract to your Ethereum node

1. Install `HDWalletProvider`.

[HDWalletProvider](https://github.com/trufflesuite/truffle/tree/develop/packages/hdwallet-provider) is Truffle's separate npm package used to sign transactions.

Run:

``` sh
npm install @truffle/hdwallet-provider
```

2. Edit `truffle-config.js` to add:

* `HDWalletProvider`
* Your Ethereum node access and credentials

``` js
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = 'misery walnut expose ...';

module.exports = {
 networks: {
    development: {
        host: "127.0.0.1",
        port: 9545,
        network_id: "5777"
    },
    mainnet: {
        provider: () => new HDWalletProvider(mnemonic, "ENDPOINT"),
        network_id: 1,
        gas: 4500000,
        gasPrice: 10000000000
    }
   }
};
```

where

* `mainnet` — any network name that you will pass to the `truffle migrate --network` command.
* `HDWalletProvider` — Truffle's custom provider to sign transactions.
* `mnemonic` — your mnemonic that generates your accounts. You can also generate a mnemonic online with [Mnemonic Code Converter](https://iancoleman.io/bip39/). Make sure you generate a 15 word mnemonic.
* ENDPOINT — your Ethereum node endpoint. The format is `https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d`. See also [View node access and credentials](/platform/view-node-access-and-credentials) and [Tools](/operations/ethereum/tools).
* `network_id` — the Ethereum mainnet network ID: `1`.

Example:

``` js
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "misery walnut expose ...";

module.exports = {
 networks: {
    development: {
        host: "127.0.0.1",
        port: 9545,
        network_id: "5777"
    },
    mainnet: {
        provider: () => new HDWalletProvider(mnemonic, "https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d"),
        network_id: 1,
        gas: 4500000,
        gasPrice: 10000000000
    }
   }
};
```

3. Run:

``` sh
truffle migrate --network mainnet
```

This will engage `2_deploy_contracts.js` and deploy the contract to the Ethereum mainnet as specified in `truffle-config.js`.

::: warning
You have to use the mainnet ether to deploy the contract to the Ethereum mainnet.
:::

::: tip See also

* [Operations: Ethereum](/operations/ethereum/)
* [Asset tokenization with Embark](/tutorials/ethereum/asset-tokenization-with-embark)
* [Trust fund account with Remix](/tutorials/ethereum/trust-fund-account-with-remix)

:::
