---
meta:
  - name: description
    content: Collection of JSON-RPC methods for the Avalanche API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby avalanche
---

# Avalanche API reference guide

## Start building on Avalanche using the JSON-RPC Avalanche API

This page is a collection of JSON-RPC API call examples for the Avalanche API using:

- [web3.js](https://web3js.readthedocs.io/)
- [web3.py](https://web3py.readthedocs.io/)
- [eth.rb](https://github.com/q9f/eth.rb/)
- [cURL](https://curl.se/)

::: tip Information

  The management API namespaces `admin_` and `personal_` are not exposed.

:::

## What is Avalanche protocol?

[Avalanche](https://www.avax.network/) is an EVM-compatible protocol focused on speed and scalability.

### Avalanche C-chain

Avalanche allows anyone to create their own tailor-made application-specific blockchains, supporting multiple custom virtual machines.

The C-Chain uses the Ethereum Virtual Machine and is compatible with all essential Ethereum tooling.

Find useful [Avalanche tools](/operations/avalanche/tools#tools) in the Chainstack docs.

## What is the Avalanche API

The Avalanche API allows developers to communicate with the Avalanche blockchain to build applications.

To read data from and send transactions to the Avalanche blockchain, an application must connect to an Avalanche RPC node.

When communicating with an Avalanche RPC node, the Avalanche client implements a JSON-RPC specification, a communication protocol allowing one to make remote calls and execute them as if they were made locally.

## How to start using the Avalanche API

To use the Avalanche API, you need access to an Avalanche RPC node.

Follow these steps to sign up on Chainstack, deploy an Avalanche RPC node, and find your endpoint credentials:

1. <a href="https://console.chainstack.com/user/account/create" target="_blank">Sign up with Chainstack</a>.
1. [Deploy a node](/platform/join-a-public-network#join-an-avalanche-network).
1. [View node access and credentials](/platform/view-node-access-and-credentials).

Now you are ready to connect to the Avalanche blockchain and use the Avalanche API to build.

The best way to use the Avalanche API is to use a web3 library such as [Web3.js](https://web3js.readthedocs.io/) if using JavaScript or [Web3.py](https://web3py.readthedocs.io/) using Python.

A web3 library makes using the Avalanche API to communicate with the Avalanche blockchain easy and efficient.

### Install web3 libraries

You will need to install the web3 libraries to be able to use them.

#### Install Web3.js

[Web3.js](https://web3js.readthedocs.io/) is a JavaScript library that allows you to communicate with an EVM node through HTTP and WebSocket.

To install, run:

```sh
npm install web3
```

#### Install Web3.py

[Web3.py](https://web3py.readthedocs.io/) is a Python library that allows you to communicate with an EVM node through HTTP and WebSocket.

To install, run:

```sh
pip install web3
```

#### Install Eth.rb

[Eth.rb](https://github.com/q9f/eth.rb/) is a Ruby gem that allows you to communicate with an EVM node through HTTP.

To install, run:

```sh
gem install eth
```

::: tip See also

* <a href="https://chainstack.com/build-better-with-avalanche/" target="_blank">Build better with Avalanche</a>

:::
