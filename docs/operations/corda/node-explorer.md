# Node explorer

Corda node explorer is a standalone JavaFX application.

With Corda node explorer, you can:

* Explore nodes on the network.
* View the node's vault and transaction data.
* Execute cash transactions between parties on the network.

## Install the node explorer

1. Install Java 8 on your machine. See [Set-up instructions](https://docs.corda.net/getting-set-up.html#set-up-instructions).

2. Download `corda-tools-explorer-4.1.jar`:

``` sh
wget https://ci-artifactory.corda.r3cev.com/artifactory/corda-releases/net/corda/corda-tools-explorer/4.1/corda-tools-explorer-4.1.jar
```

3. Run the explorer:

``` sh
java -jar corda-tools-explorer-4.1.jar
```

## Connect to your node

In the node explorer UI, provide the RPC hostname and port, and your node credentials.

See [View node access and credentials](/platform/view-node-access-and-credentials).

::: tip See also

* [Tools](/operations/corda/tools)
* [Installing a CorDapp](/operations/corda/installing-a-cordapp)

:::
