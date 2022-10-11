---
meta:
  - name: description
    content: getBlockHeight JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana 
---

# getBlockHeight

Solana API method that returns the current block height of the node. 

**Parameters:** 

* `(optional) <object>` — the configuration object containing the following fields:
    * `(optional) commitment: <string>` — the commitment.
    * `(optional) minContextSlot: <number>` — the minimum slot that the request can be evaluated at.

**Returns:** 

* `u64` — the current block height.
 
**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { Connection } from "@solana/web3.js";

const nodeUrl = "CHAINSTACK_NODE_URL"
const connect = new Connection(nodeUrl);

(async () => {  
  console.log(await connect.getBlockHeight());
})();
```

</template>
<template v-slot:py>

``` py
from solana.rpc.api import Client

web3 = Client("CHAINSTACK_NODE_URL")

print(web3.get_block_height())
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0", "id":1, "method":"getBlockHeight", "params":[]}'
```

</template>
</CodeSwitcher>