---
meta:
  - name: description
    content: getBlocks JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana 
---

# getBlocks

Solana API method that returns a list of confirmed blocks between two slots. 

::: tip

The maximum range allowed is 500,000 slots.

:::

**Parameters:** 

* `<u64>` - start_slot, as u64 integer.
  * `(optional) <u64>` - end_slot, as u64 integer (must be no more than 500,000 blocks higher than the start_slot).
  * `(optional) <object>` - Configuration object containing the following field:
    * `(optional) commitment: <string>` - Commitment; "processed" is not supported. If the parameter is not provided, the default is "finalized".

**Returns:** 

* `array` - The result field will be an array of u64 integers listing confirmed blocks between the `start_slot` and either `end_slot` if provided or the latest confirmed block, inclusive. 

**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { PublicKey, Connection } from "@solana/web3.js"

const nodeUrl = "CHAINSTACK_NODE_URL"
const connect = new Connection(nodeUrl);

(async () => {  
  console.log(await connect.getBlocks(151696557, 151696700));
})();
```

</template>
<template v-slot:py>

``` py
from solana.rpc.api import Client

web3 = Client('CHAINSTACK_NODE_URL')

print(web3.get_blocks(151696557, 151696700))
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","id":1, "method":"getBlocks", "params" : [151696557, 151696700]}'
```

</template>
</CodeSwitcher>