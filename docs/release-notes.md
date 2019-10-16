# Release notes

## Chainstack 1.4

*October 16, 2019*

### What's new

* **Corda**. Introducing support for deploying, managing and scaling Corda networks. Users can now:
    * Create a Corda compatibility zone complete with NMS, doorman and non-validating notary.
    * Scale networks by inviting other members to participate and deploy their own nodes.
    * Install and remove CorDapps directly from the Chainstack platform.
* **Free shared nodes**. Run shared nodes on public chains completely for free at all subscription tiers.
* **Tessera**. Add support for Tessera transaction manager for Quorum.
* **Usage reporting**. Visibility into your metered usage costs for the current billing period. Updated hourly. 
* **User management**. Invite other users to join your organization to participate in creating networks and deploying nodes without getting access to sensitive account settings and controls.

### Bug fixes

* Resolve unexpected leader changes on Quorum by increasing raftblocktime from 50 -> 150 ms.
* Numerous UI and copy fixes and improvements.

## Chainstack 1.3

*September 3, 2019*

### What's new

* **Security**. Protected endpoints added for Quorum and Ethereum nodes.
* **Deployment**. [Bolt](/glossary/bolt) snapshots are now updated hourly so that nodes are deployed and synchronized with fresher snapshots.
* **Protocols.** Numerous stability improvements for Quorum networks and nodes.
* **Activity and events**. In-platform notifications and activity log introduced to provide visibility into account activity.
* **Documentation.** Complete content and structure overhaul for improved access, browsing, and discovery.

### Bug fixes

* Numerous UI and copy fixes and improvements.

### Breaking changes

* Unprotected endpoints for Quorum and Ethereum nodes [deprecated on October 1, 2019](https://chainstack.com/protected-endpoints-for-ethereum-and-quorum-nodes-on-chainstack/).

## Chainstack 1.2.1

*July 1, 2019*

### What’s new

* **Documentation**. New guide: [Deploying a hybrid MultiChain network](/operations/multichain/deploying-a-hybrid-network). New tutorial: [Loyalty program on Quorum](/tutorials/loyalty-program-on-quorum).

### Bug fixes

* Improved Ropsten nodes syncing.

## Chainstack 1.2

*June 21, 2019*

### What’s new

* **Protocols**. [Ethereum](/blockchains/ethereum) Ropsten testnet support with Bolt. Updated [Quorum](/blockchains/quorum) explorer from [blk-explorer-free](https://github.com/blk-io/blk-explorer-free) to [epirus-free](https://github.com/blk-io/epirus-free).
* **Node details**. Added complete details for [Quorum](/blockchains/quorum), including default wallet private/public keys. Standardized fields for all protocolsю
* **Documentation**. New tutorial: [Academic certificates on Ethereum](/tutorials/academic-certificates-on-ethereum).

### Bug fixes

* Numerous UI and copy fixes and improvements.

## Chainstack 1.1.1

*May 9, 2019*

### What’s new

* **Protocols**. Shared [Ethereum](/blockchains/ethereum) Mainnet nodes support.
* [**Projects**](/glossary/project). Made project description field optional.

### Bug fixes

* Issues with MultiChain stability.

## Chainstack 1.1

*May 3, 2019*

### What’s new

* **Updating and deleting resources**. Editing project name and description, network and node name. Deleting nodes by the owner, networks are deleted automatically when the last node is deleted, projects can be deleted if empty.
* **Navigation**. Updated menu with links to [Documentation](../) and [Support](https://support.chainstack.com).
* **Support**. Added Zendesk widget.

### Bug fixes

* Sign up markup issues.
* Adjusted columns in network/node list.

## Chainstack 1.0.2

*April 11, 2019*

### What’s new

* **Protocols**. [MultiChain](/blockchains/multichain) 2.0 release support. [Quorum](/blockchains/quorum) 2.2.3 support.

### Bug fixes

* MultiChain explorer lack of connectivity.
* Project invitations duplicates.
* Clearing the cookies on log out without a valid token.

## Chainstack 1.0.1

*April 2, 2019*

### What’s new

* **Registration and sign in**. Password recovery via email.

### Bug fixes

* Provided links to documentation, ToS, and Privacy Policy.
* Sorting by date in the network list.

## Chainstack 1.0

*March 17, 2019*

* **Registration and sign in**. Signing up via email, password and personal details. Signing up for a member invited to the project. Email confirmation on successful registration. Email verification.
* [**Consortium project**](/glossary/consortium-project). Wizards to create a new network and add a node to the existing network. Invitation of other organizations as members to the project via email.
* [**Public chain project**](/glossary/public-chain-project). Wizards to join a public network and add another node.
* **Protocols**. [MultiChain](/blockchains/multichain) 2.0-beta-1 support with blockchain explorer. [Quorum](/blockchains/quorum) 2.2.1 support with [Raft](/blockchains/quorum#raft) and [IBFT](/blockchains/quorum#istanbul-byzantine-fault-tolerance), and [blk-explorer-free](https://github.com/blk-io/blk-explorer-free) blockchain explorer. Full [Ethereum](/blockchains/ethereum) Mainnet node deployment with [Bolt](/glossary/bolt) rapid sync mechanism.
* **Clouds**. Google Cloud Platform and Amazon Web Services in APAC region.
* **Node details**. Default wallet private/public keys and chain name for [MultiChain](/blockchains/multichain). Constellation private/public keys and network ID for [Quorum](/blockchains/quorum). Sync mode and network ID for [Ethereum](/blockchains/ethereum). Client version for all protocols.
* **Settings**. Editing personal and organization details. Changing password.
* **Documentation**. [Portal based on VuePress](../).
