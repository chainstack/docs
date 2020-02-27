# Universal basic income opt-in chaincode

[Andrew Yang](https://en.wikipedia.org/wiki/Andrew_Yang), a 2020 presidential candidate in the U.S., is arguably the only technologist to ever join the race.

Yang predicts that there will be massive worker displacement due to technological automation in the next five years. His solution to the worker displacement problem and the core proposal of his presidential campaign is enrolling every U.S. citizen in the Universal Basic Income program, which he calls the [Freedom Dividend](https://en.wikipedia.org/wiki/Andrew_Yang_2020_presidential_campaign#Freedom_Dividend_(UBI)).

Since there is money distribution involved and Andrew Yang's entire career being in technology, it makes for a fun thought experiment to imagine what the tech infrastructure could look like.

The very basic framework proposed here is a [chaincode](/blockchains/hyperledger-fabric#chaincode) on Hyperledger Fabric.

Each of the 50 states can run organizations and peers that join a channel.

Each of the organizations and peers can have an app that lets the U.S. citizens submit their opt-in agreement to the Freedom Dividend based on their Social Security number as their identifier. Once opted in, Social Security number holders can also opt out of the Freedom Dividend program and have their Social Security number removed from the world state.

Those that have opted in can be queried from the world state to have their monthly distribution of the Universal Basic Income.

In this tutorial you will:

1. Write a smart contract in JavaScript.
1. Package the smart contract as a chaincode, install the chaincode on a peer, approve the chaincode definition, and commit the chaincode.
1. Interact with the chaincode.

## Prerequisites

1. Clone the [contract repository](https://github.com/chainstack/freedomDividend) to your machine.
1. Install [Visual Studio Code](https://code.visualstudio.com/) with the [IBM Blockchain Platform extension](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform).

## Prepare a Hyperledger Fabric network

### Create a consortium project

See [Create a project](/platform/create-a-project).

### Deploy a Hyperledger Fabric network

See [Deploy a consortium network](/platform/deploy-a-consortium-network).

### Create the smart contract

1. Start your Visual Studio Code with the IBM Blockchain Platform extension installed.
1. On the left pane, click the square IBM Blockchain Platform icon.
1. Click **Smart Contracts** > **Create New Project**.
1. Select **Default Contract**. Select **JavaScript**. Type in a name for your chaincode. For this tutorial, it's `freedomDividendContract`.
1. Choose a directory to save your project to. In the directory, all the necessary chaincode files will be generated.
1. Your main file is the contract in the `./lib/` directory. For this tutorial, it's [freedomDividendContract.js](https://github.com/chainstack/freedomDividend/blob/master/contract/lib/freedomDividendContract.js). Do check out the code, as it's commented.
1. Make sure your `index.js` file has the correct parameters relative to the contract. See [index.js](https://github.com/chainstack/freedomDividend/blob/master/contract/index.js).
1. Make sure you have the correct name and chaincode version in `package.json`. See [package.json](https://github.com/chainstack/chainstack/blob/master/contract/package.json).

### Connect to your peer

See [Tools](/operations/hyperledger-fabric/tools).

### Package the chaincode

``` sh
peer lifecycle chaincode package CHAINCODE_NAME.tar.gz --lang node --path CHAINCODE_SOURCE_PATH --label CHAINCODE_LABEL
```

where

* CHAINCODE_NAME — a name for the packaged chaincode.
* CHAINCODE_SOURCE_PATH — path to your chaincode source files. The files must be in the directory you mounted when you connected to your peer in a Docker container.
* CHAINCODE_LABEL — any label you want to give to your chaincode; can be the same as the chaincode name.

Example:

``` sh
$ peer lifecycle chaincode package freedomDividend.tar.gz --lang node --path /resources/chaincode/freedomDividend/ --label freedomDividend
$ ls
bin  freedomDividend.tar.gz  src
```

### Install the chaincode on the peer you are connected to

``` sh
peer lifecycle chaincode install CHAINCODE_NAME.tar.gz
```

Example:

``` sh
$ peer lifecycle chaincode install freedom.tar.gz
2020-02-27 07:53:19.529 UTC [cli.lifecycle.chaincode] submitInstallProposal -> INFO 001 Installed remotely: response:<status:200 payload:"\nHfreedomDividend:6bf3538844b3756d2305968e5b51e3a1a2f80f8c12dcb5631c73893e927b2389\022\007freedom" >
2020-02-27 07:53:19.530 UTC [cli.lifecycle.chaincode] submitInstallProposal -> INFO 002 Chaincode code package identifier: freedomDividend:6bf3538844b3756d2305968e5b51e3a1a2f80f8c12dcb5631c73893e927b2389
```

### Check the chaincode installation

``` sh
peer lifecycle chaincode queryinstalled
```

Example:

``` sh
$ peer lifecycle chaincode queryinstalled
Installed chaincodes on peer:
Package ID: freedomDividend:6bf3538844b3756d2305968e5b51e3a1a2f80f8c12dcb5631c73893e927b2389, Label: freedomDividend
```

### Approve the chaincode for your organization

``` sh
peer lifecycle chaincode approveformyorg --name CHAINCODE_NAME --package-id PACKAGE_ID -o $ORDERER_ADDRESS --tls --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE --cafile $ORDERER_CA --version CHAINCODE_VERSION --channelID CHANNEL_ID --sequence SEQUENCE_NUMBER
```

where

* CHAINCODE_NAME — name of your chaincode.
* PACKAGE_ID — the ID of your chaincode installed on the peer. You can get the ID by running `peer lifecycle chaincode queryinstalled`.
* CHAINCODE_VERSION — the version of your chaincode as specified in the source files of the chaincode.
* CHANNEL_ID — use `defaultchannel`.
* SEQUENCE_NUMBER — the number of times your chaincode has been defined. Use `1` for your first installation. If you later upgrade your chaincode, use `2` and so on.

Example:

``` sh
$ peer lifecycle chaincode approveformyorg --name freedomDividend --package-id freedomDividend:6bf3538844b3756d2305968e5b51e3a1a2f80f8c12dcb5631c73893e927b2389 -o $ORDERER_ADDRESS --tls --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE --cafile $ORDERER_CA --version 1.0.2 --channelID defaultchannel --sequence 1
2020-02-27 07:54:23.283 UTC [chaincodeCmd] ClientWait -> INFO 001 txid [2d1b7169dd463bed30df080a7f1bf431753085971b662946050ee98dff39ec15] committed with status (VALID)
```

### Commit the chaincode

``` sh
peer lifecycle chaincode commit -o $ORDERER_ADDRESS --channelID CHANNEL_ID --name CHAINCODE_NAME --version CHAINCODE_VERSION --sequence SEQUENCE_NUMBER --tls --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE --cafile $ORDERER_CA --peerAddresses $CORE_PEER_ADDRESS
```

where

* CHANNEL_ID — use `defaultchannel`.
* CHAINCODE_NAME — name of your chaincode.
* CHAINCODE_VERSION — the version of your chaincode as specified in the source files of the chaincode.
* SEQUENCE_NUMBER — the number of times your chaincode has been defined. Use `1` for your first installation. If you later upgrade your chaincode, use `2` and so on.

Example:

``` sh
$ peer lifecycle chaincode commit -o $ORDERER_ADDRESS --channelID defaultchannel --name freedomDividend --version 1.0.2 --sequence 1 --tls --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE --cafile $ORDERER_CA --peerAddresses $CORE_PEER_ADDRESS
2020-02-27 07:57:23.103 UTC [chaincodeCmd] ClientWait -> INFO 001 txid [6bda96084fd7d66813935ca72c44d1ac40f4ac2d64b0afb5fe7bad9484b2345c] committed with status (VALID)
```

You can now interact with the chaincode.

### Opt in the chaincode

Submit a transaction with a Social Security number and an opt-in as arguments:

``` sh
peer chaincode invoke -o $ORDERER_ADDRESS --tls true --cafile $ORDERER_CA -C defaultchannel -n freedomDividend --peerAddresses $CORE_PEER_ADDRESS --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE -c '{"Args":["optIn", "SSN_ID", "OPT_IN"]}'
```

where

* SSN_ID — a Social Security number.
* OPT_IN — an opt-in.

Example:

``` sh
$ peer chaincode invoke -o $ORDERER_ADDRESS --tls true --cafile $ORDERER_CA -C defaultchannel -n freedomDividend --peerAddresses $CORE_PEER_ADDRESS --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE -c '{"Args":["optIn", "286-46-6157", "opt in"]}'
2020-02-27 08:26:08.866 UTC [chaincodeCmd] chaincodeInvokeOrQuery -> INFO 001 Chaincode invoke successful. result: status:200
```

Social Security number `286-46-6157` has now opted in the Freedom Dividend program and the world state has been updated.

### Query the opted in Social Security number

``` sh
peer chaincode invoke -o $ORDERER_ADDRESS --tls true --cafile $ORDERER_CA -C defaultchannel -n freedomDividend --peerAddresses $CORE_PEER_ADDRESS --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE -c '{"Args":["querySSN", "SSN_ID"]}'
```

where

* SSN_ID — the Social Security number you have previously opted in.

Example:

``` sh
$ peer chaincode invoke -o $ORDERER_ADDRESS --tls true --cafile $ORDERER_CA -C defaultchannel -n freedomDividend --peerAddresses $CORE_PEER_ADDRESS --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE -c '{"Args":["querySSN", "286-46-6157"]}'
2020-02-27 08:27:06.566 UTC [chaincodeCmd] chaincodeInvokeOrQuery -> INFO 001 Chaincode invoke successful. result: status:200 payload:"{\"opt\":\"opt in\"}"
```

### Opt out

``` sh
peer chaincode invoke -o $ORDERER_ADDRESS --tls true --cafile $ORDERER_CA -C defaultchannel -n freedomDividend --peerAddresses $CORE_PEER_ADDRESS --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE -c '{"Args":["optOut", "SSN_ID"]}'
```

where

* SSN_ID — the Social Security number you have previously opted in and queried.

Example:

``` sh
$ peer chaincode invoke -o $ORDERER_ADDRESS --tls true --cafile $ORDERER_CA -C defaultchannel -n freedomDividend --peerAddresses $CORE_PEER_ADDRESS --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE -c '{"Args":["optOut", "286-46-6157"]}'
2020-02-27 08:27:55.342 UTC [chaincodeCmd] chaincodeInvokeOrQuery -> INFO 001 Chaincode invoke successful. result: status:200
```

The Social Security number has now been opted out and removed from the world state.

## Conclusion

This tutorial guided you through the basics of buildling and running a chaincode.

You connected to your peer, packaged the chaincode, installed it on the peer, approved the chaincode definition for use, and committed the chaincode to the peer.

You also interacted with the chaincode by submitting transactions and updating the world state.

::: tip See also

* [Tools](/operations/hyperledger-fabric/tools)
* [Hyperledger Fabric samples](https://github.com/hyperledger/fabric-samples/)

:::
