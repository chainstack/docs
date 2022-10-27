---
meta:
  - name: description
    content: Learn how to interact with your Aptos node.
  - name: keywords
    content: aptos api restful martian wallet
---

# Tools

## Interaction tools

### Martian wallet

You can set your [Martian wallet](https://martianwallet.xyz/) to interact through your Aptos nodes deployed with Chainstack.

1. Open your Martian wallet and click the network selector.
1. In the network selector, click **ADD CUSTOM NETWORK**.
1. In the **Enter Node Url** field, enter the endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).

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

1. In the **Enter Faucet Url** field, enter the [Aptos testnet faucet](https://aptoslabs.com/testnet-faucet) URL.​
1. Click **ADD NETWORK**.

See also [View node access and credentials](/platform/view-node-access-and-credentials).

### REST API

Interact with your Aptos node using the [Aptos Node API](https://fullnode.devnet.aptoslabs.com/v1/spec#/).

Use your Chainstack Aptos REST endpoint:

```sh
https://nd-981-674-322.int.chainstack.com/v1/blocks/by_height/{block_height}
```

Example to get block information by block height:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

```sh
curl --request GET \
  --url https://nd-981-674-322.int.chainstack.com/v1/blocks/by_height/2047048\
  --header 'Content-Type: application/json'
```

</template>
<template v-slot:pp>

```sh
curl --request GET \
  --url https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.int.chainstack.com/v1/blocks/by_height/2047048\
  --header 'Content-Type: application/json'
```

</template>
</CodeSwitcher>

::: tip See also

[Publish a module to save and retrieve a message on Aptos](/tutorials/aptos/)

:::
