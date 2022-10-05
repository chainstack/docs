---
meta:
  - name: description
    content: accountSubscribe JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana subscription 
---

## accountSubscribe

Solana API method that subscribes to an account to receive notifications when the lamports or data for a given account public key changes.

### Solana.py

To use the Solana API subscriptions with the `solana.py` library, install the `asyncstdlib` package with:

```sh
pip install asyncstdlib
```
### cURL

To use the Solana API subscriptions with cURL, use the code example as a message body in a WebSocket request in Postman.

**Parameters:**

* `<string>` — the account public key as base-58 encoded string.
* `(optional) <object>` — a configuration object containing the following optional fields:
  * `(optional) commitment: <string>` — the commitment.
  * `encoding: <string>` — the encoding for account data, either `base58` (slow), `base64`, `base64+zstd` or `jsonParsed`. `jsonParsed` encoding attempts to use program-specific state parsers to return more human-readable and explicit account state data. If `jsonParsed` is requested, but a parser cannot be found, the field falls back to binary encoding, detectable when the data field is type `<string>`.

**Returns:**

* `<number>` — the subscription ID which is needed to unsubscribe.

**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { PublicKey, Connection } from "@solana/web3.js";

const web3 = new Connection("CHAINSTACK_HTTPS_URL", {
    wsEndpoint: "CHAINSTACK_WSS_URL",
  });

(async () => {
  const publicKey = new PublicKey(
    "HSH3LftAhgNEQmpNRuE1ghnbqVHsxt8edvid1zdLxH5C"
  );
  
  web3.onAccountChange(
    publicKey,
    (updatedAccountInfo) =>
      console.log("Updated account info: ", updatedAccountInfo),
    "confirmed"
  );
})();
```

</template>
<template v-slot:py>

``` py
import asyncio
from asyncstdlib import enumerate
from solana.rpc.websocket_api import connect
from solana.publickey import PublicKey

async def main():
    async with connect("CHAINSTACK_WSS_URL") as websocket:
        await websocket.account_subscribe(PublicKey('HSH3LftAhgNEQmpNRuE1ghnbqVHsxt8edvid1zdLxH5C'))
        first_resp = await websocket.recv()
        subscription_id = first_resp.result
        async for idx, msg in enumerate(websocket):
            print(msg)

asyncio.run(main())
```

</template>
<template v-slot:cr>

``` sh
'{"id":1,"jsonrpc":"2.0","method":"accountSubscribe","params":["HSH3LftAhgNEQmpNRuE1ghnbqVHsxt8edvid1zdLxH5C",{"encoding": "jsonParsed"}]}'
```

</template>
</CodeSwitcher>