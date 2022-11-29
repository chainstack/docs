---
meta:
  - name: description
    content: getIdentity JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana
---

# getIdentity

Solana API method that returns the identity public key for the current node.

**Parameters:**

* `none`

**Returns:**

* `identity` — the public key of the current node as a base58 encoded string.

**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
// This method is not supported in Solana web3.js
```

</template>
<template v-slot:py>

``` py
from solana.rpc.api import Client

web3 = Client("CHAINSTACK_NODE_URL")

print(web3.get_identity())
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","id":1, "method":"getIdentity", "params" : []}'
```

</template>
</CodeSwitcher>
