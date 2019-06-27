# Deploying a hybrid MultiChain network

This section will guide you through the [hybrid deployment](/reference/glossary#hybrid) of a MultiChain network.

By the end of the section, you will have your MultiChain nodes from the same network running in cloud and [on-premises](/reference/glossary#on-prem).

## Prerequisites

* [Chainstack](https://console.chainstack.com/) account
* A supported operating system for the MultiChain on-premises deployment:
  * Linux 64-bit: Ubuntu 12.04+, CentOS 6.2+, Debian 7+, Fedora 15+, RHEL 6.2+
  * Windows 64-bit: Windows 7, 8, 10, Server 2008 or later
  * Mac 64-bit: supports OS X 10.11 or later
* System requirements for the MultiChain on-premises deployment:
  * 512MB of RAM
  * 1GB of disk space

## Overview

To deploy a hybrid MultiChain network, do the following:

1. With Chainstack, create a [Consortium](/projects/consortium) project.
2. With Chainstack, deploy a MultiChain network in cloud.
3. With Chainstack, get your cloud MultiChain node access information.
4. On-premises, install MultiChain.
5. On-premises, initialize your MultiChain node.
6. From your cloud MultiChain node, grant permissions to your on-premises MultiChain node's wallet address.
7. From your cloud MultiChain node, add your on-premises MultiChain node to the network.
8. From your on-premises MultiChain node, connect to the MultiChain network.

## Step-by-step

### 1. Create a Consortium project

1. Log in to your [Chainstack](https://console.chainstack.com/) account.
2. Click **Create project**.
3. Click **Consortium**.
3. Provide **Project name** and optionally **Description**.
4. Click **Create**.

This will create a project with Chainstack.

### 2. Deploy a MultiChain network

1. Select the created project and click **Get started**.
2. Provide **Network name**.
3. Under **Blockchain protocol**, select **MultiChain**. Click **Next**.
4. Under **Cloud hosting provider**, select your preferred provider.
5. Under **Region**, select the region for your deployment.

  ::: warning
  Currently only **Asia-Pacific** is available.
  :::

6. Review your changes and click **Create network**.

The network status will change from **Pending** to **Running** once deployed.

### 3. Get your cloud MultiChain node access information

1. In your MultiChain deployment project, click your MultiChain network name.
2. Under **Node name**, click your node.

Under **Credentials**, you will see your MultiChain node access information.

### 4. Install MultiChain on-premises

On your on-premises machine, install MultiChain.

See [MultiChain 2.0: Download and Install MultiChain](https://www.multichain.com/download-install/).

### 5. Initialize your on-premises MultiChain node

On your on-premises machine, attempt to connect to the cloud node to initialize your on-premises node.

Run:

```
multichaind CHAIN_NAME@HOSTNAME:PORT -daemon
```

where

* CHAIN_NAME — your cloud MultiChain network chain name. Available under **Credentials** > **Chain name**.
* HOSTNAME — your cloud MultiChain node hostname. Available under **Credentials** as part of **RPC endpoint**. The format is `nd-XXX-XXX-XXX.p2pify.com`.
* PORT — your cloud MultiChain node port. Always use the default value `7447`.

Command example:

```
multichaind nw-123-456-7@nd-123-456-789.p2pify.com:7447 -daemon
```

As a result of running the command, you will have:

* An initialized on-premises node.
* Your on-premises node's wallet address.

Output example:

```
MultiChain 2.0.2 Daemon (Community Edition, latest protocol 20010)

Starting up node...

Retrieving blockchain parameters from the seed node nd-123-456-789.p2pify.com:7447 ...
Blockchain successfully initialized.

Please ask blockchain admin or user having activate permission to let you connect and/or transact:
multichain-cli nw-123-456-7 grant 14SW7RsdNbktZxkTSzi52iLvXviHyPebqCaW1q connect
multichain-cli nw-123-456-7 grant 14SW7RsdNbktZxkTSzi52iLvXviHyPebqCaW1q connect,send,receive
```

### 6. Grant permissions to your on-premises MultiChain node

For information on how to connect to and interact with a MultiChain node, see [Interacting with the blockchain](/guides/interacting-with-the-blockchain#multichain).

On your on-premises machine, grant your on-premises MultiChain node's wallet address with the `grant` method and the following permissions:

* `conect`
* `send`
* `receive`

Sending a curl request from terminal:

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d {"method":"grant","params":["WALLET_ADDRESS","connect,send,receive"],"id":1,"chain_name":"CHAIN_NAME"}'
```

where

* RPC_ENDPOINT — your cloud MultiChain node RPC endpoint. Available under **Credentials** > **RPC endpoint**.
* RPC_USER — your cloud MultiChain node RPC username. Available under **Credentials** > **RPC user**.
* RPC_PASSWORD — your cloud MultiChain node RPC password. Available under **Credentials** > **RPC password**.
* WALLET_ADDRESS — your on-premises MultiChain node's wallet address. You received the wallet address at the end of [Step 5](multichain-hybrid#_5-initialize-your-on-premises-multichain-node).
* CHAIN_NAME — your cloud MultiChain network chain name. Available under **Credentials** > **Chain name**.

Command example:

``` sh
curl https://nd-123-456-789.p2pify.com -u "modest-cori:ought-vilify-parcel-urging-dime-sixth" -d '{"method":"grant","params":["14SW7RsdNbktZxkTSzi52iLvXviHyPebqCaW1q","connect,send,receive"],"id":1,"chain_name":"nw-123-456-7"}'
```

Output example:

``` json
{"result":"17859d3efdaa95bc9d1573e539a9b5177e17debb6afe37078ac6c4bd1bec9821","error":null,"id":1}
```

### 7. Add your on-premises MultiChain node to the network

On your on-premises machine, add your on-premises MultiChain node to the network with the `addnode` method.

Sending a curl request from terminal:

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"addnode","params":["ON_PREM_IP:PORT","add"],"id":2,"chain_name":"CHAIN_NAME"}'
```

where

* RPC_ENDPOINT — your cloud MultiChain node RPC endpoint. Available under **Credentials** > **RPC endpoint**.
* RPC_USER — your cloud MultiChain node RPC username. Available under **Credentials** > **RPC user**.
* RPC_PASSWORD — your cloud MultiChain node RPC password. Available under **Credentials** > **RPC password**.
* ON_PREM_IP — your on-premises MultiChain node machine's IP address.
* PORT — your on-premises MultiChain node machine's port.
* CHAIN_NAME — your cloud MultiChain network chain name. Available under **Credentials** > **Chain name**.

Command example:

``` sh
curl https://nd-123-456-789.p2pify.com -u "modest-cori:ought-vilify-parcel-urging-dime-sixth" -d '{"method":"addnode","params":["123.45.100.80:7447","add"],"id":2,"chain_name":"nw-123-456-7"}'
```

### 8. Connect to the MultiChain network

On your on-premises machine, connect to the MultiChain network.

Run:

``` sh
multichaind CHAIN_NAME@HOSTNAME:PORT -daemon
```

where

* CHAIN_NAME — your cloud MultiChain network chain name. Available under **Credentials** > **Chain name**.
* HOSTNAME — your cloud MultiChain node hostname. Available under **Credentials** as part of **RPC endpoint**. The format is `nd-XXX-XXX-XXX.p2pify.com`.
* PORT — your cloud MultiChain node port. Always use the default value `7447`.

Command example:

``` sh
multichaind nw-123-456-7@nd-123-456-789.p2pify.com:7447 -daemon
```

## Interact from any node

Now that the MultiChain network is running in a hybrid environment, you can interact with it through `multichain-cli`.

You can interact through your on-premises node or your cloud node.

### Enter multichain-cli interactive mode through your on-premises node

Enter interactive mode:

``` sh
multichain-cli CHAIN_NAME@IP_ADDRESS:PORT
```

where

* CHAIN_NAME — your cloud MultiChain network chain name. Available under **Credentials** > **Chain name**.
* IP_ADDRESS — your on-premises MultiChain node machine's IP address.
* PORT — your on-premises MultiChain node machine's port.

Example command:

``` sh
multichain-cli nw-123-456-7@123.45.100.80:7447
```

### Enter multichain-cli interactive mode through your cloud node

Enter interactive mode:

``` sh
multichain-cli CHAIN_NAME@HOSTNAME:PORT
```

where

* CHAIN_NAME — your cloud MultiChain network chain name. Available under **Credentials** > **Chain name**.
* HOSTNAME — your cloud MultiChain node hostname. Available under **Credentials** as part of **RPC endpoint**. The format is `nd-XXX-XXX-XXX.p2pify.com`.
* PORT — your cloud MultiChain node port. Always use the default value `7447`.

Example command:

``` sh
multichain-cli nw-123-456-7@nd-123-456-789.p2pify.com:7447
```

### Run commands in interactive mode

Once in interactive mode, run any [MultiChain JSON-RPC command](https://www.multichain.com/developers/json-rpc-api/).

Examples:

Get the node and blockchain information:

``` sh
nw-123-456-7: getinfo
```

Example output:

```
{"method":"getinfo","params":[],"id":"64739383-1561354299","chain_name":"nw-123-456-7"}

{
    "version" : "2.0.2",
    "nodeversion" : 20002901,
    "protocolversion" : 20004,
    "chainname" : "nw-123-456-7",
    "description" : "My Network",
    "protocol" : "multichain",
    "port" : 7447,
    "setupblocks" : 60,
    "nodeaddress" : "nw-123-456-7@123.45.100.80:7447",
    "burnaddress" : "1XXXXXXX24XXXXXXoiXXXXXXegXXXXXXURq4HJ",
    "incomingpaused" : false,
    "miningpaused" : false,
    "offchainpaused" : false,
    "walletversion" : 60000,
    "balance" : 0,
    "walletdbversion" : 3,
    "reindex" : false,
    "blocks" : 70,
    "timeoffset" : 0,
    "connections" : 2,
    "proxy" : "",
    "difficulty" : 5.96046447753906e-8,
    "testnet" : false,
    "keypoololdest" : 1560923993,
    "keypoolsize" : 2,
    "paytxfee" : 0,
    "relayfee" : 0,
    "errors" : ""
}
```

Get information about the other nodes to which this node is connected

``` sh
nw-123-456-7: getpeerinfo
```

Example output:

```
{"method":"getpeerinfo","params":[],"id":"18369030-1561354022","chain_name":"nw-123-456-7"}

[
    {
        "id" : 1,
        "addr" : "35.240.131.147:55052",
        "addrlocal" : "123.45.100.80:7447",
        "services" : "0000000000000001",
        "lastsend" : 1561354022,
        "lastrecv" : 1561354012,
        "bytessent" : 1793,
        "bytesrecv" : 1761,
        "conntime" : 1561354001,
        "pingtime" : 0.498706,
        "pingwait" : 0.123433,
        "version" : 70002,
        "subver" : "/MultiChain:0.2.0.9/",
        "handshakelocal" : "14SW7RsdNbktZxkTSzi52iLvXviHyPebqCaW1q",
        "handshake" : "13849V95zfosL2RKKFCXcMrTBZdGU8XBiWNxum",
        "inbound" : true,
        "startingheight" : 70,
        "banscore" : 0,
        "synced_headers" : 70,
        "synced_blocks" : 70,
        "inflight" : [
        ],
        "whitelisted" : false
    },
    {
        "id" : 2,
        "addr" : "34.87.116.95:7447",
        "addrlocal" : "10.148.0.55:49608",
        "services" : "0000000000000001",
        "lastsend" : 1561354013,
        "lastrecv" : 1561354013,
        "bytessent" : 937,
        "bytesrecv" : 938,
        "conntime" : 1561354012,
        "pingtime" : 0.526633,
        "version" : 70002,
        "subver" : "/MultiChain:0.2.0.9/",
        "handshakelocal" : "14SW7RsdNbktZxkTSzi52iLvXviHyPebqCaW1q",
        "handshake" : "13849V95zfosL2RKKFCXcMrTBZdGU8XBiWNxum",
        "inbound" : false,
        "startingheight" : 70,
        "banscore" : 0,
        "synced_headers" : -1,
        "synced_blocks" : -1,
        "inflight" : [
        ],
        "whitelisted" : false
    }
]
```

::: tip See also:
* [Interacting with the blockchain](/guides/interacting-with-the-blockchain#multichain)
* [Application development](/guides/application-development)
:::