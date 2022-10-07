---
meta:
  - name: description
    content: eth_call JSON-RPC method for the Arbitrum API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby Arbitrum 
---

# Arbitrum eth_call RPC method

Arbitrum API method that executes a new message call immediately without creating a transaction on the blockchain. 

**Parameters:** 

* `object` - The transaction call object, should have this shape: 
  * `from` - (optional) String of the address, the transaction is sent from.
  * `to` - String of the address, the transaction is directed to.
  * `gas` - (optional) Integer of the gas provided for the transaction execution.
  * `gasprice` - (optional) Integer of the gasPrice used for each paid gas encoded as hexadecimal.
  * `value` - (optional) Integer of the value sent with this transaction encoded as hexadecimal.
  * `data` - (optional) String of the hash of the method signature and encoded parameters, see the [Ethereum Contract ABI](https://solidity.readthedocs.io/en/latest/abi-spec.html).
  * `quantity or tag` - Integer block number, or the string 'latest', 'earliest' or 'pending', see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

**Returns:** 

* `data`  - The return value of the executed contract.

**Example:**

The examples below call the `balanceOf` function of the [Chainlink token](https://arbiscan.io/token/0xf97f4df75117a78c1a5a0dbb814af92458539fb4) for an [address holding Chainlink tokens](https://arbiscan.io/address/0xe24b7f6f19851d00367885c53f97560566298208) at the latest block.

::: tip
cURL needs a `HEX String` starting with `0x` to identify the block if you want to use a hex integer block number as a parameter.
For example, block number `14000000` will be `0xD59F80`.
:::

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("CHAINSTACK_NODE_URL"));
web3.eth.defaultBlock = "latest";
web3.eth.call({
  to: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
  data: "0x70a08231000000000000000000000000e24B7f6F19851d00367885c53F97560566298208"
})
.then(result => {
  console.log(web3.utils.fromWei(result));
});
```

</template>
<template v-slot:py>

``` py
import json 
from web3 import Web3 
node_url = "CHAINSTACK_NODE_URL"  
web3 = Web3(Web3.HTTPProvider(node_url))  
abi = json.loads('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transferAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]') 
address = "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4"  
contract = web3.eth.contract(address = address, abi = abi)  
balance = contract.functions.balanceOf("0xe24B7f6F19851d00367885c53F97560566298208").call(block_identifier = "latest")  
print(web3.fromWei(balance, "ether"))
```

</template>
<template v-slot:rb>

``` rb
require "eth"
require "forwardable"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
chainlink_abi = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transferAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]'
chainlink_address = "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4"
chainlink_name = "LinkToken"
chainlink_contract = Eth::Contract.from_abi(name: chainlink_name, address: chainlink_address, abi: chainlink_abi)
chainlink_contract.address
response = client.call(chainlink_contract, "balanceOf", "0xe24B7f6F19851d00367885c53F97560566298208")
puts response
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_call","params":[{"from":null,"to":"0xf97f4df75117a78c1A5a0DBb814Af92458539FB4","data":"0x70a08231000000000000000000000000e24B7f6F19851d00367885c53F97560566298208"}, "latest"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>