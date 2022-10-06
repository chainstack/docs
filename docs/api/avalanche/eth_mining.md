---
meta:
  - name: description
    content: eth_mining JSON-RPC method for the Avalanche API available with examples in web3.js, web3.py, eth.rb, and cURL.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby Avalanche 
---

# Avalanche eth_mining RPC method

Avalanche API method that returns a boolean value referring to the node mining activity. Will return `True` if the node is actively mining new blocks. 

**Parameters:**  

* `none` 

**Returns:** 

* `result` - Boolean value `True` if the node is mining, otherwise `False`.

**Example:**

<CodeSwitcher :languages="{js:'web3.js', py:'web3.py', rb:'eth.rb', cr:'cURL'}">
<template v-slot:js>

``` js
// not supported, consensus engine is not ethash.
```

</template>
<template v-slot:py>

``` py
# Not supported, consensus engine is not ethash.
```

</template>
<template v-slot:rb>

``` rb
# Not supported, consensus engine is not ethash.
```

</template>
<template v-slot:cr>

``` sh
# Not supported, consensus engine is not ethash.
```

</template>
</CodeSwitcher>