---
meta:
  - name: description
    content: See the release notes for all versions of the Chainstack managed blockchain services platform.
  - name: keywords
    content: release notes version blockchain cloud protocol
---

# Release notes

## Chainstack 2.2

*January 25, 2021*

### What's new

* **Private hosting**. Connect your Chainstack organization to Amazon Elastic Kubernetes Service (EKS), and use your EKS clusters to host your blockchain nodes and networks. 
* **Amazon Web Services US East region**. You can now deploy your nodes and networks in the [AWS US East, Northern Virginia](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions) region.
* **Identity issuers**. You can now manage services, capable of issuing and revoking digital identities for Hyperledger Fabric networks. You will be able to add, delete, and use cryptogen as an identity issuer for Hyperledger Fabric networks.


## Chainstack 2.1.2

*November 2, 2020*

### What's new

* **Billing**. You can now reattempt past due payments through billing card change or directly in the activity log. The activity log also provides more information on your billing events. 

### Bug fixes

* Resolved an issue with some Hyperledger Explorer instances in Fabric networks being out of sync with the blockchain state.
* Numerous bug fixes and stability improvements.

## Chainstack 2.1

*September 16, 2020*

### What's new

* **Protocols**.
  * [Ethereum Rinkeby](/operations/ethereum/networks) support.
  * [Quorum](/blockchains/quorum) 2.7.0 support.
* **GraphQL**. You can now query dedicated Ethereum full nodes and archive nodes with GraphQL.

### Bug fixes

* Numerous bug fixes and stability improvements.

## Chainstack 2.0

*August 31, 2020*

### What's new

* **Public API**. You can now use the Chainstack API to manage your resources. See the [API documentation](/api/).
* **Protocols**.
  * [Corda 4.5](/blockchains/corda) support.
  * [Hyperledger Fabric 2.2](/blockchains/fabric) support.
* **Node management**. You can now [stop and start](/platform/stop-or-start-a-node) your nodes to save your usage costs.
* **Service nodes**. You can now access in the UI the [service nodes](/glossary/service-node) deployed with your consortium networks.
* **Clouds**. You can now deploy your nodes and networks in the <a href="https://support.chainstack.com/hc/en-us/articles/360024804711-Data-center-locations" target="_blank">Microsoft Azure UK South</a> region.
* **Pricing**. No more user limit on all <a href="https://chainstack.com/pricing/" target="_blank">pricing plans</a>.

### Bug fixes

* Numerous bug fixes and stability improvements.

## Chainstack 1.6

*July 7, 2020*

### What's new

* **Protocols**. [Bitcoin](/blockchains/bitcoin) testnet support.
* **Pricing**
  * New Growth pricing plan.
  * Reduced fixed plan costs.
  * Reduced usage costs.
  * Uniform usage rates for all cloud providers.

See the <a href="https://chainstack.com/pricing/" target="_blank">new pricing plans</a> and a <a href="https://chainstack.com/new-growth-tier-and-reduced-costs-for-all-plans/" target="_blank">blog post introducing the new pricing</a>.

### Bug fixes

* Numerous bug fixes and stability improvements.

## Chainstack 1.5.2

*June 2, 2020*

### What's new

