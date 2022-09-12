---
meta:
  - name: description
    content: eth_estimateGas JSON-RPC method for the Arbitrum API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby Arbitrum 
---

# eth_estimateGas

Arbitrum API method that returns an estimation of gas units needed for a given transaction. 

**Parameters:** 

* `object` - [Transaction call object](https://eth.wiki/json-rpc/API#parameters-25), where the `from` field is optional, and the `nonce` field is omitted.
* `quantity or tag` - Integer block number, or the string 'latest', 'earliest' or 'pending', encoded as hexadecimal starting with "0x". See the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter). 

**Returns:** 

* `quantity` - The estimated amount of gas units used.

**Example:**

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.estimateGas({
        from: "0x62383739D68Dd0F844103Db8dFb05a7EdED5BBE6",
        to: "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8",
        // web3.js only uses the latest block.
    })
    .then(gas => {
        console.log(gas);
    });
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.estimate_gas({"from":"0x62383739D68Dd0F844103Db8dFb05a7EdED5BBE6","to":"0x90335eE2286315185a0ff7108B5f7809ce6332F9"}, "latest" ))  
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_estimate_gas({"from":"0x62383739D68Dd0F844103Db8dFb05a7EdED5BBE6","to":"0xbe0eb53f46cd790cd13851d5eff43d12404d33e8"}, "latest")
puts response
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_estimateGas","params":[{"from":"0x62383739D68Dd0F844103Db8dFb05a7EdED5BBE6","to":"0xbe0eb53f46cd790cd13851d5eff43d12404d33e8"}, "0xEA8DC5"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>