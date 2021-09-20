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
geth attach ENDPOINT
```

where

* ENDPOINT — your node HTTPS endpoint.

See [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` sh
geth attach https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

</template>
<template v-slot:pp>

``` sh
geth attach https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com
```

</template>
</CodeSwitcher>

Invoke any methods from [Web3 JavaScript API](https://web3js.readthedocs.io/).

Example below demonstrates how to get the current block number:

``` js
> web3.eth.blockNumber
518973
```

### JSON-RPC API

Interact with your Quorum network using:

* [Geth JSON-RPC](https://eth.wiki/json-rpc/API).
* [Quorum privacy API](https://docs.goquorum.consensys.net/en/stable/Reference/APIs/PrivacyAPI/).
* [Quorum permissions API](https://docs.goquorum.consensys.net/en/stable/Reference/APIs/PermissioningAPIs/).
* [Quorum contract extension API](https://docs.goquorum.consensys.net/en/stable/Reference/APIs/ContractExtensionAPIs/).

Use [curl](https://curl.haxx.se) or [Postman](https://www.getpostman.com).

Example below demonstrates how to get basic network information:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` sh
$ curl -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":2}' \
  https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d

{"jsonrpc":"2.0","id":2,"result":"0x4"}
```

</template>
<template v-slot:pp>

``` sh
$ curl -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":2}' \
  https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com

{"jsonrpc":"2.0","id":2,"result":"0x4"}
```

</template>
</CodeSwitcher>

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
        provider: () => new HDWalletProvider(mnemonic, "ENDPOINT"),
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
* ENDPOINT — your Quorum node HTTPS endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).
* `network_id` — your Quorum network ID. See [Default network ID](/operations/quorum/default-network-id). You can set it to `*` for any.
* `gasPrice` — the setting must be `0` for the Quorum network.
* `gas` — the setting must be the default `4500000` for the Quorum network.
* `type` — the setting must be `quorum` to instruct Truffle for the Quorum network deployment.

Example:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` js
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12 word13 word14 word15";

module.exports = {
  networks: {
    chainstack: {
        provider: () => new HDWalletProvider(mnemonic, "https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d"),
        network_id: "*",
        gasPrice: 0,
        gas: 4500000,
        type: "quorum"
    }
   }
};
```

</template>
<template v-slot:pp>

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

</template>
</CodeSwitcher>

3. Run `truffle migrate --network chainstack` and Truffle will deploy using Chainstack.

### web3.js

Build DApps using [web3.js](https://github.com/ethereum/web3.js/) and Quorum nodes deployed with Chainstack.

1. Install [web3.js](https://web3js.readthedocs.io/).
1. Use the `HttpProvider` object to connect to your node HTTPS endpoint.

``` js
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('ENDPOINT'));
```

where

* ENDPOINT — your node HTTPS endpoint.
* USERNAME — your Quorum node access username.
* PASSWORD — your Quorum node access password.

Example to get the latest block number:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` js
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.WebsocketProvider('https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d'));

web3.eth.getBlockNumber().then(console.log);
```

</template>
<template v-slot:pp>

``` js
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.WebsocketProvider('https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com'));

web3.eth.getBlockNumber().then(console.log);
```

</template>
</CodeSwitcher>

### web3j

Build DApps using [web3j](https://github.com/web3j/web3j) and Quorum nodes deployed with Chainstack.

Use the `HttpService` object to connect to your node HTTPS endpoint.

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
  private static final String ENDPOINT = "ENDPOINT";

  public static void main(String[] args) {
    try {

      OkHttpClient.Builder clientBuilder = new OkHttpClient.Builder();
      clientBuilder.authenticator(new Authenticator() {
          @Override public Request authenticate(Route route, Response response) throws IOException {
              String credential = Credentials.basic(USERNAME, PASSWORD);
              return response.request().newBuilder().header("Authorization", credential).build();
          }
      });

      HttpService service = new HttpService(ENDPOINT, clientBuilder.build(), false);
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

* ENDPOINT — your node HTTPS endpoint.
* USERNAME — your node access username.
* PASSWORD — your node access password.

See also [the full code on GitHub](https://github.com/chainstack/web3j-getLatestBlock).

::: tip See also

* [Food supply temperature control with Web3](/tutorials/quorum/food-supply-temperature-control-with-web3)
* [Loyalty program with Truffle](/tutorials/quorum/loyalty-program-with-truffle)

:::