* **Protocols**
  * [Corda 4.4](/blockchains/corda) support.
  * [Quorum](/blockchains/quorum) 2.6.0 support. [Tessera](https://docs.tessera.consensys.net/) 0.10.5 support.
* **Node logs**. You can now [access the logs](/platform/view-node-logs) for your dedicated nodes in the new node log viewer, with the ability to browse by date and container.
* **Node resources**. You can now [view the resources](/platform/view-node-resources-allocation) that have been dynamically allocated to each of your dedicated nodes.
* **CorDapp notifications**. You will now receive notifications based on the successful or failed result of CorDapp installations or removals initiated through Chainstack's CorDapp management interface.
* **UI**. You can now view hosting information directly on the node list for each network.

### Bug fixes

* Numerous bug fixes and stability improvements.

## Chainstack 1.5.1

*April 22, 2020*

### What's new

* **Protocols**
  * [Corda Network](https://corda.network/) and [Corda Pre-Production Network](https://corda.network/participation/preprod/) support. You can now join the Corda production and pre-production networks. See also [Join a public network](/platform/join-a-public-network).
  * [Hyperledger Fabric 2.1.0](/blockchains/fabric) support.
* **Clouds**. You can now deploy your nodes and networks in the Amazon Web Services US West region.
* **Vault**. You can now store your Corda identity key material in a [secure vault](/glossary/vault). See also [View your organization's vault](/platform/view-your-organization-vault).
* **Identity management**. You can now securely manage your organization's identity for the [Corda networks](/operations/corda/networks). See also [Manage your organization's identity](/platform/manage-your-organization-identity).

### Bug fixes

* Numerous bug fixes and stability improvements.

## Chainstack 1.5

*March 2, 2020*

### What's new

* **Protocols**. [Hyperledger Fabric](/blockchains/fabric) support. You can deploy a multi-org Hyperledger Fabric v2.0.1 network, complete with Raft ordering service, new chaincode lifecycle capabilities, and a network explorer.
* **UI**. Updated cloud provider selector to provide easier visibility of available hosting options.
* **Documentation**. Hyperledger Fabric [general description](/blockchains/fabric), [operations](/operations/fabric), [chaincode tutorial](/tutorials/fabric/universal-basic-income-opt-in-chaincode).

### Bug fixes

* Numerous bug fixes and stability improvements.

## Chainstack 1.4.3

*February 13, 2020*

### What's new

* **Protocols**
  * [Ethereum](/blockchains/ethereum) archive node support. Deploy a dedicated Ethereum archive node. Connect to a shared archive node for free on Business and Enterprise tiers. Geth 1.9.10 support.
  * [Quorum](/blockchains/quorum) transaction manager Tessera 0.10.3 support.
* **UI**. In-line edit button for all resources to improve access to quick actions.
* **Documentation**. [Ethereum modes](/operations/ethereum/modes) section to help in selecting whether to deploy a full or archive Ethereum node.

### Bug fixes

* Numerous bug fixes and stability improvements.

## Chainstack 1.4.2

*December 31, 2019*

### What's new

* **Protocols**
  * [Corda](/blockchains/corda) 4.3 support. You can also now install CorDapps containing workflows and contracts in a single JAR file.
  * [Quorum](/blockchains/quorum) 2.4.0 support. Learner node role support. [Tessera](https://docs.tessera.consensys.net/) 0.10.2 support.
  * [MultiChain](/blockchains/multichain) 2.0.3 support.
  * [Bitcoin](/blockchains/bitcoin) 0.19.0.1 support. Bitcoin nodes now run with the `txindex` flag allowing to query any transaction on the blockchain.
* **Documentation**. Context-sensitive documentation links in the platform UI.

### Bug fixes

* Installation rollback for CorDapps not compatible with Corda node.
* Numerous UI and copy fixes and improvements.

## Chainstack 1.4.1

*November 14, 2019*

### What's new

* **Protocols**. [Bitcoin](/blockchains/bitcoin) 0.18 support. You can now deploy [dedicated](/glossary/dedicated-node) nodes with [Bolt](/glossary/bolt) synchronization and free access to [shared](/glossary/shared-node) nodes on the mainnet.
* **Network and node statuses**. You can now see network and node statuses to when operations are occurring on any network resource.
* **Node details**. Node [access and credentials](/platform/view-node-access-and-credentials) are now grouped into sections, so it's easier to read.
* **Billing**. View individual metered usage cost line items for the current billing period, updated hourly.
* **Documentation**. [Bitcoin general description](/blockchains/bitcoin) and [Bitcoin operations](/operations/bitcoin).

### Bug fixes

* Numerous UI and copy fixes and improvements.

## Chainstack 1.4

*October 17, 2019*

### What's new

* **Protocols**
  * [Corda](/blockchains/corda) 4.1 support. You can now deploy a consortium network with [network map service](/blockchains/corda#network-map-service), doorman, and [notary](/blockchains/corda#notary-service). Dynamically add and remove participant nodes. Install and remove [CorDapps](/blockchains/corda#cordapp).
  * [Quorum](/blockchains/quorum) 2.3.0 support. Replaced Constellation transaction manager with Tessera.
* **User management**. Invite [users](/glossary/user) into the [organization](/glossary/organization).
* **Billing**. View metered usage cost for the current billing period, updated hourly.
* **Documentation**
  * [Corda general description](/blockchains/corda) and [Corda operations](/operations/corda).
  * New tutorials: [No ticket scalping CorDapp](/tutorials/corda/no-ticket-scalping-cordapp) and [Trust fund account with Remix](/tutorials/ethereum/trust-fund-account-with-remix).

### Bug fixes

* Resolved unexpected leader changes on Quorum networks with Raft consensus by increasing Raft block time from 50 to 150 ms.
* Numerous UI and copy fixes and improvements.

## Chainstack 1.3

*September 3, 2019*

### What's new

* **Security**. Protected endpoints added for [Quorum](/operations/quorum/) and [Ethereum](/operations/ethereum/) nodes.
* **Deployment**. [Bolt](/glossary/bolt) snapshots are now updated hourly so that nodes are deployed and synchronized with fresher snapshots.
* **Protocols.** Numerous stability improvements for Quorum networks and nodes.
* **Activity and events**. In-platform notifications and activity log introduced to provide visibility into account activity.
* **Documentation.** Complete content and structure overhaul for improved access, browsing, and discovery.

### Bug fixes

* Numerous UI and copy fixes and improvements.

### Breaking changes

* Unprotected endpoints for Quorum and Ethereum nodes <a href="https://chainstack.com/protected-endpoints-for-ethereum-and-quorum-nodes-on-chainstack/" target="_blank">deprecation on October 1, 2019</a>.

## Chainstack 1.2.1

*July 1, 2019*

### What’s new

* **Documentation**
  * New guide: [Deploying a hybrid MultiChain network](/operations/multichain/deploying-a-hybrid-network).
  * New tutorial: [Loyalty program with Truffle](/tutorials/quorum/loyalty-program-with-truffle).

### Bug fixes

* Improved Ropsten nodes syncing.

## Chainstack 1.2

*June 21, 2019*

### What’s new

* **Protocols**
  * Added [Ethereum](/blockchains/ethereum) Ropsten testnet support with Bolt.
  * Updated [Quorum](/blockchains/quorum) explorer from [blk-explorer-free](https://github.com/blk-io/blk-explorer-free) to [epirus-free](https://github.com/blk-io/epirus-free).
* **Node details**. Added complete details for [Quorum](/blockchains/quorum), including default wallet private/public keys. Standardized fields for all protocols.
* **Documentation**. New tutorial: [Academic certificates with Truffle](/tutorials/ethereum/academic-certificates-with-truffle).

### Bug fixes

* Numerous UI and copy fixes and improvements.

## Chainstack 1.1.1

*May 9, 2019*

### What’s new

* **Protocols**. Introduced shared [Ethereum](/blockchains/ethereum) mainnet nodes support.
* [**Projects**](/glossary/project). The project description field is now optional.

### Bug fixes

* Fixed issues with MultiChain stability.

## Chainstack 1.1

*May 3, 2019*

### What’s new

* **Updating and deleting resources**. You can now edit project name and description, network and node name. You can delete nodes by the owner, networks are deleted automatically when the last node is deleted, projects can be deleted if empty.
* **Navigation**. Updated menu with links to [Documentation](../) and <a href="https://support.chainstack.com" target="_blank">Support</a>.
* **Support**. Added Zendesk widget.

### Bug fixes

* Fixed sign-up markup issues.
* Adjusted columns in the network and node list.

## Chainstack 1.0.2

*April 11, 2019*

### What’s new

* **Protocols**
  * Added [MultiChain](/blockchains/multichain) 2.0 release support.
  * Added [Quorum](/blockchains/quorum) 2.2.3 support.

### Bug fixes

* Fixed the MultiChain explorer lack of connectivity.
* Fixed project invitations duplicates.
* Fixed clearing the cookies on log out without a valid token.

## Chainstack 1.0.1

*April 2, 2019*

### What’s new

* **Registration and sign in**. Password recovery via email.

### Bug fixes

* Fixed links to documentation, terms of service, and privacy policy.
* Fixed sorting by date in the network list.

## Chainstack 1.0

*March 17, 2019*

* **Registration and sign in**. Signing up via email, password, and personal details. Signing up for a [member](/glossary/member) invited to the consortium project. Email confirmation on successful registration. Email verification.
* [**Consortium project**](/glossary/consortium-project). Wizards to create a new network and add a node to the existing network. Invitation of other [organizations](/glossary/organization) as [members](/glossary/member) to the project via email.
* [**Public chain project**](/glossary/public-chain-project). Wizards to join a public network and add another node.
* **Protocols**
  * [MultiChain](/blockchains/multichain) 2.0-beta-1 support with blockchain explorer.
  * [Quorum](/blockchains/quorum) 2.2.1 support with [Raft](/blockchains/quorum#raft) and [IBFT](/blockchains/quorum#ibft), and [blk-explorer-free](https://github.com/blk-io/blk-explorer-free) blockchain explorer.
  * Full [Ethereum](/blockchains/ethereum) mainnet node deployment with [Bolt](/glossary/bolt) rapid sync mechanism.
* **Clouds**. Google Cloud Platform and Amazon Web Services in the Asia-Pacific region.
* **Node details**. Default wallet private/public keys, and chain name for MultiChain. Constellation private/public keys, and network ID for [Quorum](/blockchains/quorum). Sync mode and network ID for Ethereum. Client version for all protocols.
* **Settings**. Editing personal and organization details. Changing password.
* **Documentation**. [Portal based on VuePress](../).
