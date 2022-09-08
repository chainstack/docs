---
meta:
  - name: description
    content: Learn how to develop in LIGO and originate a decentralized fund smart contract on the Tezos network.
  - name: keywords
    content: tutorial tezos ligo client deploy originate
---

# A simple fund contract in LIGO

This tutorial guides you through developing, originating, and interacting with a simple decentralized fund smart contract on Tezos.

The origination and the interaction with the contract for tutorial purposes is done on Jakartanet, which is a testnet.

The simple fund contract does the following:

* The contract can be funded in any amount of tez by anyone on the network.
* 1 tez at a time can be withdrawn from the funded contract by anyone on the network.

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy a Tezos node.
* [LIGO](https://ligolang.org/) to create and test the contract.
* [Tezos client](https://tezos.gitlab.io/introduction/howtouse.html#client) to originate the contract and to interact with the contract through the CLI.
* [Temple wallet](https://templewallet.com/) to interact with the contract through a web app.

## Overview

To get from zero to a deployed contract on Jakartanet, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, [join Jakartanet](/platform/join-a-public-network#join-a-tezos-network).
1. With Chainstack, access your [Tezos node credentials](/platform/view-node-access-and-credentials).
1. Fund your developer Tezos account through a [faucet](https://faucet.jakartanet.teztnets.xyz/).
1. With LIGO, create the contract.
1. With the Tezos client, compile and originate the contract through your Tezos node.
1. With the Tezos client, fund the contract.
1. Fund your user Tezos account through a faucet and your Temple wallet.
1. With Temple wallet, interact with the contract.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join Jakartanet

See [Join a public network](/platform/join-a-public-network).

### Get your Tezos node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Install LIGO

See [LIGO: Installation](https://ligolang.org/docs/intro/installation).

### Install and configure the Tezos client

To install the client, see [Tezos Client Installation and Setup](https://assets.tqtezos.com/docs/setup/1-tezos-client/).

Once installed, configure the client to the Chainstack-deployed Jakartanet node:

``` sh
tezos-client --endpoint ENDPOINT config update
```

where

* ENDPOINT — your Tezos node endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` sh
tezos-client --endpoint https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d config update
```

### Generate an account

Run:

``` sh
tezos-client gen keys new
```

Get the generated account address:

``` sh
tezos-client list known addresses
```

### Fund your account with testnet tez

1. Go to the [faucet](https://faucet.jakartanet.teztnets.xyz/).
1. In **fund any address**, paste your generated address.
1. Click **Request 6001 tz**.

### Create the contract

Create a simple fund contract in the PascaLIGO syntax with two entrypoints:

* `Deposit` — any account on the network can deposit any amount of tez in the contract.
* `Withdraw` — any account on the network can withdraw 1 tez at a time from the contract.

Create a file called `simplefund.ligo`:

```
// Two entrypoints: deposit any, withdraw 1 tez.
type entry is 
| Deposit
| Withdraw

// Simple storage in tez.
type storage is record  
 [balance: tez;    
]

const noOperations: list(operation) = nil;
const withdrawAmount : tez = 1tez;
const receiver: contract(unit) = Tezos.get_contract(Tezos.get_sender());
const payoutOperation: operation = Tezos.transaction(unit, withdrawAmount, receiver);
const operations : list (operation) = list [payoutOperation];

// Amend the storage balance with the deposited amount.
function depositAny(var storage: storage): (list(operation) * storage) is
  block {
        storage.balance := storage.balance + Tezos.get_amount();       
      }
  with(noOperations, storage)

// Withdraw 1 tez at a time.
// 1 tez is sent to the sender calling the withdraw function.
function withdrawFixed(var storage: storage): (list(operation) * storage) is
  block {     
    storage.balance := Option.unopt(storage.balance - withdrawAmount);              
  } with(operations, storage)

function main(const action: entry; var storage: storage): (list(operation) * storage) is
  block {
    skip
  } with case action of [
    | Deposit(_param) -> depositAny(storage)
    | Withdraw(_param) -> withdrawFixed(storage)
];
```

### Test the contract

Before compiling the contract, you can test it using the LIGO CLI.

Deposit 10 tez:

``` sh
$ ligo run dry-run simplefund.ligo --syntax pascaligo --amount 10 --entry-point  main "Deposit(unit)" "0"
( LIST_EMPTY() , record[balance -> 10000000mutez] )
```

Withdraw 1 tez:

``` sh
$ ligo run dry-run simplefund.ligo --syntax pascaligo --entry-point main "Withdraw(unit)" "10000000mutez"
( CONS(Operation(0135a1ec49145785df89178dcb6e96c9a9e1e71e0a00000001c0843d0000663549d0f7c76252056ed0600da097a3e713237a00) ,
       LIST_EMPTY()) ,
  record[balance -> 9000000mutez] )
```

### Compile the contract

Compile the contract and save the compiled code in a `.tz` file:

``` sh
ligo compile contract simplefund.ligo --entry-point main > simplefund.tz
```

You are now ready to originate the compiled contract on Jakartanet.

### Originate the contract

Originate the contract using your account, initiate the contract with `0` tez and provide the origination fee with `--burn-cap`:

``` sh
tezos-client originate contract simplefund transferring 0 from ACCOUNT_ADDRESS running simplefund.tz --init 0 --burn-cap 3
```

where

* ACCOUNT_ADDRESS — the account you generated and funded previously.

Example:

``` sh
tezos-client originate contract simplefund transferring 0 from tz1aDV3xqEavGzrnRaa3BWCUjP1K7sQfcsQM running simplefund.tz --init 0 --burn-cap 3
```

Once the contract is originated, you will see the contract address in `Originated contracts`.

Example:

``` sh
New contract KT1NSJSJjV5HHi3dgvwDNNs72hjCe9DsYvYV originated.
```

You now have a working contract on Jakartanet.

Write down the contract address as you will need it later to interact with it through a web app and the Temple wallet.

### Interact with the contract using the Tezos client

You can now fund the contract using the Tezos client.

Get the contract parameter for the deposit function to pass to the Tezos client.

Get the parameter for `Deposit`:

``` sh
$ ligo compile parameter simplefund.ligo --syntax pascaligo --entry-point main "Deposit(unit)"
(Left Unit)
```

Deposit 10 tez from your account to the contract:

``` sh
tezos-client transfer 10 from ACCOUNT_ADDRESS to simplefund --arg "(Left Unit)" --burn-cap 1
```

where

* ACCOUNT_ADDRESS — the account you generated and funded previously.

Example:

``` sh
tezos-client transfer 10 from tz1aDV3xqEavGzrnRaa3BWCUjP1K7sQfcsQM to simplefund --arg "(Left Unit)" --burn-cap 1
```

Once the operation is included in a block, check the contract balance by querying the storage:

```
$ tezos-client get contract storage for simplefund
10000000
```

### Get a Temple wallet account with test tez

You need an account in the Temple wallet with some test tez to execute operations on Jakartanet.

1. Install the [Temple wallet](https://templewallet.com/).
1. Go to the [faucet](https://faucet.jakartanet.teztnets.xyz/).
1. Connect with yout Temple wallet.
1. Once connected, click **Request 6001 tz**.

### Interact with the contract using the Temple wallet

1. Navigate to the [BCD explorer](https://better-call.dev/).
1. Click **Jakartanet**.
1. In the search field, provide your originated contract address.
1. On the contract page, click **Interact**.
1. Click **withdraw** > **Execute** > **Temple - Tezos Wallet**.
1. Click **Confirm**.

This will connect your account from the Temple wallet with the contract and withdraw 1 tez to the account.

## Conclusion

This tutorial guided you through the basics of creating a contract in LIGO and originating the contract on a Tezos network.

You were also able to interact with the contract through the CLI with the Tezos client and through a web app with the Temple wallet.

This tutorial uses testnet, however the exact same instructions and sequence will work on the mainnet as well.

::: tip See also

* [Operations: Tezos](/operations/tezos/)

:::
