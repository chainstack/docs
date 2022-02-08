---
meta:
  - name: description
    content: Learn how to create a token, deploy your own program, and vest the created token in the deployed program on the Solana network.
  - name: keywords
    content: tutorial solana rust spl deploy program vest derive account
---

# Creating a token and vesting the token in your program

This tutorial guides you through creating a token, deploying a vesting program, and vesting the created token in the program instance on the Solana network.

In short, you will do the following:

* Create a token using the default [token program](https://spl.solana.com/token).
* Deploy an audited [vesting program](https://github.com/Bonfida/token-vesting).
* Vest the created token using the deployed vesting program.

In the process, you will gain first-hand knowledge of accounts, the default and non-default programs on Solana and how to interact with them.

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy a Solana node.
* [Rust](https://www.rust-lang.org/tools/install) to work with the vesting program.
* [Solana tool suite](https://docs.solana.com/cli/install-solana-cli-tools) to create accounts and interact with the network.
* [SPL token CLI](https://spl.solana.com/token#command-line-utility) to interact with the default [token program](https://spl.solana.com/token).

## Overview

To get from zero to your own instance of vested tokens on the devnet, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, [join devnet](/platform/join-a-public-network#join-a-solana-network).
1. With Chainstack, access your [Solana node credentials](/platform/view-node-access-and-credentials).
1. Set up the [Solana tool suite](https://docs.solana.com/cli/install-solana-cli-tools) to work through your Chainstack-managed devnet node.
1. With the Solana tool suite, generate two accounts—the account that will deploy the program and vest the tokens and the account that will receive the tokens.
1. Fund the generated accounts with devnet SOL through a [faucet](https://solfaucet.com/).
1. Create a token.
1. Derive token accounts for the two created accounts.
1. Mint the token.
1. Deploy a [vesting program](https://github.com/Bonfida/token-vesting).
1. Create a vesting instance.
1. Check the vesting instance state.
1. Release the vested tokens.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the devnet

See [Join a public network](/platform/join-a-public-network).

### Get your Solana node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Set up the Solana tools suite with the Chainstack node

In your project directory, run:

``` sh
solana config set --url ENDPOINT
```

where ENDPOINT is your Solana node endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` sh
solana config set --url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

You are now on the devnet, interacting with the network through your Chainstack node.

### Generate two accounts

In your project directory, run:

``` sh
solana-keygen new --outfile WALLET_PATH
```

where WALLET_PATH is any directory and name to store your wallet as a password-protected JSON file.

Example:

```sh
solana-keygen new --outfile ~/wallet/keypair.json
```

Make sure you generate two accounts: one account will create and hold the tokens, the other account will be the destination for the vested tokens.

### Fund the accounts

Both accounts need to pay fees to run transactions on the network.

Fund each of the created accounts with the [faucet](https://solfaucet.com/).

### Create a token

At this point, you have two funded accounts, but none of the accounts is set as the default signer for operations.

Set one of the accounts as the defaull signer:

``` sh
solana config set --keypair WALLET_PATH
```

where WALLET_PATH is the path to one of your wallets that you created earlier.

Example:

``` sh
solana config set --keypair ~/wallet/keypair1.json
```

Check that the default account is set:

``` sh
solana address
```

Create a token:

``` sh
spl-token create-token
```

The `create-token` command will call the default [token program](https://explorer.solana.com/address/TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA?cluster=devnet) on the devnet through your Chainstack node and return the address of your new token.

The token has the default 9 decimals.

### Derive token accounts for the token

Before you operate with the created token, and even before you can mint it, you must derive a token account for each of the accounts for the created token.

In brief:

* At this point, you have two accounts. You funded the accounts with the devnet SOL. Each of the accounts can only hold SOL.
* To be able to hold the tokens, each of the accounts must derive the token account from the main account address and the token address.

See also Solana documentation: [Associated Token Account Program](https://spl.solana.com/associated-token-account).

Derive the token account for each of your accounts:

``` sh
spl-token create-account TOKEN_ADDRESS
```

where TOKEN_ADDRESS is the address of the token you created.

Example:

``` sh
spl-token create-account C1Swjv4cQ2nEujJ4QeYDBsWSuSVPRXX4QkrtmF6UtdJK
```

Remember to switch between your accounts with the `solana config set --keypair WALLET_PATH` command.

### Mint the token

Make sure you are on the account that created the token by running `solana address`.

Mint the token:

``` sh
spl-token mint TOKEN_ADDRESS 1000
```

where TOKEN_ADDRESS is the address of the token you created.

Example:

``` sh
spl-token mint C1Swjv4cQ2nEujJ4QeYDBsWSuSVPRXX4QkrtmF6UtdJK 1000
```

This will mint 1000 tokens to your account.

Congratulations!

At this point, you have the following:

* A token created through the default token program on the Solana devnet.
* Two main accounts funded with SOL.
* Two token accounts mapped to the two main accounts and associated with your created token.
* One of the token accounts holds 1000 9-decimal units of your created token and the other token account holds nil.

What you are going to do next is:

* Deploy a custom vesting program on the devnet.
* Use the deployed program to create a vesting instance.
* The vesting instance will transfer an amount of tokens from the token account that holds 1000 tokens to the token account that holds no tokens.

### Deploy the vesting program

You are going to deploy the audited [Bonfida vesting program](https://github.com/Bonfida/token-vesting)—the go-to vesting program for many projects on Solana.

Note that you are going to deploy the program for tutorial purposes as, similar to the token program, you would normally need just the address of the deployed program to create your own instance of the program. In other words, you do not need to deploy a program every time you need a separate instance of it with your program parameters.

In your project directory, clone the [token vesting repository](https://github.com/Bonfida/token-vesting).

Change to the `program/` directory and run:

``` sh
cargo build-bpf
```

This will build the program bytecode that you can deploy to a Solana network. See also Solana documentation: [Program overview](https://docs.solana.com/developing/on-chain-programs/overview).


Deploy the program:

``` sh
solana deploy PROGRAM_BYTECODE
```

where PROGRAM_BYTECODE is the `.so` file with the bytecode of the program that you built.

Example:

``` sh
solana deploy /root/token-vesting/program/target/deploy/token_vesting.so
```

This will run the deployment and return the address of the vesting program on the Solana devnet.

### Create a vesting instance

You need to build the CLI tools to interact with the program and create a vesting instance.

Change to the `cli/` directory and run:

``` sh
cargo build
```

Create a vesting instance:

``` sh
echo "RUST_BACKTRACE=1 ./target/debug/vesting-contract-cli     \
--url ENDPOINT                                                 \
--program_id PROGRAM_ADDRESS                                   \
create                                                         \
--mint_address TOKEN_ADDRESS                                   \
--source_owner SOURCE_WALLET_PATH                              \
--source_token_address SOURCE_ACCOUNT_TOKEN_ADDRESS            \
--destination_token_address DESTINATION_ACCOUNT_TOKEN_ADDRESS  \
--amounts AMOUNT,!                                             \
--release-times TIME,!                                         \
--payer SOURCE_WALLET_PATH"                                    \
--verbose | bash
```

where

* ENDPOINT — your Solana node endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).
* PROGRAM_ADDRESS — the address of the vesting program that you deployed on the devnet.
* TOKEN_ADDRESS — the address of the token that you created.
* SOURCE_WALLET_PATH — path to the wallet file of the account that holds the tokens.
* SOURCE_ACCOUNT_TOKEN_ADDRESS — the derived token account that holds the tokens.
* DESTINATION_ACCOUNT_TOKEN_ADDRESS — the derived token account to which the tokens will be released.
* AMOUNT — the amount of tokens to release in base form. For example, 1 unit of the default 9-decimal token is `1000000000`.
* TIME — the timestamp in Unix format when the vested amount becomes releasable.

Example:

``` sh
echo "RUST_BACKTRACE=1 ./target/debug/vesting-contract-cli                \
--url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d  \
--program_id MwAy4o479mqPc3ViAz68N7rcjxcT5cdbn8i4b3xZ6WD                  \
create                                                                    \
--mint_address C1Swjv4cQ2nEujJ4QeYDBsWSuSVPRXX4QkrtmF6UtdJK               \
--source_owner ~/wallet/keypair1.json                                     \
--source_token_address CYMrd3NHGF46gxftaZJRS1DaT1boALVFAmUhJYdS76vW       \
--destination_token_address AcFTnytDRgQhdKK5QSxjAByjcwz5jaUnkTQG6FK5F7bP  \
--amounts 1000000000,2000000000,!                                         \
--release-times 1643587200,1646006400,!                                   \
--payer ~/wallet/keypair1.json"                                           \
--verbose | bash
```

The example creates a vesting instance for token `C1Swjv4cQ2nEujJ4QeYDBsWSuSVPRXX4QkrtmF6UtdJK` to become releasable:
* 1 unit on January 31, 2022, 00:00:00 UTC.
* 2 units on February 28, 2022, 00:00:00 UTC.

Creating a vesting instance will return the seed. The seed can be shared publicly and is used to check the vesting state.

### Check the vesting instance

You can check the state of the vesting instance to see the predefined release times and the amounts remaining to be released.

Check the vesting state:

``` sh
echo "RUST_BACKTRACE=1 ./target/debug/vesting-contract-cli  \
--url ENDPOINT                                              \
--program_id PROGRAM_ADDRESS                                \
info                                                        \
--seed SEED " | bash
```

where

* ENDPOINT — your Solana node endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).
* PROGRAM_ADDRESS — the address of the vesting program that you deployed on the devnet.
* SEED — the seed of the vesting instance that you received earlier.

Example:

``` sh
echo "RUST_BACKTRACE=1 ./target/debug/vesting-contract-cli                \
--url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d  \
--program_id MwAy4o479mqPc3ViAz68N7rcjxcT5cdbn8i4b3xZ6WD                  \
info                                                                      \
--seed 8opHzTAnfzRpPEx21XtnrVTX28YQuCpAjcn1PczScQ6 " | bash
```

### Release the vested tokens

Anyone on the network willing to pay the release transaction fee can call the release of the tokens.

Call the release of tokens:

``` sh
echo "RUST_BACKTRACE=1 ./target/debug/vesting-contract-cli  \
--url ENDPOINT                                              \
--program_id PROGRAM_ADDRESS                                \
unlock                                                      \
--seed SEED                                                 \
--payer WALLET_PATH" | bash
```

where

* ENDPOINT — your Solana node endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).
* PROGRAM_ADDRESS — the address of the vesting program that you deployed on the devnet.
* WALLET_PATH — path to any wallet that you have unlocked locally. Anyone can call the release of tokens.

Example:

``` sh
echo "RUST_BACKTRACE=1 ./target/debug/vesting-contract-cli                \
--url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d  \
--program_id MwAy4o479mqPc3ViAz68N7rcjxcT5cdbn8i4b3xZ6WD                  \
unlock                                                                    \
--seed 8opHzTAnfzRpPEx21XtnrVTX28YQuCpAjcn1PczScQ6                        \
--payer ~/wallet/keypair3.json" | bash
```

If the tokens have an unreleased amount at a timestamp in the past, they will be released to the destination account.

Check the token balance of a derived token account:

``` sh
curl ENDPOINT -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method":"getTokenAccountBalance", "params": ["TOKEN_ACCOUNT"]}'
```

where

* ENDPOINT — your Solana node endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).
* TOKEN_ACCOUNT — the derived token account that can hold the tokens

Example:

``` sh
curl https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method":"getTokenAccountBalance", "params": ["AcFTnytDRgQhdKK5QSxjAByjcwz5jaUnkTQG6FK5F7bP"]}'
``` 

## Conclusion

This tutorial guided you through the basics of creating a token using the default token program, deploying your own program, and interacting with the program on the Solana network.

You also learned what programs and derived token accounts are.

This tutorial uses the devnet, however the exact same instructions and sequence will work on the mainnet as well.

::: tip See also

* [Operations: Solana](/operations/solana/)

:::
