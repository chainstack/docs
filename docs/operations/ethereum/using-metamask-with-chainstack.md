# Using MetaMask with Chainstack

You can set your [MetaMask](https://metamask.io/) to interact your Ethereum nodes deployed with Chainstack.

1. Open your MetaMask and then the network selector:

![Network Selector](./assets/using-metamask-wth-chainstack/metamask-network-selector.png)

2. In the network selector, click **Custom RPC**:

![Custom RPC](./assets/using-metamask-wth-chainstack/metamask-custom-rpc.png)

3. In the **New RPC URL** field, enter the URL in the following format:

```
https://USERNAME:PASSWORD@RPC_ENDPOINT
```

where

* USERNAME — your Ethereum node access username.
* PASSWORD — your Ethereum node access password.
* RPC_ENDPOINT — your Ethereum node RPC endpoint.

See [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

![Chainstack RPC](./assets/using-metamask-wth-chainstack/metamask-chainstack-rpc.png)

4. Click **Save**.

Your MetaMask will now interact through your Ethereum nodes deployed with Chainstack.

::: tip See also:

* [Tools](/operations/ethereum/tools)

:::