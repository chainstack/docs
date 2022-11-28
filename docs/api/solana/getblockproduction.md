---
meta:
  - name: description
    content: getBlockProduction JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana
---

# getBlockProduction

Solana API method that returns the recent block production information from the current or previous epoch.

**Parameters:**

* `<object>` — (optional) the configuration object containing the following optional fields:
  * `commitment: <string>` — (optional) the commitment.
  * `range: <object>` — (optional) the slot range to return block production for. If the parameter is not provided, defaults to current epoch.
    * `firstSlot: <u64>` — the first slot to return block production information for (inclusive).
    * `lastSlot: <u64>` — (optional) the last slot to return block production information for (inclusive). If the parameter is not provided, defaults to the highest slot.
  * `identity: <string>` — (optional) only return results for this validator identity (base-58 encoded).

**Returns:**

* `<object>`
  * `byIdentity: <object>` — a dictionary of validator identities, as base-58 encoded strings. Value is a two element array containing the number of leader slots and the number of blocks produced.
  * `range: <object>` — the block production slot range.
    * `firstSlot: <u64>` —  the first slot of the block production information (inclusive).
    * `lastSlot: <u64>` — the last slot of block production information (inclusive).

**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { Connection } from "@solana/web3.js";

const nodeUrl = "CHAINSTACK_NODE_URL"
const connect = new Connection(nodeUrl);

(async () => {  
  console.log(await connect.getBlockProduction());
})();
```

</template>
<template v-slot:py>

``` py
# This method is not available in Solana.py
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","id":1, "method":"getBlockProduction", "params" : []}'
```

</template>
</CodeSwitcher>
