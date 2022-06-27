---
meta:
  - name: description
    content: Learn what Warp transactions are on Chainstack.
  - name: keywords
    content: bsc bnb binance node warp speed transactions bloxroute
---

# Warp transactions

Chainstack supports propagating your transaction through the high-speed [bloXroute transaction relay network](https://docs.bloxroute.com/bdn-architecture). The feature is called *Warp transactions*.

With the *Warp transactions* setting on, your transactions will be distributed in the BNB Smart Chain mempool through the high-speed transaction relay network. This will make your transaction be available for the validators to pick up and include in the block much faster than with the regular mempool propagation.

## Usage

The Warp transactions feature is available starting from the <a href="https://chainstack.com/pricing/" target="_blank">Growth plan</a>.

There is a number of monthly allocated Warp transactions included in the plan. Each extra Warp transaction consumed is billed separately. For details, see <a href="https://chainstack.com/pricing/" target="_blank">Pricing</a>.

Under the hood, a Warp transaction is a transaction sent to your node with the `eth_sendRawTransaction` method. For example, if you send your transaction with your MetaMask connected to a Chainstack node, the transaction will be sent using `eth_sendRawTransaction`.

With the *Warp transactions* setting on, only `eth_sendRawTransaction` transactions are consumed as Warp transactions. Other requests to the node are consumed as regular requests.

::: tip See also

* [Networks](/operations/bsc/networks)
* [Tools](/operations/bsc/tools)
* [Tutorials](/tutorials/bsc/)

:::
