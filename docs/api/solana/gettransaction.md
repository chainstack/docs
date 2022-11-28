---
meta:
  - name: description
    content: getTransaction JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana
---

# getTransaction

Solana API method that returns the transaction details for a confirmed transaction.

**Parameters:**

* `<string>` — the transaction signature as a base-58 encoded string.
  * `<object>` — (optional) the configuration object containing the following optional fields:
    * `encoding: <string>` — (optional) the encoding for each returned transaction, either `json`, `jsonParsed`, `base58` (slow), `base64`. If the parameter is not provided, the default encoding is `json`. `jsonParsed` encoding attempts to use program-specific instruction parsers to return more human-readable and explicit data in the transaction.message.instructions list. If `jsonParsed` is requested, but a parser cannot be found, the instruction falls back to standard JSON encoding (accounts, data, and programIdIndex fields).
    * `commitment: <string>` — (optional) the commitment; `processed` is not supported. If the parameter is not provided, the default is `finalized`.
    * `maxSupportedTransactionVersion: <number>` — (optional) the max transaction version to return in responses. An error will be returned if the requested transaction is a higher version. Only legacy transactions will be returned if this parameter is omitted, and any versioned transaction will prompt the error.

**Returns:**

The result will be an RPC response JSON object with `value` equal to one of the following:

* `<null>` — if the transaction is not found or not confirmed.
* `<object>` — if the transaction is confirmed, an object with the following fields:
  * `slot: <u64>` — the slot this transaction was processed in.
  * `transaction: <object|[string,encoding]>` — the transaction object, either in JSON format or encoded binary data, depending on encoding parameter.
  * `blockTime: <i64 | null>` — the estimated production time, as a Unix timestamp, seconds since the Unix epoch, of the transaction's processing. `null` if not available.


**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { Connection } from "@solana/web3.js";

const nodeUrl = "CHAINSTACK_NODE_URL"
const connect = new Connection(nodeUrl);

(async () => {  
  console.log(await connect.getTransaction("2diYRKwieGhX4NECxXHXRMjE2Dnu7FBDiaQXtm5ZAhoJmPVfJ1VjeRnKeEuSvudN9vn7NvXReqQ7trUfzPSAAhSj"));
})();
```

</template>
<template v-slot:py>

``` py
from solana.rpc.api import Client

web3 = Client("CHAINSTACK_NODE_URL")

print(web3.get_transaction("2diYRKwieGhX4NECxXHXRMjE2Dnu7FBDiaQXtm5ZAhoJmPVfJ1VjeRnKeEuSvudN9vn7NvXReqQ7trUfzPSAAhSj"))
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0", "id":1, "method":"getTransaction", "params":["2diYRKwieGhX4NECxXHXRMjE2Dnu7FBDiaQXtm5ZAhoJmPVfJ1VjeRnKeEuSvudN9vn7NvXReqQ7trUfzPSAAhSj"]}'
```

</template>
</CodeSwitcher>
