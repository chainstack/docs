---
meta:
  - name: description
    content: Collection of JSON-RPC methods for the Polygon API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby polygon
---

# Polygon API reference guide

## Start building on Polygon using the JSON-RPC Polygon API

This page is a collection of JSON-RPC API call examples for the Polygon API using:

- [web3.js](https://web3js.readthedocs.io/)
- [web3.py](https://web3py.readthedocs.io/)
- [eth.rb](https://github.com/q9f/eth.rb/)
- [cURL](https://curl.se/)

::: tip Information

  The management API namespaces `admin_` and `personal_` are not exposed.

:::

## What is Polygon protocol?

[Polygon](https://docs.polygon.technology/docs/develop/getting-started) is an EVM-compatible sidechain, and one of Ethereum's [scaling solutions](https://chainstack.com/solving-the-blockchain-trilemma-scaling-solutions-for-ethereum/) to help reduce costs and increase efficiency.

Polygon runs independently from the Ethereum chain, has its own consensus mechanism, and can bridge assets between the two networks.

## What is the Polygon API

The Polygon API allows developers to communicate with the Polygon blockchain to build applications.

To read data from and send transactions to the Polygon blockchain, an application must connect to a Polygon RPC node.

When communicating with a Polygon RPC node, the Polygon client implements a JSON-RPC specification, a communication protocol allowing one to make remote calls and execute them as if they were made locally.

## How to start using the Polygon API

To use the Polygon API, you need access to a Polygon RPC node.

Follow these steps to sign up on Chainstack, deploy a Polygon RPC node, and find your endpoint credentials:

1. <a href="https://console.chainstack.com/user/account/create" target="_blank">Sign up with Chainstack</a>.
1. [Deploy a node](/platform/join-a-public-network#join-a-polygon-pos-network).
1. [View node access and credentials](/platform/view-node-access-and-credentials).

Now you are ready to connect to the Polygon blockchain and use the Polygon API to build.

The best way to use the Polygon API is to use a web3 library such as [Web3.js](https://web3js.readthedocs.io/) if using JavaScript or [Web3.py](https://web3py.readthedocs.io/) using Python.

A web3 library makes using the Polygon API to communicate with the Polygon blockchain easy and efficient.

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

* <a href="https://chainstack.com/build-better-with-polygon/" target="_blank">Build better with Polygon</a>

:::
