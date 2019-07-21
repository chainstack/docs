# MultiChain governance, administration, and operation considerations

This section outlines the fundamentals that you need to consider when running a MultiChain network.

## Governance

MultiChain achieves consensus by validating blocks in a round-robin scheme with a `mining-diversity` parameter.

### Details

All nodes with the addresses with the `mine` permission take a turn in validating blocks in the network.

The way the `mine` nodes take turns in validating blocks is determined by the network's `mining-diversity` parameter.

The `mining-diversity` parameter can be set to any value between `0` and `1`:

* `1` — every `mine` node in the network must take a turn in block validation per round. This is the strictest setting.
* `0` — not every `mine` node must take a turn in block validation per round; any `mine` node can take turns in block validation in a random fashion. This is the loosest setting.

The round-robin scheme is the following:

* Determine the number of nodes with the `mine` permission in the network.
* Multiply the number of `mine` nodes by the `mining-diversity` value to get the value *spacing*.
* Check if the `mine` node validating the current block validated a *spacing*-1 block. If the `mine` node validated a *spacing*-1 block, render the block invalid.

The `mining-diversity` parameter cannot be changed once the chain is initialized. Chainstack deploys MultiChain with the default `mining-diversity` value set to `0.3`.

Round-robin example with 10 `mine` nodes deployed with Chainstack:

* 10 nodes permitted to validate blocks.
* 10*0.3=3. *spacing* is 3. *spacing*-1 is 2.
* each `mine` node in the network can validate every third block and cannot validate two blocks in a row.

## Addresses and node permissions

### Addresses

You can view the default wallet addresses of each of your MultiChain node. See [View node access information](/control-panel/view-node-access).

Adding a node to the network in MultiChain does not create an event that is broadcast to the blockchain. This means that address balances can only be queried by node owners.

### Node permissions

The permissions in MultiChain are assigned on a per-address basis.

From the security perspective, there are three groups of permissions:

* Low risk:
  * `connect` — a node with an address with the `connect` permission can connect to other nodes and get blockchain information.
  * `send` — a node with an address with the `send` permission can send assets.
  * `receive` — a node with an address with the `receive` permission can receive assets.

* Medium risk:
  * `issue` — a node with an address with the `issue` permission can issue new assets.
  * `create` — a node with an address with the `create` permission can create new data streams.
  * `activate` — a node with an address with the `activate` permission can change the low risk group of permissions for the nodes with other addresses: `connect`, `send`, `receive`.

* High risk:
  * `mine` — a node with an address with the `mine` permission can create blocks.
  * `admin` — a node with an address with the `admin` permission can change all permissions for all nodes with all addresses.

When you deploy a MultiChain network with Chainstack, the first node starts with *all* permissions from the three groups. This is the *admin node* of your MultiChain network.

Each subsequent node that you add to your MultiChain network starts with the low risk `connect`, `send`, `receive` permissions.

## Key management

By default, you can view your MultiChain wallet addresses and keys specific to the node that you deployed, provided that you are logged in as the same user with Chainstack. See [View node access information](/control-panel/view-node-access).

You can use the default wallet addresses and key pairs for development and testing purposes.

If you are moving your MultiChain network to production, you are strongly recommended to use secure key management.

Your options are:

* MultiChain hybrid node key management
* External key management

### MultiChain hybrid node key management

Having a hybrid MultiChain network with nodes running both on-premises and in the cloud assumes that you can isolate one of your on-premises node, encrypt the node's wallet location and securely manage the keys.

For detailed hybrid installation instructions, see [Deploying a hybrid MultiChain network](/operations/multichain-hybrid).

### External key management

You can combine external key management with [MultiChain hybrid node key management](/key-concepts/multichain-considerations#multichain-hybrid-node-key-management).

External key management assumes that you do not store the keys in a MultiChain wallet. Instead, you have the keys stowed away in a location that meets your security requirements.

This section will guide you through creating a key pair, issuing an asset and signing the transaction without keeping the private key in any wallet.

You will call the MultiChain nodes running in the cloud. You can, however, do the transactions through a local node if you run a hybrid MultiChain network.

1. Get your node access information

See [View node access information](/control-panel/view-node-access).

2. Create a key pair

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"createkeypairs","params":[],"id":1}'
```

where

* RPC_ENDPOINT — your cloud MultiChain node RPC endpoint. See [View node access information](/control-panel/view-node-access).
* RPC_USER — your cloud MultiChain node RPC username. [View node access information](/control-panel/view-node-access).
* RPC_PASSWORD — your cloud MultiChain node RPC password. [View node access information](/control-panel/view-node-access).

Example:

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"createkeypairs","params":[],"id":1}'
```

