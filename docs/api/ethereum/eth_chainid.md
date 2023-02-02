---
meta:
  - name: description
    content: eth_chainId JSON-RPC method details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb ethers javascript python ruby ethereum
---

# Ethereum eth_chainId RPC method

Ethereum API method that returns the current chain ID. Chain ID is used to sign replay-protected transactions and generally verify if a network is the desired one. It was introduced in [EIP-155](https://eips.ethereum.org/EIPS/eip-155).

**Parameters:**

* `none`

**Returns:**

* `quantity` — EIP-155 Chain ID.

## Example:

<CodeSwitcher :languages="{js:'web3.js', eth:'ethers.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
const Web3 = require("web3");
const node_url = "CHAINSTACK_NODE_URL";
const web3 = new Web3(node_url);

web3.eth.getChainId((err, chain) => {
    console.log(chain)
})
```

</template>
<template v-slot:eth>

``` js
const ethers = require('ethers');
const node_url = "CHAINSTACK_NODE_URL";
const provider = new ethers.providers.JsonRpcProvider(node_url);

const eth_chainId = async () => {
    const chain_Id = await provider.send("eth_chainId");
    console.log(chain_Id);
  };

eth_chainId();
```

</template>
<template v-slot:py>

``` py
from web3 import Web3  
node_url = "CHAINSTACK_NODE_URL"  

web3 = Web3(Web3.HTTPProvider(node_url))
print(web3.eth.chain_id)  
```

</template>
<template v-slot:rb>

``` rb
require "eth"
client = Eth::Client.create "CHAINSTACK_NODE_URL"
response = client.chain_id
puts response
```

</template>
<template v-slot:cr>

``` sh
curl -X POST "CHAINSTACK_NODE_URL" \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_chainId","params":[],"id":1,"jsonrpc":"2.0"}'
```

</template>
</CodeSwitcher>

## Use case

One of the possible use cases for the `chain_id` method in Ethereum is to determine which chain a user is connected to when using a DApp with the MetaMask browser extension. This can be useful to provide a customized user experience based on the specific chain that the user is interacting with.

Here is an example of how the `chain_id` method might be used in this context with MetaMask. Note that the chain ID is returned as a hexadecimal value:

```js
// Check which network is selected on MetaMask
async function checkChain() {

    // Declare the desired chain ID to match
    const desiredChainId = '0x1'; // Ethereum mainnet chain ID

    // Retrieve the current Chain ID selected by the user
    ethereum.request({
        method: 'eth_chainId'
    }).then(chainId => {

        // compare the actual chain ID it to the declared chain ID
        if (chainId !== desiredChainId) {
            console.log(`You are currently on the wrong network. Please switch to the mainnet.`);

            // call the promtSwitch function
            promtSwitch()
        } else {
            console.log("This is the correct network")
        }
    })
}

// Prompt user to switch to a determined network based on the chain ID
async function promtSwitch() {

    await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{
            chainId: '0x1' // chainId must be in HEX with 0x in front
        }],
    });
}
```

In this case, the `checkChain` function is called to get the current chain ID using the Ethereum object provided by MetaMask. The chain ID is then checked to determine if the user is connected to the Ethereum mainnet and call the `promtSwitch` function to prompt the user to switch network in case the chain ID does not match the `desiredChainId` constant.
