# Distributed company scrips on MultiChain

Companies interested in exploring the teal organization structure and experimenting with it will find it useful to issue internal  currency for employees.

A famous example of a teal organization leveraging internal currency for employee self-management is [Zappos with *Zollars*](https://www.zappos.com/about/stories/employee-happiness-amenities).

Non-teal companies like Amazon, however, also experiment with boosting productivity with internal currency known as *swag bucks*.

Issuing a company scrip on blockchain gives users complete ownership of the currency and can be an experiment in employee self-management or gamification. Not only that, but blockchain-based company currency allows it to transcend the company borders and be easily implemented across partner organizations—something that would be fraught with difficulties if the currency were centralized.

This tutorial guides you through issuing and distributing a basic scrip system on MultiChain that you can implement in an organization or across organizations.

In brief, the implementation is the following:

1. Issue a company token.
1. Distribute the tokens to all network members.
1. Let all network members send and receive the tokens to each other. This is enabled by default.

## Prerequisites

A [Chainstack account](https://console.chainstack.com/) for every participant.

## Overview

To get from zero to a running company scrip system, do the following:

1. With Chainstack, create a [Consortium project](/glossary/consortium-project).
1. With Chainstack, deploy a MultiChain network.
1. With Chainstack, get your MultiChain node access and credentials.
1. With Chainstack, invite members to your project.
1. Ensure each member runs a node.
1. With MultiChain, issue a token.
1. Distribute the tokens to all members.
1. With Chainstack, monitor the scrip system usage through MultiChain explorer.

## Step-by-step

### Create a Consortium project

See [Create a project](/platform/create-a-project).

### Deploy a MultiChain network

See [Deploy a consortium network](/platform/deploy-a-consortium-network).

### Get your MultiChain node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Invite members to your project

See [Invite a member to the project](/platform/invite-a-member-to-the-project).

### Ensure each member runs a node

Everyone in your project can see all nodes running in a network.

By simply joining a project, new members do not automatically become system participants. Each member must add a node to the network.

Ensure members know how to add a node:

1. Under the project, click the network name. The network name will probably be **Currency System in COMPANY_NAME**.
1. Click **Add node**.
1. In the **Node name** field, provide a name that identifies you as a member of the system. Remember that other members will use this name to send you tokens.
1. Under **Cloud hosting provider**, select your preferred provider.
1. Click **Add node**.

### Issue a company token

Since you are setting up this system, you need to issue the token through your node, which is the first node deployed in this network.

The first node deployed in a MultiChain network is the admin node.

::: tip See also

* [MultiChain node permissions](/operations/multichain/node-permissions)

:::

Issue the token through your node:

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"issue","params":["WALLET_ADDRESS","TOKEN_NAME",QUANTITY,UNITS],"id":1}'
```

where

* RPC_ENDPOINT — your MultiChain node RPC endpoint. Available under **Access and credentials** > **RPC endpoint**.
* RPC_USER — your MultiChain node RPC username. Available under **Access and credentials** > **RPC user**.
* RPC_PASSWORD — your MultiChain node RPC password. Available under **Access and credentials** > **RPC password**.
* WALLET_ADDRESS — your MultiChain node's wallet address. Available under **Access and credentials** > **Default wallet address**.
* TOKEN_NAME — the token name. Provide a descriptive name.
* QUANTITY — the total supply of the tokens. Depending on your scenario, you may want to issue a good amount so that your system can scale to more members than there are currently or to introducing additional rewards.
* UNITS — the number of units the token will have. Setting this to `1` will make the token indivisible.

See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example command:

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"issue","params":["123abcdiZmJnQr9vmj8yiucbYNabD6X8vKkBUW","company-token",500,1],"id":1}'
```

Now your system has tokens on your admin node's wallet address.

### Distribute the tokens to all members

Send the tokens to all members.

You may want to send the token in equal amounts to all members for a fresh start in your new scrip system, or you may want to send different amounts that reflect a pre-agreed consensus.

Send the tokens to all addresses:

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"createrawsendfrom","params":["WALLET_ADDRESS",{"WALLET_ADDRESS_USER_n":{"TOKEN_NAME":QUANTITY},"WALLET_ADDRESS_USER_n":{"TOKEN_NAME":QUANTITY},"WALLET_ADDRESS_USER_n":{"TOKEN_NAME":QUANTITY}},[],"send"],"id":2}'
```

where

* RPC_ENDPOINT — your MultiChain node RPC endpoint. Available under **Access and credentials** > **RPC endpoint**.
* RPC_USER — your MultiChain node RPC username. Available under **Access and credentials** > **RPC user**.
* RPC_PASSWORD — your MultiChain node RPC password. Available under **Access and credentials** > **RPC password**.
* WALLET_ADDRESS — your MultiChain node's wallet address. Available under **Access and credentials** > **Default wallet address**. This is the address that at this point in the tutorial holds the entire supply of the tokens.
* WALLET_ADDRESS_USER_n — member's address as part of this system. You and anyone can view any member's address under **Access and credentials** > **Default wallet address**.
* TOKEN_NAME — the token name that you set up at [the previous step](distributed-company-scrips-on-multichain#issue-a-company-token).
* QUANTITY — the amount of tokens to transfer.
* CHAIN_NAME — your MultiChain network chain name. Available under **Access and credentials** > **Chain name**.

Example command:

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"createrawsendfrom","params":["123abcdiZmJnQr9vmj8yiucbYNabD6X8vKkBUW",{"1ABC2aBCXxXC1Q2zSinXSxbD7zLANs3jc8RPYn6":{"company-token":10},"1Ab2jTzTFw1aJvcYMD3GcNpZcziXBFdyUGsBvC":{"company-token":10},"1Ab2CSx43hHhBSrozJitfkXf3jefT5ZvG6EgvS":{"company-token":10}},[],"send"],"id":2}'
```

### Monitor the scrip system through MultiChain explorer

Adding a node to the network in MultiChain does not create an event that is broadcast to the blockchain. This means that address balances can only be queried by node owners.

Sending the tokens, however, is a transaction that can be viewed in the explorer. Network members can get the link by clicking **Explorer** under the network in their Chainstack dashboard. Anyone, not just network members, can view the explorer once they have the link.

This means that you could create a simple web app that queries the transactions in the explorer and derives the current scrip holdings of each member.

## Additional information

Members can send the tokens to each other.

This can be implemented in a web app interface that can be a part of an intranet portal.

The tokens can be used within a particular organization or across partner organizations as currency for various benefits.

Tokens remaining in the wallet of the admin node can be used as a part of any bonus program within the organization.

There are many opportunities to explore and fit within your organization's framework.

::: tip See also

* [Operations: MultiChain](/operations/multichain/)

:::
