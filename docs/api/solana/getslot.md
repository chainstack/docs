---
meta:
  - name: description
    content: getSlot JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana
---

# getSlot

Solana API method that returns the slot that has reached the [given or default commitment level](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).

**Parameters:**

* `<object>` — (optional) the configuration object containing the following fields:
    * `commitment: <string>` — (optional) the commitment.
    * `minContextSlot: <number>` — (optional) the minimum slot that the request can be evaluated at.

**Returns:**

* `u64` — the current slot.

**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { Connection } from "@solana/web3.js"

const nodeUrl = "CHAINSTACK_NODE_URL"
const connect = new Connection(nodeUrl);

(async () => {  
  console.log(await connect.getSlot());
})();
```

</template>
<template v-slot:py>

``` py
from solana.rpc.api import Client

web3 = Client('CHAINSTACK_NODE_URL')

print(web3.get_slot())
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","id":1, "method":"getSlot", "params" : []}'
```

</template>
</CodeSwitcher>
