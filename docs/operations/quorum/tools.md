---
meta:
  - name: description
    content: Learn how to interact with your Quorum node using GoQuorum client or JSON-RPC API and how to develop Quorum applications.
  - name: keywords
    content: quorum geth truffle web3 develop goquorum
---

# Tools

## Interaction tools

### GoQuorum

To interact with your Quorum network, you must install a GoQuorum client.

::: tip Install Go
To be able to install GoQuorum, you must install Go first. See [Go: Getting Started](https://golang.org/doc/install).
:::

Having installed Go, install GoQuorum as described in [Quorum: Installing](https://docs.goquorum.consensys.net/en/latest/HowTo/GetStarted/Install/).

With GoQuorum installed, you can connect to the Quorum nodes with the `geth attach` command:

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

Invoke any methods from [Web3 JavaScript API](https://github.com/ethereum/wiki/wiki/JavaScript-API).

Example below demonstrates how to get the current block number:

``` js
> web3.eth.blockNumber
518973
```

### JSON-RPC API

Interact with your Quorum network using:

* [Geth JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC).
* [Quorum privacy API](https://docs.goquorum.consensys.net/en/latest/Reference/APIs/PrivacyAPI/).
* [Quorum permissions API](https://docs.goquorum.consensys.net/en/latest/Reference/APIs/PermissioningAPIs/).
* [Quorum contract extension API](https://docs.goquorum.consensys.net/en/latest/Reference/APIs/ContractExtensionAPIs/).

Use [curl](https://curl.haxx.se) or [Postman](https://www.getpostman.com).

Example below demonstrates how to get basic network information:

``` sh
$ curl -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":2}' \
  https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com

{"jsonrpc":"2.0","id":2,"result":"0x4"}
```

## Developments tools

### Truffle

Configure [Truffle Suite](https://truffleframework.com) to deploy contracts to your Quorum network.

1. Install [Truffle Suite](https://truffleframework.com) and create a project.

::: warning
Use Truffle >= 5.0.14 which has complete Quorum support with privacy features.
:::

2. Install `HDWalletProvider`.

[HDWalletProvider](https://github.com/trufflesuite/truffle/tree/develop/packages/hdwallet-provider) is Truffle's separate npm package used to sign transactions.

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
* `mnemonic` — your mnemonic that generates your accounts. You can also generate a mnemonic online with [Mnemonic Code Converter](https://iancoleman.io/bip39/). Make sure you generate a 15 word mnemonic.
* RPC_ENDPOINT — your Quorum node RPC endpoint. The format is `https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com`. See [View node access and credentials](/platform/view-node-access-and-credentials).
* `network_id` — your Quorum network ID. See [Default network ID](/operations/quorum/default-network-id). You can set it to `*` for any.
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

### web3.js

Build DApps using [web3.js](https://github.com/ethereum/web3.js/) and Quorum nodes deployed with Chainstack.

1. Install [web3.js](https://web3js.readthedocs.io/).
1. Use the `HttpProvider` object to connect to your node's RPC endpoint.

``` js
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('https://USERNAME:PASSWORD@RPC_ENDPOINT'));
```

where

* USERNAME — your Quorum node access username.
* PASSWORD — your Quorum node access password.
* RPC_ENDPOINT — your Quorum node RPC endpoint.

Example to get the latest block number:

``` js
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.WebsocketProvider('https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com'));

web3.eth.getBlockNumber().then(console.log);
```

### web3j

Build DApps using [web3j](https://github.com/web3j/web3j) and Quorum nodes deployed with Chainstack.

Use the `HttpService` object to connect to your node's RPC endpoint.

Example to get the latest block number:

``` java
package getLatestBlock;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthBlock;
import org.web3j.protocol.exceptions.ClientConnectionException;
import org.web3j.protocol.http.HttpService;

import okhttp3.Authenticator;
import okhttp3.Credentials;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.Route;

public final class App {

  private static final String USERNAME = "USERNAME";
  private static final String PASSWORD = "PASSWORD";
  private static final String RPC_ENDPOINT = "RPC_ENDPOINT";

  public static void main(String[] args) {
    try {

      OkHttpClient.Builder clientBuilder = new OkHttpClient.Builder();
      clientBuilder.authenticator(new Authenticator() {
          @Override public Request authenticate(Route route, Response response) throws IOException {
              String credential = Credentials.basic(USERNAME, PASSWORD);
              return response.request().newBuilder().header("Authorization", credential).build();
          }
      });

      HttpService service = new HttpService(RPC_ENDPOINT, clientBuilder.build(), false);
      Web3j web3 = Web3j.build(service);


      EthBlock.Block latestBlock = web3.ethGetBlockByNumber(DefaultBlockParameterName.LATEST, false).send().getBlock();


      System.out.println("Latest Block: #" + latestBlock.getNumber());

    } catch (IOException | ClientConnectionException ex) {

      Logger.getLogger(App.class.getName()).log(Level.SEVERE, null, ex);
    }
  }

}
```

where

* USERNAME — your Quorum node access username.
* PASSWORD — your Quorum node access password.
* RPC_ENDPOINT — your Quorum node RPC endpoint.

See also [the full code on GitHub](https://github.com/chainstack/web3j-getLatestBlock).

::: tip See also

* [Food supply temperature control with Web3](/tutorials/quorum/food-supply-temperature-control-with-web3)
* [Loyalty program with Truffle](/tutorials/quorum/loyalty-program-with-truffle)

:::
