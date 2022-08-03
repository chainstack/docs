---
meta:
  - name: description
    content: Learn how to interact with your NEAR node and develop dapps.
  - name: keywords
    content: near api dapp cli javascript
---

# Tools

## NEAR CLI

1. Install the [NEAR CLI](https://docs.near.org/tools/near-cli).
2. Use the `--node_url` flag to operate through your Chainstack-deployed NEAR node:

``` sh
near COMMAND --node_url ENDPOINT
```

where

* COMMAND — a supported [NEAR CLI](https://docs.near.org/tools/near-cli) command.
* ENDPOINT — your node HTTPS endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).

Example to get account balance:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` sh
near state example.near --node_url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

</template>
<template v-slot:pp>

``` sh
near state example.near --node_url https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com
```

</template>
</CodeSwitcher>

## JSON-RPC API

Interact with your NEAR node using [JSON-RPC API](https://docs.near.org/api/rpc/introduction).

Use [curl](https://curl.haxx.se) or [Postman](https://www.getpostman.com).

Example to get the latest block:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` sh
curl -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": "1", "method": "block", "params": {"finality": "final"}}' \
  https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

</template>
<template v-slot:pp>

``` sh
curl -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": "1", "method": "block", "params": {"finality": "final"}}' \
  https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com
```

</template>
</CodeSwitcher>

## near-api-js

1. Install [near-api-js](https://docs.near.org/tools/near-api-js/quick-reference).
1. Use `JsonRpcProvider` to connect to your NEAR node.

``` js
const nearAPI = require("near-api-js");
const connectionInfo = {
    url: "ENDPOINT"
};
const provider = new nearAPI.providers.JsonRpcProvider(connectionInfo);
async function main() {
    const response = await provider.block({
        finality: "final",
    });
    console.log(response)
}
main();
```

where ENDPOINT is your node HTTPS endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).

Example to get the latest block:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` js
const nearAPI = require("near-api-js");
const connectionInfo = {
    url: "https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d"
};
const provider = new nearAPI.providers.JsonRpcProvider(connectionInfo);
async function main() {
    const response = await provider.block({
        finality: "final",
    });
    console.log(response)
}
main();
```

</template>
<template v-slot:pp>

``` js
const nearAPI = require("near-api-js");
const connectionInfo = {
    url: "https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com"
};
const provider = new nearAPI.providers.JsonRpcProvider(connectionInfo);
async function main() {
    const response = await provider.block({
        finality: "final",
    });
    console.log(response)
}
main();
```

</template>
</CodeSwitcher>

::: tip See also

* [Creating and upgrading a simple message contract](/tutorials/near/creating-and-upgrading-a-simple-message-contract)

:::
