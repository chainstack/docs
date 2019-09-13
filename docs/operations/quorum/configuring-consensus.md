# Configuring consensus

For the Quorum consensus details, see [Quorum](/blockchains/quorum).

Use [Quorum Geth](/operations/quorum/tools#geth) or [JSON-RPC API tools](/operations/quorum/tools#json-rpc-api) to interact with the nodes.

## Raft

By default, the very first node you deploy with Chainstack as part of your Quorum Raft network assumes the minter role.

Each subsequent node that you deploy as part of the same network assumes the verifier role. For Quorum Raft details, see [Raft](/blockchains/quorum#raft).

You can always remove the existing verifier nodes or a minter node from the network. You can also always add new verifier nodes to the network.

### Get the list of current minter and verifier nodes

Geth:

``` js
raft.cluster
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com -d '{"method":"raft_cluster","params":[],"id":10001}'
```

where

* `id` — the Quorum network ID available under **Access and credentials** > **Network ID**. See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example of a 3 node Quorum Raft:

``` js
> raft.cluster
[{
    ip: "12.345.678.912",
    nodeId: "aa41b2c83ea797d1aae60a3059d2693038aaef44aeaf14d1afaa06c5d6a55d6741c134befee9d5859f424054fb131bf3c65c11d184defe9c35e6d69fccc8c156",
    p2pPort: 12345,
    raftId: 1,
    raftPort: 50400
}, {
    ip: "34.567.891.234",
    nodeId: "12aabb9dcc145fce63c737a454f8bf49f4439cad32e1f96e6c752e05ca5443921f6aebcb25b7392c6508eeb72efb4ffe1cd0f67812610d12473da8b73f3336cb",
    p2pPort: 12345,
    raftId: 2,
    raftPort: 50400
}, {
    ip: "56.789.123.45",
    nodeId: "1aabc26c96b5443ca87209816356b32018d198df124252bdc78c9f9ece5e44a8684fad54e36563b0b2fea0e21090b5eeae0be667bfa9a2bc24b4f12ddacd98d4",
    p2pPort: 12345,
    raftId: 3,
    raftPort: 50400
}]
```

where

* `ip` — the IP address of the node.
* `nodeId` — the node ID in the network.
* `p2pPort` — the node to node connection port.
* `raftId` — the Quorum Raft node ID in the network.
* `raftPort` — the Quorum Raft transport layer port.

### Get the node ID of the minter node

Geth:

``` js
raft.leader
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com -d '{"method":"raft_leader","params":[],"id":10001}'
```

where

* `id` — the Quorum network ID available under **Access and credentials** > **Network ID**. See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` js
> raft.leader
"aa41b2c83ea797d1aae60a3059d2693038aaef44aeaf14d1afaa06c5d6a55d6741c134befee9d5859f424054fb131bf3c65c11d184defe9c35e6d69fccc8c156"
```

### Get the role of the node you are connected to

Geth:

``` js
raft.role
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com -d '{"method":"raft_role","params":[],"id":10001}'
```

where

* `id` — the Quorum network ID available under **Access and credentials** > **Network ID**. See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` js
> raft.role
"minter"
```

### Add a verifier node

Geth:

``` js
raft.addPeer('enode://NODE_ID@NODE_IP:P2P_PORT?raftport=RAFT_PORT')
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com -d '{"method":"raft_addPeer","params":["enode://NODE_ID@NODE_IP:P2P_PORT?raftport=RAFT_PORT"],"id":10001}'
```

where

* NODE_ID — the hexadecimal node ID.
* NODE_IP — the IP address of the node.
* P2P_PORT — the port of the node.
* RAFT_PORT — the Raft port of the node.
* `id` — the Quorum network ID available under **Access and credentials** > **Network ID**. See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` js
> raft.addPeer('enode://12345f021112a110487689706b984ffe81b1584aa44f5ece7a57b9929091c43aefa892a30e082795e109a5c22f531d313e78b7e90caf8f6da53dc027f1d90976@56.789.123.45:12345?raftport=50400')
4
```

You can get all of the node information by running `raft.cluster`.

### Remove a node

Geth:

``` js
raft.removePeer(RAFT_ID)
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com -d '{"method":"raft_removePeer","params":[RAFT_ID],"id":10001}'
```

where

* RAFT_ID — the Raft node ID. You can get all node IDs by running `raft.cluster`.
* `id` — the Quorum network ID available under **Access and credentials** > **Network ID**. See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` js
> raft.removePeer(2)
null
```

## IBFT

By default, the very first node you deploy with Chainstack as part of your IBFT Quorum network assumes the validator role.

Each subsequent node that you deploy will need to be [proposed for the validator role](#add-a-new-validator-node) by the majority of validators. For Quorum IBFT details, see [IBFT](/blockchains/quorum#ibft).

The group of validator nodes can always be changed on the network to ensure that only valid nodes are present and the faulty nodes can be removed.

### Get the list of current validator nodes

Geth:

``` js
istanbul.getValidators()
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com -d '{"method":"istanbul_getValidators","params":[],"id":10001}'
```

where

* `id` — the Quorum network ID available under **Access and credentials** > **Network ID**. See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` js
> istanbul.getValidators()
["0x12345ca36ba875d7dd157ff9177a5b86eab0c5bd"]
```

### Add a new validator node

To add a new validator node, you must run a validator proposal command from the majority of nodes in your network. For Quorum IBFT details, see [IBFT](/blockchains/quorum#ibft).

Run the following command from a number of nodes in your network to make it a majority proposal.

Geth:

``` js
istanbul.propose("VALIDATOR_ADDRESS", true)
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com -d '{"method":"istanbul_propose","params":["VALIDATOR_ADDRESS", true],"id":10001}'
```

where

* VALIDATOR_ADDRESS — the address of the node that you are proposing as a validator. Available under **Access and credentials** > **Validator address**. See also [View node access and credentials](/platform/view-node-access-and-credentials).
* `true` — the parameter to add the node to the validator group.
* `id` — the Quorum network ID available under **Access and credentials** > **Network ID**. See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` js
> istanbul.propose("0xc67891237df114b9b3953c211a9b220b045a4d62", true)
null
```

You can also see the node's validator address when you connect to the node with Quorum Geth:

``` js
$ ./geth attach https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com
WARNING: call to admin.getNodeInfo() failed, unable to determine consensus mechanism
Welcome to the Geth JavaScript console!

instance: Geth/v1.8.18-stable-c894c2d7(quorum-v2.2.5)/linux-amd64/go1.11.12
coinbase: 0xc67891237df114b9b3953c211a9b220b045a4d62
at block: 14291 (Thu, 12 Sep 2019 15:30:47 UTC)
 modules: debug:1.0 eth:1.0 istanbul:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0
```

The `coinbase` parameter output is the validator address; `coinbase` has been repurposed as validator address in Quorum IBFT implementation.

### Remove a validator node

Geth:

``` js
istanbul.propose("VALIDATOR_ADDRESS", false)
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com -d '{"method":"istanbul_propose","params":["VALIDATOR_ADDRESS", true],"id":10001}'
```

where

* VALIDATOR_ADDRESS — the address of the node that you are proposing as a validator. Available under **Access and credentials** > **Validator address**. See also [View node access and credentials](/platform/view-node-access-and-credentials).
* `false` — the parameter to remove the node from the validator group.
* `id` — the Quorum network ID available under **Access and credentials** > **Network ID**. See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` js
>  istanbul.propose("0xc67891237df114b9b3953c211a9b220b045a4d62", false)
null
```

### Get the list of the latest validator candidate proposals

Geth:

``` js
istanbul.candidates
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com -d '{"method":"istanbul_candidates","params":[],"id":10001}'
```

where

* `id` — the Quorum network ID available under **Access and credentials** > **Network ID**. See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` js
> istanbul.candidates
{
  0x1234be669c541e92f64d6c133ca497d61fc87d4a6: true,
  0xc67891237df114b9b3953c211a9b220b045a4d62: false
}
```

In the example, node `0x1234be669c541e92f64d6c133ca497d61fc87d4a6` is proposed to become a validator, and node `0xc67891237df114b9b3953c211a9b220b045a4d62` is proposed to be removed from validators.

### Remove a validator candidate from running for the validator role

Geth:

``` js
istanbul.discard("VALIDATOR_ADDRESS")
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://user-name:pass-word-pass-word-pass-word@nd-123-456-789.p2pify.com -d '{"method":"istanbul_discard","params":["VALIDATOR_ADDRESS"],"id":10001}'
```

where

* VALIDATOR_ADDRESS — the address of the node that you are proposing as a validator. Available under **Access and credentials** > **Validator address**. See also [View node access and credentials](/platform/view-node-access-and-credentials).
* `id` — the Quorum network ID available under **Access and credentials** > **Network ID**. See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` js
> istanbul.discard("0x1234be669c541e92f64d6c133ca497d61fc87d4a6")
null
> istanbul.candidates
{
  0xc67891237df114b9b3953c211a9b220b045a4d62: false
}
```

::: tip See also

* [Istanbul RPC API](https://docs.goquorum.com/en/latest/Consensus/istanbul-rpc-api/)

:::
