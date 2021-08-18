---
meta:
  - name: description
    content: Learn how to interact with your Tezos node, originate smart contracts through your node, and develop dapps.
  - name: keywords
    content: tezos taquito web3 dapp temple wallet client smartpy
---

# Tools

## Tezos client

1. Install the Tezos client. See [Tezos Client Installation and Setup](https://assets.tqtezos.com/docs/setup/1-tezos-client/).
2. Connect the Tezos client to the Chainstack-deployed Tezos node:

``` sh
tezos-client --endpoint ENDPOINT config update
```

where

* ENDPOINT — your node HTTPS endpoint.

See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` sh
tezos-client --endpoint https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d config update
```

</template>
<template v-slot:pp>

``` sh
tezos-client --endpoint https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com config update
```

</template>
</CodeSwitcher>

3. Run the Tezos [client commands](https://tezos.gitlab.io/shell/cli-commands.html).

Example to get the balance of an address in tez:

``` sh
$ tezos-client get balance for tz1bEQQxao8bEbvuXgh8vnSQkPJaoUvyomMP
11475.954247 ꜩ
```

## Taquito

1. Install Taquito. See [Quick Start](https://tezostaquito.io/docs/quick_start).
1. Use `RpcClient` to connect to your Tezos node:

``` js
const { RpcClient } = require('@taquito/rpc');

async function main() {
  const client = new RpcClient('ENDPOINT');
  await client.getBlock().then((data) => {
    console.log('-- Chain ID: ', data.chain_id);
    console.log('-- Head block: ', data);
  }).catch((error) => console.log(JSON.stringify(error, null, 2)));

}
```

where

* ENDPOINT — your node HTTPS endpoint.

See [View node access and credentials](/platform/view-node-access-and-credentials).

Example to get the latest block information:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` js
const { RpcClient } = require('@taquito/rpc');

async function main() {
  const client = new RpcClient('https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d');
  await client.getBlock().then((data) => {
    console.log('-- Chain ID: ', data.chain_id);
    console.log('-- Head block: ', data);
  }).catch((error) => console.log(JSON.stringify(error, null, 2)));

}
```

</template>
<template v-slot:pp>

``` js
const { RpcClient } = require('@taquito/rpc');

async function main() {
  const client = new RpcClient('https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com');
  await client.getBlock().then((data) => {
    console.log('-- Chain ID: ', data.chain_id);
    console.log('-- Head block: ', data);
  }).catch((error) => console.log(JSON.stringify(error, null, 2)));

}
```

</template>
</CodeSwitcher>

## Temple wallet

1. Install the [Temple wallet](https://templewallet.com/).
1. In the wallet, click **Settings** > **Networks**.
1. Under **Add network**, in the **RPC base URL** field, provide your Tezos node endpoint.

See also [View node access and credentials](/platform/view-node-access-and-credentials).

## SmartPy

1. Install [SmartPy](https://docs.smartpy.io/introduction/start_project).
1. Originate your contract through a Chainstack-deployed Tezos node:

``` sh
SmartPy.sh originate-contract --code CONTRACT --storage STORAGE --rpc ENDPOINT
```

where

* ENDPOINT — your node HTTPS endpoint.
* CONTRACT — your compiled contract.
* STORAGE — your compiled contract storage.

Example:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` sh
SmartPy.sh originate-contract --code contract.tz --storage storage.tz --rpc https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531
```

</template>
<template v-slot:pp>

``` js
SmartPy.sh originate-contract --code contract.tz --storage storage.tz --rpc https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com
```

</template>
</CodeSwitcher>

::: tip See also

* [A simple fund contract in LIGO](/tutorials/tezos/simple-fund-contract-in-ligo)

:::
