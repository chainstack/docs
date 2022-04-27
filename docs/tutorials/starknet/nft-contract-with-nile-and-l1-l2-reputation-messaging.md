---
meta:
  - name: description
    content: Learn how to develop and deploy a simple NFT contract on StarkNet with L1 <-> L2 messaging.
  - name: keywords
    content: tutorial starknet erc 721 nft goerli l1l2 bridge message
---

# An NFT contract with Nile and L1 <-> L2 reputation messaging

The objective of this tutorial is twofold:

* Get you familiar with the foundational StarkNet concepts: the account model and the L1 <-> L2 messaging.
* Do a hands-on walkthrough with the tooling available on StarkNet, the smart contracts, and the communication between the L1 Ethereum network and the L2 StarkNet network.

For the tutorial, you will implement an NFT contract with a simple reputation points system. You will run the NFT contract on the L2 StarkNet testnet, and you will be able to interact with the L2 reputation system through the L1 Ethereum Goerli testnet.

## Prerequisites

* <a href="https://console.chainstack.com/" target="_blank">Chainstack account</a> to deploy an Ethereum Goerli node and a StarkNet testnet node.
* [Cairo](https://www.cairo-lang.org/docs/quickstart.html) to compile StarkNet contracts and to interact with the network through the StarkNet CLI.
* [OpenZeppelin Nile](https://github.com/OpenZeppelin/nile) to create and deploy an NFT contract.
* [OpenZeppelin Cairo contracts](https://github.com/OpenZeppelin/cairo-contracts/) to use the ERC-721 contract library in Cairo.
* [MetaMask](https://metamask.io/) to deploy the L1 contract and interact with the contract.
* [ArgentX](https://www.argent.xyz/argent-x/) to interact with the L2 NFT contract.

## Overview

To get from zero to a deployed NFT contract with a reputation system on L2 and its counterpart on L1, do the following:

1. With Chainstack, create a [public chain project](/glossary/public-chain-project).
1. With Chainstack, deploy an Ethereum Goerli testnet node.
1. With Chainstack, deploy a StarkNet testnet node.
1. With Chainstack, access your Ethereum Goerli testnet node credentials and your StarkNet testnet node credentials.
1. Set up your MetaMask with the Ethereum Goerli testnet node.
1. Deploy the L1 contract on the Ethereum Goerli testnet and verify the contract.
1. With the StarkNet CLI, deploy an account on the StarkNet testnet.
1. With Nile, deploy the L2 NFT contract on the StarkNet network.
1. Mint an NFT on L2.
1. Increase and decrease the reputation of the minted NFT on L2.
1. On L1, withdraw the reputation points of the minted L2 NFT.
1. On L1, increase the reputation of the minted L2 NFT.

## Step-by-step

### Create a public chain project

See [Create a project](/platform/create-a-project).

### Join the Ethereum Goerli testnet

For the L1 <-> L2 messaging, you need access to both an Ethereum network and a StarkNet network.

See [Join a public network](/platform/join-a-public-network).

### Join the StarkNet testnet

See [Join a public network](/platform/join-a-public-network).

### Get the node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

### Set up MetaMask

You will deploy the L1 contract with Remix through MetaMask.

To set up, see [Ethereum tools: MetaMask](/operations/ethereum/tools#metamask).

### Set up an account on StarkNet

Unlike on other EVM-based networks, accounts on StarkNet are abstract and decoupled from the signer. Accounts are contracts and can contain any code—for example, an account can be multi-signature or have any other mechanisms built in.

For this tutorial, you will deploy the standard account that comes with the StarkNet CLI and is based on the [OpenZeppelin account contract](https://github.com/OpenZeppelin/cairo-contracts/tree/main/src/openzeppelin/account) implementation.

To deploy an account:

``` sh
starknet deploy_account --wallet starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount --network=alpha-goerli
```

Fund the deployed account with [L2 Goerli ETH](https://faucet.goerli.starknet.io/).

### Set up the L2 NFT contract

There will be three contracts in total to do the L1 <-> L2 messaging for this tutorial:

* StarkNet L1 core contract — the default StarkNet contract deployed on L1. See the [official core contract addresses](https://www.cairo-lang.org/docs/hello_starknet/index.html#starknet-alpha-on-mainnet).
* StarkNet L2 NFT contract — your tutorial contract in Cairo that you will deploy on the StarkNet testnet. This contract will communicate with your Ethereum L1 contract.
* Ethereum L1 contract — your tutorial contract in Solidity that you will deploy on the Ethereum Goerli testnet. This contract will:
  * Consume messages from your L2 contract through the StarkNet L1 core contract.
  * Send messages to your L2 contract.

You are going to use the OpenZeppelin [ERC721 Mintable Burnable](https://github.com/OpenZeppelin/cairo-contracts/tree/main/src/openzeppelin/token/erc721) contract and modify it to add the L1 <-> L2 reputation messaging.

Initialize the project with Nile:

``` sh
nile init
```

Install the OpenZeppelin contract libraries:

``` sh
pip install cairo-nile openzeppelin-cairo-contracts
```

In the `contracts/` directory, create a contract called `NFT_with_reputation.cairo`:

```
%lang starknet

from openzeppelin.token.erc721.ERC721_Mintable_Burnable import constructor
```

If you were going to just create a simple NFT contract on the StarkNet network, this would have been enough.

But you are going to add to the NFT contract a reputation system that will communicate with the L1 contract.

Update your `NFT_with_reputation.cairo` contract with the following code:

```
%lang starknet

from openzeppelin.token.erc721.ERC721_Mintable_Burnable import constructor

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.starknet.common.messages import send_message_to_l1

const L1_CONTRACT_ADDRESS = (
    L1_MESSAGING_CONTRACT)
const MESSAGE_REP_DOWN = 0

# A mapping from a nftId (L1 Ethereum address) to their reputation.
@storage_var
func reputation(nftId : felt) -> (res : felt):
end

@view
func get_rep{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    nftId : felt
) -> (reputation : felt):
    let (res) = reputation.read(nftId=nftId)
    return (res)
end

@external
func rep_up{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    nftId : felt, points : felt
):
    let (res) = reputation.read(nftId=nftId)
    reputation.write(nftId, res + points)
    return ()
end

@external
func rep_down{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    nftId : felt, points : felt
):

    let (res) = reputation.read(nftId=nftId)
    tempvar new_reputation = res - points

    # Update the new reputation.
    reputation.write(nftId, new_reputation)

    # Send the rep down message.
    let (message_payload : felt*) = alloc()
    assert message_payload[0] = MESSAGE_REP_DOWN
    assert message_payload[1] = nftId
    assert message_payload[2] = points
    send_message_to_l1(to_address=L1_CONTRACT_ADDRESS, payload_size=3, payload=message_payload)

    return ()
end

@l1_handler
func repUp{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    from_address : felt, nftId : felt, points : felt
):
    # Make sure the message was sent by the intended L1 contract.
    assert from_address = L1_CONTRACT_ADDRESS

    # Read the current reputation.
    let (res) = reputation.read(nftId=nftId)

    # Compute and update the new reputation.
    tempvar new_reputation = res + points
    reputation.write(nftId, new_reputation)

    return ()
end
```

where L1_MESSAGING_CONTRACT is the address of the L1 contract that you will deploy later.

The contract implementation is the following:

* The NFT part of the contract is based on the OpenZeppelin [ERC721 Mintable Burnable](https://github.com/OpenZeppelin/cairo-contracts/tree/main/src/openzeppelin/token/erc721) library.
* The L1 <-> L2 messaging part of the contract is based on the [official Cairo tutorial](https://www.cairo-lang.org/docs/hello_starknet/l1l2.html).
* `nftId` is used to identify the NFT token ID when it is minted.
* `rep_up` can be called by any contract on L2 to increase the reputation of the NFT.
* `rep_down` can be called by any contract on L2 to decrease the reputation of the NFT and send the reputation points as a message to the L1 contract.
* `get_rep` can be called by any contract on L2 to get the current reputation of the NFT.
* `l1_handler` processes the message from the L1 contract.

You will deploy the L2 contract after you deploy the L1 contract.

### Set up and deploy the L1 contract

The L1 contract will communicate with your L2 contract through the [L1 StarkNet core contract](https://www.cairo-lang.org/docs/hello_starknet/index.html#starknet-alpha-on-mainnet).

In [Remix](https://remix.ethereum.org/), create the `L1L2ERC721Rep.sol` contract:

```
pragma solidity ^0.8.7;

interface IStarknetCore {
    /**
      Sends a message to an L2 contract.

      Returns the hash of the message.
    */
    function sendMessageToL2(
        uint256 toAddress,
        uint256 selector,
        uint256[] calldata payload
    ) external returns (bytes32);

    /**
      Consumes a message that was sent from an L2 contract.

      Returns the hash of the message.
    */
    function consumeMessageFromL2(uint256 fromAddress, uint256[] calldata payload)
        external
        returns (bytes32);
}

/**
  Contract for L1 <-> L2 interaction between an L2 StarkNet contract and this L1 solidity
  contract.
*/
contract L1L2ERC721Rep {
    // The StarkNet core contract.
    IStarknetCore starknetCore;

    mapping(uint256 => uint256) public nftIdIdleReputationPoints;

    uint256 constant MESSAGE_REP_DOWN = 0;

    // The selector of the "repUp" l1_handler.
    uint256 constant REPUP_SELECTOR =
        481301234104709516967081079511443560691305293629011359495317790738588668414;

    /**
      Initializes the contract state.
    */
    constructor(IStarknetCore starknetCore_) {
        starknetCore = starknetCore_;
    }

    function withdrawToIdle(
        uint256 l2ContractAddress,
        uint256 nftId,
        uint256 points
    ) external {
        // Construct the rep down message's payload.
        uint256[] memory payload = new uint256[](3);
        payload[0] = MESSAGE_REP_DOWN;
        payload[1] = nftId;
        payload[2] = points;

        // Consume the message from the StarkNet core contract.
        // This will revert the (Ethereum) transaction if the message does not exist.
        starknetCore.consumeMessageFromL2(l2ContractAddress, payload);

        // Update the L1 reputation points of the NFT.
        nftIdIdleReputationPoints[nftId] += points;
    }

    function repUp(
        uint256 l2ContractAddress,
        uint256 nftId,
        uint256 points
    ) external {
        require(points < 2**64, "Invalid points.");
        require(points <= nftIdIdleReputationPoints[nftId], "Insufficient nftId's reputation points.");

        // Update the L1 reputation points of the NFT.
        nftIdIdleReputationPoints[nftId] -= points;

        // Construct the repUp message's payload.
        uint256[] memory payload = new uint256[](2);
        payload[0] = nftId;
        payload[1] = points;

        // Send the message to the StarkNet core contract.
        starknetCore.sendMessageToL2(l2ContractAddress, REPUP_SELECTOR, payload);
    }
}
```

The contract implementation is the following:

* The contract is based on the [official Cairo tutorial](https://www.cairo-lang.org/docs/hello_starknet/l1l2.html).
* The contract has the interface to communicate with the [L1 StarkNet core contract](https://www.cairo-lang.org/docs/hello_starknet/index.html#starknet-alpha-on-mainnet).
* The constructor of the contract takes the L1 StarkNet core contract address.
* The `withdrawToIdle` external function withdraws the NFT reputation points sent to L1 using the L2 `rep_down` function. Mechanically, once you hit the L2 `rep_down` function, the L2 state is pushed as a message into the L1 StarkNet core contract. The `rep_down` message then sits in the L1 StarkNet core contract until it gets consumed by triggering the `withdrawToIdle` function in your L1 contract.
* The contract has the `repUp` external function of the L2 contract computed for `REPUP_SELECTOR`. To compute:
  1. Create a Python script with the function name (`repUp`):

      ``` py
      from starkware.starknet.compiler.compile import \
          get_selector_from_name

      print(get_selector_from_name('repUp'))
      ```

  1. Run the script.
* The reputation points withdrawn to an account through `withdrawToIdle` can then be used in the L1 `repUp` function to send a message to the L2 NFT contract to increase the NFT reputation.

If this seems a little complicated at this point, do not worry—just keep following the tutorial and you will have a full hands-on walkthrough, which will help understand each of the steps better.

In Remix, compile the `L1L2ERC721Rep.sol` contract.

In Remix, on the deployment tab:

* In **Environment**, select **Injected Web3**.
* In **Contract**, select `L1L2ERC721Rep`.
* In **Deploy**, provide `0xde29d060D45901Fb19ED6C6e959EB22d8626708e`. This is the address of the L1 StarkNet core contract on the Ethereum Goerli testnet.

Clicking **Deploy** will engage your MetaMask instance connected to the Ethereum Goerli testnet and deploy the contract.

Verify the deployed contract on [Etherscan](https://goerli.etherscan.io/):

1. Find the contract by the address and click **Contract** > **Verify and Publish**.
1. For **Compiler Type**, select **Solidity (Single file)**.
1. For **Compiler Version**, select **v0.8.7**.
1. For **Open Source License Type**, select **No License (None)**.
1. For **Optimization**, select **No**.
1. In the **Solidity Contract Code** field, paste the entirety of your `L1L2ERC721Rep.sol` contract.
1. Click **Verify and Publish**.

This will verify the contract and turn it into a web app that you can interact with through MetaMask.

### Deploy the L2 NFT contract

Now that you have the address of your L1 contract, swap `L1_MESSAGING_CONTRACT` in the L2 contract code that you have prepared with the actual L1 contract address.

In your Nile project directory, compile the contract:

``` sh
nile compile
```

Deploy the contract:

``` sh
nile deploy CONTRACT_NAME NFT_NAME_INT NFT_TICKER_INT OWNER_ADDRESS --network goerli
```

where:

* CONTRACT_NAME — the name of the contract, which is `NFT_with_reputation` for this tutorial.
* NFT_NAME_INT — Nile accepts only integers for the deployment constructor. Provide any NFT collection name in integer format. See below for the conversion script.
* NFT_TICKER_INT — Any NFT collection ticker in integer format.

To convert a string to an integer, run the following Python script:

``` py
# string_to_integer.py
import sys

for arg in sys.argv[1:]:
    print(int.from_bytes(arg.encode(), byteorder="big"))
```

Example:

``` sh
$ python3 string_to_integer.py NFTwithRep
369641944198362097149296
```

Example of deploying the contract with the name `NFTwithRep`, ticker `NFTRP`, and owner `0x02a152cb1a753a858c950bb710d957e7f3f78d87435831e7fae394f9233e60fa`:

``` sh
nile deploy NFT_with_reputation 369641944198362097149296 336187380304 0x02a152cb1a753a858c950bb710d957e7f3f78d87435831e7fae394f9233e60fa --network goerli
```

You can check the deployment status with the `starknet tx_status --hash HASH --network=alpha-goerli` command.

Example:

``` sh
starknet tx_status --hash 0x635132bdc45cfe7f7f3b458bba7e739043f133ee1315ae1e67da70f7ed53782 --network=alpha-goerli
```

When you get the  `ACCEPTED_ON_L2` status, the contract is running on the StarkNet network.

::: tip

If you get the `REJECTED` status, reattempt the transaction and up the suggested network fee when prompted by ArgentX.

:::

### Interact with the L2 contract

Mint an NFT:

1. Use [Voyager](https://goerli.voyager.online/) to open your deployed contract.
1. Click **Write Contract**.
1. Click **Connect ArgentX Wallet** and make sure you connect with the account address that you provided as the owner when deploying the contract.
1. In `mint`, provide a deployed account to mint an NFT to in the `to` field and any ID in `tokenId`. This will be the ID of the minted NFT that you will assign the reputation points to.
1. Click **Transact**.

Your NFT is now minted on L2.

### L2 -> L1 messaging

Sending a message from L2 to L1 takes much longer than sending a message from L1 to L2.

When sending a message from L2 to L1, StarkNet puts messages in a batch and pushes the state onto L1 at different time intervals. It can take 30 minutes for your message to arrive on L1 on testnet.

You can watch state updates live as transactions to the L1 StarkNet core contracts:

* StarkNet core mainnet: [0xc662c410C0ECf747543f5bA90660f6ABeBD9C8c4](https://etherscan.io/address/0xc662c410C0ECf747543f5bA90660f6ABeBD9C8c4)
* StarkNet core testnet: [0xde29d060D45901Fb19ED6C6e959EB22d8626708e](https://goerli.etherscan.io/address/0xde29d060D45901Fb19ED6C6e959EB22d8626708e)

Now that you have an NFT minted on L2, assign reputation points to it:

1. Use [Voyager](https://goerli.voyager.online/) to open your deployed contract.
1. Click **Write Contract**.
1. In `rep_up`, provide the ID of your minted NFT in `nftId` and any integer for reputation points in `points`. For example, assign `1500`.
1. Click **Transact**.

Once the transaction is accepted on L2, you can check the assigned reputation points on **Read Contract** > `get_rep`.

Now that you have the points assigned, you will decrease the reputation partially and send the reputation points to L1.

1. Use [Voyager](https://goerli.voyager.online/) to open your deployed contract.
1. Click **Write Contract**.
1. In `rep_down`, provide the ID of your minted NFT in `nftId` and any integer for reputation points in `points`. For example, remove `700` points.
1. Click **Transact**.

And now you wait. Your transaction will go through the following states in the specified order:

* `RECEIVED` — The transaction is received by the StarkNet node.
* `PENDING` – The transaction is valid and is in a pending block.
* `ACCEPTED_ON_L2` – The transaction is in an accepted block on L2.
* `ACCEPTED_ON_L1` — The transaction is pushed onto L2 as a message and ready to be consumed on L1.

To go from `RECEIVED` to `ACCEPTED_ON_L1` will take about 30 minutes on average on the testnet and 2 hours on the mainnet.

You can check the deployment status with the `starknet tx_status --hash HASH --network=alpha-goerli` command.

Example of an L2 transaction sending a message to L1 with `nftId`: `1` and `rep_down`: `700`: [0x6f753d8249a1f94d6ede18e34717cddf35936c1bcce329be599ad6c1ca7afaf](https://goerli.voyager.online/tx/0x6f753d8249a1f94d6ede18e34717cddf35936c1bcce329be599ad6c1ca7afaf#messages).

Example of the message arriving on L1 (#89): [0x56a8e663d0e607fc6eb74b6b7bb713c5acdc262130e7790a8b252c192b41fcc9](https://goerli.etherscan.io/tx/0x56a8e663d0e607fc6eb74b6b7bb713c5acdc262130e7790a8b252c192b41fcc9#eventlog).

You now have the message in the StarkNet core contract on L1 waiting to be consumed by triggering your L1 contract.

### L1 -> L2 messaging

Sending a message from L1 to L2 is much faster than sending a message from L2 to L1.

The StarkNet network will receive the L1 -> L2 message after a few block confirmations on the L1 network.

First, consume the message on L1:

1. Use [Etherscan](https://goerli.etherscan.io/) to open your contract.
1. Click **Write Contract** > **Connect to Web3**.
1. In `withdrawToIdle`, provide:
   * `l2ContractAddress` — the address of your NFT contract deployed on L2.
   * `nftId` — the ID of the minted NFT. For this tutorial, it is `1`.
   * `points` — the number of reputation points you removed from the NFT contract on L2. For this tutorial, it is `700`.
1. Click **Write**.

This will withdraw the reputation points to the idle state—not assigned to the NFT on L2. This constitutes consuming the L2 message on L1.

Now send the L1 -> L2 message—for this tutorial, it is putting the idle reputation points back on L2 for the NFT reputation by calling `repUp` on L1.

First, check the current reputation points of the NFT on L2 by calling `get_rep` on the L2 contract. If you are following the example numbers in this tutorial, you should get the reputation of `800` for `nftId`: `1` on L2.

Now up the reputation by `300` points by sending a message from L1 to L2:

1. Use [Etherscan](https://goerli.etherscan.io/) to open your contract.
1. Click **Write Contract** > **Connect to Web3**.
1. In `repUp`, provide:
   * `l2ContractAddress` — the address of your NFT contract deployed on L2.
   * `nftId` — the ID of the minted NFT. For this tutorial, it is `1`.
   * `points` — the number of reputation points you want to put back in the NFT reputation on the L2 contract. For this tutorial, it is `300`.
1. Click **Write**.

After a few blocks on L1, call `get_rep` on the L2 contract. You should get the reputation of `1100` for `nftId`: `1` on L2.

Congratulations! You have completed the full L1 <-> L2 messaging exercise on StarkNet.

## Conclusion

This tutorial guided you through the basics of operating on StarkNet, using the tooling like Nile and OpenZeppelin, implementing your own L1 <-> L2 messaging protocol on the contract level, and actually sending the L1 <-> L2 messages.

As part of the tutorial, you also created an NFT contract that implements a basic reputation system for each of the minted tokens.

This tutorial uses testnet, however the exact same instructions and sequence work on the mainnet.

::: tip See also

* [Operations: StarkNet](/operations/starknet/)

:::
