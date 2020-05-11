---
meta:
  - name: description
    content: MultiChain is a permissioned consortium blockchain protocol and is a fork of Bitcoin Core. Learn how the round-robin consensus works and how to adjust it.
  - name: keywords
    content: multichain bitcoin blockchain consensus permissioned
---

# MultiChain

MultiChain is a fork of Bitcoin Core.

MultiChain is a permissioned consortium blockchain protocol.

## Consensus

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

The default `mining-diversity` parameter is `0.3` and cannot be changed once the chain is initialized.

Round-robin example with 10 `mine` nodes with  `mining-diversity` set to `0.3`:

* 10 nodes permitted to validate blocks.
* 10*0.3=3. *spacing* is 3. *spacing*-1 is 2.
* each `mine` node in the network can validate every third block and cannot validate two blocks in a row.

::: tip See also

* <a href="https://www.multichain.com/developers/" rel="nofollow">MultiChain for Developers</a>

:::
