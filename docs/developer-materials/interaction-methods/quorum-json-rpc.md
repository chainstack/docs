# Quorum JSON-RPC API

Interact with your Quorum network using [Geth JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) and [Quorum API](https://docs.goquorum.com/en/latest/Getting%20Started/api/).

Use [curl](https://curl.haxx.se) or [Postman](https://www.getpostman.com) to invoke [Geth JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) and [Quorum API](https://docs.goquorum.com/en/latest/Getting%20Started/api/).

Example below demonstrates how to get basic network information:

``` sh
$ curl -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":2}' \
  http://nd-123-456-789.p2pify.com:8545

{"jsonrpc":"2.0","id":2,"result":"0x4"}
```

::: tip See also
* [Quorum Truffle](/developer-materials/development-tools/quorum-truffle)
* [Quorum Geth](/developer-materials/interaction-methods/quorum-geth)
:::