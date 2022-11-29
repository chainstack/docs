---
meta:
  - name: description
    content: getHealth JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana
---

# getHealth

Solana API method that returns the current health of the node.

If one or more `--known-validator` arguments are provided to `solana-validator`, `ok` is returned if the node is in sync with the validator. Otherwise, an error is returned.

`ok` is always returned if no known validators are provided.

**Parameters:**

* `none`

**Returns:**

* `response` — if the node is healthy, `ok`. If the node is unhealthy, a JSON RPC error response is returned. The specifics of the error response are UNSTABLE and may change in the future.

**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
// This method is not supported in Solana web3.js
```

</template>
<template v-slot:py>

``` py
# This method is not supported in Solana solana.py
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","id":1, "method":"getHealth", "params" : []}'
```

</template>
</CodeSwitcher>
