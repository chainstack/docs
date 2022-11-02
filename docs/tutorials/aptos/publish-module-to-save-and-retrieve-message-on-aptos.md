---
meta:
  - name: description
    content: Learn how to publish a module to save and retrieve a message on Aptos
  - name: keywords
    content: tutorial aptos message move module
---

# Publish a module to save and retrieve a message on Aptos

Aptos uses its own terminology for widely-known Web3 entities. Smart contracts are called *Modules* and are written in the [Move language](https://move-language.github.io/move/). Modules are also not deployed but *published* on the Aptos chain.

The objective of this tutorial is to familiarize you with the Aptos network, the Move language and modules written in it. In the end of this tutorial, you will be able to publish, test, and interact with Move modules in Aptos.

Specifically, in this tutorial, you will:

* Initialize an Aptos project using the Aptos CLI.
* Publish a module on the Aptos testnet.
* Interact with the module to save a message.
* Use the Aptos REST API to retrieve the message.

##  Prerequisites

* [Chainstack account](https://console.chainstack.com/) to deploy an Aptos node.
* [Martian Aptos wallet](https://martianwallet.xyz/) to receive testnet Aptos token (APT).
* [Aptos CLI](https://github.com/aptos-labs/aptos-core) to compile, publish, and interact with the Move module.

## Overview

To get from zero to publishing your string via the module to Aptos testnet, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, [join testnet](/platform/join-a-public-network#join-an-aptos-network).
1. With Chainstack, access your [Aptos node credentials](/platform/view-node-access-and-credentials).
1. Set up your Martian wallet to work through the Chainstack Aptos node.
1. Fund your account through the [Aptos testnet faucet](https://aptoslabs.com/testnet-faucet).
1. Install the [Aptos CLI](https://aptos.dev/cli-tools/aptos-cli-tool/install-aptos-cli).
1. Create a Move project.
1. Create and configure your Aptos project.
1. Create a module in the Move language.
1. Compile and test the Move module.
1. Publish the Move module.
1. Save and retrieve a message on the Aptos chain.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the Aptos testnet

See [Join a public network](/platform/join-a-public-network).

### Get the access and credentials to your deployed nodes

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Set up Martian wallet

See [Aptos tools: Martian wallet](/operations/aptos/tools).

### Fund your account

Your account needs to pay fees in testnet APT to publish the module and interact with it. Fund your account with the [Aptos testnet faucet](https://aptoslabs.com/testnet-faucet).

### Install the Aptos CLI

You need the Aptos CLI to interact with your Move module. Set up the [Aptos CLI](https://aptos.dev/cli-tools/aptos-cli-tool/install-aptos-cli).

### Create a Move project

1. In your project directory, create a Move project:

   ```sh
   aptos move init --name save-message
   ```
   where:

   * `save-message` — name of the package.

   This creates a `sources` directory and a `Move.toml` file.

2. Open your `Move.toml` file and edit it to add `[addresses]` and `[dev-addresses]`, where:

   * `dev = "_"` — your default Aptos account.
   * `dev = "0xC0FFEE"` — an alternative Aptos account for tests.

   Example:

   ```toml
   [package]
   name = 'save-message'
   version = '1.0.0'

   [addresses]
   dev = "_"

   [dev-addresses]
   dev = "0xC0FFEE"

   [dependencies.AptosFramework]
   git = 'https://github.com/aptos-labs/aptos-core.git'
   rev = 'main'
   subdir = 'aptos-move/framework/aptos-framework'
   ```

::: tip

Note that packages have one-time names. If you want to re-publish the package, you must change its name.

:::

### Create and configure an Aptos project

1. In your project directory, run `aptos init` > `custom`.
   This will start a configuration process, during which you need to set up your Chainstack endpoint and Martian wallet private key. Adding the private key will retrieve your Aptos public address automatically.
1. Add your [Chainstack endpoint](/platform/view-node-access-and-credentials). Paste your Aptos node endpoint deployed with Chainstack, for example: `https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d`.
1. At the faucet URL request, type `skip` since you have already funded your account on the previous step.
1. Paste your Martian wallet private key to finish configuring your project.
   The key is used to send transactions and retrieve your public address. Example of a successful result:

```sh
Aptos CLI is now set up for account ...4474 as profile default!  Run `aptos --help` for more information about commands
{
  "Result": "Success"
}
```

As a result, you get a `.aptos` directory with a `config.yaml` file inside it. In `config.yaml`, you will find your project setup.

### Create a Move module

In your Move project directory, navigate to the `sources` directory. Create your Move module file `message.move` which allows you to call the `set_message` function and save a string on-chain:

```javascript
module dev::message {
    use std::error;
    use std::signer;
    use std::string;
    use aptos_framework::account;
    use aptos_framework::event;

//:!:>resource
    struct MessageHolder has key {
        message: string::String,
        message_change_events: event::EventHandle<MessageChangeEvent>,
    }
//<:!:resource

    struct MessageChangeEvent has drop, store {
        from_message: string::String,
        to_message: string::String,
    }

    /// There is no message present
    const ENO_MESSAGE: u64 = 0;

    public fun get_message(addr: address): string::String acquires MessageHolder {
        assert!(exists<MessageHolder>(addr), error::not_found(ENO_MESSAGE));
        *&borrow_global<MessageHolder>(addr).message
    }

    public entry fun set_message(account: signer, message: string::String)
    acquires MessageHolder {
        let account_addr = signer::address_of(&account);
        if (!exists<MessageHolder>(account_addr)) {
            move_to(&account, MessageHolder {
                message,
                message_change_events: account::new_event_handle<MessageChangeEvent>(&account),
            })
        } else {
            let old_message_holder = borrow_global_mut<MessageHolder>(account_addr);
            let from_message = *&old_message_holder.message;
            event::emit_event(&mut old_message_holder.message_change_events, MessageChangeEvent {
                from_message,
                to_message: copy message,
            });
            old_message_holder.message = message;
        }
    }

    #[test(account = @0x1)]
    public entry fun sender_can_set_message(account: signer) acquires MessageHolder {
        let addr = signer::address_of(&account);
        aptos_framework::account::create_account_for_test(addr);
        set_message(account,  string::utf8(b"Hello Chainstack dev"));

        assert!(
          get_message(addr) == string::utf8(b"Hello Chainstack dev"),
          ENO_MESSAGE
        );
    }
}
```

### Compile and test the Move module

1. To compile your Move module, run:

   ```sh
   aptos move compile --named-addresses dev=default
   ```

1. After the module compiled, run a build-in test which checks if the `set_message` and `get_message` functions work:

   ```sh
   aptos move test
   ```

### Publish the Move module

1. Publish your compiled and tested Move module by running:

   ```sh
   aptos move publish --named-addresses dev=default
   ```

1. Type `yes` to confirm publishing the transaction on the Aptos chain.

   The module will publish and the terminal will return the module information. You can use the transaction hash to retrieve transaction details. To do so, run:

   ```sh
   curl --location --request GET 'https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/v1/transactions/by_hash/0x815cecb01a962331ca34904653a26715e6cd8e631d2d1b7da17b593adda1ea65' \
   --header 'Content-Type: application/json'
   ```

### Save and retrieve a message on the Aptos chain

1. To save a message on the Aptos chain, run:

   ```sh
   aptos move run --function-id 'default::message::set_message' --args 'string:Hello Chainstack dev'
   ```

   where:

   * `run` — a Move command to call functions;
   * `function-id` — a function to call;
   * `args` — arguments of the function.

1. Type `yes` to confirm publishing the transaction on the Aptos chain.

1. Retrieve the published message via the REST API by running:

   ```sh
   curl --location --request GET 'https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/v1/accounts/c0e0ce57eaf9680ae67252fb3126f25aa86bb098b05f7b72cf0cf0de57c72a7f/resource/0xc0e0ce57eaf9680ae67252fb3126f25aa86bb098b05f7b72cf0cf0de57c72a7f::message::MessageHolder' \
   --header 'Content-Type: application/json'
   ```

Successful response example:

```json
{
    "type": "0xc0e0ce57eaf9680ae67252fb3126f25aa86bb098b05f7b72cf0cf0de57c72a7f::message::MessageHolder",
    "data": {
        "message": "Hello Chainstack dev",
        "message_change_events": {
            "counter": "0",
            "guid": {
                "id": {
                    "addr": "0xc0e0ce57eaf9680ae67252fb3126f25aa86bb098b05f7b72cf0cf0de57c72a7f",
                    "creation_num": "4"
                }
            }
        }
    }
}
```

## Conclusion

This tutorial guided you through the basics of creating, publishing, and testing a simple module that saves a string on the Aptos chain.

::: tip See also

* [Operations: Aptos](/operations/aptos/)

:::
