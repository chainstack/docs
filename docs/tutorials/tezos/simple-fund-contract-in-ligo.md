---
meta:
  - name: description
    content: Learn how to develop in LIGO and originate a decentralized fund smart contract on the Tezos network.
  - name: keywords
    content: tutorial tezos ligo client deploy originate
---

# A simple fund contract in LIGO

This tutorial guides you through developing, originating, and interacting with a simple decentralized fund smart contract on Tezos.

The origination and the interaction with the contract for tutorial purposes is done on Florencenet, which is a testnet.

The simple fund contract does the following:

* The contract can be funded in any amount of tez by anyone on the network.
* 1 tez at a time can be withdrawn from the funded contract by anyone on the network.

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy a Tezos node.
* [LIGO](https://ligolang.org/) to create and test the contract.
* [Tezos client](https://tezos.gitlab.io/introduction/howtouse.html#client) to originate the contract and to interact with the contract through the CLI.
* [Temple wallet](https://templewallet.com/) to interact with the contract through a web app.

## Overview

To get from zero to a deployed contract on Florencenet, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, [join Florencenet](/platform/join-a-public-network#join-a-tezos-network).
1. With Chainstack, access your [Tezos node credentials](/platform/view-node-access-and-credentials).
1. Fund your developer Tezos account through a [faucet](https://faucet.tzalpha.net/).
1. With LIGO, create the contract.
1. With the Tezos client, compile and originate the contract through your Tezos node.
1. With the Tezos client, fund the contract.
1. Fund your user Tezos account through a faucet and add the account to your Temple wallet.
1. With Temple wallet, interact with the contract.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join Florencenet

See [Join a public network](/platform/join-a-public-network).

### Get your Tezos node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Install LIGO

See [LIGO: Installation](https://ligolang.org/docs/intro/installation).

### Install and configure the Tezos client

To install the client, see [Tezos Client Installation and Setup](https://assets.tqtezos.com/docs/setup/1-tezos-client/).

Once installed, configure the client to the Chainstack-deployed Florencenet node:

``` sh
tezos-client --endpoint ENDPOINT config update
```

where

* ENDPOINT — your Tezos node endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` sh
tezos-client --endpoint https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d config update
```

### Fund your account with testnet tez

The [Tezos faucet](https://faucet.tzalpha.net/) generates one account at a time with test tez on all testnets at once, including Florencenet.

1. Go to the [faucet](https://faucet.tzalpha.net/).
1. Click **Get Testnet tez**.
1. Download the generated JSON file.
1. Place the generated JSON file in your project directory where the Tezos client is installed.
1. Activate the funded account on Florencenet:

``` sh
tezos-client activate account ALIAS with "ACCOUNT_JSON"
```

where

* ALIAS — any alias to call your account.
* ACCOUNT_JSON — the account details in a JSON file that you downloaded from the faucet.

Example:

``` sh
tezos-client activate account trent with "tz1bEQQxao8bEbvuXgh8vnSQkPJaoUvyomMP.json"
```

Check the account balance:

``` sh
tezos-client get balance for ALIAS
```

where

* ALIAS — the alias you provided when activating the account.

Example:

``` sh
tezos-client get balance for trent
```

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
  balance: tez;    
end

const noOperations: list(operation) = nil;

// Amend the storage balance with the deposited amount.
function depositAny(var storage: storage): (list(operation) * storage) is
  block {
        storage.balance := storage.balance + amount;       
      }
  with(noOperations, storage)

// Withdraw 1 tez at a time denominated in mutez, the smallest tez unit.
// 1 tez is sent to the sender calling the withdraw function.
function withdrawFixed(var storage: storage): (list(operation) * storage) is
  block {
    const withdrawAmount: tez = 1000000mutez;  
    var _operations: list(operation) := nil;
    const receiver: contract(unit) = get_contract(sender);
    const payoutOperation: operation = transaction(unit, withdrawAmount, receiver);
    operations:= list 
      payoutOperation 
        end;       
    storage.balance := storage.balance - withdrawAmount;              
  } with(operations, storage)

function main(const action: entry; var storage: storage): (list(operation) * storage) is
  block {
    skip
  } with case action of
    | Deposit(_param) -> depositAny(storage)
    | Withdraw(_param) -> withdrawFixed(storage)
end;
```

### Test the contract

Before compiling the contract, you can test it using the LIGO CLI.

Deposit 10 tez:

``` sh
$ ligo dry-run simplefund.ligo --syntax pascaligo --amount 10 main "Deposit(unit)" "record liquidity = 0mutez; end"
( LIST_EMPTY() , record[balance -> 10000000mutez] )
```

Withdraw 1 tez:

``` sh
$ ligo dry-run simplefund.ligo --syntax pascaligo main "Withdraw(unit)" "record liquidity = 10000000mutez; end"
( CONS(Operation(0135a1ec49145785df89178dcb6e96c9a9e1e71e0a00000001c0843d0000d8276b0b00b177a2543b17e8799d31b94252c97300) ,
       LIST_EMPTY()) ,
  record[balance -> 9000000mutez] )
```

### Compile the contract

Compile the contract and save the compiled code in a `.tz` file:

``` sh
ligo compile-contract simplefund.ligo main > simplefund.tz
```

You are now ready to originate the compiled contract on Florencenet.

### Originate the contract

Originate the contract using your alias account, initiate the contract with `0` tez and provide the origination fee with `--burn-cap`:

``` sh
tezos-client originate contract simplefund transferring 0 from ALIAS running simplefund.tz --init 0 --burn-cap 3
```

where

* ALIAS — the account alias you activated previously.

Example:

``` sh
tezos-client originate contract simplefund transferring 0 from trent running simplefund.tz --init 0 --burn-cap 3
```

Once the contract is originated, you will see the contract address in `Originated contracts`.

Example:

``` sh
Originated contracts:
KT1K9maqFN8Kbh9wWmPPX2uoQH1vHuEzoQ4p
```

You now have a working contract on Florencenet.

Write down the contract address as you will need it later to interact with it through a web app and the Temple wallet.

### Interact with the contract using the Tezos client

You can now fund the contract using the Tezos client.

Get the contract parameter for the deposit function to pass to the Tezos client.

Get the parameter for `Deposit`:

``` sh
$ ligo compile-parameter simplefund.ligo -s pascaligo main "Deposit(unit)"
(Left Unit)
```

Deposit 10 tez from your alias account to the contract:

``` sh
tezos-client transfer 10 from ALIAS to simplefund --arg "(Left Unit)" --burn-cap 1
```

where

* ALIAS — the account alias you activated previously.

Example:

``` sh
tezos-client transfer 10 from trent to simplefund --arg "(Left Unit)" --burn-cap 1
```

Once the operation is included in a block, check the contract balance by querying the storage:

```
$ tezos-client get contract storage for simplefund
10000000
```

### Get a Temple wallet account with test tez

You need an account in the Temple wallet with some test tez to execute operations on Florencenet.

1. Install the [Temple wallet](https://templewallet.com/).
1. Go to the [faucet](https://faucet.tzalpha.net/).
1. Click **Get Testnet tez**.
1. Download the generated JSON file.
1. In your Temple wallet instance, click **Import account**.
1. Select **Faucet File**.
1. Provide the JSON file you gave downloaded.

The Temple wallet will activate your account with test tez.

### Interact with the contract using the Temple wallet

1. Navigate to the [BCD explorer](https://better-call.dev/).
1. Click **Florencenet**.
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
