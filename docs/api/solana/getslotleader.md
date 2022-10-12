---
meta:
  - name: description
    content: getSlotLeader JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana 
---

# getSlotLeader

Solana API method that returns the current slot leader. 

**Parameters:** 

* `(optional) <object>` — the configuration object containing the following fields:
    * `(optional) commitment: <string>` — the commitment.
    * `(optional) minContextSlot: <number>` — the minimum slot that the request can be evaluated at.

**Returns:** 

* `string` —  the node identity public key as base-58 encoded string.

**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { Connection } from "@solana/web3.js"

const nodeUrl = "CHAINSTACK_NODE_URL"
const connect = new Connection(nodeUrl);

(async () => {  
  console.log(await connect.getSlotLeader());
})();
```

</template>
<template v-slot:py>

``` py
from solana.rpc.api import Client

web3 = Client('CHAINSTACK_NODE_URL')

print(web3.get_slot_leader())
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","id":1, "method":"getSlotLeader", "params" : []}'
```

</template>
</CodeSwitcher>