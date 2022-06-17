---
meta:
  - name: description
    content: Learn how to develop and deploy a simple metaverse smart contract on the Harmony network.
  - name: keywords
    content: tutorial harmony one erc 721 nft foundry metaverse
---

# A simple metaverse contract with Foundry

The blockchain part of any metaverse that involves decentralization is object ownership.

On Harmony, object ownership can be realized with the HRC-721 token standard, commonly known as NFT.

A very basic example of realizing a metaverse on blockchain is creating a plot of land and distributing the patches of it to different owners—all through an NFT contract.

In this tutorial, you will:

* Create a simple contract called Polyland. The Polyland contract represents a plot of land.
* Program Polyland to consist of patches of land.
* Deploy Polyland on the Harmony devnet through a node deployed with Chainstack.
* Distribute patches of Polyland to different accounts on the Harmony devnet.

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy a Harmony node.
* [Foundry](https://github.com/gakonst/foundry/) to create and deploy contracts.

## Overview

To get from zero to a deployed metaverse contract and patches of land distributed on the Harmony devnet, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, join the Harmony devnet.
1. With Chainstack, access your Harmony node credentials.
1. With OpenZeppelin, create an HRC-721 contract.
1. With Foundry, flatten, compile, and deploy the contract through your Harmony node.
1. Verify the contract on the Harmony explorer.
1. Using the Harmony explorer as a web app, distribute the patches of land to accounts.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the Harmony devnet

See [Join a public network](/platform/join-a-public-network).

### Get your Harmony node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Install Foundry

See [Foundry](https://github.com/gakonst/foundry).

### Create the contract

1. Initialize your project with Foundry:

``` sh
forge init polyland
```

This will create the project directory `polyland` an initialize it.

2. Go to the `polyland/src/` directory. In the directory, create your metaverse contract: `polyland.sol`.

``` js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Polyland is ERC721, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private supply;

    uint256 public maxSupply = 4;

    struct Triangle {
        string name;
        int8 edge1;
        int8 edge2;
        int8 edge3;
    }

    Triangle[] public triangles;

    constructor() ERC721("Polyland", "PLLND") {
    triangles.push(Triangle("Triangle0", 0,0,0));
    triangles.push(Triangle("Triangle1", 1,1,1));
    triangles.push(Triangle("Triangle2", 2,2,2));
    triangles.push(Triangle("Triangle3", 3,3,3));
    triangles.push(Triangle("Triangle4", 4,4,4));
    }

    modifier supplyCap {
      require(supply.current() <= maxSupply, "All patches minted.");
      _;
    }

    function totalSupply() public view returns (uint256) {
      return supply.current();
    }

    function getTriangles() public view returns (Triangle[] memory) {
      return triangles;
    }

    function mintTriangle(address account)
        public
        onlyOwner
        supplyCap
        returns (uint256)
    {
        supply.increment();

        uint256 newPatchId = supply.current();
        _mint(account, newPatchId);
      
        return newPatchId;
    }
}
```

The contract implementation is the following:

* The contract uses the OpenZeppelin audited [ERC-721 contract templates](https://docs.openzeppelin.com/contracts/erc721).
* The contract consists of the `Triangle` object with three `edge` properties. The triangle is a patch of land that has three edges.
* The `constructor` function sets the contract up with four triangles. Since this is an array and starts with 0, while the ID of the minted patch starts with 1, the first element is set to `Triangle0`. `Triangle0` is the default first element that will not represent a patch of land in the Polyland metaverse.
* Through the `maxSupply` variable and the `supplyCap` modifier, the number of patches available to mint is capped at `4`.
* Only the address that deploys the contract can mint the patches of land.

Thus, the contract represents a plot of land called Polyland that consists of four triangular patches of land.

3. Set up OpenZeppelin with Foundry

Install OpenZeppelin with Foundry:

```
forge install openzeppelin/openzeppelin-contracts
```

In the project directory, create a `remappings.txt` file with the following contents:

``` config
@openzeppelin/=lib/openzeppelin-contracts/
```

4. Flatten the contract

Flatten the contract to make it easier to verify on the [Harmony devnet explorer](https://explorer.ps.hmny.io/).

Run:

``` sh
forge flatten polyland.sol > polylandFlat.sol
```

5. Deploy the contract:

``` sh
forge create CONTRACT_NAME --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT --legacy
```

where

* CONTRACT_NAME — the name of the contract as provided in the contract code `contract Polyland is ERC721, Ownable`.
* CONTRACT_PATH — full path to the flattened contract.
* PRIVATE_KEY — the private key to the account that deploys the contract. Must be used without the `0x` prefix. Fund the account with devnet ONE using the [devnet faucet](http://dev.faucet.easynode.one/).
* HTTPS_ENDPOINT — your Harmony node HTTPS endpoint. See also [View node access and credentials](/platform/view-node-access-and-credentials) and [Tools](/operations/harmony/tools).
* `--legacy` — the Foundry flag to work with the EVM-based networks that are not [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) activated.

Example:

``` sh
forge create Polyland --contracts /root/polyland/src/polylandFlat.sol --private-key 671f1be339521731fef5f0aef7957e1f6653ae27fa58b528242f160a8cfd58dc --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d --legacy
```

Once the contract deploys, note the `solc` and the `Deployed to` values in the output.

### Verify the contract

1. Open the [Harmony devnet explorer](https://explorer.ps.hmny.io/).
1. Put in the contract address. Click the **Contract** tab.
1. Click **Verify and Publish**.
1. In the `Contract Name` field, put `Polyland`.
1. Set `Chain Type` to `devnet`.
1. In `Compiler`, provide the `solc` version that the contract compiled with.
1. In `Optimizer`, set `Yes`, `200`. Contract bytecode optimization with 200 runs is the default Foundry setting.
1. Paste the entirety of the flattened contract in the contract field and hit **Submit**.

This will verify the contract. You can now use the explorer as a web app to interact with the contract.

### Distribute the patches of land

1. On the contract page in the [Harmony devnet explorer](https://explorer.ps.hmny.io/), click **Write Contract**
1. In `mintTriangle`, provide an address to distribute a patch of land to. Distribute the patches to different addresses until you hit the cap with the `All patches minted` message.
1. On the **Read Contract** tab, query the `ownerOf` field by putting in the `tokenId` values representing each of the patches of land: `1`, `2`, `3`, `4`.
1. In the `triangles` field, put in the same `tokenId` values to get the data on each of the patches: name and the size of each of the three edges.

## Conclusion

This tutorial guided you through the basics of creating and deploying a metaverse contract with object ownership representation.

You created your own plot of land, distributed the finite number of land patches to different owners and retrieved the data for each of the patches: patch size and patch owner.

You did all of it [using Foundry](https://chainstack.com/foundry-a-fast-solidity-contract-development-toolkit/).

This tutorial uses devnet, however the exact same instructions and sequence work on the mainnet.

::: tip See also

* [Operations: Harmony](/operations/harmony/)

:::
