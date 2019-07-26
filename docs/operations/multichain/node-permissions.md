# Node permissions

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

::: tip See also

* [Default addresses](/operations/multichain/default-addresses)
* [MultiChain permissions management](https://www.multichain.com/developers/permissions-management/)

:::
