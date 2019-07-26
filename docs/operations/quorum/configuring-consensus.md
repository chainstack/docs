# Configuring consensus

For the Quorum consensus details, see [Quorum](/blockchains/quorum).

## Raft

You can always remove the existing verifier nodes or a minter node from the network. You can also always add new verifier nodes to the network.

To get the list of current minter and verifier nodes:

``` js
raft.cluster
```

To get the enode of the minter node:

``` js
raft.leader
```

To add a verifier node:

``` js
raft.addPeer('enode://ENODE@NODE_IP:P2P_PORT?discport=0&raftport=RAFT_PORT')
```

where 

* ENODE is the hexadecimal node ID.
* NODE_IP is the IP address of the node.
* P2P_PORT is the port of the node.
* RAFT_PORT is the Raft port of the node.

You can get all of the node information by running `raft.cluster`.

To remove a node:

``` js
raft.removePeer(RAFT_ID)
```

## IBFT

The group of validator nodes can always be changed on the network to ensure that only valid nodes are present and the faulty nodes can be removed.

To get the list of current validator nodes:

``` js
istanbul.getValidators()
```

To add a new validator node:

``` js
istanbul.propose("DEFAULT_WALLET_ADDRESS", true)
```

where

* DEFAULT_WALLET_ADDRESS is the node's address. See [View node access and credentials](/platform/view-node-access-and-credentials).
* `true` is the parameter to add the node to the validator group.

To remove a validator node:

``` js
istanbul.propose("DEFAULT_WALLET_ADDRESS", false)
```

where

* DEFAULT_WALLET_ADDRESS is the node's address. See [View node access and credentials](/platform/view-node-access-and-credentials).
* `false` is the parameter to remove the node from the validator group.

::: tip See also

* [Istanbul RPC API](https://docs.goquorum.com/en/latest/Consensus/istanbul-rpc-api/)

:::
