# Tools

## Interaction tools

Interact with your Bitcoin nodes using [JSON-RPC API](https://en.bitcoin.it/wiki/API_reference_(JSON-RPC)#JSON-RPC).

Use [curl](https://curl.haxx.se) or [Postman](https://www.getpostman.com) to invoke [Bitcoin API methods](https://bitcoin.org/en/developer-reference#bitcoin-core-apis).

Example below demonstrates how to get basic network information:

``` sh
curl https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com -d '{"method":"getblockchaininfo","params":[],"id":1}'
```

## Development tools

### Python

Work with Bitcoin from your Python application.

1. Install [bitcoincli](https://github.com/chainstack/bitcoincli).

2. Configure the client to use `host` and `port` of the node RPC endpoint, the corresponding RPC `username`, and `password`:

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
u'pruned': False, u'blocks': 603485, u'chainwork': u'00000000000000000000000000000000000000000a07642616c80b44959233ce'...}
```

::: tip See also

* [Supported protocols](/platform/supported-protocols)

:::
