# Decentralized reputation on MultiChain

This tutorial guides you through creating a basic decentralized reputation system on MultiChain that you can implement in an organization or across organizations.

In brief, the implementation is the following:

1. Issue a reputation token.
1. Distribute the token to all network members.
1. Let all network members send and receive the token to each other. This is enabled by default.

## Prerequisites

A [Chainstack](https://console.chainstack.com/) account for every reputation system participant.

## Overview

To get from zero to a running decentralized reputation system, do the following:

1. With Chainstack, create a [Consortium](/projects/consortium) project.
1. With Chainstack, deploy a MultiChain network.
1. With Chainstack, get your MultiChain node access information.
1. With Chainstack, invite members to your project.
1. Ensure each member runs a node.
1. With MultiChain, issue a reputation token.
1. Distribute the reputation tokens to all members.
1. With Chainstack, monitor the reputation system through MultiChain explorer.

## Step-by-step

### Create a Consortium project

1. Log in to your [Chainstack](https://console.chainstack.com/) account.
1. Click **Create project**.
1. Click **Consortium**.
1. Provide **Project name** and optionally **Description**.
1. Click **Create**.

This will create a project with Chainstack.

### Deploy a MultiChain network

1. Select the created project and click **Get started**.
1. Provide **Network name**. A good name here would be **Decentralized Reputation System in COMPANY_NAME**.
1. Under **Blockchain protocol**, select **MultiChain**.
1. Under **Cloud hosting provider**, select your preferred provider.
1. Under **Region**, select the region for your deployment.
1. Review your changes and click **Create network**.

::: warning
Currently only **Asia-Pacific** region is available for deployment.
:::

The network status will change from **Pending** to **Running** once deployed.

### Get your MultiChain node access information

1. In your project, click your network name.
1. Under **Node name**, click your node.

Under **Credentials**, you will see your MultiChain node access information.

### Invite members to your project

1. Click **Project** > **Members**.
1. Click **Invite members** and provide member emails.

Each member will receive an email invitation.

### Ensure each member runs a node

Everyone in your project can see all nodes running in a network.

By simply joining a project, new members do not automatically become reputation system participants. Each member must add a node to the network.

Ensure members know how to add a node:

1. Under the project, click the network name. The network name will probably be **Decentralized Reputation System in COMPANY_NAME**.
1. Click **Add node**.
1. In the **Node name** field, provide a name that identifies you as a member of the reputation system. Remember that other members will use this name to send you reputation tokens.
1. Under **Cloud hosting provider**, select your preferred provider.
1. Click **Add node**.

### Issue a reputation token

Since you are setting up this reputation system, you need to issue the reputation token through your node, which is the first node deployed in this network.

The first node deployed in a MultiChain network is the admin node.

::: tip See also

* [MultiChain permissions management](https://www.multichain.com/developers/permissions-management/)

:::

Issue a reputation token through your node:

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"issue","params":["WALLET_ADDRESS","TOKEN_NAME",QUANTITY,UNITS],"chain_name":"CHAIN_NAME"}'
```

where

* RPC_ENDPOINT — your MultiChain node RPC endpoint. Available under **Credentials** > **RPC endpoint**.
* RPC_USER — your MultiChain node RPC username. Available under **Credentials** > **RPC user**.
* RPC_PASSWORD — your MultiChain node RPC password. Available under **Credentials** > **RPC password**.
* WALLET_ADDRESS — your MultiChain node's wallet address. Available under **Credentials** > **Default wallet address**.
* TOKEN_NAME — the reputation token name. Provide a descriptive name.
* QUANTITY — the total supply of the reputation tokens. Depending on your scenario, you may want to issue a good amount so that your reputation system can scale to more members than there are currently or to introducing additional rewards.
* UNITS — the number of units the reputation token will have. Setting this to `1` will make the token indivisible.
* CHAIN_NAME — your MultiChain network chain name. Available under **Credentials** > **Chain name**.

Example command:

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"issue","params":
["123abcdiZmJnQr9vmj8yiucbYNabD6X8vKkBUW","reputation-point",500,1],"chain_name":"nw-123-456-7"}'
```

Now your reputation system has tokens on your admin node's wallet address.

### Distribute the reputation tokens to all members

Send the reputation tokens to all members.

You may want to send the token in equal amounts to all members for a fresh start in your new reputation system, or you may want to send different amounts that reflect a pre-agreed consensus.

Send the reputation tokens to all addresses:

``` sh
curl RPC_ENDPOINT -u "RPC_USER:RPC_PASSWORD" -d '{"method":"createrawsendfrom","params":["WALLET_ADDRESS",{"WALLET_ADDRESS_USER_n":{"TOKEN_NAME":QUANTITY},"WALLET_ADDRESS_USER_n":{"TOKEN_NAME":QUANTITY},"WALLET_ADDRESS_USER_n":{"TOKEN_NAME":QUANTITY}},[],"send"],"chain_name":"CHAIN_NAME"}'
```
where

* RPC_ENDPOINT — your MultiChain node RPC endpoint. Available under **Credentials** > **RPC endpoint**.
* RPC_USER — your MultiChain node RPC username. Available under **Credentials** > **RPC user**.
* RPC_PASSWORD — your MultiChain node RPC password. Available under **Credentials** > **RPC password**.
* WALLET_ADDRESS — your MultiChain node's wallet address. Available under **Credentials** > **Default wallet address**. This is the address that at this point in the tutorial holds the entire supply of the reputation tokens.
* WALLET_ADDRESS_USER_n — member's address as part of this reputation system. You and anyone can view any member's address under **Credentials** > **Default wallet address**.
* TOKEN_NAME — the token name that you set up at [the previous step](decentralized-reputation-on-multichain#issue-a-reputation-token).
* QUANTITY — the amount of tokens to transfer.
* CHAIN_NAME — your MultiChain network chain name. Available under **Credentials** > **Chain name**.

Example command:

``` sh
curl https://nd-123-456-789.p2pify.com -u "user-name:pass-word-pass-word-pass-word" -d '{"method":"createrawsendfrom","params":["123abcdiZmJnQr9vmj8yiucbYNabD6X8vKkBUW",{"1ABC2aBCXxXC1Q2zSinXSxbD7zLANs3jc8RPYn6":{"reputation-point":10},"1Ab2jTzTFw1aJvcYMD3GcNpZcziXBFdyUGsBvC":{"reputation-point":10},"1Ab2CSx43hHhBSrozJitfkXf3jefT5ZvG6EgvS":{"reputation-point":10}},[],"send"], "chain_name":"nw-123-456-7"}'
```

### Monitor the reputation system through MultiChain explorer

Adding a node to the network in MultiChain does not create an event that is broadcast to the blockchain. This means that address balances can only be queried by node owners.

Sending the tokens, however, is a transaction that can be viewed in the explorer. Network members can get the link by clicking **Explorer** under the network in their Chainstack dashboard. Anyone, not just network members, can view the explorer once they have the link.

This means that you could create a simple web app that queries the transactions in the explorer and derives the current reputation of each member.

## Additional information

Members can send the reputation tokens to each other.

This can be implemented in a web app interface that can be a part of an intranet portal.

The reputation tokens can be used within a particular organization as currency for various benefits.

Tokens remaining in the wallet of the admin node can be used as part of any bonus program within the organization.

There are many opportunities to explore and fit within your organization's framework.

::: tip See also:

* [Interacting with the blockchain](/guides/interacting-with-the-blockchain#multichain)
* [Application development](/guides/application-development)

:::