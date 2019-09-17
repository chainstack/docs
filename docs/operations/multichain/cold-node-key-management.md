# Cold node key management

By default, you can view your MultiChain wallet addresses and keys specific to the node that you deployed, provided that you are logged in as the same user with Chainstack. See [View node access and credentials](/platform/view-node-access-and-credentials).

You can use the default wallet addresses and key pairs for development and testing purposes.

If you are moving your MultiChain network to production, you are strongly recommended to use secure key management.

Cold node key management assumes that you do not store the keys in a hot MultiChain wallet. Instead, you have the keys stowed away in a MultiChain wallet on a cold node.

This section will guide you through setting up a MultiChain cold node, creating a key pair, issuing an asset, and signing the transaction on the cold node without exposing the private key to the MultiChain network.

For an overview of what a MultiChain cold node is, see [Cold nodes and wallets](https://www.multichain.com/developers/cold-nodes-wallets/).

1. On a server that meets your security requirements, install MultiChain

See [Download and Install MultiChain](https://www.multichain.com/download-install/).

2. Set up a MultiChain cold node on the server

   1. Create a `~/.multichain-cold` directory on the server

   1. In the `~/.multichain-cold` directory, create a subdirectory with the chain name. See [View node access and credentials](/platform/view-node-access-and-credentials) to get the chain name of your MultiChain network running with Chainstack.

      Example: `~/.multichain-cold/nw-123-456-7`.

   1. In the directory, create an empty `params.dat` file

      Example: `~/.multichain-cold/nw-123-456-7/params.dat`.

   1. Send a `getblockchainparams` request to a MultiChain node running with Chainstack

      ``` sh
      curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"getblockchainparams","params":[]}'
      ```

      where

      * RPC_ENDPOINT — your cloud MultiChain node RPC endpoint.
      * RPC_USER — your cloud MultiChain node RPC username.
      * RPC_PASSWORD — your cloud MultiChain node RPC password.

      See also [View node access and credentials](/platform/view-node-access-and-credentials).

      Example:

      ``` sh
      curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"getblockchainparams","params":[]}'
      ```

      This will output the full blockchain parameters.

      Example output:

      ``` json
      {"result":{"chain-protocol":"multichain","chain-description":"My Network","root-stream-name":"root","root-stream-open":true,"chain-is-testnet":false,"target-block-time":15,"maximum-block-size":8388608,"maximum-chunk-size":1048576,"maximum-chunk-count":1024,"default-network-port":7447,"default-rpc-port":8000,"anyone-can-connect":false,"anyone-can-send":false,"anyone-can-receive":false,"anyone-can-receive-empty":true,"anyone-can-create":false,"anyone-can-issue":false,"anyone-can-mine":false,"anyone-can-activate":false,"anyone-can-admin":false,"support-miner-precheck":true,"allow-arbitrary-outputs":false,"allow-p2sh-outputs":true,"allow-multisig-outputs":true,"setup-first-blocks":60,"mining-diversity":0.3,"admin-consensus-upgrade":0.5,"admin-consensus-txfilter":0.5,"admin-consensus-admin":0.5,"admin-consensus-activate":0.5,"admin-consensus-mine":0.5,"admin-consensus-create":0,"admin-consensus-issue":0,"lock-admin-mine-rounds":10,"mining-requires-peers":true,"mine-empty-rounds":10,"mining-turnover":0.5,"first-block-reward":-1,"initial-block-reward":0,"reward-halving-interval":52560000,"reward-spendable-delay":1,"minimum-per-output":0,"maximum-per-output":100000000000000,"minimum-offchain-fee":0,"minimum-relay-fee":0,"native-currency-multiple":100000000,"skip-pow-check":false,"pow-minimum-bits":8,"target-adjust-freq":-1,"allow-min-difficulty-blocks":false,"only-accept-std-txs":true,"max-std-tx-size":4194304,"max-std-op-returns-count":32,"max-std-op-return-size":2097152,"max-std-op-drops-count":5,"max-std-element-size":40000,"chain-name":"nw-614-517-1","protocol-version":20004,"network-message-start":"f8d8cdf4","address-pubkeyhash-version":"007ee2f6","address-scripthash-version":"05d9757c","private-key-version":"80c92c0c","address-checksum-value":"08f94387","genesis-pubkey":"039b7ee52bffe13196037d5f4b1c8fd4f4fefbc1e9766d821bd40b6bc36fc74b2c","genesis-version":1,"genesis-timestamp":1564720379,"genesis-nbits":536936447,"genesis-nonce":936,"genesis-pubkey-hash":"06a9dbecfd60a7018c2c3916cdb9d99158906730","genesis-hash":"00d52e3c198c586eeca891bf44634fa244f3b3b59f456990c1ccbb2981d5c856","chain-params-hash":"0fed5218dd7fd4952d76e51c5fbe7c6fb46c2ebcdd4ca9b8aee19f1aca610bdd"},"error":null}
      ```

   1. Convert the output to the `params.dat` format

      Example of the output converted to the `params.dat` format:

      ```
      chain-protocol = multichain
      chain-description = My Network
      root-stream-name = root
      root-stream-open = true
      chain-is-testnet = false
      target-block-time = 15
      maximum-block-size = 8388608
      maximum-chunk-size = 1048576
      maximum-chunk-count = 1024
      default-network-port = 7447
      default-rpc-port = 8000
      anyone-can-connect = false
      anyone-can-send = false
      anyone-can-receive = false
      anyone-can-receive-empty = true
      anyone-can-create = false
      anyone-can-issue = false
      anyone-can-mine = false
      anyone-can-activate = false
      anyone-can-admin = false
      support-miner-precheck = true
      allow-arbitrary-outputs = false
      allow-p2sh-outputs = true
      allow-multisig-outputs = true
      setup-first-blocks = 60
      mining-diversity = 0.3
      admin-consensus-upgrade = 0.5
      admin-consensus-txfilter = 0.5
      admin-consensus-admin = 0.5
      admin-consensus-activate = 0.5
      admin-consensus-mine = 0.5
      admin-consensus-create = 0
      admin-consensus-issue = 0
      lock-admin-mine-rounds = 10
      mining-requires-peers = true
      mine-empty-rounds = 10
      mining-turnover = 0.5
      first-block-reward = -1
      initial-block-reward = 0
      reward-halving-interval = 52560000
      reward-spendable-delay = 1
      minimum-per-output = 0
      maximum-per-output = 100000000000000
      minimum-offchain-fee = 0
      minimum-relay-fee = 0
      native-currency-multiple = 100000000
      skip-pow-check = false
      pow-minimum-bits = 8
      target-adjust-freq = -1
      allow-min-difficulty-blocks = false
      only-accept-std-txs = true
      max-std-tx-size = 4194304
      max-std-op-returns-count = 32
      max-std-op-return-size = 2097152
      max-std-op-drops-count = 5
      max-std-element-size = 40000
      chain-name = nw-614-517-1
      protocol-version = 20004
      network-message-start = f8d8cdf4
      address-pubkeyhash-version = 007ee2f6
      address-scripthash-version = 05d9757c
      private-key-version = 80c92c0c
      address-checksum-value = 08f94387
      genesis-pubkey = 039b7ee52bffe13196037d5f4b1c8fd4f4fefbc1e9766d821bd40b6bc36fc74b2c
      genesis-version = 1
      genesis-timestamp = 1564720379
      genesis-nbits = 536936447
      genesis-nonce = 936
      genesis-pubkey-hash = 06a9dbecfd60a7018c2c3916cdb9d99158906730
      genesis-hash = 00d52e3c198c586eeca891bf44634fa244f3b3b59f456990c1ccbb2981d5c856
      chain-params-hash = 0fed5218dd7fd4952d76e51c5fbe7c6fb46c2ebcdd4ca9b8aee19f1aca610bdd
      ```

   1. Save the converted output to the `params.dat` file

3. Start the MultiChain cold node

``` sh
/path/to/multichaind-cold CHAIN_NAME -daemon
```

where

* CHAIN_NAME — your MultiChain network chain name. See [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` sh
~/multichain-2.0.2/multichaind-cold nw-123-456-7 -daemon
```

4. Enter the interactive mode with the cold node

``` sh
multichain-cli CHAIN_NAME -cold
```

Example:

``` sh
multichain-cli nw-123-456-7 -cold
```

5. Get the cold wallet keys

By default, the cold wallet of `multichaind-cold` contains an automatically generated key pair.

You can use this key pair or generate new key pairs.

In the interactive `multichain-cli` mode that you are running now, use the following commands:

* `getaddresses` — view the addresses currently stored in the cold wallet.
* `dumpprivkey` — this will show the private key of the address stored in the cold wallet. The format is `dumpprivkey ADDRESS`. Example: `dumpprivkey 12ABcdiuezg8EDHx2GkPke8VS3oiKACMch4Vng`.
* `createkeypairs` — create new key pairs. This will print the key pairs without storing them in the cold wallet.
* `importprivkey` — import the private key to the cold wallet. This will also import the address to the cold wallet.  The format is `importprivkey PRIVATE_KEY`. Example: `importprivkey V1A2bCdSyzTVHFampTT6bghSshJXydHpdXJiZXGvNePmWWBNM6LoGPLX`.

Now that you have your keys securely stored on the cold node, you can safely import the addresses to the hot nodes running with Chainstack and create unsigned transactions on the hot nodes without exposing your private keys.

6. Import the address from the cold node to the hot node

Use the very first MultiChain node deployed with Chainstack as your hot node to send the requests to. This is your admin node. For details, see [Node permissions](/operations/multichain/node-permissions).

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"importaddress","params":["IMPORT_ADDRESS","false"]}'
```

where

* IMPORT_ADDRESS — the address that you created at the previous step.
* `false` — the parameter instructs to not scan the blockchain for any activity of the address. Using the `false` parameter here saves time, because you are importing a new address.

Example:

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"importaddress","params":["12ABcdiuezg8EDHx2GkPke8VS3oiKACMch4Vng","false"]}'
```

This will import the address to the MultiChain hot node without exposing the private key.

7. Grant the receive and send permissions to the imported address

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"grant","params":["IMPORTED_ADDRESS","receive,send"]}'
```

Example:

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"grant","params":["12ABcdiuezg8EDHx2GkPke8VS3oiKACMch4Vng","receive,send"]}'
```

8. Issue an asset to the imported address

Issuing an asset at this step is for demonstration purposes, so that later you can send the asset with a cold node key signature.

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"issue","params":["IMPORT_ADDRESS","ASSET_NAME",100,0.001]}'
```

where

* ASSET_NAME — any name for the asset you are issuing.

Example:

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"issue","params":["12ABcdiuezg8EDHx2GkPke8VS3oiKACMch4Vng","token",100,0.001]}'
```

