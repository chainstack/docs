---
meta:
  - name: description
    content: Learn how to interact with your Fantom node, deploy smart contracts through your node, and develop dapps.
  - name: keywords
    content: fantom ftm truffle web3 dapp geth opera hardhat
---

# Tools

## Interaction tools

### Opera client

Interact with your Fantom node using the [Opera client](https://github.com/Fantom-foundation/go-opera).

1. Install [Opera](https://docs.fantom.foundation/node/run-a-read-only-node).

2. Use `opera attach` command with the node endpoint.

``` sh
opera attach ENDPOINT
```

where

* ENDPOINT — your node HTTPS or WSS endpoint.

See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` sh
opera attach https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

</template>
<template v-slot:pp>

``` sh
opera attach https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com
```

</template>
</CodeSwitcher>

3. Invoke any methods from [Web3 JavaScript API](https://web3js.readthedocs.io/). Make sure you replace the `eth` namespace with `ftm`.

Example below demonstrates how to get the balance of an address in wei value and convert it to ether value:

``` js
> web3.fromWei(web3.ftm.getBalance("0x663f6ab861014056274128C69ff80caDCf048603"))
660.387405873826933931
```

### GraphQL

You can use GraphQL on [dedicated nodes](/glossary/dedicated-node) on the Business and Enterprise <a href="https://chainstack.com/pricing/" target="_blank">subscription plans</a>.

::: tip GraphQL schema

The Fantom GraphQL schema is different from the standard Geth implementation.

See Fantom GraphQL documentation: [Schema Structure](https://docs.fantom.foundation/graphql/graphql-schema-basics).

:::

#### UI

You can query data using the graphical interface.

1. On Chainstack, navigate to your dedicated Fantom node. See [View node access and credentials](/platform/view-node-access-and-credentials).
1. Hover over **GraphQL IDE URL** and click **Open**.
1. In the graphical interface that opens, run a GraphQL query.

Example to get the latest block number:

``` js
{ block { number } }
```

#### Node.js

You can build a web app to query data using Node.js and [axios](https://www.npmjs.com/package/axios):

``` js
const axios = require('axios');
const main = async () => {
  try {
    const result = await axios.post(
      'ENDPOINT',
      {
        query: `
          QUERY
        `
      }
    );
    console.log(result.data);
  } catch(error) {
    console.error(error);
  }
}
main();
```

where

* ENDPOINT — your node GraphQL endpoint.
* QUERY — your GraphQL query.

See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example to get the latest block number:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` js
const axios = require('axios');
const main = async () => {
  try {
    const result = await axios.post(
      'https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/graphql',
      {
        query: `
          { block { number } }
        `
      }
    );
    console.log(result.data);
  } catch(error) {
    console.error(error);
  }
}
main();
```

</template>
<template v-slot:pp>

``` js
const axios = require('axios');
const main = async () => {
  try {
    const result = await axios.post(
      'https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com/graphql',
      {
        query: `
          { block { number } }
        `
      }
    );
    console.log(result.data);
  } catch(error) {
    console.error(error);
  }
}
main();
```

</template>
</CodeSwitcher>

See also  <a href="https://support.chainstack.com/hc/en-us/articles/4409604331161-Using-GraphQL-with-EVM-compatible-nodes" target="_blank">Using GraphQL with EVM-compatible nodes</a>.

### MetaMask

You can set your [MetaMask](https://metamask.io/) to interact through your Fantom nodes deployed with Chainstack.

1. Open your MetaMask and click the network selector.
1. In the network selector, click **Custom RPC**.
1. In the **New RPC URL** field, enter the endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).

    Example:

    <CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
    <template v-slot:kp>

    ```
    https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
    ```

    </template>
    <template v-slot:pp>

    ```
    https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com
    ```

    </template>
    </CodeSwitcher>

1. In the **Chain ID** field, enter the ID of the network:

    * Mainnet: `250`
    * Testnet: `4002`

1. Click **Save**.

See also [View node access and credentials](/platform/view-node-access-and-credentials).

## Development tools

### Truffle

Configure [Truffle Suite](https://truffleframework.com) to deploy contracts to your Fantom nodes.

1. Install [Truffle Suite](https://truffleframework.com), [HD Wallet-enabled Web3 provider](https://github.com/trufflesuite/truffle/tree/develop/packages/hdwallet-provider), and create a project.

2. Create a new environment in `truffle-config.js`, add your mnemonic phrase generated by [a wallet](https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/) and the node endpoint:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` js
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = 'pattern enroll upgrade ...';
...
module.exports = {
 networks: {
    chainstack: {
        provider: () => new HDWalletProvider(mnemonic, "https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d"),
        network_id: "*"
    },
   }
  }
};
```

</template>
<template v-slot:pp>

``` js
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = 'pattern enroll upgrade ...';
...
module.exports = {
 networks: {
    chainstack: {
        provider: () => new HDWalletProvider(mnemonic, "https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com"),
        network_id: "*"
    },
   }
  }
};
```

</template>
</CodeSwitcher>

### Hardhat

Configure [Hardhat](https://hardhat.org/) to deploy contracts and interact through your Fantom nodes.

1. Install [Hardhat](https://hardhat.org/) and create a project.

2. Create a new environment in `hardhat.config.js`:

``` js
require("@nomiclabs/hardhat-waffle");
...
module.exports = {
  solidity: "0.7.3",
  networks: {
    chainstack: {
        url: "ENDPOINT",
        accounts: ["PRIVATE_KEY"]
    },
   }
};
```

where

* ENDPOINT — your node HTTPS or WSS endpoint.
* PRIVATE_KEY — the private key of the account that you use to deploy the contract.

See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` js
require("@nomiclabs/hardhat-waffle");
...
module.exports = {
  solidity: "0.7.3",
  networks: {
    chainstack: {
        url: "https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d",
        accounts: ["ee5dda7d38d194783d32adcfc961401108b8fdde27e8fee115553959d434e68b"]
    },
   }
};
```

</template>
<template v-slot:pp>

``` js
require("@nomiclabs/hardhat-waffle");
...
module.exports = {
  solidity: "0.7.3",
  networks: {
    chainstack: {
        url: "https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com",
        accounts: ["ee5dda7d38d194783d32adcfc961401108b8fdde27e8fee115553959d434e68b"]
    },
   }
};
```

</template>
</CodeSwitcher>

3. Run `npx hardhat run scripts/deploy.js --network chainstack` and Hardhat will deploy using Chainstack.

### web3.js

Build DApps using [web3.js](https://github.com/ethereum/web3.js/) and Fantom nodes deployed with Chainstack.

#### HTTP

1. Install [web3.js](https://web3js.readthedocs.io/).
1. Use the `HttpProvider` object to connect to your node HTTPS endpoint.

``` js
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('ENDPOINT'));
```

where

* ENDPOINT — your node HTTPS endpoint.

Example to get the latest block number:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` js
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d'));

