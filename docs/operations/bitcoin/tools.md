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
curl https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d -d '{"method":"getblockchaininfo","params":[],"id":1}'
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

host = "nd-123-456-789.p2pify.com"
port = "80"
username = "user-name"
password = "pass-word-pass-word-pass-word"

bitcoin = Bitcoin(username, password, host, port)
```

3. Invoke any methods from the [Bitcoin API specification](https://bitcoin.org/en/developer-reference#bitcoin-core-apis):

``` python
info = bitcoin.getblockchaininfo()
print(info)
```

The example code above should output basic network information:

``` python
{u'pruned': False, u'blocks': 603580, u'chainwork': u'00000000000000000000000000000000000000000a0baf330c67a89653c67005', u'chain': u'main', u'difficulty': 12720005267390.51, u'bip9_softforks': {u'csv': {u'status': u'active', u'since': 419328, u'timeout': 1493596800, u'startTime': 1462060800}, u'segwit': {u'status': u'active', u'since': 481824, u'timeout': 1510704000, u'startTime': 1479168000}}, u'warnings': u'', u'softforks': [{u'version': 2, u'id': u'bip34', u'reject': {u'status': True}}, {u'version': 3, u'id': u'bip66', u'reject': {u'status': True}}, {u'version': 4, u'id': u'bip65', u'reject': {u'status': True}}], u'initialblockdownload': False, u'headers': 603580, u'mediantime': 1573647950, u'verificationprogress': 0.9999919488385801, u'bestblockhash': u'000000000000000000068b536474a44f9e0a0a0ab6be75d9afdaddc8c513bcea', u'size_on_disk': 282597514457}
```

::: tip See also

* [Supported protocols](/platform/supported-protocols)

:::
