# MultiChain JSON-RPC API

Interact with your MultiChain nodes using [JSON-RPC API](https://www.multichain.com/developers/json-rpc-api/).

Use [curl](https://curl.haxx.se) or [Postman](https://www.getpostman.com) to invoke [MultiChain API methods](https://www.multichain.com/developers/json-rpc-api/).

Example below demonstrates how to get basic network information:

``` sh
$ curl -H "Content-Type: application/json" \
  -u amazing-crier:puppy-amino-volhard-dash-baggie-marrow
  -d '{"method":"getinfo","params":[],"id":1,"chain_name":"nw-123-456-7"}' \
  https://nd-123-456-789.p2pify.com:8545

{"result":{"version":"2.0","nodeversion":20000901,"protocolversion":20004,"chainname":"nw-123-456-7", ...}
```

::: tip See also
* [MultiChain JavaScript](/developer-materials/development-tools/multichain-javascript)
* [MultiChain Python](/developer-materials/development-tools/multichain-python)
:::