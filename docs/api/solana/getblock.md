---
meta:
  - name: description
    content: getBlock JSON-RPC method for the Solana API available with examples in Solana web3.js, Solana.py, and cURL.
  - name: keywords
    content: json rpc methods curl api solana.py solana web3.js javascript python solana 
---

# getBlock

Solana API method that returns the identity and transaction information about a confirmed block in the ledger. 

**Parameters:** 

* `block_id` -  slot, as u64 integer.
* `object` - Optional configuration fields:
  * `(optional) encoding: <string>` - encoding for each returned Transaction, either "json", "jsonParsed", "base58" (slow), "base64". If the parameter is not provided, the default encoding is "json". "jsonParsed" encoding attempts to use program-specific instruction parsers to return more human-readable and explicit data in the transaction.message.instructions list. If "jsonParsed" is requested, but a parser cannot be found, the instruction falls back to standard JSON encoding (accounts, data, and programIdIndex fields).

  * `(optional) transactionDetails: <string>` - level of transaction detail to return, either "full", "accounts", "signatures", or "none". The default detail level is "full" if the parameter is not provided. If "accounts" are requested, transaction details only include signatures and an annotated list of accounts in each transaction. Transaction metadata is limited to fee, err, pre_balances, post_balances, pre_token_balances, and post_token_balances.

  * `(optional) rewards: bool` - whether to populate the rewards array. If a parameter is not provided, the default includes rewards.

  * `(optional) commitment: <string>` - Commitment; "processed" is not supported. If the parameter is not provided, the default is "finalized".
  
  * `(optional) maxSupportedTransactionVersion: <number>` - set the max transaction version to return in responses. If the requested block contains a transaction with a higher version, an error will be returned. Only legacy transactions will be returned if this parameter is omitted, and a block containing any versioned transaction will prompt the error.

**Returns:** 

* `JSON object` 
  * `<null>`, if the specified block is not confirmed.
  *  `<object>`, an object containing:
      * `blockhash: <string>` - the blockhash of this block, as base-58 encoded string.
      * `previousBlockhash: <string>` - the blockhash of this block's parent, as base-58 encoded string; if the parent block is not available due to ledger cleanup, this field will return "11111111111111111111111111111111".
      * `parentSlot: <u64>` - the slot index of this block's parent.
      * `transactions: <array>` - present if "full" transaction details are requested.
      
**Example:**

<CodeSwitcher :languages="{js:'Solana web3.js', py:'Solana.py', cr:'cURL'}">
<template v-slot:js>

``` js
import { Connection } from "@solana/web3.js";

const nodeUrl = "CHAINSTACK_NODE_URL"
const connect = new Connection(nodeUrl);

(async () => {  
  console.log(await connect.getBlock(151548100));
})();
```

</template>
<template v-slot:py>

``` py
from solana.rpc.api import Client

web3 = Client("CHAINSTACK_NODE_URL")

print(web3.get_block(151548100))
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0", "id":1, "method":"getBlock", "params":[151548100]}'
```

</template>
</CodeSwitcher>