---
meta:
  - name: description
    content: Collection of JSON-RPC methods for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana
---

# Solana API reference

## Start building on Solana using the JSON-RPC Solana API

This page is a collection of JSON-RPC API call examples for the Solana API using:

* [Solana web3.js](https://solana-labs.github.io/solana-web3.js/)
* [Solana.py](https://michaelhly.github.io/solana-py/)
* [cURL](https://curl.se/)

For a detailed description of all the available Solana API JSON-RPC methods, see [Solana JSON-RPC API](https://docs.solana.com/developing/clients/jsonrpc-api).

## What is the Solana API

The Solana API allows developers to communicate with the Solana blockchain to build applications.

To read data from and send transactions to the Solana blockchain, an application must connect to an Solana RPC node.

When communicating with a Solana RPC node, the Solana client implements a JSON-RPC specification, a communication protocol allowing one to make remote calls and execute them as if they were made locally.

## Disabled indexes

Currently, the following indexes are disabled for Solana devnet elastic nodes:

* `program-id`
* `spl-token-owner`
* `spl-token-mint`

## How to start using the Solana API

To use the Solana API, you need access to a Solana RPC node.

Follow these steps to sign up on Chainstack, deploy a Solana RPC node, and find your endpoint credentials:

1. <a href="https://console.chainstack.com/user/account/create" target="_blank">Sign up with Chainstack</a>.
1. [Deploy a node](/platform/join-a-public-network#join-a-solana-network).
1. [View node access and credentials](/platform/view-node-access-and-credentials).

Now you are ready to connect to the Solana blockchain and use the Solana API to build.

Find useful [Solana tools](/operations/solana/tools) in the Chainstack docs.

The best way to use the Solana API is to use a web3 library such as [Solana web3.js](https://solana-labs.github.io/solana-web3.js/) if using JavaScript or [Solana.py](https://michaelhly.github.io/solana-py/) using Python.

A web3 library makes using the Solana API to communicate with the Solana blockchain easy and efficient.

### Install web3 libraries

You will need to install the web3 libraries to be able to use them.

#### Install Solana Web3.js

[Solana web3.js](https://solana-labs.github.io/solana-web3.js/) is a JavaScript library that allows you to communicate with a Solana RPC node through HTTP.

To install, run:

```sh
npm install --save @solana/web3.js
```

#### Install Solana.py

[Solana.py](https://michaelhly.github.io/solana-py/) is a Python library that allows you to communicate with a Solana RPC node through HTTP.

To install, run:

```sh
pip install solana
```

::: tip See also

* <a href="https://chainstack.com/build-better-with-solana/" target="_blank">Build better with Solana</a>

:::
