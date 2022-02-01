---
meta:
  - name: description
    content: Learn how to interact with your Solana node and develop dapps.
  - name: keywords
    content: solana web3 python dapp client cli
---

# Tools

## Solana tool suite

1. Install the Solana tool suite. See [Install the Solana Tool Suite](https://docs.solana.com/cli/install-solana-cli-tools).
2. Connect the Solana tool suite to the Chainstack-deployed Solana node:

``` sh
solana config set --url ENDPOINT
```

where

* ENDPOINT — your node HTTPS endpoint.

See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` sh
solana config set --url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

</template>
<template v-slot:pp>

``` sh
solana config set --url https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com
```

</template>
</CodeSwitcher>

3. Run the Solana [client commands](https://docs.solana.com/cli).

Example to get the block height:

``` sh
$ solana block-height
106318062
```
## JSON-RPC API

Interact with your Solana network using [JSON-RPC API](https://docs.solana.com/developing/clients/jsonrpc-api).

Use [curl](https://curl.haxx.se) or [Postman](https://www.getpostman.com).

Example to get account balance:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` sh
curl -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getBalance","params":["23dQfKhhsZ9RA5AAn12KGk21MB784PmTB3gfKRwdBNHr"],"id":1}' \
  https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

</template>
<template v-slot:pp>

``` sh
curl -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getBalance","params":["23dQfKhhsZ9RA5AAn12KGk21MB784PmTB3gfKRwdBNHr"],"id":1}' \
  https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com
```

</template>
</CodeSwitcher>

## Solana web3.js

1. Install Solana web3.js. See [Solana web3.js guide](https://docs.solana.com/developing/clients/javascript-api).
1. Use `Connection` to connect to your Solana node:

``` js
const web3 = require("@solana/web3.js");
(async () => {
  const connect = new web3.Connection('ENDPOINT');
  console.log(await connect.getSlot());
})();
```

where ENDPOINT is your node HTTPS endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).

Example to get account balance:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` js
const web3 = require("@solana/web3.js");
(async () => {
  const publicKey = new web3.PublicKey(
    '23dQfKhhsZ9RA5AAn12KGk21MB784PmTB3gfKRwdBNHr'
  );
  const connect = new web3.Connection('https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d');
  console.log(await connect.getBalance(publicKey));
})();
```

</template>
<template v-slot:pp>

``` js
const web3 = require("@solana/web3.js");
(async () => {
  const publicKey = new web3.PublicKey(
    '23dQfKhhsZ9RA5AAn12KGk21MB784PmTB3gfKRwdBNHr'
  );
  const connect = new web3.Connection('https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com');
  console.log(await connect.getBalance(publicKey));
})();
```

</template>
</CodeSwitcher>

## Solana.py

1. Install [Solana.py](https://github.com/michaelhly/solana-py).
1. Use `Client` to connect to your Solana node:

``` py
from solana.rpc.api import Client
client = Client('ENDPOINT')
print(client.get_slot())
```

where ENDPOINT is your node HTTPS endpoint.

Example to get account balance:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` py
from solana.rpc.api import Client
from solana.publickey import PublicKey
client = Client('https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531')
print(client.get_balance(PublicKey('23dQfKhhsZ9RA5AAn12KGk21MB784PmTB3gfKRwdBNHr')))
```

</template>
<template v-slot:pp>

``` py
from solana.rpc.api import Client
from solana.publickey import PublicKey
client = Client('https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com')
print(client.get_balance(PublicKey('23dQfKhhsZ9RA5AAn12KGk21MB784PmTB3gfKRwdBNHr')))
```

</template>
</CodeSwitcher>

::: tip See also

* [Creating a token and vesting the token in your program](/tutorials/solana/creating-a-token-and-vesting-the-token-in-your-program)

:::