This will issue 100 units of the asset `token`.

9. Create a raw unsigned transaction

Create a raw unsigned transaction that will send units of the issued asset from your address to a different address.

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"createrawsendfrom","params":["IMPORT_ADDRESS",{"ADDRESS":{"ASSET_NAME":50}}]}'
```

where

* ADDRESS — any address existing on the MultiChain network.

Example:

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"createrawsendfrom","params":["12ABcdiuezg8EDHx2GkPke8VS3oiKACMch4Vng",{"1abc2PLVeVPF1CEkGSmuBtRScRAmKzVsLgaPf":{"token":50}}]}'
```

This will create a raw unsigned transaction to send 50 units of the asset `token` and will give you a hexadecimal transaction ID.

Example output:

``` json
{"result":"010000000177acc507ee0b802f3b0dde19f3acb389a40498f388822fb3d48efa871135f1f60000000000ffffffff0200000000000000003776a914aab5af995a8d50eb35ca7044880b4ccc463b7e8c88ac1c73706b71a40498f388822fb3d48efa871135f1f650c30000000000007500000000000000003776a91421722e2f3414baa7c29cc31e833cfb01bef2eece88ac1c73706b71a40498f388822fb3d48efa871135f1f650c30000000000007500000000","error":null}
```

10. Decode the raw transaction to get the spent output

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"decoderawtransaction","params":["TRANSACTION_HEX"]}'
```

where

* TRANSACTION_HEX — the hexadecimal transaction ID you received at the previous step.

Example:

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"decoderawtransaction","params":["010000000177acc507ee0b802f3b0dde19f3acb389a40498f388822fb3d48efa871135f1f60000000000ffffffff0200000000000000003776a914aab5af995a8d50eb35ca7044880b4ccc463b7e8c88ac1c73706b71a40498f388822fb3d48efa871135f1f650c30000000000007500000000000000003776a91421722e2f3414baa7c29cc31e833cfb01bef2eece88ac1c73706b71a40498f388822fb3d48efa871135f1f650c30000000000007500000000"]}'
```

