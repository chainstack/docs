---
meta:
  - name: description
    content: Learn how to develop and deploy a simple multisig contract and interact with it on Fuse.
  - name: keywords
    content: tutorial fuse multisig hardhat contract
---

# Simple multisig contract with Hardhat

You can create a simple multisig contract that requires confirmations from multiple owners to withdraw funds from it.

In this tutorial, you will:

* Create a simple multisig contract.
* Deploy the contract on the Fuse Spark testnet through a node deployed with Chainstack.
* Interact with the deployed contract.

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy a Fuse node.
* [Hardhat](https://hardhat.org/) to compile and deploy the contract.
* [Hardhat ABI Exporter](https://www.npmjs.com/package/hardhat-abi-exporter) to export the ABI to interact with the contract.
* [MetaMask](https://metamask.io/) to interact with the contract through your Chainstack node.

## Overview

To get from zero to a deployed multisig contract on the Fuse Spark testnet, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, join the Fuse Spark testnet.
1. With Chainstack, access your Fuse node credentials.
TTK

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the Fuse Spark testnet

See [Join a public network](/platform/join-a-public-network).

### Get your Fuse node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Install Hardhat

See [Hardhat documentation](https://hardhat.org/hardhat-runner/docs/getting-started).

### Initialize a Hardhat project

In your project directory, run `npx hardhat`. Select **Create a JavaScript project**.

### Create and compile the multisig contract

In the `contracts` directory, create `multiSig.sol`.

``` solidity
// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.9;

contract multiSigWallet {
    event Deposit(address indexed sender, uint amount, uint balance);
    event SubmitTransaction(address indexed owner, uint indexed txIndex, address indexed to, uint value);
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint indexed txIndex);

address[] public owners;
    mapping(address => bool) public isOwner;
    uint public numConfirmationsRequired;

    struct Transaction {
        address to;
        uint value;
        bool executed;
        uint numConfirmations;

    }
 
    mapping(uint => mapping(address => bool)) public isConfirmed;
    Transaction[] public transactions;
    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    modifier txExists(uint _txIndex) {
        require(_txIndex < transactions.length, "tx does not exist");
        _;
    }

    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "tx already executed");
        _;
    }

    modifier notConfirmed(uint _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "tx already confirmed");
        _;
    }

    constructor(address[] memory _owners, uint _numConfirmationsRequired) {
        require(_owners.length > 0, "At least 1 owner required");
        require(_numConfirmationsRequired > 0 &&
                _numConfirmationsRequired <= _owners.length,
                "invalid number of required confirmations");

        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }

        numConfirmationsRequired = _numConfirmationsRequired;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    function submitTransaction(
        address _to,
        uint _value
    ) public onlyOwner {
        uint txIndex = transactions.length;
        
        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                executed: false,
                numConfirmations: 0
            })
        );

        emit SubmitTransaction(msg.sender, txIndex, _to, _value);
    }

    function confirmTransaction(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
        notConfirmed(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;

        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    function executeTransaction(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        address tempaddr = transaction.to;

        require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "cannot execute tx"
        );

        transaction.executed = true;

        (bool success, ) = tempaddr.call{value: transaction.value}("");
        require(success, "tx failed");
        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    function revokeConfirmation(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        require(isConfirmed[_txIndex][msg.sender], "tx not confirmed");
        
        transaction.numConfirmations -= 1;
        isConfirmed[_txIndex][msg.sender] = false;

        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function getTransactionCount() public view returns (uint) {
        return transactions.length;
    }

    function getTransaction(uint _txIndex)
        public
        view
        returns (
            address to,
            uint value,
            bool executed,
            uint numConfirmations
        )

    {
        Transaction storage transaction = transactions[_txIndex];
        
        return (
            transaction.to,
            transaction.value,
            transaction.executed,
            transaction.numConfirmations
        );
    }
}
```

This is your multisig contract:

* The addresses that the deployer passes as parameters are set as co-owners of the multiSig Wallet. Along with that the deployer passes an integer as the parameter. This integer will be the minimum number of confirmations a transaction will require to be approved. This integer must be greater than zero and must be less than or equal to the number of co-owners of the contract.
* `receive` is a special function provided by Solidity that allows the contract to accept protocol native tokens without a specially defined function. It is declared without the keyword `function` and must be external and payable.
* After declaring a struct to store the transaction data, there are two mappings to store the validity of the contract owners and to store all confirmations to a particular transaction.
* The functions defined mostly restrict access to the owners, even though anyone can read the data. The function `executeTransaction` uses the low-level method `call()` to transfer the protocol native tokens from the contract to the required address if the transaction is approved.

To compile the contract, run `npx hardhat compile`.

### Fund your account

Fund the account that you will use to deploy the contract with SPARK—the native token of the Fuse Spark testnet. Use the [Fuse Spark testnet faucet](https://get.fusespark.io/).

### Set up Hardhat to work through your Chainstack node

In your project directory, open for editing `hardhat.config.js`.

``` js
require("@nomicfoundation/hardhat-toolbox");
require('hardhat-abi-exporter');

module.exports = {
  solidity: "0.8.10",
  networks: {
    spark: {
      url: "ENDPOINT", 
      accounts: ['PRIVATE_KEY']
    },
  },
  abiExporter: [
  {
    path: './abi/pretty',
    pretty: true,
  },
  {
    path: './abi/ugly',
    pretty: false,
  },
 ]
};
```

where

* ENDPOINT — your Fuse node HTTPS endpoint. The format is `https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d`. See also [View node access and credentials](/platform/view-node-access-and-credentials) and [Tools](/operations/fuse/tools).
* PRIVATE_KEY — the private key of your Fuse account that will deploy the contract. The account must have enough funds to run the deployment. See also [Fuse Spark testnet faucet](https://get.fusespark.io/).

### Deploy the multisig contract

Set up the deployment script at `scripts/deploy.js`.

``` js
сonst main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with account: ", deployer.address);

  const Contract = await hre.ethers.getContractFactory("multiSigWallet");
  const contract = await Contract.deploy(["OWNER", "OWNER"], CONFIRMATION_NUMBER);

  await contract.deployed();

  console.log("Contract address: ", contract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
```

where

* OWNER — the addresses that co-own the contract and whose confirmations are required to withdraw the funds.
* CONFIRMATION_NUMBER — the number of confirmations required by the contract owners to withdraw the funds.

Example of a contract owned by `0x7B397Bd7042560cdaE08C674Ef554e5C3239bC10` and `0xFDa85C3404dC00fFBe2A18615ba55380cB42c8Fb` and that requires a confirmation from both owners (`2`):

``` js
const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with account: ", deployer.address);

  const Contract = await hre.ethers.getContractFactory("multiSigWallet");
  const contract = await Contract.deploy(["0x7B397Bd7042560cdaE08C674Ef554e5C3239bC10", "0xFDa85C3404dC00fFBe2A18615ba55380cB42c8Fb"], 2);

  await contract.deployed();

  console.log("Contract address: ", contract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
```

Deploy the contract by running `npx hardhat run --network spark scripts/deploy.js`.

## Interact with the contract

Once your contract is deployed, you can view it online at [Fuse Spark testnet explorer](https://explorer.fusespark.io/).

You are now going to verify the contract in the explorer to be able to use the explorer as a web app and easily interact with the contract online.

### Verify the deployed contract on the explorer

1. Go to [Fuse Spark testnet explorer](https://explorer.fusespark.io/).
1. Find your deployed contract. The address of your contract is printed in the terminal by Hardhat at the end of the deployment.
1. On the contract page in the explorer, click **Code** > **Verify & Publish**.
1. In **Contract Name**, provide the name of your contract. In our example, the name is `multiSigWallet`.
1. In **Compiler**, select the same compiler version that was used in the Hardhat configuration file. In our example, it is `v0.8.10`.
1. In **EVM Version**, select **default**.
1. In **Optimization**, select **No**.
1. In **Enter the Solidity Contract Code**, paste the contract code.
1. In **ABI-encoded Constructor Arguments**, provide constructor values:
    1. Copy the ugly ABI version from your project directory. For this example, it is `abi/ugly/contracts/multiSig.sol/multiSigWallet.json`.
    1. Go to [Online ABI Encoding Service](https://abi.hashex.org/).
    1. Enter your ABI and click **Parse**.
    1. Enter the contructor parameters that you provided in your deployment script in `deploy.js`
    1. Copy the resulting value and put it in the **ABI-encoded Constructor Arguments** field in the explorer.
1. Click **Verify & publish**.

The explorer will take a few seconds to complie your contract, verify, and publish it.

### Interact with the contract

Set up your MetaMask instance to work through your Chainstack node. See [Operations: Fuse](/operations/fuse/).

Using MetaMask, send some funds to the contract.

Now that your multisig contract is verified, you can use the explorer to interact with it.

1. In the explorer, on your contract, click **Write Contract**.
1. In your MetaMask, make sure you have the same address selected as the one that one of the contract owners.
1. Click **Connect wallet**. This will connect your MetaMask instance with the contract owner as the active address.
1. In **submitTransaction**, provide an address to send some funds to and the amount of funds in Wei. You can also use the [online unit converter](https://eth-converter.com/).
1. Click **Write**.
1. Once the transaction is included in a block, confirm it by providing the transaction index in **confirmTransaction** and clicking **Write**. Since this the first transaction on the contract, the index is `0`.
1. Connect to the contract on the explorer with the other account that you provided as owner when deploying the contract.
1. Again, confirm the transaction through **confirmTransaction** and the index `0`.
1. Once the confirmation transaction is included in a block, execute it through **executeTransaction** and the index `0`.

This will withdraw the funds from the multisig contract.

## Conclusion

This tutorial guided you through the basics of creating and deploying a simple multisig contract on the Fuse Spark testnet through your Chainstack-deployed node.

You have also interacted with the contract, funded it, and withdrawn the funds with multisig confirmations using the explorer as a web app and MetaMask as your interaction tool that works through your Chainstack-deployed Fuse node.

This tutorial uses testnet, but the exact same instructions work on the mainnet.

::: tip See also

* [Operations: Fuse](/operations/fuse/)

:::
