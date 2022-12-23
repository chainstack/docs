---
meta:
  - name: description
    content: eth_mining JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum
---

# Ethereum eth_mining RPC method

Ethereum API method that returns a boolean value referring to the node mining activity. Will return `True` if the node is actively mining new blocks.

**Parameters:**  

* `none`

**Returns:**

* `result` — the boolean value `True` if the node is mining, otherwise `False`.

**Example:**

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.isMining()
    .then(console.log);
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL"
web3 = Web3(Web3.HTTPProvider(node_url))
print(web3.eth.mining)  
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_mining
puts response["result"]
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_mining","params":[], "jsonrpc":"2.0", "id":1}'
```

</template>
</CodeSwitcher>
