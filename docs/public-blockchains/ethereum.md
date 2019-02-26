# Ethereum

Ethereum was released as a public blockchain protocol. This means that anyone can participate on the blockchain network, without permission by:
* Running a public node on their local device or off a cloud solution provider; 
* Validating transactions on the network (and being rewarded for participating in the consensus process), 
* Sending transactions through the network and expect to see them included in the blockchain if they are valid
* Reading transaction on the public block explorer. Transactions are transparent, but anonymous

::: tip
You have a few reasons why you’d run a node, including:
1. You’re solo mining or running a mining pool, if this is the case then you need a node in order to talk to the network.
2. You want to make sure your transactions are sent to the network yourself. If you have your own node, it will validate your transaction prior to broadcast to the network.
3. You want to help secure the network; the more independent nodes running the more copies there are of the blockchain and the more resilient it is.
4. You want faster peer-to-peer synching and more security; the more nodes the lower the latency in sharing blocks and the more copies of the blockchain that exist.
:::

## Visibility

All participants have access to all entries ever recorded.

## Ordering

All participants must reach consensus over the order of all transactions that have taken place, irrespective of whether a participant has taken part in a particular transaction or not.

## Consensus

Ethereum mainnet operates under the Proof of Work (PoW) consensus protocol where nodes must solve complex mathematical equations before they can validate transactions. This process is called mining. These mathematical problems are hard to compute but easy to verify. Once miners solve them, they are rewarded with the corresponding digital currency, referred to as a 'block reward'.

### Performance

Performance on public blockchains utilizing PoW are usually orders of magnitude less than permissioned or private blockchains running other consensus protocols.
