---
meta:
  - name: description
    content: eth_sendRawTransaction JSON-RPC method for the Avalanche API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby Avalanche 
---

# eth_sendRawTransaction

Avalanche API method that creates a new message call transaction. Or contract creation for signed transactions. 

**Parameters:**  

* `data` - The signed transaction. Typically, signed with a library such as web3.py or web3.js using the sender's private key.

**Returns:** 

* `result` - The transaction hash or the zero hash if the transaction is not yet available.

**Example:**

::: tip
You can use a testnet.
Web3.js Requires the [ethereumjs-tx](https://github.com/ethereumjs/ethereumjs-monorepo) package. 
Install with `npm install ethereumjs-tx`.
:::

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");

const Tx = require("ethereumjs-tx").Transaction;
const Common = require("ethereumjs-common").default;

// Connect to the node
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);

// Logic of this code:
    // Set the addresses and private key to sign the transaction
    // Build transaction 
    // Sign and send the transaction 

// Addresses and private key
const sender = "SENDER_ADDRESS";
const receiver = "RECEIVER_ADDRESS";
const private_key = Buffer.from("PRIVATE_KEY", "hex"); 

// Build the transaction

// Gas limit
const gasLimit = web3.eth.estimateGas({
  from: sender,
  to: receiver,
})

web3.eth.getTransactionCount(sender, (err, transactionCount) => {
    const transaction_Object = {
        to: receiver,
        gasPrice: web3.utils.toHex(web3.utils.toWei("50", "gwei")),
        gasLimit: web3.utils.toHex(gasLimit),
        nonce: web3.utils.toHex(transactionCount),
        value: web3.utils.toHex(web3.utils.toWei("1", "ether")),
    };

    // Signing the transaction 

    // ethereumjs-tx supports the Ethereum ecosystem by default; set up a custom chain with the following code. 
    const common = Common.forCustomChain(
      "mainnet",
      {
        name: "avalanche-mainnet", //avalanche-testnet
        networkId: 43114, //43113
        chainId: 43114, //43113
      },
      "petersburg",
    );
  
      // create a new transaction object to sign 
      const tx = new Tx(transaction_Object, {
        common,
      });

    // sign the transaction using the private key  
    tx.sign(private_key);

    // Send signed transaction to the blockchain 
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
sender = "SENDER_ADDRESS" 
receiver = "RECEIVER_ADDRESS" 
privateKey ="PRIVATE_KEY"   

# Gas limit
gas_limit = web3.eth.estimate_gas({"from":sender,"to":receiver}, "latest" )

# build the transaction 
tx = { 
    "nonce" : web3.eth.getTransactionCount(sender), 
    "to": receiver, 
    "value": web3.toWei(1, "ether"), # value to send 
    "gas": gas_limit, 
    "gasPrice" : web3.eth.gas_price,
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
amount = 1000000000000000000 # in Wei
client.gas_limit=21000
client.gas_price=0.3e11
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