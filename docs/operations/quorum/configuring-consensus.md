---
meta:
  - name: description
    content: Learn how to configure a Raft or IBFT consensus of a Quorum network.
  - name: keywords
    content: quorum raft ibft consensus configure
---

# Configuring consensus

For the Quorum consensus details, see [Quorum](/blockchains/quorum).

Use [GoQuorum](/operations/quorum/tools#goquorum) or [JSON-RPC API tools](/operations/quorum/tools#json-rpc-api) to interact with the nodes.

## Raft

By default, the very first node you deploy with Chainstack as part of your Quorum Raft network assumes the minter role.

Each subsequent node that you deploy as part of the same network assumes the learner role. For Quorum Raft details, see [Raft](/blockchains/quorum#raft).

You can always [remove the existing](#remove-a-node) minter, verifier, or learner nodes from the network. You can also always add [verifier nodes](#add-a-verifier-node) or [learner nodes](#add-a-learner-node) to the network.

### Get the list of current nodes and roles

GoQuorum:

``` js
raft.cluster
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d -d '{"method":"raft_cluster","params":[],"id":1}'
```

Example of a 3 node Quorum Raft:

``` js
> raft.cluster
[{
    hostname: "12.345.678.912",
    nodeId: "aa41b2c83ea797d1aae60a3059d2693038aaef44aeaf14d1afaa06c5d6a55d6741c134befee9d5859f424054fb131bf3c65c11d184defe9c35e6d69fccc8c156",
    p2pPort: 12345,
    raftId: 1,
    raftPort: 50400,
    role: "minter"
}, {
    hostname: "34.567.891.234",
    nodeId: "12aabb9dcc145fce63c737a454f8bf49f4439cad32e1f96e6c752e05ca5443921f6aebcb25b7392c6508eeb72efb4ffe1cd0f67812610d12473da8b73f3336cb",
    p2pPort: 12345,
    raftId: 2,
    raftPort: 50400,
    role: "verifier"
}, {
    hostname: "56.789.123.45",
    nodeId: "1aabc26c96b5443ca87209816356b32018d198df124252bdc78c9f9ece5e44a8684fad54e36563b0b2fea0e21090b5eeae0be667bfa9a2bc24b4f12ddacd98d4",
    p2pPort: 12345,
    raftId: 3,
    raftPort: 50400,
    role: "verifier"
}]
```

where

* `hostname` — the IP address of the node.
* `nodeId` — the node ID in the network.
* `p2pPort` — the node to node connection port.
* `raftId` — the Quorum Raft node ID in the network.
* `raftPort` — the Quorum Raft transport layer port.
* `role` — the node role in the consensus.

### Get the node ID of the minter node

GoQuorum:

``` js
raft.leader
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d -d '{"method":"raft_leader","params":[],"id":1}'
```

Example:

``` js
> raft.leader
"aa41b2c83ea797d1aae60a3059d2693038aaef44aeaf14d1afaa06c5d6a55d6741c134befee9d5859f424054fb131bf3c65c11d184defe9c35e6d69fccc8c156"
```

### Get the role of the node you are connected to

GoQuorum:

``` js
raft.role
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d -d '{"method":"raft_role","params":[],"id":1}'
```

Example:

``` js
> raft.role
"minter"
```

### Add a verifier node

GoQuorum:

``` js
raft.addPeer('enode://NODE_ID@NODE_IP:P2P_PORT?raftport=RAFT_PORT')
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d -d '{"method":"raft_addPeer","params":["enode://NODE_ID@NODE_IP:P2P_PORT?raftport=RAFT_PORT"],"id":1}'
```

where

* NODE_ID — the hexadecimal node ID.
* NODE_IP — the IP address of the node.
* P2P_PORT — the port of the node.
* RAFT_PORT — the Raft port of the node.

Example:

``` js
> raft.addPeer('enode://12345f021112a110487689706b984ffe81b1584aa44f5ece7a57b9929091c43aefa892a30e082795e109a5c22f531d313e78b7e90caf8f6da53dc027f1d90976@56.789.123.45:12345?raftport=50400')
4
```

You can get all of the node information by running `raft.cluster`.

### Add a learner node

GoQuorum:

``` js
raft.addLearner('enode://NODE_ID@NODE_IP:P2P_PORT?raftport=RAFT_PORT')
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d -d '{"method":"raft_addLearner","params":["enode://NODE_ID@NODE_IP:P2P_PORT?raftport=RAFT_PORT"],"id":1}'
```

where

* NODE_ID — the hexadecimal node ID.
* NODE_IP — the IP address of the node.
* P2P_PORT — the port of the node.
* RAFT_PORT — the Raft port of the node.

Example:

``` js
> raft.addLearner('enode://12345f021112a110487689706b984ffe81b1584aa44f5ece7a57b9929091c43aefa892a30e082795e109a5c22f531d313e78b7e90caf8f6da53dc027f1d90976@56.789.123.45:12345?raftport=50400')
4
```

### Promote a learner node to the verifier role

GoQuorum:

``` js
raft.promoteToPeer(RAFT_ID)
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d -d '{"method":"promoteToPeer","params":[RAFT_ID],"id":1}'
```

where

* RAFT_ID — the Raft node ID of the learner node. You can get all node IDs by running `raft.cluster`.

Example:

``` js
> raft.promoteToPeer(4)
true
```

### Remove a node

GoQuorum:

``` js
raft.removePeer(RAFT_ID)
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d -d '{"method":"raft_removePeer","params":[RAFT_ID],"id":1}'
```

where

* RAFT_ID — the Raft node ID. You can get all node IDs by running `raft.cluster`.

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

GoQuorum:

``` js
istanbul.getValidators()
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d -d '{"method":"istanbul_getValidators","params":[],"id":1}'
```

Example:

``` js
> istanbul.getValidators()
["0x12345ca36ba875d7dd157ff9177a5b86eab0c5bd"]
```

### Add a new validator node

To add a new validator node, you must run a validator proposal command from the majority of nodes in your network. For Quorum IBFT details, see [IBFT](/blockchains/quorum#ibft).

Run the following command from a number of nodes in your network to make it a majority proposal.

GoQuorum:

``` js
istanbul.propose("VALIDATOR_ADDRESS", true)
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d -d '{"method":"istanbul_propose","params":["VALIDATOR_ADDRESS", true],"id":1}'
```

where

* VALIDATOR_ADDRESS — the address of the node that you are proposing as a validator. Available under **Access and credentials** > **Validator address**. See also [View node access and credentials](/platform/view-node-access-and-credentials).
* `true` — the parameter to add the node to the validator group.

Example:

``` js
> istanbul.propose("0xc67891237df114b9b3953c211a9b220b045a4d62", true)
null
```

You can also see the node's validator address when you connect to the node with GoQuorum:

``` js
$ ./geth attach https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
WARNING: call to admin.getNodeInfo() failed, unable to determine consensus mechanism
Welcome to the Geth JavaScript console!

instance: Geth/v1.8.18-stable-c894c2d7(quorum-v2.2.5)/linux-amd64/go1.11.12
coinbase: 0xc67891237df114b9b3953c211a9b220b045a4d62
at block: 14291 (Thu, 12 Sep 2019 15:30:47 UTC)
 modules: debug:1.0 eth:1.0 istanbul:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0
```

The `coinbase` parameter output is the validator address; `coinbase` has been repurposed as validator address in Quorum IBFT implementation.

### Remove a validator node

GoQuorum:

``` js
istanbul.propose("VALIDATOR_ADDRESS", false)
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d -d '{"method":"istanbul_propose","params":["VALIDATOR_ADDRESS", true],"id":1}'
```

where

* VALIDATOR_ADDRESS — the address of the node that you are proposing as a validator. Available under **Access and credentials** > **Validator address**. See also [View node access and credentials](/platform/view-node-access-and-credentials).
* `false` — the parameter to remove the node from the validator group.

Example:

``` js
>  istanbul.propose("0xc67891237df114b9b3953c211a9b220b045a4d62", false)
null
```

### Get the list of the latest validator candidate proposals

GoQuorum:

``` js
istanbul.candidates
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d -d '{"method":"istanbul_candidates","params":[],"id":1}'
```

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

GoQuorum:

``` js
istanbul.discard("VALIDATOR_ADDRESS")
```

Curl:

``` sh
curl -H "Content-Type: application/json" https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d -d '{"method":"istanbul_discard","params":["VALIDATOR_ADDRESS"],"id":1}'
```

where

* VALIDATOR_ADDRESS — the address of the node that you are proposing as a validator. Available under **Access and credentials** > **Validator address**. See also [View node access and credentials](/platform/view-node-access-and-credentials).

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

* [Istanbul RPC API](https://docs.goquorum.consensys.net/en/stable/Reference/Consensus/IBFT-RPC-API/)
* [Raft RPC API](https://docs.goquorum.consensys.net/en/stable/Reference/Consensus/Raft-RPC-API/)

:::
