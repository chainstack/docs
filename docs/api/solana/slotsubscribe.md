---
meta:
  - name: description
    content: slotSubscribe JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana subscription
---

## slotSubscribe

Solana API method to subscribe to receive notification each time a slot is processed by the validator.

### Solana.py

To use the Solana API subscriptions with the `solana.py` library, install the `asyncstdlib` package with:

```sh
pip install asyncstdlib
```
### cURL

To use the Solana API subscriptions with cURL, use the code example as a message body in a WebSocket request in Postman.

**Parameters:**

* `none`

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
    web3.onSlotChange((slotInfo) =>
    console.log("Updated slot info: ", slotInfo)
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
        await websocket.slot_subscribe()
        first_resp = await websocket.recv()
        subscription_id = first_resp.result
        async for idx, msg in enumerate(websocket):
            print(msg)

asyncio.run(main())
```

</template>
<template v-slot:cr>

``` sh
'{ "jsonrpc": "2.0", "id": 1, "method": "slotSubscribe" }'
```

</template>
</CodeSwitcher>