web3.eth.getBlockNumber().then(console.log);
```

</template>
<template v-slot:pp>

``` js
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com'));

web3.eth.getBlockNumber().then(console.log);
```

</template>
</CodeSwitcher>

#### WebSocket

1. Use the `WebsocketProvider` object to connect to your node WSS endpoint.

``` js
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.WebsocketProvider('ENDPOINT'));
```

where

* ENDPOINT — your node WSS endpoint.

Example to get the latest block number:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` js
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ws-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d'));

web3.eth.getBlockNumber().then(console.log);
```

</template>
<template v-slot:pp>

``` js
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://user-name:pass-word-pass-word-pass-word@ws-nd-123-456-789.p2pify.com'));

web3.eth.getBlockNumber().then(console.log);
```

</template>
</CodeSwitcher>

### web3.py

Build DApps using [web3.py](https://github.com/ethereum/web3.py) and Fantom nodes deployed with Chainstack.

1. Install [web3.py](https://web3py.readthedocs.io/).
1. Connect over HTTP or WebSocket. See also <a href="https://support.chainstack.com/hc/en-us/articles/900002187586-Ethereum-node-connection-HTTP-vs-WebSocket" target="_blank">EVM node connection: HTTP vs WebSocket</a>.

#### HTTP

Use the `HTTPProvider` to connect to your node HTTPS endpoint.

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` py
from web3 import Web3

web3 = Web3(Web3.HTTPProvider('ENDPOINT'))
```

</template>
<template v-slot:pp>

``` py
from web3 import Web3

web3 = Web3(Web3.HTTPProvider('https://%s:%s@%s'% ("USERNAME", "PASSWORD", "HOSTNAME")))
```

</template>
</CodeSwitcher>

where

* ENDPOINT — your node HTTPS endpoint.
* HOSTNAME — your node HTTPS endpoint hostname.
* USERNAME — your node access username.
* PASSWORD — your node access password.

Example to get the latest block number:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` py
from web3 import Web3

web3 = Web3(Web3.HTTPProvider('https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d'))
print(web3.eth.blockNumber)
```

</template>
<template v-slot:pp>

``` py
from web3 import Web3

