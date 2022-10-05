---
meta:
  - name: description
    content: Solana Web3.js API subscriptions JSON-RPC methods details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py Solana web3.js eth.rb javascript python
---

# Solana API WebSocket subscriptions

The Solana API subscriptions allow subscribing to specific events in the blockchain.

Check the [Solana docs](https://docs.solana.com/developing/clients/jsonrpc-api#subscription-websocket) for more methods and information.

> The Solana API subscriptions require the use of a WebSocket endpoint.

::: tip

* Multiple subscriptions may be active at once.
* Many subscriptions take the optional commitment parameter, defining how finalized a change should be to trigger a notification. If `commitment` is unspecified, the default value is `finalized` for subscriptions.

:::

Follow these steps to sign up on Chainstack, deploy a node, and find your WSS endpoint credentials.

1. <a href="https://console.chainstack.com/user/account/create" target="_blank">Sign up with Chainstack</a>.
1. [Deploy a node](/platform/join-a-public-network#join-a-polygon-pos-network).
1. [View node access and credentials](/platform/view-node-access-and-credentials).


## Solana.py 

To use the Solana API subscriptions with the `solana.py` library, install the `asyncstdlib` package with:

```sh
pip install asyncstdlib
```

## cURL

To use the Solana API subscriptions with cURL, use the code example as a message body in a WebSocket request in Postman.

## Solana API Subscribe methods

* [accountSubscribe](/api/solana/accountsubscribe)
* [accountUnsubscribe](/api/solana/accountunsubscribe)
* [logsSubscribe](/api/solana/logssubscribe)
* [logsUnsubscribe](/api/solana/logsunsubscribe)
* [slotSubscribe](/api/solana/slotsubscribe)
* [slotUnsubscribe](/api/solana/slotunsubscribe)