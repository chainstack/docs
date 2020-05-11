---
meta:
  - name: description
    content: Learn how to interact with your Quorum node using Geth client or JSON-RPC API and how to develop Quorum applications.
  - name: keywords
    content: quorum geth truffle web3 develop
---

# Tools

## Interaction tools

### Geth

To interact with your Quorum network, you must install a Quorum Geth client.

::: tip Install Go
To be able to install Quorum Geth, you must install Go first. See <a href="https://golang.org/doc/install" rel="nofollow">Go: Getting Started</a>.
:::

Having installed Go, install Quorum Geth as described in <a href="https://docs.goquorum.com/en/latest/Getting%20Started/Installing/" rel="nofollow">Quorum: Installing</a>.

With Quorum Geth installed, you can connect to the Quorum nodes with the `geth attach` command:

``` sh
./geth attach RPC_ENDPOINT
```

where

* RPC_ENDPOINT — your Quorum node RPC endpoint with the RPC username and RPC password. The format is `https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com`. See [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` sh
$ ./geth attach https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com

Welcome to the Geth JavaScript console!

instance: Geth/v1.8.12-stable-c6f0ae4e/linux-amd64/go1.9.7
coinbase: 0xd3c0093b308f4de81d5dc636996b62adee8f66ca
at block: 0 (Thu, 01 Jan 1970 00:00:00 UTC)
 datadir: /run-quorum/blockchain/qdata/dd
 modules: admin:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 raft:1.0 rpc:1.0 txpool:1.0 web3:1.0

>
```

Invoke any methods from <a href="https://github.com/ethereum/wiki/wiki/JavaScript-API" rel="nofollow">Web3 JavaScript API</a>.

Example below demonstrates how to get the current block number:

``` js
> web3.eth.blockNumber
518973
```

### JSON-RPC API

Interact with your Quorum network using <a href="https://github.com/ethereum/wiki/wiki/JSON-RPC" rel="nofollow">Geth JSON-RPC</a> and <a href="https://docs.goquorum.com/en/latest/Getting%20Started/api/" rel="nofollow">Quorum API</a>.

Use <a href="https://curl.haxx.se" rel="nofollow">curl</a> or <a href="https://www.getpostman.com" rel="nofollow">Postman</a> to invoke <a href="https://github.com/ethereum/wiki/wiki/JSON-RPC" rel="nofollow">Geth JSON-RPC</a> and <a href="https://docs.goquorum.com/en/latest/Getting%20Started/api/" rel="nofollow">Quorum API</a>.

Example below demonstrates how to get basic network information:

``` sh
$ curl -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":2}' \
  https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com

{"jsonrpc":"2.0","id":2,"result":"0x4"}
```

## Developments tools

Configure <a href="https://truffleframework.com" rel="nofollow">Truffle Suite</a> to deploy contracts to your Quorum network.

1. Install <a href="https://truffleframework.com" rel="nofollow">Truffle Suite</a> and create a project.

::: warning
Use Truffle >= 5.0.14 which has complete Quorum support with privacy features.
:::

2. Install `HDWalletProvider`.

<a href="https://github.com/trufflesuite/truffle/tree/develop/packages/hdwallet-provider" rel="nofollow">HDWalletProvider</a> is Truffle's separate npm package used to sign transactions.

Run:

``` sh
npm install @truffle/hdwallet-provider
```

3. Create a new environment in `truffle-config.js` with:

* `HDWalletProvider`
* Your Quorum network running with Chainstack

``` js
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12 word13 word14 word15";

module.exports = {
    chainstack: {
        provider: () => new HDWalletProvider(mnemonic, "RPC_ENDPOINT"),
        network_id: "*",
        gasPrice: 0,
        gas: 4500000,
        type: "quorum"
    }
   }
};
```

where

* `chainstack` — any network name that you will pass to the `truffle migrate --network` command.
* `HDWalletProvider` — Truffle's custom provider to sign transactions.
* `mnemonic` — your mnemonic that generates your accounts. You can also generate a mnemonic online with <a href="https://iancoleman.io/bip39/" rel="nofollow">Mnemonic Code Converter</a>. Make sure you generate a 15 word mnemonic.
* RPC_ENDPOINT — your Quorum node RPC endpoint. The format is `https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com`. See [View node access and credentials](/platform/view-node-access-and-credentials).
* `network_id` — your Quorum network ID. Available under **Access and credentials** > **Network ID**. You can set it to `*` for any.
* `gasPrice` — the setting must be `0` for the Quorum network.
* `gas` — the setting must be the default `4500000` for the Quorum network.
* `type` — the setting must be `quorum` to instruct Truffle for the Quorum network deployment.

Example:

``` js
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12 word13 word14 word15";

module.exports = {
  networks: {
    chainstack: {
        provider: () => new HDWalletProvider(mnemonic, "https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com"),
        network_id: "*",
        gasPrice: 0,
        gas: 4500000,
        type: "quorum"
    }
   }
};
```

3. Run `truffle migrate --network chainstack` and Truffle will deploy using Chainstack.

::: tip See also

* [Food supply temperature control with Web3](/tutorials/quorum/food-supply-temperature-control-with-web3)
* [Loyalty program with Truffle](/tutorials/quorum/loyalty-program-with-truffle)

:::
