# MultiChain Python

Work with MultiChain from your Python application.

1. Install [multichaincli](https://github.com/chainstack/multichaincli).

2. Configure the client to use `host` and `port` of the node RPC endpoint, the corresponding RPC `username` and `password` and network `chainname`:

``` python
from multichaincli import Multichain

host = "nd-123-456-789.p2pify.com"
port = "80"
username = "amazing-crier"
password = "puppy-amino-volhard-dash-baggie-marrow"
chainname = "nw-123-456-7"

multichain = Multichain(username, password, host, port, chainname)
```

3. Invoke any methods from the [MultiChain API specification](http://www.multichain.com/developers/json-rpc-api/)

``` python
info = multichain.getinfo()
print(info)
```

The example code above should output basic network information:

``` python
{'version': '2.0', 'nodeversion': 20000901, 'protocolversion': 20004, 'chainname': 'nw-123-456-7', ... }
```

::: tip See also
* [MultiChain JavaScript](/developer-materials/development-tools/multichain-javascript)
:::