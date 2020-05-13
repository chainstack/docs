---
meta:
  - name: description
    content: Learn how to develop and deploy a CorDapp and build an application that interacts with the CorDapp.
  - name: keywords
    content: corda blockchain cordapp tutorial kotlin
---

# No ticket scalping CorDapp

Ticket scalping for popular events has been a problem even in the pre-Internet era; however, with the digital technology becoming ubiquitous, scalping looked like a solved problem for a brief moment—it made sense too, the tickets became digital and available through websites, and all one had to do was enter their credit card details online and click *Buy*.

This brief period of fair distribution lasted mostly during the dawn of the Internet. What happened later and is still happening today is that the ticket scalping returned at a much grander scale—something that the pre-Internet speculators could only dream of.

Today ticket scalping is run through [automated scalping bots](https://en.wikipedia.org/wiki/Ticket_resale#Automated_scalping_bots), there are even [claims of insider scalping](https://www.rollingstone.com/music/music-news/ticketmaster-cheating-scalpers-726353/), and some well-known media like Pitchfork just putting it bluntly that [scalping won't go away](https://pitchfork.com/thepitch/why-ticket-scalping-wont-go-away/).

What this tutorial offers is a very basic CorDapp on the [Corda blockchain platform](/blockchains/corda) to give an idea and a steer in the direction of how the scalping problem can be solved.

In this tutorial you will:

1. Build a CorDapp.
1. Upload the CorDapp to your Corda nodes.
1. Connect to the nodes in shell and run the CorDapp.
1. Build and run a webserver that connects to your Corda node and interacts with the CorDapp.

::: tip Get the CorDapp without building
If you want to just try out the CorDapp, you can [download the latest contract and workflow versions](https://github.com/chainstack/no-ticket-scalping-cordapp/releases/) and skip this tutorial to the [Install the CorDapp](#install-the-cordapp) section.
:::

## Overview

This tutorial will guide you through building and deploying a [CorDapp](/blockchains/corda#cordapp) that immutably registers ticket distribution with ticket distributors.

The ticket registration is done by running [noScalpDapp](https://github.com/chainstack/no-ticket-scalping-cordapp) on [Corda nodes](/blockchains/corda#node).

What noScalpDapp does is it lets the nodes running it send each other mutually signed transactions with the event name and the number of tickets distributed. All verified by a [notary](/blockchains/corda#notary-service).

In this framework, one node equals one ticket distributor. A distributor can be anything you want and geographically located wherever. Since one distributor equals one node, it can be a node that only you own or it can be a community-owned node. The idea is that the initial ticket distributor—as there is always one originating source—must provably distribute the tickets to a number of nodes; these nodes can, in turn, redistribute the tickets to other nodes.

## Prerequisites

1. Clone the [CorDapp repository](https://github.com/chainstack/no-ticket-scalping-cordapp) to your machine.
1. Set up your CorDapp development environment. See [Corda docs: Set-up instructions](https://docs.corda.net/getting-set-up.html#set-up-instructions).

## noScalpDapp

Each CorDapp has the following components:

* [Flow](/blockchains/corda#flows)
* [Contract](/blockchains/corda#contracts)
* [State](/blockchains/corda#states)

noScalpDapp is no exception and has the components written in Kotlin:

* [noScalpFlow.kt](https://github.com/chainstack/no-ticket-scalping-cordapp/blob/master/workflows/src/main/kotlin/com/noScalpDapp/flows/noScalpFlow.kt) — the CorDapp flow that starts sessions between the nodes and builds and verifies the ticket distribution transactions.
* [noScalpContract.kt](https://github.com/chainstack/no-ticket-scalping-cordapp/blob/master/contracts/src/main/kotlin/com/noScalpDapp/contracts/noScalpContract.kt) — the CorDapp contract for the ticket distribution transaction.
* [noScalpState.kt](https://github.com/chainstack/no-ticket-scalping-cordapp/blob/master/contracts/src/main/kotlin/com/noScalpDapp/states/noScalpState.kt) — the CorDapp state that creates an on-ledger fact that can be retrieved by the nodes participating in the transaction.

The code in `noScalpFlow`, `noScalpContract`, and `noScalpState` has comments explaining the what and how, so do check them.

## Prepare a Corda network

### Create a consortium project

See [Create a project](/platform/create-a-project).

### Deploy a Corda network

See [Deploy a consortium network](/platform/deploy-a-consortium-network).

### Add a second node to your Corda network

For this tutorial, you need at least two nodes.

See [Add a node to a network](/platform/add-a-node-to-a-network).

### Get your Corda node access and credentials

See [View node access and credentials](/platform/view-node-access-and-credentials).

## Build and install noScalpDapp

### Build the JAR files

The `build.gradle` script in root comes with the JAR instructions to build the CorDapp:

``` sh
./gradlew jar
```

This will build the CorDapp and place the contract and flow JAR files in:

* Contract: `/contracts/build/libs/`
* Workflow: `/workflows/build/libs`

### Install the CorDapp

See [Installing a CorDapp](/operations/corda/installing-a-cordapp).

Install the CorDapp on at least two nodes.

### Interact with the CorDapp through shell

See [Interaction tools](/operations/corda/tools#interaction-tools).

To check if noScalpDapp has loaded successfully, run in the shell:

``` sh
flow list
```

The output should be:

``` sh
com.noScalpDapp.flows.noScalpFlow$Initiator
```

Run a ticket distribution:

``` sh
start noScalpFlow eventName: "NAME", ticketQuantity: QUANTITY, toDistributor: "LEGAL_NAME"
```

where

* NAME — any event name that you are distributing the tickets to.
* QUANTITY — the number of tickets you are distributing.
* LEGAL_NAME — the legal name of the node you are distributing the tickets to. This cannot be the same node you are currently connected to. To get the node's legal name, see [View node access and credentials](/platform/view-node-access-and-credentials).

The following example distributes 6000 tickets to the TOOL band show in Singapore to node `ND-123-456-789`:

``` sh
>>> start noScalpFlow eventName: "TOOL Singapore show", ticketQuantity: 6000, toDistributor: "OU=Organization-ND-123-456-789, O=Organization, L=Singapore, C=SG"

✓ Starting
 ✓ Generating transaction based on the distribution parameters.
 ✓ Verifying the distribution constraints.
 ✓ Signing transaction with our private key.
 ✓ Gathering the other distributor's signature.
     ✓ Collecting signatures from counterparties.
     ✓ Verifying collected signatures.
 ✓ Obtaining notary signature and recording the distribution transaction.
          Requesting signature by notary service
              Requesting signature by Notary service
              Validating response from Notary service
     ✓ Broadcasting transaction to participants
▶︎ Done
Flow completed with result: SignedTransaction(id=AF8EE5E63678B00161EB0124AB46AFE1579584AAE558F5E8F1AA00A764597D8B)
```

Check the registered transaction on the node where you ran the transaction and on the node that received the transaction.

To check the transaction:

``` sh
run vaultQuery contractStateType: com.noScalpDapp.states.noScalpState
```

This will print the registered transaction details.

Example:

``` sh
>>> run vaultQuery contractStateType: com.noScalpDapp.states.noScalpState
states:
- state:
    data: !<com.noScalpDapp.states.noScalpState>
      ticket: 6000
      event: "TOOL Singapore show"
      fromDistributor: "OU=Organization-ND-987-654-321, O=Organization, L=Singapore,\
        \ C=SG"
      toDistributor: "OU=Organization-ND-123-456-789, O=Organization, L=Singapore,\
        \ C=SG"
    contract: "com.noScalpDapp.contracts.noScalpContract"
    notary: "OU=Organization-ND-916-874-734, O=Organization, L=Singapore, C=SG"
    encumbrance: null
    constraint: !<net.corda.core.contracts.SignatureAttachmentConstraint>
      key: "aSq9DsNNvGhYxYyqA9wd2eduEAZ5AXWgJTbTEw3G5d2maAq8vtLE4kZHgCs5jcB1N31cx1hpsLeqG2ngSysVHqcXhbNts6SkRWDaV7xNcr6MtcbufGUchxredBb6"
  ref:
    txhash: "AF8EE5E63678B00161EB0124AB46AFE1579584AAE558F5E8F1AA00A764597D8B"
    index: 0
totalStatesAvailable: -1
stateTypes: "UNCONSUMED"
otherResults: []
```

Note that the transaction details output shows the confusing `totalStatesAvailable: -1`. This is a [known Corda issue](https://r3-cev.atlassian.net/browse/CORDA-2601).

## Build and run the noScalpDapp webserver and client

### Overview

Once you have your Corda network with noScalpDapp running, you can start a webserver to interact with the nodes.

The webserver is a Spring Boot implementation.

For a general webserver implementation, see [Interaction tools: Using Spring Boot webserver](/operations/corda/tools#using-spring-boot-webserver).

For this tutorial, the webserver implementation is in the `clients` directory of the [CorDapp repository](https://github.com/chainstack/no-ticket-scalping-cordapp) that you cloned at the start of the tutorial.

Components:

* Backend:
  * [MainController.kt](https://github.com/chainstack/no-ticket-scalping-cordapp/blob/master/clients/src/main/kotlin/com/noScalpDapp/server/MainController.kt) — the main component that does POST and GET mappings and calls [noScalpState.kt](https://github.com/chainstack/no-ticket-scalping-cordapp/blob/master/contracts/src/main/kotlin/com/noScalpDapp/states/noScalpState.kt).
  * [NodeRPCConnection.kt](https://github.com/chainstack/no-ticket-scalping-cordapp/blob/master/clients/src/main/kotlin/com/noScalpDapp/server/NodeRPCConnection.kt) — the standard Corda RPC wrapper that uses the [CordaRPCClient](https://docs.corda.net/api/javadoc/net/corda/client/rpc/CordaRPCClient.html) and [CordaRPCConnection](https://docs.corda.net/api/javadoc/net/corda/client/rpc/CordaRPCConnection.html) classes.
  * [Server.kt](https://github.com/chainstack/no-ticket-scalping-cordapp/blob/master/clients/src/main/kotlin/com/noScalpDapp/server/Server.kt) — a Spring Boot application with [JacksonSupport](https://docs.corda.net/api/kotlin/corda/net.corda.client.jackson/-jackson-support/index.html).

* Frontend:
  * [index.html](https://github.com/chainstack/no-ticket-scalping-cordapp/blob/master/clients/src/main/resources/public/index.html) — calls [angular-module.js](https://github.com/chainstack/no-ticket-scalping-cordapp/blob/master/clients/src/main/resources/public/js/angular-module.js).
  * [angular-module.js](https://github.com/chainstack/no-ticket-scalping-cordapp/blob/master/clients/src/main/resources/public/js/angular-module.js) — calls [MainController.kt](https://github.com/chainstack/no-ticket-scalping-cordapp/blob/master/clients/src/main/kotlin/com/noScalpDapp/server/MainController.kt) for GET and POST mappings.

### Configure the webserver

To be able to connect to your Corda node, you must configure the webserver with the connection details.

The webserver connection details are in `clients/build.gradle` under `task runDistributor`:

```
args '--server.port=SERVER_PORT', '--config.rpc.host=CORDA_RPC_HOSTNAME', '--config.rpc.port=CORDA_RPC_PORT', '--config.rpc.username=CORDA_RPC_USER', '--config.rpc.password=CORDA_RPC_PASSWORD'
```

where

* SERVER_PORT — your Spring Boot server instance port.
* CORDA_RPC_HOSTNAME — your Corda node RPC hostname.
* CORDA_RPC_PORT — your Corda node RPC port.
* CORDA_RPC_USER — your Corda node RPC username.
* CORDA_RPC_PASSWORD — your Corda node RPC password.

See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

```
task runDistributor(type: JavaExec, dependsOn: jar) {
    classpath = sourceSets.main.runtimeClasspath
    main = 'com.noScalpDapp.server.ServerKt'
    args '--server.port=50005', '--config.rpc.host=nd-123-456-789.rg-123-456.p2pify.com', '--config.rpc.port=10201', '--config.rpc.username=username', '--config.rpc.password=password'
}
```

This will configure the webserver to run at `localhost:50005` and connect it to node `ND-123-456-789`.

### Build and run the webserver

In the project root, run:

``` sh
./gradlew runDistributor
```

This will engage the `runDistributor` task specified in `clients/build.gradle`, start the server, and connect the server to to your node.

::: warning
The task progress for the webserver start printed in the output will never reach 100% completion. You can access the webserver at around 95%.
:::

### Interact with the node through webserver

Interact via user interface or via API endpoints.

### User interface

Connect to `localhost:50005` in your browser. This will show the legal name of the node you are connected to and the **Distribute tickets** button.

1. Click **Distribute tickets**.
1. In the **To distrubutor** field, choose the node to distribute the tickets to. This will pick up all your peer nodes in your Corda network. Make sure that the node you select is also running the noScalpDapp.
1. Provide **Ticket quantity** and **Event name**.
1. Click **Create distribution**.

This will create and run the transaction.

Refresh the page to see your distribution under **Registered distributions**.

### API endpoints

The GET requests are defined via `@GetMapping` in [MainController.kt](https://github.com/chainstack/no-ticket-scalping-cordapp/blob/master/clients/src/main/kotlin/com/noScalpDapp/server/MainController.kt).

The POST requests are defined via `@PostMapping` in [MainController.kt](https://github.com/chainstack/no-ticket-scalping-cordapp/blob/master/clients/src/main/kotlin/com/noScalpDapp/server/MainController.kt).

A GET request example to see the legal name of the node the webserver is connected to:

``` sh
$ curl url http://localhost:50005/api/noScalpDapp/me
{
  "me" : "OU=Organization-ND-123-456-789, O=Organization, L=Singapore, C=SG"
}
```

## Conclusion

This tutorial guided you through the basics of buildling and running a CorDapp.

You connected to one of your nodes through shell. You ran a transaction between two nodes running the same CorDapp represented by a contract and a workflow JAR files uploaded on both nodes.

You also built and ran a Spring Boot webserver. You interacted with the CorDapp through the webserver user interface and API.

::: tip See also

* [Tools](/operations/corda/tools)
* [Corda samples](https://github.com/corda/samples/) repository to check other CorDapps and build your own. This tutorial used the Corda samples as well.

:::
