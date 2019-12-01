# Creating a raw transaction

Chainstack deploys your Bitcoin node with the `--disable-wallet` flag. The `--disable-wallet` flag does not load the wallet and disables all wallet RPC calls.

To create, sign, and send a transaction with the wallet disabled, you must use the [raw transaction format](https://bitcoin.org/en/glossary/serialized-transaction).

This section will guide you through creating a raw transaction, signing the transaction, and sending it to the Bitcoin network.

1. Get your node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

2. Get the unspent transaction output ID

You need the transaction ID that has an unspent transaction output (UTXO). This is the ID of a transaction to your Bitcoin address containing a bitcoin value that has not been spent.

You can get the transaction ID online by viewing a [Bitcoin explorer](https://blockstream.info/).

3. Create a raw transaction

``` sh
curl USERNAME:PASSWORD@RPC_ENDPOINT -d '{"method":"createrawtransaction","params":[[{"txid":"TRANSACTION_ID","vout":0}],[{"RECIPIENT_ADDRESS":RECIPIENT_ADDRESS_AMOUNT},{"SENDER_ADDRESS":SENDER_AMOUNT_CHANGE}]],"id":1}'
```

where

* USERNAME — your Bitcoin node access username.
* PASSWORD — your Bitcoin node access password.
* RPC_ENDPOINT — your Bitcoin node RPC endpoint.
* TRANSACTION_ID — the transaction ID that has an unspent transaction output (UTXO).
* RECIPIENT_ADDRESS — the Bitcoin address that you are sending the bitcoin to.
* RECIPIENT_ADDRESS_AMOUNT — the amount of bitcoin you are sending.
* SENDER_ADDRESS — your Bitcoin address.
* SENDER_AMOUNT_CHANGE — the amount of bitcoin that your address should have after the transaction. Use this value to include a fee in your transaction. See the example below.

Example:

``` sh
curl https://user-sname:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com -d '{"method":"createrawtransaction","params":[[{"txid":"02cfeb74943ad0084917213ba233aca2da84237f46ba391705fad02527c2eb1c","vout":0}],[{"3PupCJaFLKAjz2UMNtd67mBjCEKPhJXcVB":0.00007411},{"3KkEsQxajhQEXfcazdEJXha6h5YRRXmGTb":0.0010}]],"id":1}'
```

This example has [`0.00127411` as UTXO](https://blockstream.info/tx/02cfeb74943ad0084917213ba233aca2da84237f46ba391705fad02527c2eb1c?expand) at the start.

Then the example creates a transaction of `0.00007411` from `3KkEsQxajhQEXfcazdEJXha6h5YRRXmGTb` to `3PupCJaFLKAjz2UMNtd67mBjCEKPhJXcVB` and pays the fee of `0.0002`.

Example output:

``` json
{"result":"02000000011cebc22725d0fa051739ba467f2384daa2ac33a23b21174908d03a9474ebcf020000000000ffffffff02f31c00000000000017a914f3be626cfb4438d8736cc5aa4fd25a8bff83e8fe87a08601000000000017a914c60e519cec284ec6f320a012582496fe6037c43f8700000000","error":null,"id":1}
```

Save the hexadecimal output as you will need it in the next step.

4. Sign the raw transaction

``` sh
curl USERNAME:PASSWORD@RPC_ENDPOINT -d '{"method":"signrawtransactionwithkey","params":["TRANSACTION_HEX",["PRIVATE_KEY"],[{"txid":"TRANSACTION_ID","vout":0,"scriptPubKey": "SCRIPTPUBKEY","amount":AMOUNT}]],"id":2}'
```

where

* USERNAME — your Bitcoin node access username.
* PASSWORD — your Bitcoin node access password.
* RPC_ENDPOINT — your Bitcoin node RPC endpoint.
* TRANSACTION_HEX — The hexadecimal output that you received at the previous step.
* TRANSACTION_ID — the transaction ID that has an unspent transaction output (UTXO).
* SCRIPTPUBKEY — your scriptPubKey. You can view your scriptPubKey by running `getaddressinfo` and looking into the `embedded` field in the output.
* AMOUNT — the input amount of the UTXO. See the example below.

Example:

``` sh
curl https://user-sname:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com -d '{"method":"signrawtransactionwithkey","params":["02000000011cebc22725d0fa051739ba467f2384daa2ac33a23b21174908d03a9474ebcf020000000000ffffffff02f31c00000000000017a914f3be626cfb4438d8736cc5aa4fd25a8bff83e8fe87a08601000000000017a914c60e519cec284ec6f320a012582496fe6037c43f8700000000",["AbcDEfG0h1IjK23SCqZrZ3CrjQKb9J3DXuhD7BsbkKDP623m8GEX"],[{"txid":"02cfeb74943ad0084917213ba233aca2da84237f46ba391705fad02527c2eb1c","vout":0,"scriptPubKey": "0014163e775965570b05efbda9bfd3813021418d1f0f","amount":0.00127411}]],"id":2}'
```

This example specifies `0.00127411` in the `amount` parameter as this is the input to the UTXO from which this example spends.


Example output:

``` json
{"result":{"hex":"020000000001011cebc22725d0fa051739ba467f2384daa2ac33a23b21174908d03a9474ebcf020000000000ffffffff02f31c00000000000017a914f3be626cfb4438d8736cc5aa4fd25a8bff83e8fe87a08601000000000017a914c60e519cec284ec6f320a012582496fe6037c43f8702473044022028f1bb8ef9c7b15f9289884befa499b8204ecc51c6c2992e5b99c0ccc1b2691102207cf7e1d312c2812608cc34c3af15b3c27e87cd83de86674d0680d8066428d4080121030218e9ca0de6e3f6432e9f323fe686e8b6a5f3682afa174d8de680ccb3c2880400000000","complete":true},"error":null,"id":2}
```

Save the hexadecimal output as you will need it in the next step.

5. Send the signed transaction

``` sh
{"method":"sendrawtransaction","params":["020000000001011cebc22725d0fa051739ba467f2384daa2ac33a23b21174908d03a9474ebcf020000000000ffffffff02f31c00000000000017a914f3be626cfb4438d8736cc5aa4fd25a8bff83e8fe87a08601000000000017a914c60e519cec284ec6f320a012582496fe6037c43f8702473044022028f1bb8ef9c7b15f9289884befa499b8204ecc51c6c2992e5b99c0ccc1b2691102207cf7e1d312c2812608cc34c3af15b3c27e87cd83de86674d0680d8066428d4080121030218e9ca0de6e3f6432e9f323fe686e8b6a5f3682afa174d8de680ccb3c2880400000000"],"id":3}'
```


::: tip See also

* TTK
* TTK

:::
