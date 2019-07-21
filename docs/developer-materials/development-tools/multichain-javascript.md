# MultiChain JavaScript

Work with MultiChain from your JavaScript application.

1. Install [multinodejs](https://github.com/sdec-brasil/multinodejs)

2. Configure the client to use `host` of the node RPC endpoint and the corresponding RPC `user` and `pass`:

``` js
let multichain = require("multinodejs")({
    host: "nd-123-456-789.p2pify.com",
    protocol: "https",
    user: "amazing-crier",
    pass: "puppy-amino-volhard-dash-baggie-marrow"
});
```

3. Invoke any methods from the [MultiChain API specification](http://www.multichain.com/developers/json-rpc-api/)

``` js
multichain.getInfo((err, info) => {
    if (err) {
        throw err;
    }
    console.log(info);
});
```

The example code above should output basic network information:

``` js
{ version: '2.0',
  nodeversion: 20000901,
  protocolversion: 20004,
  chainname: 'nw-123-456-7',
  ... }
```

::: tip See also
* [MultiChain Python](/developer-materials/development-tools/multichain-python)
:::