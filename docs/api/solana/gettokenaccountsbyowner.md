---
meta:
  - name: description
    content: getTokenAccountsByOwner JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana
---

# getTokenAccountsByOwner

::: tip Information

This method is enabled for elastic Solana devnet nodes on US Ashburn (ash1) and Amsterdam (ams1) with a rate limit of 2 requests per second (RPS).

:::

Solana API method that returns all SPL token accounts by token owner.

**Parameters:**

* `<string>` — public key of the account owner to query, as a base58 encoded string.
* `<object>` — one of the following:
  * `mint: <string>` - the public key of the NFT collection, as a base58 encoded string.
  * `programId: <string>` — public key of the token program that owns the accounts, as a base58 encoded string.
* `<object>` — (optional) configuration object containing the following fields:
  * `commitment: <string>` — (optional) commitment.
  * `encoding: <string>` — (optional) encoding for account data, either `base58` (slow), `base64`, `base64+zstd`, or `jsonParsed`. `base58` is limited to account data of less than 128 bytes. `base64` will return base64 encoded data for account data of any size. `base64+zstd` compresses account data using Zstandard and base64 encodes the result. `jsonParsed` encoding attempts to use program-specific state parsers to return more human-readable and explicit account state data. If `jsonParsed` is requested, but a parser cannot be found, the field falls back to base64 encoding, detectable when the data field is `<string>` type.
  * `dataSlice: <object>` — (optional) limit the returned account data using the provided `offset: <usize>` and `length: <usize>` fields; only available for base58, base64, or base64+zstd encodings.
  * `minContextSlot: <number>` — (optional) set the minimum slot to evaluate the request.

**Returns:**

The result will be an RPC response JSON object with `value` equal to an array of JSON objects, which will contain the following:

* `account: <object>` — a JSON object with the following fields:
  * `data: <object>` — token state data associated with the account, either as encoded binary data or in JSON format `{<program>: <state>}`.
  * `executable: <bool>` — boolean indicating if the account contains a program (and is strictly read-only).
  * `lamports: <u64>` — number of lamports assigned to this account, as u64.
  * `owner: <string>` — the base58 encoded public key of the program this account has been assigned to.
  * `rentEpoch: <u64>` — the epoch at which this account will next owe rent, as u64.
* `pubkey: <string>` — the account public key as a base58 encoded string.

**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { Connection } from "@solana/web3.js";

const nodeUrl = "CHAINSTACK_NODE_URL"

const publicKey = new PublicKey(
  "Cn9ZxdJFshChj3JhK1BG6HFDtCitht8iyR32HpkjK3XL"
);

const mintAccount = new PublicKey(
  "36BXYjELbsJpNkJMSGNoPuRaSRaDvBbKQcDMtYDs1fWQ"
);

(async () => {  
  const solana = new Connection(nodeUrl);

  console.log(await solana.getTokenAccountsByOwner(publicKey, {
    mint: mintAccount,
  },{
    encoding: 'jsonParsed',
  }));
})()
```

</template>
<template v-slot:py>

``` py
from solana.rpc.api import Client
from solana.publickey import PublicKey
from solana.rpc.types import TokenAccountOpts

web3 = Client("CHAINSTACK_NODE_URL")

pub_key = PublicKey("Cn9ZxdJFshChj3JhK1BG6HFDtCitht8iyR32HpkjK3XL")
mint_account = "36BXYjELbsJpNkJMSGNoPuRaSRaDvBbKQcDMtYDs1fWQ"
print(web3.get_token_accounts_by_owner(pub_key,TokenAccountOpts(mint=mint_account)))
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","id":1,"method":"getTokenAccountsByOwner","params":["Cn9ZxdJFshChj3JhK1BG6HFDtCitht8iyR32HpkjK3XL",{"mint":"36BXYjELbsJpNkJMSGNoPuRaSRaDvBbKQcDMtYDs1fWQ"},{"encoding":"jsonParsed"}]}'
```

</template>
</CodeSwitcher>
