---
meta:
  - name: description
    content: getEpochInfo JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana 
---

# getEpochInfo

Solana API method that returns information about the current epoch. 

**Parameters:** 

* `(optional) <object>` - Configuration object containing the following fields:
  * `(optional) commitment: <string>` - Commitment
  * `(optional) minContextSlot: <number>` - set the minimum slot that the request can be evaluated at.

**Returns:** 

* `absoluteSlot: <u64>`, the current slot
* `blockHeight: <u64>`, the current block height
* `epoch: <u64>`, the current epoch
* `slotIndex: <u64>`, the current slot relative to the start of the current epoch
* `slotsInEpoch: <u64>`, the number of slots in this epoch
* `transactionCount: <u64 | null>`, total number of transactions processed without error since genesis

**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { PublicKey, Connection } from "@solana/web3.js"

const nodeUrl = "CHAINSTACK_NODE_URL"
const connect = new Connection(nodeUrl);

(async () => {  
  console.log(await connect.getEpochInfo());
})();
```

</template>
<template v-slot:py>

``` py
from solana.rpc.api import Client

web3 = Client('CHAINSTACK_NODE_URL')

print(web3.get_epoch_info())
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","id":1, "method":"getEpochInfo", "params" : []}'
```

</template>
</CodeSwitcher>