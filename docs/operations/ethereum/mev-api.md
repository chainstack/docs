---
meta:
  - name: description
    content: Learn why you need a MEV Geth node and how to simulate a MEV transaction.
  - name: keywords
    content: ethereum mev node flashbots bundle transaction goerli
---

# MEV API

For information on MEV and the Flashbots organization, see [Flashbots Docs](https://docs.flashbots.net/).

Chainstack supports the MEV Geth implementation on the following Ethereum networks:

* Mainnet — simulate against the main chain with a Chainstack MEV node and send the transaction through the Flashbots relay at `relay.flashbots.net`.
* Goerli testnet — simulate against the Goerli chain with a Chainstack MEV node and send the transaction through the Flashbots relay at `relay-goerli.flashbots.net`

The lifecycle of a MEV transaction is the following:

1. Simulate a transaction before sending it to the miners to determine if the transaction is profitable. The simulation takes time and this where you use a Chainstack MEV node to save the time.
1. Send the simulated transaction through the Flashbots relay.

## Example

Simulate a transaction with [eth_callBundle](https://docs.flashbots.net/flashbots-auction/searchers/advanced/rpc-endpoint#eth_callbundle):

``` sh
curl -X POST -H 'Content-Type: application/json' --data '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "eth_callBundle",
    "params": [
        {
            "txs": [
                "RAW_TRANSACTION"
            ],
            "blockNumber": "HEX_BLOCK_NUMBER",
            "stateBlockNumber": "HEX_BLOCK_NUMBER"
        }
    ]
}' ENDPOINT
```

where

* RAW_TRANSACTION — the signed raw transaction.
* HEX_BLOCK_NUMBER — the block number in hex against which to simulate the transaction.
* ENDPOINT — your node HTTPS endpoint.

See also [View node access and credentials](/platform/view-node-access-and-credentials).

For example, simulate [this MEV transaction on Goerli](https://goerli.etherscan.io/tx/0xdecd8b3beb100bbba0d5e2edd4cf30cefe8fca44986e578e7e8d88fef7440f54) against block `7073267`:

``` sh
curl -X POST -H 'Content-Type: application/json' --data '{
    "id": 1337,
    "jsonrpc": "2.0",
    "method": "eth_callBundle",
    "params": [
        {
            "txs": [
                "0xf85f170a82a7f894957b500673a4919c9394349e6bbd1a66dc7e593980802ea058b46cd5d058d30f61b68222c1e1ff57baba627d9e6277e297db65b711c312b4a040fe3aff8be3730987b6e9a458277cd20df1e7a3bf02a4cd6071489f9bf37184"
            ],
            "blockNumber": "0x6BEDF3",
            "stateBlockNumber": "0x6BEDF3"
        }
    ]
}' https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

::: tip See also

* [Networks](/operations/ethereum/networks)
* [Tools](/operations/ethereum/tools)
* [Tutorials](/tutorials/ethereum/)

:::
