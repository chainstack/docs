---
meta:
  - name: description
    content: Learn how to develop and deploy a simple soulbound contract and issue soulbound tokens on Gnosis Chain.
  - name: keywords
    content: tutorial gnosis xdai soulbound remix openzeppelin nft
---

# Simple soulbound token with Remix and OpenZeppelin

Soulbound tokens, [originally proposed by Vitalik Buterin](https://vitalik.ca/general/2022/01/26/soulbound.html), at their core are simply non-transferable NFTs.

In this tutorial, you will:

* Create an ERC-721 contract that has a transfer override to make the token soulbound.
* Deploy the contract on the Gnosis Chain mainnet through a node deployed with Chainstack.
* Interact with the deployed contract.

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy a Gnosis Chain node.
* [Remix IDE](https://remix.ethereum.org/) to compile the contract and deploy through MetaMask.
* [MetaMask](https://metamask.io/) to deploy the contract through your Chainstack node and interact with the contract.

## Overview

To get from zero to a deployed soulbound token contract on the Gnosis Chain mainnet, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, join Gnosis Chain.
1. With Chainstack, access your Gnosis Chain node credentials.
1. Set up your MetaMask to work through a Chainstack node.
1. With Remix IDE, create and compile the soulbound contract.
1. With Remix IDE, deploy the contract on the Gnosis Chain mainnet.
1. Issue a soulbound token and burn it.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the Gnosis Chain mainnet

See [Join a public network](/platform/join-a-public-network).

### Get your Gnosis Chain node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Set up MetaMask

See [Gnosis Chain tools: MetaMask](/operations/gnosis/tools).

### Create and compile the soulbound contract

1. Open [Remix IDE](https://remix.ethereum.org/).
2. On the home page, click **Environments** > **Solidity**.
3. On the left pane, click **File explorers** > **contracts** > **New File**.
4. In the modal, give any name to your contract. For example, `soulbound.sol`.
5. Put in the contract code:

``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SoulBoundToken is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("SoulBoundToken", "SBT") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only the owner of the token can burn it.");
        _burn(tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256) pure override internal {
        require(from == address(0) || to == address(0), "This a Soulbound token. It cannot be transferred. It can only be burned by the token owner.");
    }

    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }
}
```

This is your soulbound token contract:

* It uses the audited OpenZeppelin libraries to make the contract of the ERC-721 standard, belonging to the deployer, and incrementing each issued token ID by 1.
* The contract has a modification to prohibit the token transfer, which makes the issued tokens soulbound.
* The contract also implements a burn function to allow the owner of the issued token to be able to burn it.

6. Compile the contract:

On the left pane, click **Solidity compiler** > **Compile**.

### Fund your account

Fund the account that you will use to deploy the contract with xDAI. Use the [xDAI mainnet faucet](https://gnosisfaucet.com/).

### Set up Remix IDE to work through your Chainstack node

On the left pane, click **Deploy** and switch to **Injected Provider - MetaMask**.

### Deploy the soulbound contract

On the left pane:

1. Click **Deploy & run transactions**.
1. In contract, select **contracts/soulbound.sol**.
1. Click **Deploy**.

This will engage your MetaMask to deploy the contract to the Gnosis Chain mainnet through your currently selected MetaMask account. Click **Confirm** in the MetaMask modal.

## Interact with the contract

Once your contract is deployed, you can view it online at [Blockscout Gnosis Chain mainnet explorer](https://blockscout.com/xdai/mainnet).

You are now going to verify the contract in the Blockscout explorer to be able to use the explorer as a web app and easily interact with the contract online.

### Flatten your contract code

Since your soulbound contract uses imported OpenZeppelin libraries, you must put all the imports into one `.sol` file to make Blockscout be able to verify it.

1. In your Remix IDE, click **Plugin manager** > **Flattener** > **Activate**.
1. Click **Flattener** > **Flatten contracts/soulbound.sol**.

The flattened contract is now in your clipboard.

### Verify the deployed contract on Blockscout

1. Go to [Blockscout Gnosis Chain mainnet explorer](https://blockscout.com/xdai/mainnet).
1. Find your deployed contract. The address of your contract on the left pane of Remix IDE under **Deployed Contracts**.
1. On the contract page on Blockscout, click **Code** > **Verify & Publish**.
1. Select **Via flattened source code**.
1. In **Contract Name**, provide the name of your contract. In our example, the name is `SoulBoundToken`.
1. In **Compiler**, select the same compiler version that was used in Remix IDE.
1. In **Optimization**, select **No**.
1. In **Enter the Solidity Contract Code**, paste the flattened contract code.
1. Click **Verify & publish**.

Blockscout will take a few seconds to complie your contract, verify, and publish it.

### Issue a soulbound token

Now that your soulbound contract is verified, you can check Blockscout to interact with it.

1. On Blockscout, on your contract, click **Write Contract**.
1. In your MetaMask, make sure you have the same address selected as the one that deployed the contract.
1. Click **Connect wallet**. This will connect your MetaMask instance with the contract owner as the active address.
1. In **safeMint**, provide an address that you own and to which you will issue a soulbound token.
1. Click **Write**.

This will issue a soulbound token to the provided address.

### Burn the soulbound token

Now that your other account has a soulbound token, you can burn it.

In your MetaMask instance, switch to the account that has a soulbound token tied to it.

1. On Blockscout, on your contract, click **Write Contract**.
1. In your MetaMask, make sure you have the address selected that owns the issued soulbound token.
1. Click **Connect wallet**. This will connect your MetaMask instance with the token owner as the active address.
1. In **burn**, provide the token ID. If this is the first issued token, the ID is `0`.
1. Click **Write**.

This will send the soulbound token from the current owner to the address `0x0000000000000000000000000000000000000000`.

## Conclusion

This tutorial guided you through the basics of creating and deploying a simple soulbound contract on the Gnosis Chain mainnet through your Chainstack-deployed node.

You have also interacted with the contract, issued, and burned the token using Blockscout as a web app and MetaMask as your interaction tool that works through your Chainstack-deployed Gnosis Chain node.

::: tip See also

* [Operations: Gnosis Chain](/operations/gnosis/)

:::
