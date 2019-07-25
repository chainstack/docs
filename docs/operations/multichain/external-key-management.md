# External key management

By default, you can view your MultiChain wallet addresses and keys specific to the node that you deployed, provided that you are logged in as the same user with Chainstack. See [View node access and credentials](/platform/view-node-access-and-credentials).

You can use the default wallet addresses and key pairs for development and testing purposes.

If you are moving your MultiChain network to production, you are strongly recommended to use secure key management.

External key management assumes that you do not store the keys in a MultiChain wallet. Instead, you have the keys stowed away in a location that meets your security requirements.

This section will guide you through creating a key pair, issuing an asset and signing the transaction without keeping the private key in any wallet.

You will call the MultiChain nodes running in the cloud. You can, however, do the transactions through a local node if you run a hybrid MultiChain network.

1. Get your node access information

See [View node access and credentials](/platform/view-node-access-and-credentials).

2. Create a key pair

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"createkeypairs","params":[],"id":1}'
```

where

* RPC_ENDPOINT — your cloud MultiChain node RPC endpoint. See [View node access and credentials](/platform/view-node-access-and-credentials).
* RPC_USER — your cloud MultiChain node RPC username. [View node access and credentials](/platform/view-node-access-and-credentials).
* RPC_PASSWORD — your cloud MultiChain node RPC password. [View node access and credentials](/platform/view-node-access-and-credentials).

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

::: tip See also
* [Default addresses](/operations/multichain/default-addresses)
* [Node permissions](/operations/multichain/node-permissions)
:::