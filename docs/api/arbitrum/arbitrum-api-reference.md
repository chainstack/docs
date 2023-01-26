---
meta:
  - name: description
    content: Collection of JSON-RPC methods for the Arbitrum API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby arbitrum
---

# Arbitrum API reference guide

## Start building on Arbitrum using the JSON-RPC Arbitrum API

This page is a collection of JSON-RPC API call examples for the Arbitrum API using:

- [web3.js](https://web3js.readthedocs.io/)
- [web3.py](https://web3py.readthedocs.io/)
- [eth.rb](https://github.com/q9f/eth.rb/)
- [cURL](https://curl.se/)

::: tip Information

  The management API namespaces `admin_` and `personal_` are not exposed.

:::

## What is Arbitrum protocol?

Arbitrum is an EVM-compatible Layer 2 [scaling solution](https://chainstack.com/solving-the-blockchain-trilemma-scaling-solutions-for-ethereum/) for the Ethereum network that leverages optimistic rollups to introduce several efficiency improvements to transaction processing and their costs. To do this, Arbitrum bundles several off-chain transactions together in a batch before parsing the result to the Ethereum network.

## Bridge assets between Ethereum and Arbitrum

You can bridge between Ethereum and Arbitrum using the [Arbitrum brigde](https://bridge.arbitrum.io/?l2ChainId=42161). The process is straightforward, you can connect MetaMask, and it takes around ten minutes to complete.

### Use the Arbitrum testnet

Chainstack supports the Arbitrum Goerli testnet. You can deploy an Arbitrum Goerli testnet node, then bridge some Goerli ETH using the [testnet Arbitrum brigde](https://bridge.arbitrum.io/?l2ChainId=421613).

Find useful [Arbitrum tools](/operations/arbitrum/tools#tools) in the Chainstack docs.

## What is the Arbitrum API

The Arbitrum API allows developers to communicate with the Arbitrum blockchain to build applications.

To read data from and send transactions to the Arbitrum blockchain, an application must connect to an Arbitrum RPC node.

When communicating with an Arbitrum RPC node, the Arbitrum client implements a JSON-RPC specification, a communication protocol allowing one to make remote calls and execute them as if they were made locally.

## How to start using the Arbitrum API

To use the Arbitrum API, you need access to an Arbitrum RPC node.

Follow these steps to sign up on Chainstack, deploy an Arbitrum RPC node, and find your endpoint credentials:

1. <a href="https://console.chainstack.com/user/account/create" target="_blank">Sign up with Chainstack</a>.
1. [Deploy a node](/platform/join-a-public-network#join-an-arbitrum-network).
1. [View node access and credentials](/platform/view-node-access-and-credentials).

Now you are ready to connect to the Arbitrum blockchain and use the Arbitrum API to build.

The best way to use the Arbitrum API is to use a web3 library such as [Web3.js](https://web3js.readthedocs.io/) if using JavaScript or [Web3.py](https://web3py.readthedocs.io/) using Python.

A web3 library makes using the Arbitrum API to communicate with the Arbitrum blockchain easy and efficient.

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

* <a href="https://chainstack.com/build-better-with-arbitrum/" target="_blank">Build better with Arbitrum</a>

:::
