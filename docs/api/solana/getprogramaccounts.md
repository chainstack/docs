---
meta:
  - name: description
    content: getProgramAccounts JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana
---

# getProgramAccounts

Solana API method that returns all accounts owned by the provided program public key.

## Temporary limitations

::: tip Information

This method is now enabled for elastic Solana devnet nodes on US Ashborne (ash1) and Amsterdam (ams1) with a rate limit of 2 requests per second (RPS).

:::

On elastic Solana mainnet nodes, `getProgramAccounts` method also has a rate limit of 2 requests per second (RPS). If the rate limit is exceeded, you will get the following response:

```json
{
   "jsonrpc":"2.0",
   "error":{
      "code":-32005,
      "message":"method request rate exceed",
      "data":{
         "method_name":"getProgramAccounts",
         "try_again_in":"315.794147ms"
      }
   },
   "id":1
}
```

**Parameters:**

* `<string>` — the program's public key, as a base58 encoded string.
* `<object>` — (optional) configuration object containing the following fields:
  * `commitment: <string>` — (optional) commitment.
  * `encoding: <string>` — (optional) encoding for account data, either `base58` (slow), `base64`, `base64+zstd`, or `jsonParsed`. `base58` is limited to account data of less than 128 bytes. `base64` will return base64 encoded data for account data of any size. `base64+zstd` compresses account data using Zstandard and base64 encodes the result. `jsonParsed` encoding attempts to use program-specific state parsers to return more human-readable and explicit account state data. If `jsonParsed` is requested, but a parser cannot be found, the field falls back to base64 encoding, detectable when the data field is `<string>` type.
  * `dataSlice: <object>` — (optional) limit the returned account data using the provided `offset: <usize>` and `length: <usize>` fields; only available for base58, base64, or base64+zstd encodings.
  * `filters: <array>` — (optional) filter results using up to 4 filter objects; the account must meet all filter criteria to be included in results.
  * `with context: bool` — (optional) wrap the result in an RPC response JSON object.
  * `minContextSlot: <number>` — (optional) set the minimum slot to evaluate the request.

**Filters:** (optional)

* `memcmp: <object>` — compare a provided series of bytes with program account data at a particular offset. Fields:
  * `offset: <usize>` — offset into program account data to start the comparison.
  * `bytes: <string>` — data to match as an encoded string.
  * `encoding: <string>` — encoding for filter bytes data, either `base58` or `base64`. Data is limited in size to 128 or fewer decoded bytes.
* `dataSize: <u64>` — compare the program account data length with the provided data size.

**Returns:**

By default the result will be an array of JSON objects. If `withContext` flag is set, the array will be wrapped in an RPC response JSON object.

* `account: <object>` — a JSON object with the following sub fields:
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
import { PublicKey, Connection } from "@solana/web3.js"

const nodeUrl = "CHAINSTACK_NODE_URL"

(async () => {
  const MY_TOKEN_MINT_ADDRESS = new PublicKey("BUGuuhPsHpk8YZrL2GctsCtXGneL1gmT5zYb7eMHZDWf");
  const PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
  const connection = new Connection(nodeUrl);

  const accounts = await connection.getProgramAccounts(
    PROGRAM_ID,
    {
      dataSlice: {
        offset: 0, // number of bytes
        length: 0, // number of bytes
      },
      filters: [
        {
          dataSize: 165, // number of bytes
        },
        {
          memcmp: {
            offset: 0, // number of bytes
            bytes: MY_TOKEN_MINT_ADDRESS, // base58 encoded string
          },
        },
      ],
    }
  );
  console.log(
    `Found ${accounts.length} token account(s) for mint ${MY_TOKEN_MINT_ADDRESS}`
  );
  console.log(accounts);
})();
```

</template>
<template v-slot:py>

``` py
from solana.rpc.api import Client
from solana.publickey import PublicKey
from solana.rpc.types import TokenAccountOpts

web3 = Client("CHAINSTACK_NODE_URL")

memcmp_opts = [MemcmpOpts(offset=0, bytes="BUGuuhPsHpk8YZrL2GctsCtXGneL1gmT5zYb7eMHZDWf")]
program_pubkey = PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
filters = [165, memcmp_opts]
print(web3.get_program_accounts(pubkey=program_pubkey, memcmp_opts=memcmp_opts))
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","id":1,"method":"getProgramAccounts","params":["TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",{"encoding":"base64","dataSlice":{"offset":0,"length":0},"filters":[{"dataSize":165},{"memcmp":{"offset":0,"bytes":"BUGuuhPsHpk8YZrL2GctsCtXGneL1gmT5zYb7eMHZDWf"}}]}]}'
```

</template>
</CodeSwitcher>