Example output:

``` json
{"result":{"txid":"5192ee142d70a124672d18f760b748c4373ee2c27331521bb5c825e0bf95b04e","version":1,"locktime":0,"vin":[{"txid":"f6f1351187fa8ed4b32f8288f39804a489b3acf319de0d3b2f800bee07c5ac77","vout":0,"scriptSig":{"asm":"","hex":""},"sequence":4294967295}],"vout":[{"value":0,"n":0,"scriptPubKey":{"asm":"OP_DUP OP_HASH160 aab5af995a8d50eb35ca7044880b4ccc463b7e8c OP_EQUALVERIFY OP_CHECKSIG 73706b71a40498f388822fb3d48efa871135f1f650c3000000000000 OP_DROP","hex":"76a914aab5af995a8d50eb35ca7044880b4ccc463b7e8c88ac1c73706b71a40498f388822fb3d48efa871135f1f650c300000000000075","reqSigs":1,"type":"pubkeyhash","addresses":["1Q5Bymiw44zwbMUKmX3uonwSdcxSXG2V35MLoq"]},"assets":[{"name":"token","issuetxid":"f6f1351187fa8ed4b32f8288f39804a489b3acf319de0d3b2f800bee07c5ac77","assetref":"71-265-61942","qty":50,"raw":50000,"type":"transfer"}]},{"value":0,"n":1,"scriptPubKey":{"asm":"OP_DUP OP_HASH160 21722e2f3414baa7c29cc31e833cfb01bef2eece OP_EQUALVERIFY OP_CHECKSIG 73706b71a40498f388822fb3d48efa871135f1f650c3000000000000 OP_DROP","hex":"76a91421722e2f3414baa7c29cc31e833cfb01bef2eece88ac1c73706b71a40498f388822fb3d48efa871135f1f650c300000000000075","reqSigs":1,"type":"pubkeyhash","addresses":["15XBaziuezg8EDHx2GkPke8VS3oiKACMch4Vng"]},"assets":[{"name":"token","issuetxid":"f6f1351187fa8ed4b32f8288f39804a489b3acf319de0d3b2f800bee07c5ac77","assetref":"71-265-61942","qty":50,"raw":50000,"type":"transfer"}]}]},"error":null}
```

