---
meta:
  - name: description
    content: getBalance JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana
---

# getBalance

Solana API method that returns the balance of the account of the provided public key.

**Parameters:**

* `address` — the public key of the account to query as a base-58 encoded string.

**Returns:**

* `quantity` — the integer value of the current balance in [lamports](https://docs.solana.com/introduction#what-are-sols).

**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { PublicKey, Connection } from "@solana/web3.js"

const nodeUrl = "CHAINSTACK_NODE_URL"
const publicKey = new PublicKey(
  "HSH3LftAhgNEQmpNRuE1ghnbqVHsxt8edvid1zdLxH5C"
);

(async () => {  
  const connect = new Connection(nodeUrl);
  console.log(await connect.getBalance(publicKey))
})()
```

</template>
<template v-slot:py>

``` py
from solana.rpc.api import Client
from solana.publickey import PublicKey

web3 = Client('CHAINSTACK_NODE_URL')

print(web3.get_balance(PublicKey('HSH3LftAhgNEQmpNRuE1ghnbqVHsxt8edvid1zdLxH5C')))
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0", "id":1, "method":"getBalance", "params":["HSH3LftAhgNEQmpNRuE1ghnbqVHsxt8edvid1zdLxH5C"]}'
```

</template>
</CodeSwitcher>
