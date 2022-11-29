---
meta:
  - name: description
    content: getMultipleAccounts JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana
---

# getMultipleAccounts

::: tip Information

This method is currently disabled for elastic Solana devnet nodes.

:::

Solana API method that returns the account information for a list of public keys.

**Parameters:**

* `<array>` — an array of public keys to query, as base-58 encoded strings (up to a maximum of 100).
* `<object>` — (optional) configuration object containing the following fields:
  * `commitment: <string>` — (optional) commitment.
  * `encoding: <string>` — (optional) encoding type for account data, either `base58` (slow), `base64`, `base64+zstd`, or `jsonParsed`. `base58` is limited to account data of less than 128 bytes. `base64` will return base64 encoded data for account data of any size. `base64+zstd` compresses the account data using Zstandard and base64 encodes the result. `jsonParsed` encoding attempts to use program-specific state parsers to return more human-readable and explicit account state data. If `jsonParsed` is requested, but a parser cannot be found, the field falls back to base64 encoding, detectable when the data field is `<string>` type.
  * `dataSlice: <object>` — (optional) limit the returned account data using the provided `offset: <usize>` and `length: <usize>` fields; only available for base58, base64, or base64+zstd encodings.
  * `minContextSlot: <number>` — (optional) set the minimum slot to evaluate the request.

**Returns:**

The result will be an RPC response JSON object with `value` equal to one of the following:

* `<null>` — if the account at that public key doesn't exist.
* `<object>` — an object containing:
  * `data: <[string, encoding]|object>` — data associated with the account, either as encoded binary data or JSON format {<program>: <state>}, depending on the encoding parameter.
  * `executable: <bool>` — boolean indicating if the account contains a program (and is strictly read-only).
  * `lamports: <u64>` — number of lamports assigned to this account, as u64.
  * `owner: <string>` — the base-58 encoded public key of the program to which this account has been assigned.
  * `rentEpoch: <u64>` — the epoch at which this account will next owe rent, as u64.

**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { Connection } from "@solana/web3.js"

const nodeUrl = "CHAINSTACK_NODE_URL"
const connect = new Connection(nodeUrl);

(async () => {
  const key1 = new PublicKey("55xvpq6EdnjQZaRvz43NsXnTrT4kjYuszwKQZnbkpegA");
  const key2 = new PublicKey("48JJ65oBTPJk7fAT7wQXpDsGK6koBAZXdCn4C5s3A9MC");
  const key3 = new PublicKey("A443JrZHBGqoWyzgXcXnMBQBsQMXY2vqx4KgY4xaMgv2");

  const connection = new Connection(nodeUrl);

  console.log(await connection.getMultipleAccountsInfo([key1, key2, key3]));
})();
```

</template>
<template v-slot:py>

``` py
from solana.rpc.api import Client

web3 = Client('CHAINSTACK_NODE_URL')

pubkeys = [PublicKey("55xvpq6EdnjQZaRvz43NsXnTrT4kjYuszwKQZnbkpegA"), PublicKey("48JJ65oBTPJk7fAT7wQXpDsGK6koBAZXdCn4C5s3A9MC"),PublicKey("A443JrZHBGqoWyzgXcXnMBQBsQMXY2vqx4KgY4xaMgv2")]
print(web3.get_multiple_accounts(pubkeys))
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc": "2.0","id": 1,"method": "getMultipleAccounts","params": [["A443JrZHBGqoWyzgXcXnMBQBsQMXY2vqx4KgY4xaMgv2","48JJ65oBTPJk7fAT7wQXpDsGK6koBAZXdCn4C5s3A9MC", "48JJ65oBTPJk7fAT7wQXpDsGK6koBAZXdCn4C5s3A9MC"],{"dataSlice": {"offset": 0,"length": 0}}]}'
```

</template>
</CodeSwitcher>
