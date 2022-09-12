---
meta:
  - name: description
    content: eth_getBalance JSON-RPC method for the Arbitrum API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby Arbitrum 
---

# eth_getBalance

Arbitrum API method that returns the balance of a given account address. The value is returned in Wei. 

**Parameters:** 

* `address` - The address to check the balance of.
* `quantity or tag` - Integer block number, or the string `latest`, `earliest`, or `pending`. See the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter). 

**Returns:** 

* `quantity` - The integer value of the current balance in Wei.

**Example:**

::: tip
cURL needs a `HEX String` starting with `0x` to identify the block if you want to use a hex integer block number as a parameter.
For example, block number `14000000` will be `0xD59F80`.
:::

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.getBalance("0x62383739D68Dd0F844103Db8dFb05a7EdED5BBE6", "latest", (err, balance) => {
    console.log(balance)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
address = "0x62383739D68Dd0F844103Db8dFb05a7EdED5BBE6"
balance = web3.eth.get_balance(address, "latest") 
print(balance) 
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.get_balance("0x62383739D68Dd0F844103Db8dFb05a7EdED5BBE6")
puts response
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getBalance","params":["0x62383739D68Dd0F844103Db8dFb05a7EdED5BBE6", "latest"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>