---
meta:
  - name: description
    content: Collection of JSON-RPC methods for the Ethereum API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum
---

# Ethereum API reference

## Start building on Ethereum using the JSON-RPC Ethereum API

This page is a collection of JSON-RPC API call examples for the Ethereum API using:

- [web3.js](https://web3js.readthedocs.io/)
- [web3.py](https://web3py.readthedocs.io/)
- [eth.rb](https://github.com/q9f/eth.rb/)
- [cURL](https://curl.se/)

For a detailed description of all the available Ethereum API JSON-RPC methods, see [Ethereum JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/).

## What is the Ethereum API

The Ethereum API allows developers to communicate with the Ethereum blockchain to build applications.

To read data from and send transactions to the Ethereum blockchain, an application must connect to an Ethereum RPC node.

When communicating with an Ethereum RPC node, the Ethereum client implements a JSON-RPC specification, a communication protocol allowing one to make remote calls and execute them as if they were made locally.

## How to start using the Ethereum API

To use the Ethereum API, you need access to an Ethereum RPC node.

Follow these steps to sign up on Chainstack, deploy an Ethereum RPC node, and find your endpoint credentials:

1. <a href="https://console.chainstack.com/user/account/create" target="_blank">Sign up with Chainstack</a>.
1. [Deploy a node](/platform/join-a-public-network#join-an-ethereum-network).
1. [View node access and credentials](/platform/view-node-access-and-credentials).

Now you are ready to connect to the Ethereum blockchain and use the Ethereum API to build.

Find useful [Ethereum tools](/operations/ethereum/tools#interaction-tools) in the Chainstack docs.

The best way to use the Ethereum API is to use a web3 library such as [Web3.js](https://web3js.readthedocs.io/) if using JavaScript or [Web3.py](https://web3py.readthedocs.io/) using Python.

A web3 library makes using the Ethereum API to communicate with the Ethereum blockchain easy and efficient.

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
- <a href="https://chainstack.com/build-better-with-ethereum/" target="_blank">Build better with Ethereum</a>
  :::
