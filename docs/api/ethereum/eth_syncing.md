---
meta:
  - name: description
    content: eth_syncing JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum 
---

# eth_syncing

Ethereum API method that returns an object with the sync status of the node when the node is out-of-sync and is syncing. Returns `false` when the node is already in sync.

**Parameters:**  

* `none`

**Returns:** 

* `result` - Boolean value `false` when not syncing, or a JSON object when syncing:
  * `startingBlock` - The block at which the import started, encoded as hexadecimal.
  * `currentBlock` - The current block, same as eth_blockNumber, encoded as hexadecimal.
  * `highestBlock` - The estimated highest block encoded as hexadecimal.

**Example:**

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.isSyncing((err, sync) => {
    console.log(sync)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
print (web3.eth.syncing)  
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_syncing
puts response["result"] 
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_syncing", "jsonrpc":"2.0","params":[],"id":1}'
```

</template>
</CodeSwitcher>