---
meta:
  - name: description
    content: Learn how to interact with your StarkNet node.
  - name: keywords
    content: starknet none pathfinder
---

# Tools

Chainstack runs the [Pathfinder](https://github.com/eqlabs/pathfinder) StarkNet client.

Pathfinder currently supports querying the StarkNet network for state.

For the full list of available queries, see [Pathfinder API](https://github.com/eqlabs/pathfinder#api).

## JSON-RPC API

Use [curl](https://curl.haxx.se) or [Postman](https://www.getpostman.com).

```sh
curl -X POST -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","id":"0","method":"METHOD","params":[PARAMS]}' ENDPOINT
```

where

* METHOD — a supported JSON-RPC API method.
* PARAMS — request parameters if any.
* ENDPOINT — your node HTTPS endpoint.

Example to get the latest block:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` sh
curl -X POST -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","id":"0","method":"starknet_blockNumber","params":[]}' https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

</template>
<template v-slot:pp>

``` sh
curl -X POST -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","id":"0","method":"starknet_blockNumber","params":[]}' https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com
```

</template>
</CodeSwitcher>

## StarkNet.js

1. Install StarkNet.js. See [StarkNet.js guide](https://www.starknetjs.com/guides/intro).
1. Use `RpcProvider` to connect to your StarkNet node:

``` js
import { RpcProvider } from 'starknet';

const provider = new RpcProvider({
  nodeUrl: 'ENDPOINT',
})
```

where ENDPOINT is your node HTTPS endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).

Example to get the latest block:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` js
import { RpcProvider } from 'starknet';
const provider = new RpcProvider({
  nodeUrl: 'https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d',
})
provider.getBlockNumber().then(console.log);
```

</template>
<template v-slot:pp>

``` js
import { RpcProvider } from 'starknet';
const provider = new RpcProvider({
  nodeUrl: 'https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com',
})
provider.getBlockNumber().then(console.log);
```
</template>
</CodeSwitcher>

## StarkNet.py

1. Install StarkNet.py. See [StarkNet.py guide](https://starknetpy.readthedocs.io/en/latest/installation.html).
1. Use `FullNodeClient` to connect to your StarkNet node:

``` py
from starknet_py.net.full_node_client import FullNodeClient

from starknet_py.net.networks import MAINNET

node_url = "ENDPOINT"
full_node_client = FullNodeClient(node_url=node_url, net=MAINNET)
```

where ENDPOINT is your node HTTPS endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).

Example to retrieve a transaction by hash:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` js
from starknet_py.net.full_node_client import FullNodeClient

from starknet_py.net.networks import MAINNET

node_url = "https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d"
full_node_client = FullNodeClient(node_url=node_url, net=MAINNET)

call_result = full_node_client.get_transaction_sync(tx_hash="0x50c1941ab13ccc5d9785ceda1d0d7a47be01865eecb795a62f4e589ddca0258")

print(call_result)
```

</template>
<template v-slot:pp>

``` js
from starknet_py.net.full_node_client import FullNodeClient

from starknet_py.net.networks import MAINNET

node_url = "https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com"
full_node_client = FullNodeClient(node_url=node_url, net=MAINNET)

call_result = full_node_client.get_transaction_sync(tx_hash="0x50c1941ab13ccc5d9785ceda1d0d7a47be01865eecb795a62f4e589ddca0258")

print(call_result)
```
</template>
</CodeSwitcher>

::: tip See also

* [An NFT contract with Nile and L1 <-> L2 reputation points messaging](/tutorials/starknet/nft-contract-with-nile-and-l1-l2-reputation-messaging)

:::
