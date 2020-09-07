---
meta:
  - name: description
    content: Learn how to connect to a Hyperledger Fabric peer, how to package, install, approve, and commit chaincodes.
  - name: keywords
    content: hyperledger fabric chaincode install commit
---

# Tools

## Interaction tools

Interact with your Hyperledger Fabric peer using [the fabric-tools Docker container](https://hub.docker.com/r/hyperledger/fabric-tools/).

### Prerequisites

[Install and run Docker](https://www.docker.com/get-started).

### Connect to your peer

#### Export the organization identity of your network and the peer

1. In the platform UI, navigate to your deployed peer.
1. Next to **Organization identity**, click **Export**.

This will export the peer and the organization certificates and the user in a ZIP archive. Unarchive the exported file.

Unarchiving the exported file will create a directory named after your organization's MSP ID. For example, `RG-123-456-MSP`.

#### Export the orderer certificate of your network

1. In the platform UI, navigate to your network.
1. Select **Service nodes** > **Orderer**.
1. Click **Export TLS certificate**.

This will export the orderer certificate. Place the certificate in the directory that was created at the previous step when you unarchived the exported organization identity file.

#### Run the fabric-tools Docker container

``` sh
docker run -v /host/path/to/IDENTITY_DIRECTORY/:/MOUNT_DIRECTORY -it hyperledger/fabric-tools:2.2.0 /bin/ash
```

where

* /host/path/to/IDENTITY_DIRECTORY/ — path to the directory with the organization identity that you exported at the previous step.
* MOUNT_DIRECTORY — any name to mount a directory.

Example:

``` sh
docker run -v /home/user/RG-123-456-MSP/:/data -it hyperledger/fabric-tools:2.2.0 /bin/ash
```

#### Provide connection details and certificate paths

In the running Docker containter, provide the following:

``` sh
export CORE_PEER_ADDRESS=PEER_RPC_ENDPOINT
export CORE_PEER_MSPCONFIGPATH=/MOUNT_DIRECTORY/users/ADMIN_USER_DIRECTORY/msp/
export CORE_PEER_LOCALMSPID="MSP_ID"
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=/MOUNT_DIRECTORY/peers/PEER_DIRECTORY/tls/ca.crt
export ORDERER_CA=/MOUNT_DIRECTORY/ORDERER_CERTIFICATE
export ORDERER_ADDRESS=ORDERER_RPC_ENDPOINT
```

where

* PEER_RPC_ENDPOINT — the RPC endpoint of your peer. In the platform UI, navigate to your peer; click **Access and credentials** > **RPC endpoint**.
* MOUNT_DIRECTORY — the name of the directory that you mounted at the previous step.
* ADMIN_USER_DIRECTORY — the directory of your admin user that has the certificates. Exported at a previous step.
* MSP_ID — the ID of your organization. In the platform UI, navigate to your peer; click **Organization identity** > **MSP ID**.
* PEER_DIRECTORY — the directory of your peer that has the certificates. Exported at a previous step.
* ORDERER_CERTIFICATE — name and path of the certificate file that you exported at a previous step.
* ORDERER_RPC_ENDPOINT — the RPC endpoint of your orderer. In the platform UI, navigate to your network; click **Service nodes** > **Orderer** > **RPC endpoint**.

Example:

``` sh
export CORE_PEER_ADDRESS=nd-123-456-789.rg-123-456.p2pify.com:7051
export CORE_PEER_MSPCONFIGPATH=/data/users/Admin@rg-123-456.p2pify.com/msp/
export CORE_PEER_LOCALMSPID="RG-123-456-MSP"
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=/data/peers/nd-123-456-789.rg-123-456.p2pify.com/tls/ca.crt
export ORDERER_CA=/data/nd-123-456-789-cert.pem
export ORDERER_ADDRESS=nd-123-456-789.rg-123-456.p2pify.com:7050
```

#### Check your connection

``` sh
peer channel list
```

Example:

``` sh
$ peer channel list
2020-02-27 09:46:00.631 UTC [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
Channels peers has joined:
defaultchannel
```

### Interact with a chaincode

#### Package chaincode

``` sh
peer lifecycle chaincode package CHAINCODE_NAME.tar.gz --lang LANGUAGE --path CHAINCODE_SOURCE_PATH --label CHAINCODE_LABEL
```

where

* CHAINCODE_NAME — name of your chaincode.
* LANGUAGE — the programming language of your chaincode: `node` for JavaScript, `golang` for Go, `java` for Java.
* CHAINCODE_SOURCE_PATH — path to your chaincode source files. The files must be in the directory you mounted earlier.
* CHAINCODE_LABEL — any label you want to give to your chaincode; can be the same as the chaincode name.

This will package the chaincode and place it in the root of your mounted directory. Check that the packaged chaincode is created by doing `ls`.

Example:

``` sh
$ peer lifecycle chaincode package fabcar.tar.gz --lang node --path /data/chaincode/fabcar/javascript/ --label fabcar
$ ls
bin  fabcar.tar.gz  src
```

#### Install the chaincode on the peer you are connected to

``` sh
peer lifecycle chaincode install CHAINCODE_NAME.tar.gz
```

where

* CHAINCODE_NAME — name of your chaincode.

Example:

``` sh
$ peer lifecycle chaincode install fabcar.tar.gz
2020-02-27 07:44:36.291 UTC [cli.lifecycle.chaincode] submitInstallProposal -> INFO 001 Installed remotely: response:<status:200 payload:"\nGfabcar:6ab145685b4602cf429f93536981ea3eab802369e6359fb841fb0a9bcd4a51fb\022\006fabcar" >
2020-02-27 07:44:36.291 UTC [cli.lifecycle.chaincode] submitInstallProposal -> INFO 002 Chaincode code package identifier: fabcar:6ab145685b4602cf429f93536981ea3eab802369e6359fb841fb0a9bcd4a51fb
```

#### Check the chaincode installation

``` sh
peer lifecycle chaincode queryinstalled
```

Example:

``` sh
$ peer lifecycle chaincode queryinstalled
Installed chaincodes on peer:
Package ID: fabcar:6ab145685b4602cf429f93536981ea3eab802369e6359fb841fb0a9bcd4a51fb, Label: fabcar
```

#### Download the installed chaincode

``` sh
peer lifecycle chaincode getinstalledpackage --package-id PACKAGE_ID --peerAddresses $CORE_PEER_ADDRESS --tls --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE
```

where

* PACKAGE_ID — the ID of your chaincode installed on the peer. You can get the ID by running `peer lifecycle chaincode queryinstalled`.

Example:

``` sh
$ peer lifecycle chaincode getinstalledpackage --package-id fabcar:6ab145685b4602cf429f93536981ea3eab802369e6359fb841fb0a9bcd4a51fb --peerAddresses $CORE_PEER_ADDRESS --tls --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE
$ ls
bin  fabcar:6ab145685b4602cf429f93536981ea3eab802369e6359fb841fb0a9bcd4a51fb.tar.gz  src
```

#### Approve the chaincode for your organization

The majority of organizations in the channel must agree to the parameters of the chaincode.

``` sh
peer lifecycle chaincode approveformyorg --name CHAINCODE_NAME --package-id PACKAGE_ID -o $ORDERER_ADDRESS --tls --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE --cafile $ORDERER_CA --version CHAINCODE_VERSION --channelID CHANNEL_ID --sequence SEQUENCE_NUMBER --init-required --waitForEvent
```

where

* CHAINCODE_NAME — name of your chaincode.
* PACKAGE_ID — the ID of your chaincode installed on the peer. You can get the ID by running `peer lifecycle chaincode queryinstalled`.
* CHAINCODE_VERSION — the version of your chaincode as specified in the source files of the chaincode.
* CHANNEL_ID — use `defaultchannel`.
* SEQUENCE_NUMBER — the number of times your chaincode has been defined. Use `1` for your first installation. If you later upgrade your chaincode, use `2` and so on.
* `--init-required` — an optional parameter if your chaincode requires initialization.
* `--waitForEvent` — an optional parameter to wait for the event from each peer that signifies that the transaction has been committed successfully.

Example:

``` sh
$ peer lifecycle chaincode approveformyorg --name fabcar --package-id fabcar:6ab145685b4602cf429f93536981ea3eab802369e6359fb841fb0a9bcd4a51fb -o $ORDERER_ADDRESS --tls --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE --cafile $ORDERER_CA --version 1.0.0 --channelID defaultchannel --sequence 1 --init-required --waitForEvent
2020-02-27 07:45:27.742 UTC [chaincodeCmd] ClientWait -> INFO 001 txid [817547cebd7dd66084e7ff852ca8cac35d0c505416a7787ddd81947558280dc7] committed with status (VALID)
```

#### Query the approved chaincode

``` sh
$ peer lifecycle chaincode queryapproved --channelID CHANNEL_ID -n CHAINCODE_NAME
```

where

* CHANNEL_ID — use `defaultchannel`.
* CHAINCODE_NAME — name of your chaincode.

Example:

``` sh
$ peer lifecycle chaincode queryapproved --channelID defaultchannel -n fabcar
Approved chaincode definition for chaincode 'fabcar' on channel 'defaultchannel':
sequence: 1, version: 1.0.0, init-required: true, package-id: fabcar:6ab145685b4602cf429f93536981ea3eab802369e6359fb841fb0a9bcd4a51fb, endorsement plugin: escc, validation plugin: vscc
```

#### Check the chaincode commit readiness

``` sh
peer lifecycle chaincode checkcommitreadiness -o $ORDERER_ADDRESS --channelID CHANNEL_ID --tls --cafile $ORDERER_CA --name CHAINCODE_NAME --version CHAINCODE_VERSION --init-required
```

where

* CHANNEL_ID — use `defaultchannel`.
* CHAINCODE_NAME — name of your chaincode.
* CHAINCODE_VERSION — the version of your chaincode as specified in the source files of the chaincode.
* `--init-required` — an optional parameter if your chaincode requires initialization.

Example:

``` sh
$ peer lifecycle chaincode checkcommitreadiness -o $ORDERER_ADDRESS --channelID defaultchannel --tls --cafile $ORDERER_CA --name fabcar --version 1.0.0 --init-required
Chaincode definition for chaincode 'fabcar', version '1.0.0', sequence '1' on channel 'defaultchannel' approval status by org:
RG-123-456-MSP: true
```

#### Commit the chaincode

``` sh
peer lifecycle chaincode commit -o $ORDERER_ADDRESS --channelID CHANNEL_ID --name CHAINCODE_NAME --version CHAINCODE_VERSION --sequence SEQUENCE_NUMBER --init-required --tls --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE --cafile $ORDERER_CA --peerAddresses $CORE_PEER_ADDRESS
```

where

* CHANNEL_ID — use `defaultchannel`.
* CHAINCODE_NAME — name of your chaincode.
* CHAINCODE_VERSION — the version of your chaincode as specified in the source files of the chaincode.
* SEQUENCE_NUMBER — the number of times your chaincode has been defined. Use `1` for your first installation. If you later upgrade your chaincode, use `2` and so on.
* `--init-required` — an optional parameter if your chaincode requires initialization.

Example:

``` sh
$ peer lifecycle chaincode commit -o $ORDERER_ADDRESS --channelID defaultchannel --name fabcar --version 1.0.0 --sequence 1 --init-required --tls --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE --cafile $ORDERER_CA --peerAddresses $CORE_PEER_ADDRESS
2020-02-27 07:48:29.579 UTC [chaincodeCmd] ClientWait -> INFO 001 txid [df2ce4feadf60dea1d7969a59ef6c512e71334b2d56bd208e0c5980b7a19ee42] committed with status (VALID)
```

#### Query the committed chaincode definitions

``` sh
peer lifecycle chaincode querycommitted -o $ORDERER_ADDRESS --channelID CHANNEL_ID --tls --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE --cafile $ORDERER_CA
```

where

* CHANNEL_ID — use `defaultchannel`.

Example:

``` sh
$ peer lifecycle chaincode querycommitted -o $ORDERER_ADDRESS --channelID defaultchannel --tls --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE --cafile $ORDERER_CA
Committed chaincode definitions on channel 'defaultchannel':
Name: fabcar, Version: 1.0.0, Sequence: 1, Endorsement Plugin: escc, Validation Plugin: vscc
```

## Development tools

See [Hyperledger Fabric: Developing Applications](https://hyperledger-fabric.readthedocs.io/en/latest/developapps/developing_applications.html).

::: tip See also

* [Universal basic income opt-in chaincode](/tutorials/fabric/universal-basic-income-opt-in-chaincode)

:::
