---
meta:
  - name: description
    content: getLatestBlockhash JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana 
---

# getLatestBlockhash

Solana API method that returns the latest blockhash. 

::: tip

This method is only available in solana-core v1.9 or newer. Please use [getRecentBlockhash](https://docs.solana.com/developing/clients/jsonrpc-api#getrecentblockhash) for solana-core v1.8

Chainstack runs v1.10.

:::

**Parameters:** 

* `(optional) <object>` — the configuration object containing the following fields:
    * `(optional) commitment: <string>` — the commitment used for retrieving blockhash.
    * `(optional) minContextSlot: <number>` — the minimum slot that the request can be evaluated at.

**Returns:** 

* `RpcResponse <object>` — the RpcResponse JSON object with value field set to a JSON object including:
* `blockhash: <string>` — a Hash as base-58 encoded string.
* `lastValidBlockHeight: <u64>` — the last block height at which the blockhash will be valid.
      
**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { Connection } from "@solana/web3.js";

const nodeUrl = "CHAINSTACK_NODE_URL"
const connect = new Connection(nodeUrl);

(async () => {  
  console.log(await connect.getLatestBlockhash());
})();
```

</template>
<template v-slot:py>

``` py
from solana.rpc.api import Client

web3 = Client("CHAINSTACK_NODE_URL")

print(web3.get_latest_blockhash())
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","id":1, "method":"getLatestBlockhash", "params" : []}'
```

</template>
</CodeSwitcher>