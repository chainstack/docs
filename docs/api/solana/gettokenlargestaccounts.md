---
meta:
  - name: description
    content: getTokenLargestAccounts JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana
---

# getTokenLargestAccounts

::: tip Information

This method is currently disabled for elastic Solana devnet nodes.

:::

Solana API method that returns the 20 largest accounts of a particular SPL token type.

**Parameters:**

* `<string>` — the public key of the NFT collection, as a base58 encoded string.
* `<object>` — (optional) configuration object containing the following field:
  * `commitment: <string>` — (optional) commitment.

**Returns:**

The result will be an RPC response JSON object with `value` equal to an array of JSON objects, which will contain:

* `address: <string>` — the address of the token account.
* `amount: <string>` — the raw token account balance without decimals, a string representation of u64.
* `decimals: <u8>` — number of base 10 digits to the right of the decimal place.
* `uiAmount: <number|null>` — the token account balance, using mint-prescribed decimals.
* `uiAmountString: <string>` — the token account balance as a string, using mint-prescribed decimals.

**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { Connection } from "@solana/web3.js"

const nodeUrl = "CHAINSTACK_NODE_URL"
const connect = new Connection(nodeUrl);

(async () => {
  const MINT_ADDRESS = new PublicKey("Duch2MmgCar9UGt76smK5HcJ7anBRa31uNZZvNJt3b5S");
  const connection = new Connection(nodeUrl);

  const accounts = connection.getTokenLargestAccounts(MINT_ADDRESS)
  console.log(await accounts)
})();
```

</template>
<template v-slot:py>

``` py
from solana.rpc.api import Client

web3 = Client('CHAINSTACK_NODE_URL')

print(web3.get_token_largest_accounts("Duch2MmgCar9UGt76smK5HcJ7anBRa31uNZZvNJt3b5S"))
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0", "id":1, "method":"getTokenLargestAccounts", "params": ["Duch2MmgCar9UGt76smK5HcJ7anBRa31uNZZvNJt3b5S"]}'
```

</template>
</CodeSwitcher>
