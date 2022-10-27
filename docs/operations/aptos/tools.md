---
meta:
  - name: description
    content: Learn how to interact with your Aptos node.
  - name: keywords
    content: aptos api restful
---

# Tools

## Interaction tools

### REST API
​
Interact with your Aptos node using the [Aptos Node API](https://fullnode.devnet.aptoslabs.com/v1/spec#/).
​
Use your Chainstack Aptos REST endpoint.
​
```sh
https://nd-981-674-322.int.chainstack.com/v1/blocks/by_height/{block_height}
```
​
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

* [Dutch auction smart contracts on Cronos with Hardhat](/tutorials/aptos/)

:::
