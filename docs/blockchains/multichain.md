# MultiChain

MultiChain is a fork of Bitcoin Core.

MultiChain is a permissioned consortium blockchain protocol.

## Consensus algorithm

MultiChain achieves consensus by validating blocks in a round-robin scheme with a `mining-diversity` parameter.

All nodes with the addresses with the `mine` permission take a turn in validating blocks in the network.

The way the `mine` nodes take turns in validating blocks is determined by the network's `mining-diversity` parameter.

The `mining-diversity` parameter can be set to any value between `0` and `1`:

* `1` — every `mine` node in the network must take a turn in block validation per round. This is the strictest setting.
* `0` — not every `mine` node must take a turn in block validation per round; any `mine` node can take turns in block validation in a random fashion. This is the loosest setting.

The round-robin scheme is the following:

* Determine the number of nodes with the `mine` permission in the network.
* Multiply the number of `mine` nodes by the `mining-diversity` value to get the value *spacing*.
* Check if the `mine` node validating the current block validated a *spacing*-1 block. If the `mine` node validated a *spacing*-1 block, render the block invalid.

The `mining-diversity` parameter cannot be changed once the chain is initialized. Chainstack deploys MultiChain with the default `mining-diversity` value set to `0.3`.

Round-robin example with 10 `mine` nodes deployed with Chainstack:

* 10 nodes permitted to validate blocks.
* 10*0.3=3. *spacing* is 3. *spacing*-1 is 2.
* each `mine` node in the network can validate every third block and cannot validate two blocks in a row.

::: tip See also
* [MultiChain for Developers](https://www.multichain.com/developers/)
:::