web3 = Web3(Web3.HTTPProvider('https://%s:%s@%s'% ("user-name", "pass-word-pass-word-pass-word", "nd-123-456-789.p2pify.com")))
print(web3.eth.blockNumber)
```

</template>
</CodeSwitcher>

#### WebSocket

Use the `WebsocketProvider` object to connect to your node WSS endpoint.

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` py
from web3 import Web3

web3 = Web3(Web3.WebsocketProvider('ENDPOINT'))
```

</template>
<template v-slot:pp>

``` py
from web3 import Web3

web3 = Web3(Web3.WebsocketProvider('wss://%s:%s@%s'% ("USERNAME", "PASSWORD", "HOSTNAME")))
```

</template>
</CodeSwitcher>

where

* ENDPOINT — your node WSS endpoint.
* HOSTNAME — your node WSS endpoint hostname.
* USERNAME — your node access username.
* PASSWORD — your node access password.

Example to get the latest block number:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` py
from web3 import Web3

web3 = Web3(Web3.WebsocketProvider('wss://ws-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d'))
print(web3.eth.blockNumber)
```

</template>
<template v-slot:pp>

``` py
from web3 import Web3

web3 = Web3(Web3.WebsocketProvider('wss://%s:%s@%s'% ("user-name", "pass-word-pass-word-pass-word", "ws-nd-123-456-789.p2pify.com")))
print(web3.eth.blockNumber)
```

</template>
</CodeSwitcher>

::: tip
See also <a href="https://support.chainstack.com/hc/en-us/articles/900001918763-WebSocket-connection-to-an-Ethereum-node" target="_blank">WebSocket connection to an EVM node</a>.
:::

### web3.php

Build DApps using [web3.php](https://github.com/web3p/web3.php) and Fantom nodes deployed with Chainstack.

1. Install [web3.php](https://github.com/web3p/web3.php).
2. Connect over HTTP:

``` php
<?php

require_once "vendor/autoload.php";

use Web3\Web3;
use Web3\Providers\HttpProvider;
use Web3\RequestManagers\HttpRequestManager;

$web3 = new Web3(new HttpProvider(new HttpRequestManager("ENDPOINT", 5)));
?>
```

where ENDPOINT is your node HTTPS endpoint.


3. Use [JSON-RPC methods](https://eth.wiki/json-rpc/API) to interact with the node.

Example to get the latest block number:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` php
<?php

require_once "vendor/autoload.php";

use Web3\Web3;
use Web3\Providers\HttpProvider;
use Web3\RequestManagers\HttpRequestManager;

$web3 = new Web3(new HttpProvider(new HttpRequestManager("https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d", 5)));

$eth = $web3->eth;

$eth->blockNumber(function ($err, $data) {
        print "$data \n";
});
?>
```

</template>
<template v-slot:pp>

``` php
<?php

require_once "vendor/autoload.php";

use Web3\Web3;
use Web3\Providers\HttpProvider;
use Web3\RequestManagers\HttpRequestManager;

$web3 = new Web3(new HttpProvider(new HttpRequestManager("https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com", 5)));

$eth = $web3->eth;

$eth->blockNumber(function ($err, $data) {
        print "$data \n";
});
?>
```

</template>
</CodeSwitcher>

### ethers.js

Build DApps using [ethers.js](https://github.com/ethers-io/ethers.js/) and Fantom nodes deployed with Chainstack.

1. Install [ethers.js](https://www.npmjs.com/package/ethers).
1. Connect over HTTP or WebSocket.

#### HTTP

Use the `JsonRpcProvider` object to connect to your node HTTPS endpoint.

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` js
const { ethers } = require("ethers");

var urlInfo = {
    url: 'ENDPOINT'
};
var provider = new ethers.providers.JsonRpcProvider(urlInfo, NETWORK_ID);
```

</template>
<template v-slot:pp>

``` js
const { ethers } = require("ethers");

var urlInfo = {
    url: 'ENDPOINT',
    user: 'USERNAME',
    password: 'PASSWORD'
};
var provider = new ethers.providers.JsonRpcProvider(urlInfo, NETWORK_ID);
```

</template>
</CodeSwitcher>

where

* ENDPOINT — your node HTTPS endpoint.
* USERNAME — your node access username.
* PASSWORD — your node access password.
* NETWORK_ID — Fantom network ID:
  * Mainnet: `250`
  * Testnet: `4002`

Example to get the latest block number on mainnet:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` js
const { ethers } = require("ethers");