In the output, look for the `vin` array. In the `vin` array, copy the `txid` value and the `vout` value. For the example above, you would need to copy and save the following values:

* `txid`: `f6f1351187fa8ed4b32f8288f39804a489b3acf319de0d3b2f800bee07c5ac77`
* `vout`: `0`

11. Get the hexadecimal script for the `txid`, `vout` pair

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD -d '{"method":"gettxout","params":["TXID",VOUT]}'
```

where

* TXID — the `txid` value from the previous step.
* VOUT — the `vout` value from the previous step.

Example:

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"gettxout","params":["f6f1351187fa8ed4b32f8288f39804a489b3acf319de0d3b2f800bee07c5ac77",0]}'
```

Example output:

``` json
{"result":{"bestblock":"008b50f38e2884f7470cbe173ad16fc642e7159aec2007496fac47f13aad36b7","confirmations":11,"value":0,"scriptPubKey":{"asm":"OP_DUP OP_HASH160 21722e2f3414baa7c29cc31e833cfb01bef2eece OP_EQUALVERIFY OP_CHECKSIG 73706b67a086010000000000 OP_DROP","hex":"76a91421722e2f3414baa7c29cc31e833cfb01bef2eece88ac0c73706b67a08601000000000075","reqSigs":1,"type":"pubkeyhash","addresses":["15XBaziuezg8EDHx2GkPke8VS3oiKACMch4Vng"]},"version":1,"coinbase":false,"assets":[{"name":"token","issuetxid":"f6f1351187fa8ed4b32f8288f39804a489b3acf319de0d3b2f800bee07c5ac77","assetref":"71-265-61942","qty":100,"raw":100000,"issue":true}]},"error":null}
```

In the output, look for the `hex` value of the `scriptPubKey` array. Copy the `hex` value. For the example above, you would need to copy and save the following value:

* `hex`: `76a91421722e2f3414baa7c29cc31e833cfb01bef2eece88ac0c73706b67a08601000000000075`

12. Ensure you have all values to sign the transaction on the cold node

At this point, you should have the following values ready and at hand:

* Hexadecimal transaction ID
* Decoded `txid`
* Decoded `vout`
* `hex` value of `scriptPubKey`

For the examples in this guide, the values are:

