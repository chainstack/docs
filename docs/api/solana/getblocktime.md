---
meta:
  - name: description
    content: getBlockTime JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana 
---

# getBlockTime

Solana API method that returns the estimated production time of a block. 

::: tip

Each validator regularly reports its UTC time to the ledger by intermittently adding a timestamp to a Vote for a particular block. A requested block's time is calculated from the stake-weighted mean of the Vote timestamps in a set of recent blocks recorded on the ledger.

:::

**Parameters:** 

* `<u64>` - block, identified by Slot.

**Returns:** 

* `<i64>` - Estimated production time, as a Unix timestamp (seconds since the [Unix epoch](https://www.unixtimestamp.com/)).
* `<null>` - If the timestamp is not available for this block.

**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { PublicKey, Connection } from "@solana/web3.js"

const nodeUrl = "CHAINSTACK_NODE_URL"
const connect = new Connection(nodeUrl);

(async () => {  
  console.log(await connect.getBlockTime(151696557));
})();
```

</template>
<template v-slot:py>

``` py
from solana.rpc.api import Client

web3 = Client('CHAINSTACK_NODE_URL')

print(web3.get_block_time(151696557))
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","id":1, "method":"getBlockTime", "params" : [151696557]}'
```

</template>
</CodeSwitcher>