3. Import the address to a MultiChain node

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"importaddress","params":["IMPORT_ADDRESS","false"],"id":1}'
```

where

* IMPORT_ADDRESS — the address that you created at the previous step.

Example:

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"importaddress","params":["12ABcdefWDoUk4W1R3DZk4jqKG6iw4Cm7habLjt","false"],"id":1}'
```

This will import the address to the MultiChain node without exposing the private key.

4. Grant the send and receive permissions to the imported address

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"grant","params":["IMPORTED_ADDRESS","receive,send"],"id":1}'
```

Example:

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"grant","params":["12ABcdefWDoUk4W1R3DZk4jqKG6iw4Cm7habLjt","receive,send"],"id":1}'
```

5. Issue an asset to the imported address

Issuing an asset at this step is for demonstration purposes, so that later you can send the asset with an external key signature.

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"issue","params":["IMPORT_ADDRESS","ASSET_NAME",100,0.001],"id":1}'
```

where

* ASSET_NAME — any name for the asset you are issuing.

Example:

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"issue","params":["12ABcdefWDoUk4W1R3DZk4jqKG6iw4Cm7habLjt","token",100,0.001],"id":1}'
```

This will issue 100 units of the asset `token`.

6. Create a raw unsigned transaction

Create a raw unsigned transaction that will send units of the issued asset from your address to a different address.


``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"createrawsendfrom","params":["IMPORT_ADDRESS",{"ADDRESS":{"ASSET_NAME":50}}],"id":1}'
```

where

* ADDRESS — any address existing on the MultiChain network.

Example:

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"createrawsendfrom","params":["12ABcdefWDoUk4W1R3DZk4jqKG6iw4Cm7habLjt",{"1abc2PLVeVPF1CEkGSmuBtRScRAmKzVsLgaPf":{"token":50}}],"id":1}'
```

This will create a raw unsigned transaction to send 50 units of the asset `token` and will give you a hexadecimal transaction ID.

7. Sign the raw transaction

You will now use your private key to sign the transaction.

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"signrawtransaction","params":["TRANSACTION_HEX",[],["PRIVATE_KEY"]],"id":1}'
```

where

* TRANSACTION_HEX — the hexadecimal transaction ID you received at the previous step.
* PRIVATE_KEY — your private key from the imported address.

Example

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"signrawtransaction","params":["0100000001745a346f8a3382b4245d13f7f2a698b761fca1376e60c5b560f35e77b1b565f40000000000ffffffff0200000000000000003776a91405315992cd4a3512c0444e4e2a748d4003f4999088ac1c73706b7161fca1376e60c5b560f35e77b1b565f480841e00000000007500000000000000003776a91408b22c67231a4fba1cbf6cc49062b16d1da4397388ac1c73706b7161fca1376e60c5b560f35e77b1b565f4006cdc02000000007500000000",[],["ABCDZZucTF76uTMxVV21GvWS94jiKTsj5HNJUPZKjYVq6sA3a1ZP5do3"]],"id":1}'
```

As a result, you will receive a new 

8. Send the signed transaction hexadecimal value.

Now that your transaction is signed, broadcast it to the MultiChain network.

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"sendrawtransaction","params":["HEX_VALUE"],"id":1}'
```

where

* HEX_VALUE — the hexadecimal value you received at the previous step.

Example

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"sendrawtransaction","params":["0100000001745a346f8a3382b4245d13f7f2a698b761fca1376e60c5b560f35e77b1b565f4000000006b48304502210088873d8e9d5eed51e6806a49d4525eb1b7c8f4f26fc54a4768e56271f94d667f02202b0332313fcfabb907437de4351f5dcf874cbd4319618ff2c54b2948b4fb4c1f012103d3b63e70bc75261676ad4bb3117bf1a978d459dddc32d79c62f468e61ce0ed0affffffff0200000000000000003776a91405315992cd4a3512c0444e4e2a748d4003f4999088ac1c73706b7161fca1376e60c5b560f35e77b1b565f480841e00000000007500000000000000003776a91408b22c67231a4fba1cbf6cc49062b16d1da4397388ac1c73706b7161fca1376e60c5b560f35e77b1b565f4006cdc02000000007500000000"],"id":1}'
```

You created and signed the transaction with your external private key.