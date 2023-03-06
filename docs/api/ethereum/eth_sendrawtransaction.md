---
meta:
  - name: description
    content: eth_sendRawTransaction JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum
---

# Ethereum eth_sendRawTransaction RPC method

Ethereum API method that creates a new message call transaction. Or contract creation for signed transactions.

**Parameters:**  

* `data` — the signed transaction. Typically, signed with a library such as web3.py or web3.js using the sender's private key.

**Returns:**

* `result` — the transaction hash or the zero hash if the transaction is not yet available.

**Example:**

::: tip Information
You can use a testnet.
Web3.js requires the [ethereumjs-tx](https://github.com/ethereumjs/ethereumjs-monorepo) package.
Install with `npm install ethereumjs-tx`.
:::

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);
var Tx = require("ethereumjs-tx").Transaction;

// Logic of this code:
    // Set the addresses and private key to sign the transaction
    // Build transaction
    // Sign and send the transaction

// Addresses and private key
const sender = "SENDER_ADDRESS";
const receiver = "RECEIVER_ADDRESS";
const private_key = Buffer.from("PRIVATE_KEY", "hex");

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
        chain: "mainnet"
    });

    // sign the transaction using the private key  
    tx.sign(private_key);

    //   Send signed transaction to the blockchain
    const sTx = tx.serialize();
    const rawTransaction = "0x" + sTx.toString("hex");

    web3.eth.sendSignedTransaction(rawTransaction, (err, hash) => {
        console.log("TxHash:" + hash);
        //console.log(err);
    });
})
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  

# Create the node connection
node_url = "CHAINSTACK_NODE_URL"
web3 = Web3(Web3.HTTPProvider(node_url))

# Logic of this code:
    # Set the addresses and private key to sign the transaction
    # Build transaction
    # Sign and send the transaction  

# Adresses and private key
sender = "SENDER ADDRESS"
receiver = "RECEIVER ADDRESS"
privateKey ="PRIVATE KEY"   

# Gas limit
gas_limit = web3.eth.estimate_gas({"from":sender,"to":receiver}, "latest" )

# build the transaction
tx = {
    "nonce" : web3.eth.getTransactionCount(sender),
    "to": receiver,
    "value": web3.toWei(1, "ether"), # value to send
    "gas": gas_limit,
    "maxFeePerGas" : web3.eth.gas_price,
    "maxPriorityFeePerGas" : web3.toWei(1, "gwei"),
    "chainId" : web3.eth.chain_id,
}  

# sign tx
signed_tx = web3.eth.account.signTransaction(tx, privateKey)  

# send transaction
tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)

print("Transaction hash:", web3.toHex(tx_hash))

```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
key = Eth::Key.new priv:"PRIVATE_KEY"
destination = Eth::Address.new "DESTINATION_ADDRESS"
amount = 10000000000000000 # in Wei
client.gas_limit=21000
client.max_priority_fee_per_gas=0.3e11
client.max_fee_per_gas=0.31e11
response = client.transfer_and_wait(destination, amount, sender_key = key, legacy = false)
puts response
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_sendRawTransaction","params":["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"], "jsonrpc":"2.0","id":1}'
```

</template>
</CodeSwitcher>

::: tip
Since `eth_sendRawTransaction` is a request used for writing to the blockchain and changing its state, it is not possible to execute the same request again. If you were to copy the cURL example given above, you will not get the expected response.
:::
