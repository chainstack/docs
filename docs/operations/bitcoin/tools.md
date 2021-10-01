---
meta:
  - name: description
    content: Learn how to interact with your Bitcoin node using JSON-RPC API. Learn how to connect a Python application to your Bitcoin node.
  - name: keywords
    content: bitcoin node rpc python api
---

# Tools

## Interaction tools

Interact with your Bitcoin nodes using [JSON-RPC API](https://en.bitcoin.it/wiki/API_reference_(JSON-RPC)#JSON-RPC).

Use [curl](https://curl.haxx.se) or [Postman](https://www.getpostman.com) to invoke [Bitcoin API methods](https://bitcoin.org/en/developer-reference#bitcoin-core-apis).

Example below demonstrates how to get basic network information from your Bitcoin node HTTPS endpoint:

<CodeSwitcher :languages="{kp:'Key-protected',pp:'Password-protected'}">
<template v-slot:kp>

``` sh
curl https://nd-111-639-677.p2pify.com/a5a80713a6036780d64fed1f52fe33cc -d '{"method":"getblockchaininfo","params":[],"id":1}'
```

</template>
<template v-slot:pp>

``` sh
curl https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com -d '{"method":"getblockchaininfo","params":[],"id":1}'
```

</template>
</CodeSwitcher>

## Development tools

### Python

Work with Bitcoin from your Python application.

1. Install [bitcoincli](https://github.com/chainstack/bitcoincli).

2. Configure the client to use `host` and `port` of the node HTTPS endpoint, the corresponding node `username`, and `password`:

``` python
from bitcoincli import Bitcoin

host = "nd-111-639-677.p2pify.com"
port = "80"
username = "hardcore-booth"
password = "fling-uptake-daily-ankle-citrus-maggot"

bitcoin = Bitcoin(username, password, host, port)
```

3. Invoke any methods from the [Bitcoin API specification](https://bitcoin.org/en/developer-reference#bitcoin-core-apis):

``` python
info = bitcoin.getblockchaininfo()
print(info)
```

