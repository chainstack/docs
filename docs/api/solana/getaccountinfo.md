---
meta:
  - name: description
    content: getAccountInfo JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana 
---

# getAccountInfo

Solana API method that returns all information associated with the account of the provided Pubkey. 

**Parameters:** 

* `address` - Pubkey of the account to query, as base-58 encoded string.

**Returns:** 

* `JSON object` 
  * `<null>`, if the requested account doesn't exist.
  *  `<object>`, a JSON object containing:
      * `lamports: <u64>`, number of lamports assigned to this account, as a u64.
      * `owner: <string>`, base-58 encoded Pubkey of the program this account has been assigned to.
      * `data: <[string, encoding]|object>`, data associated with the account, either as encoded binary data or JSON format `{<program>: <state>}`, depending on encoding parameter.
      * `executable: <bool>`, boolean indicating if the account contains a program (and is strictly read-only).
      * `rentEpoch: <u64>`, the epoch at which this account will next owe rent, as u64.

**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { PublicKey, Connection } from "@solana/web3.js"

const nodeUrl = "CHAINSTACK_NODE_URL"
const publicKey = new PublicKey(
    'HSH3LftAhgNEQmpNRuE1ghnbqVHsxt8edvid1zdLxH5C'
  )

(async () => {  
  const connect = new Connection(nodeUrl);
  console.log(await connect.getAccountInfo(publicKey))
})()
```

</template>
<template v-slot:py>

``` py
from solana.rpc.api import Client
from solana.publickey import PublicKey

web3 = Client('CHAINSTACK_NODE_URL')

print(web3.get_account_info(PublicKey('HSH3LftAhgNEQmpNRuE1ghnbqVHsxt8edvid1zdLxH5C')))
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0", "id":1, "method":"getAccountInfo", "params":["HSH3LftAhgNEQmpNRuE1ghnbqVHsxt8edvid1zdLxH5C"]}'
```

</template>
</CodeSwitcher>