* Hexadecimal transaction ID: `010000000177acc507ee0b802f3b0dde19f3acb389a40498f388822fb3d48efa871135f1f60000000000ffffffff0200000000000000003776a914aab5af995a8d50eb35ca7044880b4ccc463b7e8c88ac1c73706b71a40498f388822fb3d48efa871135f1f650c30000000000007500000000000000003776a91421722e2f3414baa7c29cc31e833cfb01bef2eece88ac1c73706b71a40498f388822fb3d48efa871135f1f650c30000000000007500000000`
* Decoded `txid`: `f6f1351187fa8ed4b32f8288f39804a489b3acf319de0d3b2f800bee07c5ac77`
* Decoded `vout`: `0`
* `hex` value of `scriptPubKey`: `76a91421722e2f3414baa7c29cc31e833cfb01bef2eece88ac0c73706b67a08601000000000075`

13. Move the saved values to the cold node

Move the saved values to the cold node in a manner that meets your security requirements.

14. Sign the transaction on the cold node

    1. On the cold node, enter interactive mode:

       ``` sh
       multichain-cli CHAIN_NAME -cold
       ```

       Example:

       ``` sh
       multichain-cli nw-123-456-7 -cold
       ```

    1. Sign the transaction:

       ``` js
       signrawtransaction TRANSACTION_HEX '[{"txid":"TXID","vout":VOUT,"scriptPubKey":"SCRIPT_HEX"}]'
       ```

       For the examples in this guide, the full command is:

       ``` js
       signrawtransaction 010000000177acc507ee0b802f3b0dde19f3acb389a40498f388822fb3d48efa871135f1f60000000000ffffffff0200000000000000003776a914aab5af995a8d50eb35ca7044880b4ccc463b7e8c88ac1c73706b71a40498f388822fb3d48efa871135f1f650c30000000000007500000000000000003776a91421722e2f3414baa7c29cc31e833cfb01bef2eece88ac1c73706b71a40498f388822fb3d48efa871135f1f650c30000000000007500000000 '[{"txid":"f6f1351187fa8ed4b32f8288f39804a489b3acf319de0d3b2f800bee07c5ac77","vout":0,"scriptPubKey":"76a91421722e2f3414baa7c29cc31e833cfb01bef2eece88ac0c73706b67a08601000000000075"}]'
       ```

       Example output:

       ``` json
       {"hex" : "010000000177acc507ee0b802f3b0dde19f3acb389a40498f388822fb3d48efa871135f1f6000000006b483045022100f905286e0f8a648b71625244eb623c641eb6e8caebbec30806e45c3b264342ad02200ef576fec5633326564e296e9d1698f7faa50536c919a0307abf5b08cd49264f012102251eece743174e0433086e1d978374de6a0d60e48c39282697b757ad968d3e1affffffff0200000000000000003776a914aab5af995a8d50eb35ca7044880b4ccc463b7e8c88ac1c73706b71a40498f388822fb3d48efa871135f1f650c30000000000007500000000000000003776a91421722e2f3414baa7c29cc31e833cfb01bef2eece88ac1c73706b71a40498f388822fb3d48efa871135f1f650c30000000000007500000000",
       "complete" : true}
       ```

       Save the `hex` value from the output.

15. Send the signed transaction to the hot node running with Chainstack

Now that your transaction is signed, broadcast it to the MultiChain network.

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"sendrawtransaction","params":["HEX_VALUE"]}'
```

where

* HEX_VALUE — the hexadecimal value you received at the previous step.

For the example in this guide, the full command is:

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"sendrawtransaction","params":["010000000177acc507ee0b802f3b0dde19f3acb389a40498f388822fb3d48efa871135f1f6000000006b483045022100f905286e0f8a648b71625244eb623c641eb6e8caebbec30806e45c3b264342ad02200ef576fec5633326564e296e9d1698f7faa50536c919a0307abf5b08cd49264f012102251eece743174e0433086e1d978374de6a0d60e48c39282697b757ad968d3e1affffffff0200000000000000003776a914aab5af995a8d50eb35ca7044880b4ccc463b7e8c88ac1c73706b71a40498f388822fb3d48efa871135f1f650c30000000000007500000000000000003776a91421722e2f3414baa7c29cc31e833cfb01bef2eece88ac1c73706b71a40498f388822fb3d48efa871135f1f650c30000000000007500000000"]}'
```

You created and signed the transaction without exposing your private key to the hot nodes on the MultiChain network.

::: tip See also

* [Default addresses](/operations/multichain/default-addresses)
* [Node permissions](/operations/multichain/node-permissions)
* [External key management](/operations/multichain/external-key-management)

:::
