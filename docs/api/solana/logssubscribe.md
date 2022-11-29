---
meta:
  - name: description
    content: logsSubscribe JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana subscription
---

## logsSubscribe

Solana API method to subscribe to transaction logging.

### Solana.py

To use the Solana API subscriptions with the `solana.py` library, install the `asyncstdlib` package with:

```sh
pip install asyncstdlib
```
### cURL

To use the Solana API subscriptions with cURL, use the code example as a message body in a WebSocket request in Postman.

**Parameters:**

* `filter: <string>|<object>` — the filter criteria for the logs to receive results by account type; currently supported:
  * `all` — subscribe to all transactions except for simple vote transactions.
  * `allWithVotes` — subscribe to all transactions including simple vote transactions.
  * `{ mentions: [ <string> ] }` — subscribe to all transactions that mention the provided public key, as a base58 encoded string.
* `(optional) <object>` — the configuration object containing the following optional fields:
  * `(optional) commitment: <string>` — the commitment.

**Returns:**

* `<integer>` — the subscription ID (needed to unsubscribe).

**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { Connection } from "@solana/web3.js";

const web3 = new Connection("CHAINSTACK_HTTPS_URL", {
    wsEndpoint: "CHAINSTACK_WSS_URL",
  });

(async () => {
    const publicKey = new PublicKey(
      "5sQ5AuSxmX2avcS99p8ECcvQAAKV3pKL5s6AoAccwuww"
    );

    web3.onLogs(
      publicKey,
      (logs) => console.log("Updated account info: ", logs),
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
        await websocket.logs_subscribe()
        first_resp = await websocket.recv()
        subscription_id = first_resp.result
        async for idx, msg in enumerate(websocket):
            print(msg)

asyncio.run(main())
```

</template>
<template v-slot:cr>

``` sh
'wscat -c CHAINSTACK_WSS_URL {"id":1,"jsonrpc":"2.0",  "method": "logsSubscribe", "params": [ "all" ]}'
```

</template>
</CodeSwitcher>
