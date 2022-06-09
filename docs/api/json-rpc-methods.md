---
meta:
  - name: description
    content: Collection of json RPC methods available with examples in cURL, web3.py, web3.js.
  - name: keywords
    content: json rpc methods evm web3.py web3.js
---

# JSON RPC methods

This page shows how to call RPC methods in Python, JavaScript, and cURL.

## Overview

**Chainstack created this documentation to make it easier for developers to access practical examples of JSON RPC methods.**

We use the web3.py library for Python and the web3.js library for JavaScript.

For a detailed description of all the available JSON RPC methods, see [Ethereum Wiki](https://eth.wiki/json-rpc/API) 

## Access a Chainstack endpoint

A software application must connect to a node to interact with an Ethereum virtual machine based blockchain. 

To run the code examples, you will need a Chainstack endpoint. A Chainstack node HTTPS endpoint looks like this:

``` sh
https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

Follow these steps to sign up on Chainstack, deploy a node, and find your endpoint credentials.
1. [Sign up with Chainstack](https://console.chainstack.com/user/account/create)
1. [Deploy a full node](https://docs.chainstack.com/platform/join-a-public-network)
1. [View node access and credentials](https://docs.chainstack.com/platform/view-node-access-and-credentials)

## Install web3 libraries

You will need to install the web3 libraries to be able to use them.

### Web3.py

Web3.py is a Python library used to interact with the Ethereum network (Or other networks based on the EVM).

It is commonly found in decentralized applications (dapps) to help with sending transactions, interacting with smart contracts, reading block data, and a variety of other use cases.

Check out the [web3.py docs](https://web3py.readthedocs.io/en/stable/index.html) for more details.

Run this code to install it in your enviroment:

``` sh
pip install web3
```

> **Note** that on Windows, you will need to install the [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) to make it work.

### Web3.js

Web3.js is a set of libraries that allows you to communicate with a local or remote Ethereum node (or other nodes based on the EVM) through HTTP, IPC, or WebSocket, and interact with the network.

It is commonly found in decentralized applications (dApps) to help with sending transactions, interacting with smart contracts, reading block data, and a variety of other use cases.

Check out the [web3.js docs](https://web3js.readthedocs.io/en/v1.7.3/#) for more details.

Run this code to install it in your enviroment:

``` sh
npm install web3
```

## cURL

cURL is a command-line tool used send and receive data.

Most operating systems have cURL available by default. Run this code in a command prompt using admin privileges to verify if it is installed on your system.

``` sh
curl -h
```

### cURL POST request syntax

In the JSON RPC methods case, we are working with a JSON body, and the general form of a cURL command for making a POST request with a JSON body is as follows:

```sh
curl -X POST 'URL'
     -H "Content-Type: application/json" 
     --data "{JSON data}" 
```
Where:
  * -X: HTTP method to use when communicating with the server.
  * -H: HTTP headers to send to the server with a POST request.
  * --data: Data to be sent to the server using a POST request.

### Use Postman to run cURL requests

[Postman](https://www.postman.com/) is a platform used by developers to test APIs. It has a nice graphical interface, and makes cURL requests easy to test.

1. Click on the "Import" button on the left side of the workspace.
1. Select "Raw text" and paste one of the code examples.
1. Replace ```'CHAINSTACK_NODE_URL'``` with your own HTTP endpoint URL.
1. Click on "Continue" and then on "Import".
1. Now you have the code imported in the workplace. Click the "Send" button to subtmit the request and receive a response.

> After the cURL code has been imported for the first time, you can go in the "Body" tab and modify the data to send different requests without having to import the entire code again.

## Ethereum virtual machine API

Every [Ethereum client](https://ethereum.org/en/developers/docs/nodes-and-clients/#execution-clients) implements a [JSON-RPC specification](http://www.jsonrpc.org/specification), so there is a uniform set of methods that applications can rely on.
Developers can read blockchain data and send transactions to the network by using the endpoints provided by the API.

> **Note:** these methods can be used on any Ethereum compatible network (EVM), not only on the Ethereum blockchain. 

## JSON RPC methods description and examples

### eth_blockNumber 

Returns the latest block number of the blockchain. 

**Parameters:** 

  `none`

**Returns:** 

  `result` - Integer value of latest block number encoded as hexadecimal. 

**Code Examples:**

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
from web3 import Web3 
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print (web3.eth.blockNumber) 
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3'); 
var node_URL = ' CHAINSTACK_NODE_URL '; 
var web3 = new Web3(node_URL) 
web3.eth.getBlockNumber((err,block) => { 
    console.log("latest block", block) 
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -H 'Content-Type: application/json' \
  --data '{"method":"eth_blockNumber", "jsonrpc":"2.0", "params":[],"id":1}'
```

</template>
</CodeSwitcher>

### eth_call

Executes a new message call immediately without creating a transaction on the blockchain. 

**Parameters:** 

`object` - The transaction call object, should have this shape: 

- `from` - (optional) String of the address, the transaction is sent from. 

- `to` - String of the address, the transaction is directed to. 
 
- `gas` - (optional) Integer of the gas provided for the transaction execution. 

- `gasprice` - (optional) Integer of the gasPrice used for each paid gas encoded as hexadecimal. 
 
- `value` - (optional) Integer of the value sent with this transaction encoded as hexadecimal. 
 
- `data` - (optional) String of the hash of the method signature and encoded parameters, see the [Ethereum Contract ABI](https://solidity.readthedocs.io/en/latest/abi-spec.html). 

`quantity or tag` - Integer block number, or the string 'latest', 'earliest' or 'pending', see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter). 

**Returns:** 

`data`  - The return value of the executed contract.  

**Code Examples:**

> The examples below call the `balanceOf` function of the [Chainlink token](https://etherscan.io/address/0x514910771AF9Ca656af840dff83E8264EcF986CA) for the [Chainlink  VRF coordinator](https://etherscan.io/address/0x271682DEB8C4E0901D1a1550aD2e64D568E69909) address at the latest block.

> **Note:** cURL needs a `HEX String` starting with "0x" to identify the block if you want to use an integer block number as a parameter.
> 
> For example: block number 14000000 will be 0xD59F80. 

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
import json 
from web3 import Web3 
node_url = "CHAINSTACK_NODE_URL"  
web3 = Web3(Web3.HTTPProvider(node_url))  
abi = json.loads('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transferAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]') 
address = "0x514910771AF9Ca656af840dff83E8264EcF986CA"  
contract = web3.eth.contract(address = address, abi = abi)  
balance = contract.functions.balanceOf('0x271682DEB8C4E0901D1a1550aD2e64D568E69909').call(block_identifier = 'latest')  
print(web3.fromWei(balance, 'ether'))  
```

</template>
<template v-slot:js>

``` js
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("CHAINSTACK_NODE_URL"));
web3.eth.defaultBlock = 'latest';
web3.eth.call({
        to: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        data: "0x70a08231000000000000000000000000271682deb8c4e0901d1a1550ad2e64d568e69909"
    })
    .then(result => {
        console.log(web3.utils.fromWei(result));
    });
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -H 'Content-Type: application/json' \
  --data '{"method":"eth_call","params":[{"from":null,"to":"0x514910771AF9Ca656af840dff83E8264EcF986CA","data":"0x70a08231000000000000000000000000271682deb8c4e0901d1a1550ad2e64d568e69909"}, "latest"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_chain

Returns the current network/chain ID, and it is used to sign replay-protected transactions. It was introduced in EIP-155. 

**Parameters:** 

`none`

**Returns:** 

`quantity` - EIP155 Chain ID. 

**Code Examples:**

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL"  
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.chain_id)  
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getChainId((err, chain) => {
    console.log(chain)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_chainId","params":[],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_estimateGas

Returns an estimation of gas units needed for a given transaction. 

**Parameters:** 

`object` - [Transaction call object](https://eth.wiki/json-rpc/API#parameters-25), where the `from` field is optional, and the `nonce` field is omitted.

`quantity or tag` - Integer block number, or the string 'latest', 'earliest' or 'pending', encoded as hexadecimal starting with "0x". See the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter). 

**Returns:** 

`quantity` - The estimated amount of gas units used.

**Code Examples:**

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
# In this case the block number ("value") is the hex encoded value of the string 'latest'.
print(web3.eth.estimate_gas({"from":"0x8D97689C9818892B700e27F316cc3E41e17fBeb9","to":"0xd3CdA913deB6f67967B99D67aCDFa1712C293601","value":"0x6c6174657374"}))  
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.estimateGas({
        from: "0x8D97689C9818892B700e27F316cc3E41e17fBeb9",
        to: "0xd3CdA913deB6f67967B99D67aCDFa1712C293601",
        // web3.js only uses the latest block.
    })
    .then(gas => {
        console.log(gas);
    });
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \
  # In this case the block number ("value") is the hex encoded value of the string 'latest'.
  --data '{"method":"eth_estimateGas","params":[{"from":"0x8D97689C9818892B700e27F316cc3E41e17fBeb9","to":"0xd3CdA913deB6f67967B99D67aCDFa1712C293601","value":"0x6c6174657374"}],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_gasPrice

Returns the current gas base fee of the network. The value returned is in Wei. 

**Parameters:** 

`none`

**Returns:** 

`quantity` - The integer value of the current gas base fee in Wei.

**Code Examples:**

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.gas_price) 
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getGasPrice((err, gasPrice) => {
    console.log(gasPrice)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_gasPrice","params":[],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_getBalance

Returns the balance of a given account address. The value is returned in Wei. 

**Parameters:** 

`address` - The address to check the balance of.

`quantity or tag` - Integer block number, or the string 'latest', 'earliest' or 'pending'. See the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter). 

**Returns:** 

`quantity` - The integer value of the current balance in Wei.

**Code Examples:**

> **Note:** cURL needs a `HEX String` starting with "0x" to identify the block if you want to use an integer block number as a parameter.
> 
> For example: block number 14000000 will be 0xD59F80.

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
balance = web3.eth.get_balance("0x9D00f1630b5B18a74231477B7d7244f47138ab47", "latest") 
print(balance) 
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getBalance('0x9D00f1630b5B18a74231477B7d7244f47138ab47', "latest", (err, balance) => {
    console.log(balance)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_getBalance","params":["0x9D00f1630b5B18a74231477B7d7244f47138ab47", "latest"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_getBlockByHash

Returns information about the block matching the given block hash.  

**Parameters:** 

`hash` - Hash of the block.

`boolean` - If `True`, it returns the full transaction objects. If `False`, only the hashes of the transactions.

**Returns:** 

`object` - A block object, or `null` when no block was found.

- `number` - The block number of the requested block. Encoded as hexadecimal. `null` if pending. 

- `hash` - The block hash of the requested block. `null` if pending. 

- `parenthash` - Hash of the parent block. 

- `nonce` - Hash of the generated proof-of-work. `null` if pending. 

- `sha3uncles` - SHA3 of the uncles' data in the block. 

- `logsbloom` - The bloom filter for the logs of the block. `null` if pending. 

- `transactionsroot` - The root of the transaction trie of the block. 

- `stateroot` - The root of the final state trie of the block. 

- `receiptsroot` - The root of the receipts trie of the block. 

- `miner` - The address to whom the mining rewards were given. 

- `difficulty` - Integer of the difficulty for this block, encoded as hexadecimal. 

- `totaldifficulty` - Integer of the total difficulty of the chain until this block, encoded as hexadecimal. 

- `extradata` - The “extra data” field of this block. 

- `size` - The size of this block in bytes as an Integer value, encoded as hexadecimal. 

- `gaslimit` - The maximum gas allowed in this block, encoded as hexadecimal.

- `gasused` - The total used gas by all transactions in this block. Encoded as hexadecimal. 

- `timestamp` - The UNIX timestamp for when the block was collated. 

- `transactions` - Array of transaction objects - please see eth_getTransactionByHash for exact shape. 

- `uncles` - Array of uncle hashes. 

**Code Examples:**

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_block('0xaafff6dbabc20c5c2d58f5a8f336575f22681fd23a9e53bf81e69d8130a29b9c', False)) 
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getBlock('0xaafff6dbabc20c5c2d58f5a8f336575f22681fd23a9e53bf81e69d8130a29b9c', "False", (err, block) => {
    console.log(block)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_getBlockByHash","params":["0xaafff6dbabc20c5c2d58f5a8f336575f22681fd23a9e53bf81e69d8130a29b9c",false],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_getBlockByNumber

Returns information about the block matching the given block number. 

**Parameters:** 

`quantity or tag` - Integer block number, or the string 'latest', 'earliest' or 'pending'. See the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter). 

`boolean` - If `True`, it returns the full transaction objects. If `False`, only the hashes of the transactions.

**Returns:** 

`object` - A block object, or `null` when no block was found.

- `number` - The block number of the requested block. Encoded as hexadecimal. `null` if pending. 

- `hash` - The block hash of the requested block. `null` if pending. 

- `parenthash` - Hash of the parent block. 

- `nonce` - Hash of the generated proof-of-work. `null` if pending. 

- `sha3uncles` - SHA3 of the uncles' data in the block. 

- `logsbloom` - The bloom filter for the logs of the block. `null` if pending. 

- `transactionsroot` - The root of the transaction trie of the block. 

- `stateroot` - The root of the final state trie of the block. 

- `receiptsroot` - The root of the receipts trie of the block. 

- `miner` - The address to whom the mining rewards were given. 

- `difficulty` - Integer of the difficulty for this block, encoded as hexadecimal. 

- `totaldifficulty` - Integer of the total difficulty of the chain until this block, encoded as hexadecimal. 

- `extradata` - The “extra data” field of this block. 

- `size` - The size of this block in bytes as an Integer value, encoded as hexadecimal. 

- `gaslimit` - The maximum gas allowed in this block, encoded as hexadecimal.

- `gasused` - The total used gas by all transactions in this block. Encoded as hexadecimal. 

- `timestamp` - The UNIX timestamp for when the block was collated. 

- `transactions` - Array of transaction objects - please see eth_getTransactionByHash for exact shape. 

- `uncles` - Array of uncle hashes. 

**Code Examples:**

> **Note:** cURL needs a `HEX String` starting with "0x" to identify the block if you want to use an integer block number as a parameter.
> 
> For example: block number 14000000 will be 0xD59F80.

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_block('latest', False))
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getBlock('latest', 'False', (err, block) => {
    console.log(block)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_getBlockByNumber","params":["latest",false],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_getBlockTransactionCountByHash

Returns the number of transactions in the block matching the given block hash.  

**Parameters:**  

`hash` - Hash of the block.

**Returns:** 

`result` - Integer number of transactions in the block.

**Code Examples:**

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_block_transaction_count('0x829df9bb801fc0494abf2f443423a49ffa32964554db71b098d332d87b70a48b'))
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getBlockTransactionCount('0x829df9bb801fc0494abf2f443423a49ffa32964554db71b098d332d87b70a48b', (err, block) => {
    console.log(block)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_getBlockTransactionCountByHash","params":["0x829df9bb801fc0494abf2f443423a49ffa32964554db71b098d332d87b70a48b"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_getBlockTransactionCountByNumber

Returns the number of transactions in the block matching the given block number. 

**Parameters:**  

`integer` - Block number.

**Returns:** 

`result` - Integer number of transactions in the block.

**Code Examples:**

> **Note:** cURL needs a `HEX String` starting with "0x" to identify the block number.
> 
> For example: block number 14000000 will be 0xD59F80.

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print (web3.eth.get_block_transaction_count(14897720)) # A hex value starting with "0x" is accepted as well.
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getBlockTransactionCount(14897720, (err, block) => {
    console.log(block)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_getBlockTransactionCountByNumber","params":["0xE35238"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_getCode

Returns the compiled bytecode of a smart contract.

**Parameters:**  

`address` - Address of the smart contract to retrieve the bytecode from.

`quantity or tag` - Integer block number, or the string 'latest', 'earliest' or 'pending'. See the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter). 

**Returns:** 

`result` - The string value of the compiled bytecode.

**Code Examples:**

> The examples below will retrieve the bytecode of the [Uniswap token](https://etherscan.io/address/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984#code) at the state of the latest block.

> **Note:** cURL needs a `HEX String`  starting with "0x" to identify the block if you want to use an integer block number as a parameter.
> 
> For example: block number 14000000 will be 0xD59F80.

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
code = web3.eth.get_code("0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", "latest") 
print(code)
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getCode('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', "latest", (err, byte) => {
    console.log(byte)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_getCode","params":["0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", "latest"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_getFilterChanges

Polling method for a filter, which returns an array of logs which occurred since last poll.

**Parameters:**  

`quantity` - The filter id that is returned from [eth_newFilter](), [eth_newBlockFilter]() or [eth_newPendingTransactionFilter]() .

**Returns:** 

`array` - An array of one of the following, depending on the filter type, or empty if no changes occurred since the last poll:

- For filters created with ```eth_newBlockFilter```:

  - `blockHash` - The 32 bytes hash of a block that meets your filter requirements.

- For filters created with ```eth_newPendingTransactionFilter```:

  - `transactionHash` - The 32 bytes hash of a transaction that meets your filter requirements.

- For filters created with ```eth_newFilter```, logs are objects with the following parameters:

  - `removed` - The boolean value `True` if the log was removed due to a chain reorganization. `False` if it is a valid log.

  - `logindex` - Integer of the log index position in the block encoded as hexadecimal. `null` if pending.
   
  - `transactionindex` - Integer of the transactions' index position the log was created from. `null` if it is pending.
   
  - `transactionhash` - Hash of the transactions the log was created from. `null` if pending.
   
  - `blockhash` - Hash of the block where this log was in. `null` if it is pending.
   
  - `blocknumber` - The block number where this log was encoded as hexadecimal. `null` if it is pending.
   
  - `address` - The address from which this log originated.
   
  - `data` - Contains one or more 32 Bytes non-indexed arguments of the log.
   
  - `topics` - An array of 0 to 4 32 Bytes of indexed log arguments.

**Code Examples:**

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 

# Using eth_newPendingTransactionFilter in this example
put_filter = web3.eth.filter('pending')
print(web3.eth.get_filter_changes(put_filter.filter_id))
```

</template>
<template v-slot:js>

``` js
// Web3.js does not support this feature. See Web3.js subscriptions.
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_getFilterChanges","params":["0x7842730ec9d87e1e2afe0573f6c747b2"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_getLogs

Returns an array of all logs matching a given filter object.

**Parameters:**  

`object` - The filter options:

- `fromBlock` - (optional, default: `"latest"`) Integer block number encoded as hexadecimal, `"latest"`,`"pending"`, or `"earliest"` tags.

- `toBlock` - (optional, default: `"latest"`) Integer block number encoded as hexadecimal, `"latest"`,`"pending"`, or `"earliest"` tags.

- `address` - (optional) Contract address, or a list of addresses from which logs should originate.

- `topics` - (optional) Array of `DATA` topics. Topics are order-dependent. Go here to learn more about topics.

- `blockhash` - (optional) With the addition of EIP-234, `blockHash` will be a new filter option that restricts the logs returned to the single block with the 32-byte hash `blockHash`. Using blockHash is equivalent to `fromBlock` = `toBlock` = the block number with hash `blockHash`. If `blockHash` is present in the filter criteria, then neither `fromBlock` nor `toBlock` is allowed.

**Returns:** 

`array` - An array of log objects, or an empty array if nothing has changed since the last poll:

  - `removed` - The boolean value `True` if the log was removed due to a chain reorganization. `False` if it is a valid log.

  - `logindex` - Integer of the log index position in the block encoded as hexadecimal. `null` if pending.
   
  - `transactionindex` - Integer of the transactions' index position the log was created from. `null` if it is pending.
   
  - `transactionhash` - Hash of the transactions the log was created from. `null` if pending.
   
  - `blockhash` - Hash of the block where this log was in. `null` if it is pending.
   
  - `blocknumber` - The block number where this log was encoded as hexadecimal. `null` if it is pending.
   
  - `address` - The address from which this log originated.
   
  - `data` - Contains one or more 32 Bytes non-indexed arguments of the log.
   
  - `topics` - An array of 0 to 4 32 Bytes of indexed log arguments.

**Code Examples:**

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_logs({'address': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'})) 
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getPastLogs('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', (err, logs) => {
    console.log(logs)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_getLogs","params":[{"address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"}],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_getStorageAt

Returns the value from a storage position at a given address. 

**Parameters:**  

`address` - The address to check for storage. 

`quantity` - Integer of the position in storage.

`quantity or tag` - Integer block number, or the string `'latest'`, `'earliest'` or `'pending'`. See the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter). 


**Returns:** 

`result` - The value at this storage position. 

**Code Examples:**

> The examples below will return the storage value of the [simple storage contract](https://etherscan.io/address/0x954De93D9f1Cd1e2e3AE5964F614CDcc821Fac64#readContract).
> 
> The last value change was in block [7500943](https://etherscan.io/tx/0xc6d494c08ee2a0144e6241f86e6128dcc6888116a863a865074af8b25841a608#eventlog)(an archive node is > required to query a block so far in the past), and it can be used as a reference point to retrieve the different storage values in time.

> **Note:** cURL needs a HEX String starting with "0x" to identify the block.
> 
> For example: block number 14000000 will be 0xD59F80.

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
storage = web3.eth.get_storage_at("0x954De93D9f1Cd1e2e3AE5964F614CDcc821Fac64", 0, 7500943)
print(storage.decode("ASCII"))
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getStorageAt('0x954De93D9f1Cd1e2e3AE5964F614CDcc821Fac64', 0, 7500943).then(result => {
    console.log(web3.utils.hexToAscii(result));
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_getStorageAt","params":["0x954De93D9f1Cd1e2e3AE5964F614CDcc821Fac64", "0x0", "0x72748F"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_getTransactionByBlockHashAndIndex

Returns information about a transaction given a block hash and a transaction's index position. 

**Parameters:**  

`hash` - A blocks hash.

`quantity` - An integer of the transaction index position.

**Returns:** 

`object` - Transaction Response Object , or `null` if no transaction is found:

  - `hash` - The hash of the transaction. 

  - `nonce` - The number of transactions made by the sender before this one. Encoded as hexadecimal. 

  - `blockHash` - The hash of the block where this transaction was in. `null` if pending. 

  - `blockNumber` - The block number where this transaction was in. `null` if pending. 

  - `transactionIndex` - Integer of the transactions index position in the block. `null` if pending. 

  - `from` - Address of the sender. 

  - `to` - Address of the receiver. `null` when it is a contract creation transaction. 

  - `value` - The value transferred in Wei, encoded as hexadecimal. 

  - `gasPrice` - The gas price provided by the sender in Wei, encoded as hexadecimal. 

  - `gas` - The gas provided by the sender, encoded as hexadecimal. 

  - `input` - The data sent along with the transaction. 

  - `v` - The standardized V field of the signature. 

  - `standardV` - The standardized V field of the signature (0 or 1). 

  - `r` The R field of the signature. 

  - `raw` - The raw transaction data.  

  - `publicKey` - The public key of the signer. 

  - `chainId` - The chain id of the transaction, if any. 

**Code Examples:**

> **Note:** cURL needs a HEX String starting with "0x" to identify the transaction's index.
> 
> For example: 207 will be 0xCF.

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_transaction_by_block('0xc05b2e16a1643d0aa15d098a408b28aa9109322087d2f2730bb2a8fa6bb699b0', 207))
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getTransactionFromBlock('0xc05b2e16a1643d0aa15d098a408b28aa9109322087d2f2730bb2a8fa6bb699b0', 207, (err, block) => {
    console.log(block)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_getTransactionByBlockHashAndIndex","params":["0xc05b2e16a1643d0aa15d098a408b28aa9109322087d2f2730bb2a8fa6bb699b0","0xCF"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_getTransactionByBlockNumberAndIndex

Returns information about a transaction given a block number and a transaction's index position.  

**Parameters:**  

`quantity or tag` - Integer block number, or the string `'latest'`, `'earliest'` or `'pending'`. See the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter). 

`quantity` - A hex of the integer representing the position in the block.

**Returns:** 

`object` - Transaction Response Object , or `null` if no transaction is found:

  - `hash` - The hash of the transaction. 

  - `nonce` - The number of transactions made by the sender before this one. Encoded as hexadecimal. 

  - `blockHash` - The hash of the block where this transaction was in. `null` if pending. 

  - `blockNumber` - The block number where this transaction was in. `null` if pending. 

  - `transactionIndex` - Integer of the transactions index position in the block. `null` if pending. 

  - `from` - Address of the sender. 

  - `to` - Address of the receiver. `null` when it is a contract creation transaction. 

  - `value` - The value transferred in Wei, encoded as hexadecimal. 

  - `gasPrice` - The gas price provided by the sender in Wei, encoded as hexadecimal. 

  - `gas` - The gas provided by the sender, encoded as hexadecimal. 

  - `input` - The data sent along with the transaction. 

  - `v` - The standardized V field of the signature. 

  - `standardV` - The standardized V field of the signature (0 or 1). 

  - `r` The R field of the signature. 

  - `raw` - The raw transaction data.  

  - `publicKey` - The public key of the signer. 

  - `chainId` - The chain id of the transaction, if any. 

**Code Examples:**

> **Note:** cURL needs a HEX String starting with "0x" to identify the block and index.
>
> For example: block number 14000000 will be 0xD59F80.

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_transaction_by_block(14806883, 214)) # Hex encoded parameters starting with "0x" are accepted as well.
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getTransactionFromBlock(14806883, 214, (err, block) => {
    console.log(block)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_getTransactionByBlockNumberAndIndex","params":["0xE1EF63", "0xD6"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_getTransactionByHash

Returns the information about a transaction from the transaction hash.   

**Parameters:**  

`hash` - The hash of a transaction.

**Returns:** 

`object` - Transaction Response Object , or `null` if no transaction is found:

  - `hash` - The hash of the transaction. 

  - `nonce` - The number of transactions made by the sender before this one. Encoded as hexadecimal. 

  - `blockHash` - The hash of the block where this transaction was in. `null` if pending. 

  - `blockNumber` - The block number where this transaction was in. `null` if pending. 

  - `transactionIndex` - Integer of the transactions index position in the block. `null` if pending. 

  - `from` - Address of the sender. 

  - `to` - Address of the receiver. `null` when it is a contract creation transaction. 

  - `value` - The value transferred in Wei, encoded as hexadecimal. 

  - `gasPrice` - The gas price provided by the sender in Wei, encoded as hexadecimal. 

  - `gas` - The gas provided by the sender, encoded as hexadecimal. 

  - `input` - The data sent along with the transaction. 

  - `v` - The standardized V field of the signature. 

  - `standardV` - The standardized V field of the signature (0 or 1). 

  - `r` The R field of the signature. 

  - `raw` - The raw transaction data.  

  - `publicKey` - The public key of the signer. 

  - `chainId` - The chain id of the transaction, if any. 

**Code Examples:**

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_transaction('0xf915903ecc67ab20a5162ae13eec36e3a68ca558765ada1779847e0a0c35479c')) 
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getTransaction('0xf915903ecc67ab20a5162ae13eec36e3a68ca558765ada1779847e0a0c35479c', (err, tx) => {
    console.log(tx)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_getTransactionByHash","params":["0xf915903ecc67ab20a5162ae13eec36e3a68ca558765ada1779847e0a0c35479c"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_getTransactionCount

Returns the number of transactions sent from an address (nonce).   

**Parameters:**  

`address` - The address to retrieve the transaction count from.

`quantity or tag` - (optional) Integer block number, or the string `'latest'`, `'earliest'` or `'pending'`. See the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter). 

**Returns:** 

`result ` - An integer number of transactions sent from an address.

**Code Examples:**

> **Note:** cURL needs a `HEX String`  starting with "0x" to identify the block if you want to use an integer block number as a parameter.
> 
> For example: block number 14000000 will be 0xD59F80.

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.getTransactionCount('0xcb8BBFa45541a95C1de883eB3606708cAe9fd45C', 'latest')) 
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getTransactionCount('0xcb8BBFa45541a95C1de883eB3606708cAe9fd45C', 'latest', (err, nonce) => {
    console.log(nonce)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_getTransactionCount","params":["0xcb8BBFa45541a95C1de883eB3606708cAe9fd45C", "latest"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_getTransactionReceipt

Returns a receipt object given a transaction hash.   

**Parameters:**  

`hash` - The hash of a transaction.

**Returns:** 

`object` - Transaction Response Object , or `null` if no transaction is found:

  - `transactionHash`- Hash of the transaction. 

  - `transactionIndex` - Integer of the transactions index position in the block encoded as hexadecimal. 

  - `from` - Address of the sender. 

  - `to` - Address of the receiver. `null` when it's a contract creation transaction. 

  - `blockHash` - Hash of the block where this transaction was in. 

  - `blockNumber` - Block number where this transaction was added, encoded as hexadecimal. 

  - `cumulativeGasUsed` - The total gas used when this transaction was executed in the block. 

  - `gasUsed` - The amount of gas used by this specific transaction. 

  - `contractAddress` - The contract address created during the contract creation, otherwise `null`. 

  - `logs` - Array of log objects that this transaction generated. 

  - `logsBloom` - Bloom filter for light clients to quickly retrieve related logs. 

  - `value` - Value transferred in Wei encoded as hexadecimal. 

  - `v` - ECDSA recovery id encoded as hexadecimal. 
  
  - `r` - ECDSA signature r 

  - `s` - ECDSA signature s 

It also returns either: 

  - `root` - 32 bytes of post-transaction stateroot (pre-Byzantium). 

  - `status` - Either 1 (success) or 0 (failure) encoded as hexadecimal. 

**Code Examples:**

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_transaction_receipt('0xa43e601a9b6c2daefab83c5e3521ba7764e31481079ca356ad8949f9daf0259f'))  
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getTransactionReceipt('0xa43e601a9b6c2daefab83c5e3521ba7764e31481079ca356ad8949f9daf0259f', (err, receipt) => {
  console.log(receipt)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_getTransactionReceipt","params":["0xa43e601a9b6c2daefab83c5e3521ba7764e31481079ca356ad8949f9daf0259f"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_getUncleCountByBlockHash

Returns the number of uncles for the block matching the given block hash.    

**Parameters:**  

`hash` - The Hash of the block to retrieve uncles from.

**Returns:** 

`uncles` - The integer value of the number of uncles in the block. Encoded as hexadecimal.

**Code Examples:**

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_uncle_count('0x685b2226cbf6e1f890211010aa192bf16f0a0cba9534264a033b023d7367b845'))   
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getBlockUncleCount('0x685b2226cbf6e1f890211010aa192bf16f0a0cba9534264a033b023d7367b845', (err, uncle) => {
    console.log(uncle)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_getUncleCountByBlockHash","params":["0x685b2226cbf6e1f890211010aa192bf16f0a0cba9534264a033b023d7367b845"],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_getUncleByBlockNumberAndIndex 

Returns information about an uncle of a block by number and uncle index position.   

**Parameters:**  

`quantity or tag` - Block number encoded as hexadecimal starting with "0x".

`index` - The uncle's index position.

**Returns:** 

`object` - A block object, or `null` when no block was found:

 - `number` - The block number. `null` when it is a pending block.
 
 - `hash` - Hash of the block. `null` when it is a pending block.
 
 - `parentHash` - Hash of the parent block.
 
 - `nonce` - Hash of the generated proof-of-work. `null` when it is a pending block.
 
 - `sha3Uncles` - SHA3 of the uncles' data in the block.
 
 - `logsBloom` - The bloom filter for the logs of the block. `null` when it is a pending block.
 
 - `transactionsRoot` - The root of the transaction trie of the block.
 
 - `stateRoot` - The root of the final state trie of the block.
 
 - `receiptsRoot` The root of the receipts trie of the block.
 
 - `miner` The address of the beneficiary to whom the mining rewards were given.
 
 - `difficulty` - Integer of the difficulty for this block.
 
 - `totalDifficulty` - Integer of the total difficulty of the chain until this block.
 
 - `extraData` - The "extra data" field of this block.
 
 - `size` - Integer of the size of this block in bytes.
 
 - `gasLimit` - The maximum gas allowed in this block.
 
 - `gasUsed` - The total used gas by all transactions in this block.
 
 - `timestamp` - The UNIX timestamp for when the block was collated.
 
 - `transactions` - Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter.
 
 - `uncles` - Array of uncle hashes.

**Code Examples:**

> **Note:** Web3.js requires the block number identifier to be an integer **not encoded** as hexadecimal.

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.get_uncle_by_block('0xDB60', 0))    
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getUncle('12911679', 0, (err, uncle) => {
    console.log(uncle)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_getUncleByBlockNumberAndIndex","params":["0xDB60", "0x0"],"id":1, "jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

### eth_mining

Returns a boolean value referring to the node mining activity. Will return `True` if the node is actively mining new blocks. 

**Parameters:**  

`none` 

**Returns:** 

`result` - Boolean value `True` if the node is mining, otherwise `False`.

**Code Examples:**

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
web3 = Web3(Web3.HTTPProvider(node_url)) 
print(web3.eth.mining)  
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.isMining()
    .then(console.log);
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_mining","params":[], "jsonrpc":"2.0", "id":1}'
```

</template>
</CodeSwitcher>

### eth_newBlockFilter

Creates a filter object to notify the arrival of a new block. To check if the state has changed, call eth_getFilterChanges.

**Parameters:**  

`none` 

**Returns:** 

`result` - Returns a filter ID to be used when calling eth_getFilterChanges.

**Code Examples:**

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
newBlockFilterId = web3.eth.filter('latest') 
print(newBlockFilterId)   
```

</template>
<template v-slot:js>

``` js

// Web3.js does not support this feature. See Web3.js subscriptions - subscribe(“newBlockHeaders”).

```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_newBlockFilter","params":[], "jsonrpc":"2.0", "id":1}'
```

</template>
</CodeSwitcher>

### eth_newFilter

Creates a filter object based on the filter options to notify when the state changes (logs). To check if the state has changed, call eth_getFilterChanges.

**Parameters:**  

`object` - Should contain the filter information. All keys are optional:

  - `fromBlock` - (Optional) Integer block number, or the string `'latest'`, `'earliest'` or `'pending'`, encoded as hexadecimal starting with "0x".

  - `toBlock` - (Optional) Integer block number, or the string `'latest'`, `'earliest'` or `'pending'`, encoded as hexadecimal starting with "0x".

  - `address` - (Optional) Contract address, or a list of addresses from which the logs should originate.

  - `topics` - (Optional) Array of DATA topics. Topics are order-dependent. Go here to learn more about topics.


**Returns:** 

`result` - Returns a filter ID to be used when calling eth_getFilterChanges.

**Code Examples:**

> **Note:** cURL needs a `HEX String`  starting with "0x" to identify the block parameter.
> 
> For example: block number 14000000 will be 0xD59F80.

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
newBlockFilterId = web3.eth.filter('latest') 
newFilterId = web3.eth.filter({
  'fromBlock': "14915418",      # An integer encoded as hexadecimal starting with "0x" is accepted as well. 
  'toBlock': "latest",
  'address': '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
})
print(newFilterId)
```

</template>
<template v-slot:js>

``` js
// Web3.js does not support this feature. See Web3.js subscriptions - subscribe(“logs”).
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_newFilter","params":[{"fromBlock": "0xE3975A", "toBlock": "0x6C6174657374", "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984","topics": []}], "jsonrpc":"2.0", "id":1}'
```

</template>
</CodeSwitcher>

### eth_newPendingTransactionFilter

Creates a filter object to notify when new pending transactions are detected. To check if the state has changed, call eth_getFilterChanges.

**Parameters:**  

`none`


**Returns:** 

`result` - Returns a filter ID to be used when calling eth_getFilterChanges.

**Code Examples:**

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
newFilterId = web3.eth.filter('pending') 
print(newFilterId) 
```

</template>
<template v-slot:js>

``` js
// Web3.js does not support this feature. See Web3.js subscriptions - subscribe("pendingTransactions").
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_newPendingTransactionFilter","params":[], "jsonrpc":"2.0","id":1}'
```

</template>
</CodeSwitcher>

### eth_protocolVersion

Returns the current version of the Ethereum protocol.

**Parameters:**  

`none`


**Returns:** 

`result` - Current Ethereum protocol version in string format.

**Code Examples:**

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL"  
print (web3.eth.protocol_version) 
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.getProtocolVersion()
    .then(console.log); // note that the result is returned in hexadecimal starting with "0x"
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_protocolVersion","params":[], "jsonrpc":"2.0","id":1}'
```

</template>
</CodeSwitcher>

### eth_sendRawTransaction

Creates a new message call transaction. Or contract creation for signed transactions. 

**Parameters:**  

`data` - The signed transaction. Typically, signed with a library such as web3.py or web3.js using the sender's private key.

**Returns:** 

`result` - The transaction hash or the zero hash if the transaction is not yet available.

**Code Examples:**

> **Note:**
>
> The Ropsten testnet was used in this example. 
>
> Web3.js Requires the ethereumjs-tx module. 
> Install with:
> 
> ```npm install ethereumjs-tx```

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 

# Logic of this code:
    # Set the addresses and private key to sign the transaction
    # Build transaction 
    # Sign and send the transaction  

# Adresses and private key
sender = 'SENDER ADDRESS' 
receiver = 'RECEIVER ADDRESS' 
privateKey ='PRIVATE KEY'   

# build the transaction 
tx = { 
    'nonce' : web3.eth.getTransactionCount(sender), 
    'to': receiver, 
    'value': web3.toWei(0.5, 'ether'), # value to send 
    'gas': 21000, 
    'maxFeePerGas' : web3.eth.gas_price,
    'maxPriorityFeePerGas' : web3.toWei(1, 'gwei'),
    'chainId' : web3.eth.chain_id, 
}  

# sign tx 
signed_tx = web3.eth.account.signTransaction(tx, privateKey)  

# send transaction 
tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction) 

print('Transaction hash:', web3.toHex(tx_hash)) 

```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
var Tx = require('ethereumjs-tx').Transaction;

// Logic of this code:
    // Set the addresses and private key to sign the transaction
    // Build transaction 
    // Sign and send the transaction 

// Addresses and private key
const sender = "SENDER ADDRESS";
const receiver = "RECEIVER ADDRESS";
const private_key = Buffer.from('PRIVATE KEY', "hex"); 

// Build the transaction
web3.eth.getTransactionCount(sender, (err, transactionCount) => {
    const transaction_Object = {
        to: receiver,
        gasPrice: web3.utils.toHex(web3.utils.toWei("20", "gwei")),
        gasLimit: web3.utils.toHex(21000),
        nonce: web3.utils.toHex(transactionCount),
        value: web3.utils.toHex(web3.utils.toWei("0.5", "ether")),
    };

    // Signing the transaction 

    // create a new transaction object to sign 
    const tx = new Tx(transaction_Object, {
        chain: "ropsten"
    });

    // sign the transaction using the private key  
    tx.sign(private_key);

    //   Send signed transaction to the blockchain 
    const sTx = tx.serialize();
    const rawTransaction = "0x" + sTx.toString("hex");

    web3.eth.sendSignedTransaction(rawTransaction, (err, hash) => {
        console.log("TxHash:" + hash);
        console.log(err);
    });
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_sendRawTransaction","params":["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"], "jsonrpc":"2.0","id":1}'
```

</template>
</CodeSwitcher>

> **Note:** Since ```eth_sendRawTransaction``` is a request used for writing to the blockchain and changing its state, it is not possible to execute the same request again. If you were to copy the cURL example given above, you will not get the expected response.

### eth_syncing

Returns an object with the sync status of the node when the node is out-of-sync and is syncing. Returns `false` when the node is already in sync.

**Parameters:**  

`none`


**Returns:** 

`result` - Boolean value `false` when not syncing, or a JSON Object when syncing:

  - `startingBlock` - The block at which the import started, encoded as hexadecimal.

  - `currentBlock` - The current block, same as eth_blockNumber, encoded as hexadecimal.

  - `highestBlock` - The estimated highest block encoded as hexadecimal.

**Code Examples:**

<CodeSwitcher :languages="{py:'web3.py',js:'web3.js', cr:'cURL'}">
<template v-slot:py>

``` py
web3 import Web3  
node_url = "CHAINSTACK_NODE_URL" 
print (web3.eth.syncing)  
```

</template>
<template v-slot:js>

``` js
var Web3 = require('web3');
var node_URL = ' CHAINSTACK_NODE_URL ';
var web3 = new Web3(node_URL);
web3.eth.isSyncing((err, sync) => {
    console.log(sync)
})
```

</template>
<template v-slot:cr>

``` sh
curl -X POST 'CHAINSTACK_NODE_URL' \
  -X POST \
  -H "Content-Type: application/json" \ 
  --data '{"method":"eth_syncing", "jsonrpc":"2.0","params":[],"id":1}'
```

</template>
</CodeSwitcher>

## Web3.js subscriptions

Subscriptions allow subscribing to specific events in the blockchain using the ```web3.eth.subscribe``` method.

Check the [web3.js docs](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-subscribe.html) for more details.

Subscriptions require the use of a WebSocket endpoint in web3.js. 

Follow these steps to sign up on Chainstack, deploy a node, and find your endpoint credentials.
1. [Sign up with Chainstack](https://console.chainstack.com/user/account/create)
1. [Deploy a full node](https://docs.chainstack.com/platform/join-a-public-network)
1. [View node access and credentials](https://docs.chainstack.com/platform/view-node-access-and-credentials)

A Chainstack node WSS endpoint looks like this:

```sh
wss://ws-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

### subscribe(“newBlockHeaders”)

Subscribes to incoming block headers. Similar to ```eth_newBlockFilter```.

**Parameters:**  

`String` - `"newBlockHeaders"`; identifying the type of subscription.

`Function` - (optional) Optional callback. Returns an error object as the first parameter and the result as the second parameter. It will be called for each incoming subscription.


**Returns:** 

`EventEmitter` - A [subscription instance](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-subscribe.html#eth-subscription-return) as an event emitter with the following events:

  - `data` returns `Object` - Fires on each incoming block header.

  - `error` returns `Object` - Fires when an error in the subscription occurs.

  - `connected` returns `Number` - Fires once after the subscription is successfully connected. Returns the subscription ID.

**Code Example:**

```js
var Web3 = require('web3');

var node_URL = 'CHAINSTACK_WSS_URL';
var web3 = new Web3(node_URL)

var newBlocks = web3.eth.subscribe('newBlockHeaders', function(error, result) {
        if (!error) {
            console.log(result);

            return;
        }

        console.error(error);
    })
    .on("connected", function(subscriptionId) {
        console.log(subscriptionId);
    })
    .on("data", function(blockHeader) {
        console.log(blockHeader);
    })
    .on("error", console.error);

// unsubscribe the subscription
newBlocks.unsubscribe(function(error, success) {
    if (success) {
        console.log('Successfully unsubscribed!');
    }
});
```

### subscribe(“pendingTransactions”)

Subscribes to incoming pending transactions. Similar to ```eth_newPendingTransactionFilter```.

**Parameters:**  

`String` - `"pendingTransactions"`; identifying the type of subscription.

`Function` - (optional) Optional callback. Returns an error object as the first parameter and the result as the second parameter. It will be called for each incoming subscription.


**Returns:** 

`EventEmitter` - A [subscription instance](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-subscribe.html#eth-subscription-return) as an event emitter with the following events:

  - `data` returns `string` - Fires on each incoming pending transaction and returns the transaction hash.

  - `error` returns `Object`: Fires when an error in the subscription occurs.

**Code Example:**

```js
var Web3 = require('web3');

var node_URL = 'CHAINSTACK_WSS_URL';
var web3 = new Web3(node_URL)

var pendingTx = web3.eth.subscribe('pendingTransactions', function(error, result) {
        if (!error)
            console.log(result);
    })
    .on("data", function(transaction) {
        console.log(transaction);
    });

// unsubscribe the subscription
pendingTx.unsubscribe(function(error, success) {
    if (success)
        console.log('Successfully unsubscribed!');
});
```
### subscribe(“logs”)

Subscribes to incoming logs, filtered by the given options. If a valid numerical `fromBlock` options property is set, Web3 will retrieve the logs beginning from that point, backfilling the response as necessary.

**Parameters:**  

`String` - `"logs"`; identifying the type of subscription.

`Object` - The subscription options:

  - `fromBlock` - `Number`- The number of the earliest block. By default `null`.

  - `address` - `String|Array`- An address or a list of addresses to only get logs from particular account(s).

  - `topics` - `Array` - An array of values which must each appear in the log entries. The order is important. If you want to leave topics out, use `null`; e.g. `null, '0x00...'`. You can also pass another array for each topic with options for that topic e.g. `null, ['option1', 'option2']`.

  - `callback` - `Function` - (optional) Optional callback, returns an error object as first parameter and the result as second. Will be called for each incoming subscription.

**Returns:** 

`EventEmitter` - A [subscription instance](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-subscribe.html#eth-subscription-return) as an event emitter with the following events:

  - `data` returns `object` - Fires on each incoming log with the log object as the argument.

  - `changed` returns `Object`- Fires on each log removed from the blockchain. The log will have the additional property `removed: true`.

  - `error` returns `Object`- Fires when an error in the subscription occurs.
  
  - `connected` returns `Number`- Fires once after the subscription is successfully connected. Returns the subscription ID.

**Code Example:**

```js
var Web3 = require('web3');

var node_URL = 'CHAINSTACK_WSS_URL';
var web3 = new Web3(node_URL)

var logs = web3.eth.subscribe('logs', {
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        topics: []
    }, function(error, result) {
        if (!error)
            console.log(result);
    })
    .on("connected", function(subscriptionId) {
        console.log(subscriptionId);
    })
    .on("data", function(log) {
        console.log(log);
    })
    .on("changed", function(log) {});

// unsubscribe the subscription
logs.unsubscribe(function(error, success) {
    if (success)
        console.log('Successfully unsubscribed!');
})
```
