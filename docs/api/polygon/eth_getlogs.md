---
meta:
  - name: description
    content: eth_getLogs JSON-RPC method for the Polygon API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby polygon 
---

# Polygon eth_getLogs RPC method

Polygon API method that returns an array of all logs matching a given filter object.

**Parameters:**  

* `object` - The filter options:
  * `fromBlock` - (optional, default: `"latest"`) Integer block number encoded as hexadecimal, `"latest"`,`"pending"`, or `"earliest"` tags.
  * `toBlock` - (optional, default: `"latest"`) Integer block number encoded as hexadecimal, `"latest"`,`"pending"`, or `"earliest"` tags.
  * `address` - (optional) Contract address, or a list of addresses from which logs should originate.
  * `topics` - (optional) Array of `DATA` topics. Topics are order-dependent. Go here to learn more about topics.
  * `blockhash` - (optional) With the addition of EIP-234, `blockHash` will be a new filter option that restricts the logs returned to the single block with the 32-byte hash `blockHash`. Using blockHash is equivalent to `fromBlock` = `toBlock` = the block number with hash `blockHash`. If `blockHash` is present in the filter criteria, then neither `fromBlock` nor `toBlock` is allowed.

**Returns:** 

* `array` - An array of log objects, or an empty array if nothing has changed since the last poll:
  * `removed` - The boolean value `True` if the log was removed due to a chain reorganization. `False` if it is a valid log.
  * `logindex` - Integer of the log index position in the block encoded as hexadecimal. `null` if pending.
  * `transactionindex` - Integer of the transactions' index position the log was created from. `null` if it is pending.
  * `transactionhash` - Hash of the transactions the log was created from. `null` if pending.
  * `blockhash` - Hash of the block where this log was in. `null` if it is pending.
  * `blocknumber` - The block number where this log was encoded as hexadecimal. `null` if it is pending.
  * `address` - The address from which this log originated.
  * `data` - Contains one or more 32 Bytes non-indexed arguments of the log.
  * `topics` - An array of 0 to 4 32 Bytes of indexed log arguments.

**Example:**

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
web3.eth.getPastLogs("0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", (err, logs) => {
  console.log(logs)
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_logs({
  "fromBlock": 32733499, 
  "toBlock": 32733686, 
  "address": "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
  }))
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_logs({address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"})
puts response["result"]
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getLogs","params":[{"address": "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"}],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>