---
meta:
  - name: description
    content: View the access and credentials of your nodes deployed with the Chainstack managed blockchain services.
  - name: keywords
    content: blockchain node access credentials network
---

# View node access and credentials

To view the access information:

1. Click your project.
1. Click your network.
1. Click the node name.

This will give you the access and credentials to your nodes.

## Public chain nodes

### Access and credentials

Your node connection endpoints.

Examples:

* HTTPS: `https://nd-868-290-632.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d`
* WSS: `wss://ws-nd-868-290-632.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d`

### Password-protected access and credentials

Your node connection endpoints protected with [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).

To use the endpoint with Basic Authentication, you must provide the username and password in the URL:

* HTTPS: `https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com`
* WSS: `wss://user-name:pass-word-pass-word-pass-word@ws-nd-123-456-789.p2pify.com`

Example to get the latest block information from an EVM-based node:

``` sh
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest", false],"id":1}' https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com
```

You can also pass the username and password in the HTTP header:

``` sh
curl -i \
    -H 'Accept: application/json' \
    -H 'Authorization: Basic BASE64_STRING' \
    --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest", false],"id":1}' \
    ENDPOINT
```

where

* BASE64_STRING — the Base64 encoded string of your USERNAME:PASSWORD pair.
* ENDPOINT — your node HTTPS endpoint.

Example to get the latest block information from an EVM-based node:

``` sh
curl -i \
    -H 'Content-Type: application/json' \
    -H 'Authorization:Basic dXNlci1uYW1lOnBhc3Mtd29yZC1wYXNzLXdvcmQtcGFzcy13b3Jk' \
    --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest", false],"id":1}' \
    https://nd-123-456-789.p2pify.com
```

## Consortium nodes

If you are an invited [member](/glossary/member) of a [consortium project](/glossary/consortium-project), you will be able to see the basic access information of other nodes in the project.

[Quorum](/blockchains/quorum) has the node access set up in the same way as [public chain nodes](#public-chain-nodes).

::: tip See also

* [Project](/glossary/project)
* [Operations: Ethereum](/operations/ethereum/)
* [Operations: Polygon PoS](/operations/polygon/)
* [Operations: Binance Smart Chain](/operations/bsc/)
* [Operations: Tezos](/operations/tezos/)
* [Operations: Bitcoin](/operations/bitcoin/)
* [Operations: Hyperledger Fabric](/operations/fabric/)
* [Operations: Corda](/operations/corda/)
* [Operations: Quorum](/operations/quorum/)
* [Operations: MultiChain](/operations/multichain/)

:::
