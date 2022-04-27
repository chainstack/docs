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

::: tip See also

* [An NFT contract with Nile and L1 <-> L2 reputation points messaging](/tutorials/starknet/nft-contract-with-nile-and-l1-l2-reputation-messaging)

:::