var urlInfo = {
    url: 'https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d'
};
var provider = new ethers.providers.JsonRpcProvider(urlInfo, 250);

provider.getBlockNumber().then(console.log);
```

</template>
<template v-slot:pp>

``` js
const { ethers } = require("ethers");

var urlInfo = {
    url: 'https://nd-123-456-789.p2pify.com',
    user: 'user-name',
    password: 'pass-word-pass-word-pass-word'
};
var provider = new ethers.providers.JsonRpcProvider(urlInfo, 250);

provider.getBlockNumber().then(console.log);
```

</template>
</CodeSwitcher>

#### WebSocket

Use the `WebSocketProvider` object to connect to your node WSS endpoint.

``` js
const { ethers } = require("ethers");

const provider = new ethers.providers.WebSocketProvider('ENDPOINT', NETWORK_ID);
```

where

* ENDPOINT — your node WSS endpoint.
* NETWORK_ID — Fantom network ID:
  * Mainnet: `250`
  * Testnet: `4002`

Example to get the latest block number on mainnet:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` js
const { ethers } = require("ethers");

const provider = new ethers.providers.WebSocketProvider('wss://ws-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d', 250);

provider.getBlockNumber().then(console.log);
```

</template>
<template v-slot:pp>

``` js
const { ethers } = require("ethers");

const provider = new ethers.providers.WebSocketProvider('wss://user-name:pass-word-pass-word-pass-word@ws-nd-123-456-789.p2pify.com', 250);

provider.getBlockNumber().then(console.log);
```

</template>
</CodeSwitcher>

### Brownie

1. Install [Brownie](https://eth-brownie.readthedocs.io/en/stable/install.html).
1. Use the `brownie networks add` command with the node endpoint:

``` sh
brownie networks add Fantom ID name="NETWORK_NAME" host=KEY_ENDPOINT chainid=NETWORK_ID
```

where

* ID — any name that you will use as the network tag to run a deployment. For example, `chainstack-mainnet`.
* NETWORK_NAME — any name that you want to identify the network by in the list of networks. For example, **Mainnet (Chainstack)**.
* ENDPOINT — your node HTTPS or WSS endpoint.
* NETWORK_ID — Fantom network ID:
  * Mainnet: `250`
  * Testnet: `4002`

Example to add a Fantom mainnet node to the list of Brownie networks:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` sh
brownie networks add Fantom fantom-mainnet name="Mainnet (Chainstack)" host=https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d chainid=250
```

</template>
<template v-slot:pp>

``` sh
brownie networks add Fantom fantom-mainnet name="Mainnet (Chainstack)" host=https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com chainid=250
```

</template>
</CodeSwitcher>

Example to run the deployment script:

``` sh
brownie run deploy.py --network fanton-mainnet
```

### Foundry

1. Install [Foundry](https://github.com/gakonst/foundry/).
1. Use `--rpc-url` to run the operation through your Chainstack node.

#### Forge

Use [forge](https://github.com/gakonst/foundry/tree/master/forge) to develop, test, and deploy your smart contracts.

To deploy a contract:

``` sh
forge create CONTRACT_NAME --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url ENDPOINT
```

where

* CONTRACT_NAME — name of the contract in the Solidity source code.
* CONTRACT_PATH — path to your smart contract.
* PRIVATE_KEY — the private key to your funded account that you will use to deploy the contract.
* ENDPOINT — your node HTTPS endpoint.

Example to deploy the [simple storage](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html) contract:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` sh
forge create SimpleStorage --contracts /root/foundry/contracts/simplestorage.sol --private-key 9c4b7f4ad48f977dbcdb2323249fd738cc9ff283a7514f3350d344e22c5b923d --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

</template>
<template v-slot:pp>

``` sh
forge create --contracts /root/foundry/contracts/simplestorage.sol --rpc-url https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com
```

</template>
</CodeSwitcher>

#### Cast

Use [cast](https://github.com/gakonst/foundry/tree/master/cast) to interact with the network and the deployed contracts.

To get the latest block number:

``` sh
cast block-number --rpc-url ENDPOINT
```

where ENDPOINT is your node HTTPS endpoint.

Example:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` sh
cast block-number --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

</template>
<template v-slot:pp>

``` sh
cast block-number --rpc-url https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com
```

</template>
</CodeSwitcher>

::: tip See also

* [ERC-721 collection contract with Truffle and OpenZeppelin](/tutorials/fantom/erc-721-collection-contract-with-truffle-and-openzeppelin#prerequisites)

:::
