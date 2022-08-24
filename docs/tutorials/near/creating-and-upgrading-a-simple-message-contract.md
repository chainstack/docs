---
meta:
  - name: description
    content: Learn how to create, deploy a smart contract, interact with the contract, upgrade it, and migrate the old contract state to the new one.
  - name: keywords
    content: tutorial upgradeable metamorphic rust contract
---

# Creating and upgrading a simple message contract

This tutorial guides you through creating a simple message contract, deploying the contract, interacting with it, and upgrading it.

In short, you will do the following:

* Create a simple message contract in Rust.
* Deploy the contract using [NEAR CLI](https://docs.near.org/tools/near-cli).
* Change the contract state by interacting with it using NEAR CLI.
* Upgrade the contract with new functionality and redeploy the contract while migrating the contract state.
* Retrieve the old contract state and set a new state.

In the process, you will gain first-hand knowledge of how to create metamorphic smart contracts on NEAR.

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy a NEAR node.
* [Rust](https://www.rust-lang.org/tools/install) to create the contract.
* [NEAR CLI](https://docs.near.org/tools/near-cli) to work with accounts, deploy contracts, and interact with the network.

## Overview

To get from zero to an upgraded contract on the NEAR testnet, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, [join testnet](/platform/join-a-public-network#join-a-near-network).
1. With Chainstack, access your [NEAR node credentials](/platform/view-node-access-and-credentials).
1. Set up the [NEAR CLI](https://docs.near.org/tools/near-cli).
1. Create an account on the NEAR testnet using the [NEAR wallet](https://wallet.testnet.near.org/).
1. Set up the project.
1. Deploy an initial version of the contract.
1. Change the contract state by interacting with it.
1. Deploy an upgraded version of the contract and migrate the contract state.
1. Retrieve the old contract state and set the new state.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the testnet

See [Join a public network](/platform/join-a-public-network).

### Get your NEAR node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Create an account on the NEAR testnet

1. Go to the [NEAR testnet wallet](https://wallet.testnet.near.org).
1. Click **Create Account**.
1. Provide any account name that is not taken. Example: `upgradablecontract.testnet`.
1. Click **Reserve My Account ID** and secure your account as prompted.

This will initiate your account on the NEAR testnet with testnet NEAR.

You can also additionally fund your account on the testnet with the [NEAR faucet](https://near-faucet.io).

### Set up your project

Add the WebAssembly target to your environment:

``` sh
rustup target add wasm32-unknown-unknown
```

Initialize your project by running in your project directory:

``` sh
cargo init --lib
```

Edit the generated `Cargo.toml` file to provide your project details and setup:

``` conf
[package]
name = "simple-message"
version = "0.1.0"
authors = ["Your name <email@example.com>"]
edition = "2021"

[lib]
crate-type = ["cdylib", "rlib"]

[dependencies]
serde = { version = "*", features = ["derive"] }
serde_json = "*"
near-sdk = "4.0.0"

[profile.release]
codegen-units = 1
# Tell `rustc` to optimize for small code size.
opt-level = "z"
lto = true
debug = false
panic = "abort"
# Opt into extra safety checks on arithmetic operations https://stackoverflow.com/a/64136471/249801
overflow-checks = true
```

### Create the initial contract

This a simple contract that lets you record record a message and then retrieve the recorded message.

In the `src/lib.rs` file, provide your smart contract:

``` rust
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LookupMap;
use near_sdk::{env, near_bindgen, AccountId};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct StatusMessage {
    records: LookupMap<AccountId, String>,
}

impl Default for StatusMessage {
    fn default() -> Self {
        Self {
            records: LookupMap::new(b"r".to_vec()),
        }
    }
}

#[near_bindgen]
impl StatusMessage {
    pub fn set_status(&mut self, message: String) {
        let account_id = env::signer_account_id();
        self.records.insert(&account_id, &message);
    }

    pub fn get_status(&self, account_id: AccountId) -> Option<String> {
        return self.records.get(&account_id);
    }
}
```

### Compile the contract

Run:

``` sh
cargo build --target wasm32-unknown-unknown --release
```

### Create a contract account

Log in to your account that you created earlier:

1. Run `near login`.
1. Use the generated link to authorize the account in your browser.

Once logged in NEAR CLI, run:

``` sh
near create-account CONTRACT_NAME.ACCOUNT_NAME.testnet --masterAccount ACCOUNT_NAME.testnet --initialBalance 20 --node_url ENDPOINT
```

where:

* CONTRACT_NAME — any name to give to the contract that you will deploy.
* ACCOUNT_NAME — the name of the account on the NEAR testnet that you created earlier.
* `--initialBalance` — providing this flag will fund the created contract with 20 testnet NEAR.
* ENDPOINT — your node HTTPS endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` sh
near create-account simplemessage.upgradablecontract.testnet --masterAccount upgradablecontract.testnet --initialBalance 20 --node_url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

### Deploy the initial contract

At this point, you have the following:

* NEAR CLI set up to work through a Chainstack node.
* A compiled simple message contract.
* A funded contract account.

You can now deploy the contract on the NEAR testnet.

To deploy, run:

``` sh
near deploy --wasmFile target/wasm32-unknown-unknown/release/COMPILED_CONTRACT.wasm --accountId CONTRACT_NAME.ACCOUNT_NAME.testnet --node_url ENDPOINT
```

where:

* COMPILED_CONTRACT — the name of the contract that you compiled to.
* CONTRACT_NAME — the name of the contract account that you created earlier.
* ACCOUNT_NAME — the name of the account on the NEAR testnet that you created earlier.
* ENDPOINT — your node HTTPS endpoint.

Example:

``` sh
near deploy --wasmFile target/wasm32-unknown-unknown/release/simple_message.wasm --accountId simplemessage.upgradablecontract.testnet --node_url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

Example of the deployed contract: [997VvZ2EAss2NjdoGMJkZwJCMTNLZmKbXP3ZnFGkCMAh](https://explorer.testnet.near.org/transactions/997VvZ2EAss2NjdoGMJkZwJCMTNLZmKbXP3ZnFGkCMAh).

### Interact with the contract

Set the contract status message:

``` sh
near call CONTRACT_NAME.ACCOUNT_NAME.testnet set_status '{"message": "Hello"}' --accountId ACCOUNT_NAME.testnet --node_url ENDPOINT
```

where:

* CONTRACT_NAME — the name of the contract account that you deployed the compiled contract to.
* ACCOUNT_NAME — the name of the account on the NEAR testnet that you created earlier.
* ENDPOINT — your node HTTPS endpoint.

Example:

``` sh
near call simplemessage.upgradablecontract.testnet set_status '{"message": "Hello"}' --accountId upgradablecontract.testnet --node_url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

Retrieve the contract status message:

``` sh
near view CONTRACT_NAME.ACCOUNT_NAME.testnet get_status '{"account_id": "ACCOUNT_NAME.testnet"}' --node_url ENDPOINT
```

Example:

``` sh
near view simplemessage.upgradablecontract.testnet get_status '{"account_id": "upgradablecontract.testnet"}' --node_url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

### Change the contract source code

You are now going to upgrade the contract by changing the following:

* Change the key-value pair name `records` to `taglines` and the corresponding state changing function`set_status` to `set_tagline`.
* Add the new callable key-value pair `bios`.
* Provide a way to retrieve with the new contract code the original state on the chain set through the `records` key-value pair. This is done through the `migrate` function.

Edit the `src/lib.rs` file to provide the upgraded version of the contract:

``` rust
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LookupMap;
use near_sdk::{env, near_bindgen, AccountId};

#[derive(BorshDeserialize, BorshSerialize)]
pub struct OldStatusMessage {
    records: LookupMap<AccountId, String>,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct StatusMessage {
    taglines: LookupMap<AccountId, String>,
    bios: LookupMap<AccountId, String>,
}

impl Default for StatusMessage {
    fn default() -> Self {
        Self {
            taglines: LookupMap::new(b"r".to_vec()),
            bios: LookupMap::new(b"b".to_vec()),
        }
    }
}

#[near_bindgen]
impl StatusMessage {
    pub fn set_tagline(&mut self, message: String) {
        let account_id = env::signer_account_id();
        self.taglines.insert(&account_id, &message);
    }

    pub fn get_tagline(&self, account_id: AccountId) -> Option<String> {
        return self.taglines.get(&account_id);
    }

    pub fn set_bio(&mut self, message: String) {
        let account_id = env::signer_account_id();
        self.bios.insert(&account_id, &message);
    }

    pub fn get_bio(&self, account_id: AccountId) -> Option<String> {
        return self.bios.get(&account_id);
    }

    #[private]
    #[init(ignore_state)]
    pub fn migrate() -> Self {
        let old_state: OldStatusMessage = env::state_read().expect("failed");
        Self {
            taglines: old_state.records,
            bios: LookupMap::new(b"b".to_vec()),
        }
    }
}
```

### Compile the upgraded contract

Run:

``` sh
cargo build --target wasm32-unknown-unknown --release
```

### Deploy the upgraded contract

You will now deploy the upgraded contract code on the same contract account where the initial contract is running.

Since you interacted with the original contract, you have changed the chain state. Deploying an upgraded version of the contract does not purge the changed state. This means that you must have a way to retrieve the changed state through the upgraded contract interface. In our simple message contract, this is done through the `migrate` function.

You will migrate the original state at the upgraded contract deployment.

Run:

``` sh
near deploy --wasmFile target/wasm32-unknown-unknown/release/COMPILED_CONTRACT.wasm --initFunction "migrate" --initArgs "{}" --accountId CONTRACT_NAME.ACCOUNT_NAME.testnet --node_url ENDPOINT
```

where:

* COMPILED_CONTRACT — the name of the upgraded contract that you compiled to.
* CONTRACT_NAME — the name of the contract account where the original contract is running.
* ACCOUNT_NAME — the name of the account on the NEAR testnet that you used to deploy the original contract.
* ENDPOINT — your node HTTPS endpoint.

Example:

``` sh
near deploy --wasmFile target/wasm32-unknown-unknown/release/simple_message.wasm --initFunction "migrate" --initArgs "{}" --accountId simplemessage.upgradablecontract.testnet --node_url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

Example of the upgraded contract deployment: [997VvZ2EAss2NjdoGMJkZwJCMTNLZmKbXP3ZnFGkCMAh](https://explorer.testnet.near.org/transactions/997VvZ2EAss2NjdoGMJkZwJCMTNLZmKbXP3ZnFGkCMAh).

### Interact with the upgraded contract

Retrieve the original state message:

``` sh
near view CONTRACT_NAME.ACCOUNT_NAME.testnet get_tagline '{"account_id": "ACCOUNT_NAME.testnet"}' --node_url ENDPOINT
```

where:

* CONTRACT_NAME — the name of the contract account that you deployed the upgraded contract to.
* ACCOUNT_NAME — the name of the account on the NEAR testnet that you used to set the original message.
* ENDPOINT — your node HTTPS endpoint.

Note that since this is an upgraded contract, you are retrieving the original message through the new interface: through `get_tagline` instead of `get_status`.

Example:

``` sh
near view simplemessage.upgradablecontract.testnet get_tagline '{"account_id": "upgradablecontract.testnet"}' --node_url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

You can also change the state with the new function that you added to the contract: `set_bio`.

Example:

``` sh
near call simplemessage.upgradablecontract.testnet set_bio '{"message": "Bye"}' --accountId upgradablecontract.testnet --node_url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

And retrieve the new state:

``` sh
near view simplemessage.upgradablecontract.testnet get_bio '{"account_id": "upgradablecontract.testnet"}' --node_url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

## Conclusion

This tutorial guided you through the basics of creating a simple NEAR contract, deploying the initial contract on the NEAR network, interacting with the contract, and upgrading the contract.

This tutorial uses the testnet, however the exact same instructions and sequence will work on the mainnet as well.

::: tip See also

* [Operations: NEAR](/operations/near/)

:::
