---
meta:
  - name: description
    content: eth_getStorageAt JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum 
---

# eth_getStorageAt

Ethereum API method that returns the value from a storage position at a given address. 

**Parameters:**

* `address` - The address to check for storage.
* `quantity` - Integer of the position in storage.
* `quantity or tag` - Integer block number encoded as hexadecimal, or the string:
  * `latest` — the latest block that is to be validated. The Beacon Chain may reorg and the latest block can become orphaned.
  * `safe` — the block that is equal to the tip of the chain and is very unlikely to be orphaned.
  * `finalized` — the block that is accepted by the two thirds of the Ethereum validators.
  * `earliest` — the genesis block.
  * `pending` — the pending state and transactions block.

**Returns:**

* `result` - The value at this storage position.

**Example:**

The example returns the storage value of the [simple storage contract](https://etherscan.io/address/0x954De93D9f1Cd1e2e3AE5964F614CDcc821Fac64#readContract).

The last value change was in block [7500943](https://etherscan.io/tx/0xc6d494c08ee2a0144e6241f86e6128dcc6888116a863a865074af8b25841a608#eventlog) and it can be used as a reference point to retrieve the different storage values in time. Note that to query a state in the past, you need <a href="https://chainstack.com/evm-nodes-a-dive-into-the-full-vs-archive-mode/" target="_blank">an archive node</a>.

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
web3.eth.getStorageAt("0x954De93D9f1Cd1e2e3AE5964F614CDcc821Fac64", 0, 7500943).then(result => {
    console.log(web3.utils.hexToAscii(result));
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
storage = web3.eth.get_storage_at("0x954De93D9f1Cd1e2e3AE5964F614CDcc821Fac64", 0, 7500943)
print(storage.decode("ASCII"))
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.eth_get_storage_at("0x954De93D9f1Cd1e2e3AE5964F614CDcc821Fac64", 0, 7500943)
puts response["result"]
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getStorageAt","params":["0x954De93D9f1Cd1e2e3AE5964F614CDcc821Fac64", "0x0", "0x72748F"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>