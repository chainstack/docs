---
meta:
  - name: description
    content: Learn how to develop, deploy, and run a simple governance contract on Aurora
  - name: keywords
    content: tutorial aurora dao remix openzeppelin wizard
---

# Simple on-chain governance with Remix and OpenZeppelin Wizard

The battle-tested set of [OpenZeppelin contracts](https://www.openzeppelin.com/contracts) and the user friendly [contract wizard](https://wizard.openzeppelin.com/) make it very easy to run through a simple on-chain governance example.

In this tutorial, you will:

* Create an ERC-20 governance token contract that you will use to cast votes on the governance proposals.
* Create a standard governor contract for your on-chain governance.
* Create a mintable ERC-20 contract that will mint new tokens on your successfully passed on-chain governance proposals.
* Run a full on-chain governance cycle.

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy an Aurora node.
* [Remix IDE](https://remix.ethereum.org/) to compile the contracts and deploy through MetaMask.
* [MetaMask](https://metamask.io/) to deploy the contracts through your Chainstack node and interact with the contracts.

## Overview

To get from zero to the deployed contracts on the Aurora testnet, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, join the Aurora testnet.
1. With Chainstack, access your Aurora node credentials.
1. Set up your MetaMask to work through a Chainstack node.
1. Fund your account with Aurora ETH on the Aurora testnet.
1. With OpenZeppelin Wizard, create your contracts.
1. With Remix IDE, deploy the contracts on the Aurora testnet.
1. With MetaMask, run your on-chain governance process.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the Aurora testnet

See [Join a public network](/platform/join-a-public-network).

### Get your Aurora node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Set up MetaMask

See [Aurora tools: MetaMask](/operations/gnosis/tools).

### Fund your account

You can use the [Aurora faucet](https://aurora.dev/faucet) to fund your account, although the amount of Aurora ETH dispensed will not be enough to cover the costs of this tutorial.

If you have some Goerli ETH, you may bridge it from the Ethereum Goerli testnet to the Aurora testnet using the [Rainbow bridge](https://testnet.rainbowbridge.app/transfer).

### Create and deploy your ERC-20 governance token

This will be your governance token—the token that you will use to vote on proposals in the governance contract.

#### OpenZeppelin Wizard

1. Open [OpenZeppelin Wizard](https://wizard.openzeppelin.com/).
1. Select **ERC20**.
1. Provide a name and a symbol for the token. For example: *GovernanceToken*, *GTK*.
1. In **Premint**, provide the number of tokens to issue to your account. For example: *100*.
1. In **Feature**, select **Votes**.
1. Click **Open in Remix**.

#### Remix

1. In Remix, click **Compile contract**.
1. Click the deployment tab on your left.
1. Select **Environment** > **Injected Provider - MetaMask**.
1. In **Contract**, select your contract. For example, *GovernanceToken*.
1. Click **Deploy**.

This will engage your MetaMask to deploy the contract to the Aurora testnet through your currently selected MetaMask account. Click **Confirm** in the MetaMask modal.

### Verify the contract

To use the [Aurora explorer](https://testnet.aurorascan.dev/) as a web app to interact with your contracts, verify them in the explorer.

1. In Remix, click **Plugins** > **Flattener** > **Activate**.
1. Select the activated flattener plugin in your left pane and click **Flatten contract**.
1. In the [Aurora explorer](https://testnet.aurorascan.dev/), navigate to the contract that you deployed.
1. Click **Verify and Publish**.
1. In **Compiler Type**, select **Solidity (Single file)**.
1. In **Complier version**, select the compiler that you used in Remix.
1. In **Open Source License Type**, select **MIT License (MIT)**.
1. Click **Continue**.
1. In **Optimization**, select **No**.
1. In **Solidity Contract Code**, provide the flattened code of your contract from Remix.
1. Click **Verify and Publish**.

You now have the ERC-20 contract verified and your governance tokens in your account—the account that you used to deploy the contract.

### Create and deploy your ERC-20 mintable token contract

This will be the contract that will be used by the governance contract to mint tokens on passing the on-chain proposal.

#### OpenZeppelin Wizard

1. Open [OpenZeppelin Wizard](https://wizard.openzeppelin.com/).
1. Select **ERC20**.
1. Provide a name and a symbol for the token. For example: *MintableToken*, *MTK*.
1. In **Premint**, keep `0`.
1. In **Features**, select **Mintable**. Note that this will automatically make the contract *Ownable*.
1. Click **Open in Remix**.

#### Remix

1. In Remix, click **Compile contract**.
1. Click the deployment tab on your left.
1. Select **Environment** > **Injected Provider - MetaMask**.
1. In **Contract**, select your contract. For example, *MintableToken*.
1. Click **Deploy**.

This will engage your MetaMask to deploy the contract to the Aurora testnet through your currently selected MetaMask account. Click **Confirm** in the MetaMask modal.

Verify the contract similarly to the previous one.

### Create and deploy your governance contract

This will be your on-chain governance contract.

#### OpenZeppelin Wizard

1. Open [OpenZeppelin Wizard](https://wizard.openzeppelin.com/).
1. Select **Governor**.
1. Provide a name and a symbol for the token. For example: *MyGovernor*.
1. In **Voting Delay**, keep `1 block`. In **Voting Period**, put `600 blocks`. In **1 block =**, put `1 second`. This will be about 10 minutes for a voting period.
1. In **Quorum**, switch to **#** and put `1` to make the quorum of 1 participating account pass the proposals.
1. Remove the **Updatable Settings** check mark.
1. In **Votes**, select **ERC20Votes**.
1. Remove the **Timelock** check mark.
1. Click **Open in Remix**.

#### Remix

1. In Remix, click **Compile contract**.
1. Click the deployment tab on your left.
1. Select **Environment** > **Injected Provider - MetaMask**.
1. In **Contract**, select your contract. For example, *MintableToken*.
1. In **Deploy**, provide the address of the ERC-20 governance token that you deployed as the first contract of this tutorial. This will make the deployed contract recognize the ERC-20 token as the coontract's voting token.
1. Click **Deploy**.

This will engage your MetaMask to deploy the contract to the Aurora testnet through your currently selected MetaMask account. Click **Confirm** in the MetaMask modal.

Verify the contract similarly to the previous one.

### Delegate the votes

You have preminted the ERC-20 governance token to the account you deployed the contract with. As the governance token owner, you now need to delegate the voting power to an account.

For simplicity, you can delegate it to your account:

1. In the [Aurora explorer](https://testnet.aurorascan.dev/), open your verified ERC-20 governance contract.
1. Click **Contract** > **Write Contract**.
1. Click **Connect to Web3** > **MetaMask**. Make sure you connect with the same account that you used to deploy the contract as this is the account that holds the preminted tokens.
1. In `delegatee`, provide your account address and click **Write**.

This will make the provided account be able to cast votes in the governance contract.

### Transfer the ERC-20 mintable contract ownership to the governance contract

The ERC-20 mintable contract is ownable. To be able to mint the tokens through the governance contract, you need to transfer the ownership of the ERC-20 contract to the governance contract.

1. In the [Aurora explorer](https://testnet.aurorascan.dev/), open your verified ERC-20 mintable contract.
1. Click **Contract** > **Write Contract**.
1. Click **Connect to Web3** > **MetaMask**. Make sure you connect with the same account that you used to deploy the contract.
1. In `transferOwnership` > `newOwner`, provide the address of your governance contract.
1. Click **Write**.

This will transfer the contract ownership. Your governance contract can now mint the ERC-20 tokens.

### Create a proposal

At this point, you have three contracts deployed:

* An ERC-20 governance token contract with preminted tokens assigned to your account.
* An ERC-20 mintable token contract owned by the governance contract.
* The governance contract to run proposals.

It is now time to create your proposal.

First, get the call data that the governance contract takes as a proposal to execute. For this tutorial, the call data is minting the ERC-20 tokens to an address and an amount to mint: `mint(address to, uint256 amount)`.

To get the call data:

1. Go to the [online ABI encoding service](https://abi.hashex.org/).
1. In **Enter your parameters manually**, select:
   * **Function** > **your function** > `mint`.
   * **Argument** > **Address** > the address to mint the tokens to.
   * **Argument** > **Uint256** > the amount of tokens to mint in 18 decimal unit. See [Ethereum unit converter](https://eth-converter.com/).
1. Copy the resulting data and precede it with `0x`. This is your call data to mint the tokens.

Now create the actual proposal.

1. In the [Aurora explorer](https://testnet.aurorascan.dev/), open your verified governance contract.
1. Click **Contract** > **Write Contract**.
1. Click **Connect to Web3** > **MetaMask**.
1. In `propose`, provide your proposal details:
   * In `targets`, provide the address of your ERC-20 mintable token.
   * In `values`, provide the amount of Aurora ETH that should be deposited with the proposal. Typically, it is `0`.
   * In `calldatas`, provide the call data that you acquired with MetaMask.
   * In `description`, provide any description.

Once the proposal transaction is confirmed, the contract will emit and event that contains the proposal ID. You will need the proposal ID to vote for the proposal and to execute the proposal.

To get the proposal ID:

1. In the [Aurora explorer](https://testnet.aurorascan.dev/), open your transaction that created the proposal.
1. Switch to **Logs**.
1. In *Data*, copy the `proposalId` value.

### Cast your vote

At this point, you have:

* A running proposal.
* You have the proposal ID.
* You have the voting power delegated to your account.

To cast your vote:

1. In the [Aurora explorer](https://testnet.aurorascan.dev/), open your verified governance contract.
1. Click **Contract** > **Write Contract**.
1. Click **Connect to Web3** > **MetaMask**.
1. In `castVote`, provide your vote:
   * In `proposalId`, paste the proposal ID.
   * In `support`, provide your voting decision: `0` is against, `1` is for, `2` is abstain. For the proposal to pass, vote `1`.
1. Click **Write**.

This will create a transaction that casts your vote.

### Execute the passed proposal

Once the proposal is voted on and the voting period reaches the deadline, the proposal is passed. You can now execute the passed proposal.

To execute:

1. In the [Aurora explorer](https://testnet.aurorascan.dev/), open your verified governance contract.
1. Click **Contract** > **Write Contract**.
1. Click **Connect to Web3** > **MetaMask**.
1. In `execute`, provide details:
   * In `execute`, provide `0` as payable amount as you are minting ERC-20 tokens and not depositing Aurora ETH.
   * In `targets`, provide the address of your ERC-20 mintable token.
   * In `values`, provide `0` for the amount of Aurora ETH.
   * In `calldatas`, provide the same call data that you generated earlier for the function `mint(address to, uint256 amount)`.
   * In `descriptionHash`, provide the hash of the description that you used to generate the proposal. To do this the easy way, go to an [online Keccak-256 generator](https://emn178.github.io/online-tools/keccak_256.html) and paste your description text, copy the result and precede it with `0x`.
1. Click **Write**.

This will execute the passed proposal and the governance contract will mint the ERC-20 mintable tokens to the account that you provided in the call data when creating the proposal.

## Conclusion

This tutorial guided you through the basics of creating and deploying a set of DAO contracts to mint ERC-20 tokens through on-chain governance on the Aurora testnet through your Chainstack-deployed node.

You have also interacted with the contracts to run the full cycle governance process using the Aurora explorer as a web app and MetaMask as your interaction tool that works through your Chainstack-deployed Aurora node.

::: tip See also

* [Operations: Aurora](/operations/aurora/)

:::
