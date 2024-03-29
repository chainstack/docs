---
meta:
  - name: description
    content: Polygon zkEVM is the first Ethereum L2 scalability solution that utilizes zero-knowledge rollups to ensure the privacy and security of transactions while providing fast finality and low gas fees.
  - name: keywords
    content: polygon zkevm l1 l2 rollup zero knowledge
---

# Polygon zkEVM

Polygon is a blockchain network that operates on top of the Ethereum network, designed to make transactions faster, more scalable, and less expensive. zkEVM is a scaling solution developed by Polygon that uses zero-knowledge proofs to increase the security and privacy of transactions, while maintaining compatibility with the Ethereum Virtual Machine. With the ability to process up to 2,000 transactions per second, zkEVM enables developers to create decentralized applications that can operate on the Polygon network in a highly secure and scalable environment.

Additionally, zkEVM lowers gas fees for transactions on Polygon, providing users with a more cost-effective experience. Overall, zkEVM is a competitive scaling solution in the blockchain industry that offers a convenient and secure way to transact on Polygon.

Polygon zkEVM has the following critical infrastructure components:

- Trusted Sequencer
- Trusted Aggregator
- Consensus Contract

## Trusted Sequencer

The Trusted Sequencer is a trusted entity that orders and submits batches of transactions for processing on the zkEVM system on Polygon. It minimizes the risk of network congestion and fraud by organizing transactions in the correct order and performing parallel processing. The Trusted Sequencer enables high throughput and secure transaction processing on Polygon.

## Trusted Aggregator

The Trusted Aggregator is a trusted entity that combines off-chain data with transaction data to form a Merkle tree and generate zero-knowledge proofs in the Polygon zkEVM. This approach ensures fast and efficient processing while maintaining the privacy and security of transactions. The Trusted Aggregator is a critical component of the overall system, authorized by the Polygon network to perform these actions, which minimizes the risk of fraud or malicious behavior. Overall, the Trusted Aggregator plays a vital role in ensuring the validity and security of transactions on Polygon.

## Consensus Contract

The Trusted Sequencer and the Trusted Aggregator both employ the Consensus Contract (known as `PolygonZkEVM.sol`) in their communication with layer 1.

The Trusted Sequencer submits batches of transactions to the Consensus Contract for validation and processing, while the Trusted Aggregator provides the necessary data for generating zero-knowledge proofs.

The Consensus Contract verifies the correctness of the transactions submitted to it by executing the relevant code and checking the results against the zero-knowledge proofs generated by the Trusted Aggregator. Once verified, the Consensus Contract updates the state of the system accordingly and broadcasts the results to the network.

::: tip See also

* Polygon zkEVM documentation: [Polygon zkEVM Architecture](https://wiki.polygon.technology/docs/zkEVM/architecture)

:::
