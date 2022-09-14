---
meta:
  - name: description
    content: Web3.js Ethereum API subscriptions JSON-RPC methods details and code examples.
  - name: keywords
    content: json rpc methods curl api web3.py web3.js eth.rb javascript python ruby ethereum
---

# Web3.js Ethereum API subscriptions

Ethereum API subscriptions allow subscribing to specific events in the blockchain using the `web3.eth.subscribe` method.

Check the [web3.js docs](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-subscribe.html) for more details.

Subscriptions require the use of a WebSocket endpoint in web3.js.

Follow these steps to sign up on Chainstack, deploy a node, and find your endpoint credentials.

1. <a href="https://console.chainstack.com/user/account/create" target="_blank">Sign up with Chainstack</a>.
1. [Deploy a node](/platform/join-a-public-network).
1. [View node access and credentials](/platform/view-node-access-and-credentials).

## subscribe("newBlockHeaders")

Subscribes to incoming block headers. Similar to `eth_newBlockFilter`.

**Parameters:**

- `String` - `"newBlockHeaders"` identifying the type of subscription.
- `Function` - (optional) callback. Returns an error object as the first parameter and the result as the second parameter. It will be called for each incoming subscription.

**Returns:**

- `EventEmitter` - A [subscription instance](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-subscribe.html#eth-subscription-return) as an event emitter with the following events:
  - `data` returns `Object` - Fires on each incoming block header.
  - `error` returns `Object` - Fires when an error in the subscription occurs.
  - `connected` returns `Number` - Fires once after the subscription is successfully connected. Returns the subscription ID.

**Example:**

```js
const Web3 = require("web3");

const node_url = "CHAINSTACK_WSS_URL";
const web3 = new Web3(node_url);

var newBlocks = web3.eth
  .subscribe("newBlockHeaders", function (error, result) {
    if (!error) {
      console.log(result);

      return;
    }

    console.error(error);
  })
  .on("connected", function (subscriptionId) {
    console.log(subscriptionId);
  })
  .on("data", function (blockHeader) {
    console.log(blockHeader);
  })
  .on("error", console.error);

// unsubscribe the subscription
newBlocks.unsubscribe(function (error, success) {
  if (success) {
    console.log("Successfully unsubscribed!");
  }
});
```

## subscribe("pendingTransactions")

Subscribes to incoming pending transactions. Similar to [eth_newPendingTransactionFilter](/api/ethereum/eth_newpendingtransactionfilter).

**Parameters:**

- `String` - `'pendingTransactions'`; identifying the type of subscription.
- `Function` - (optional) callback. Returns an error object as the first parameter and the result as the second parameter. It will be called for each incoming subscription.

**Returns:**

- `EventEmitter` - A [subscription instance](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-subscribe.html#eth-subscription-return) as an event emitter with the following events:
  - `data` returns `string` - Fires on each incoming pending transaction and returns the transaction hash.
  - `error` returns `Object`: Fires when an error in the subscription occurs.

**Example:**

```js
const Web3 = require("web3");

const node_url = "CHAINSTACK_WSS_URL";
const web3 = new Web3(node_url);

var pendingTx = web3.eth
  .subscribe("pendingTransactions", function (error, result) {
    if (!error) console.log(result);
  })
  .on("data", function (transaction) {
    console.log(transaction);
  });

// unsubscribe the subscription
pendingTx.unsubscribe(function (error, success) {
  if (success) console.log("Successfully unsubscribed!");
});
```

## subscribe("logs")

Subscribes to incoming logs, filtered by the given options. If a valid numerical `fromBlock` options property is set, Web3 will retrieve the logs beginning from that point, backfilling the response as necessary.

**Parameters:**

- `String` - `"logs"`; identifying the type of subscription.
- `Object` - The subscription options:
  - `fromBlock` - `Number`- The number of the earliest block. By default `null`.
  - `address` - `String|Array`- An address or a list of addresses to only get logs from particular account(s).
  - `topics` - `Array` - An array of values which must each appear in the log entries. The order is important. If you want to leave topics out, use `null`; e.g. `null, '0x00...'`. You can also pass another array for each topic with options for that topic e.g. `null, ['option1', 'option2']`.
  - `callback` - `Function` - (optional) Optional callback, returns an error object as first parameter and the result as second. Will be called for each incoming subscription.

**Returns:**

- `EventEmitter` - A [subscription instance](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-subscribe.html#eth-subscription-return) as an event emitter with the following events:
  - `data` returns `object` - Fires on each incoming log with the log object as the argument.
  - `changed` returns `Object`- Fires on each log removed from the blockchain. The log will have the additional property `removed: true`.
  - `error` returns `Object`- Fires when an error in the subscription occurs.
  - `connected` returns `Number`- Fires once after the subscription is successfully connected. Returns the subscription ID.

**Example:**

```js
const Web3 = require("web3");

const node_url = "CHAINSTACK_WSS_URL";
const web3 = new Web3(node_url);

var logs = web3.eth
  .subscribe(
    "logs",
    {
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      topics: [],
    },
    function (error, result) {
      if (!error) console.log(result);
    }
  )
  .on("connected", function (subscriptionId) {
    console.log(subscriptionId);
  })
  .on("data", function (log) {
    console.log(log);
  })
  .on("changed", function (log) {});

// unsubscribe the subscription
logs.unsubscribe(function (error, success) {
  if (success) console.log("Successfully unsubscribed!");
});
```
