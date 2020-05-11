---
meta:
  - name: description
    content: Learn how to connect to your Corda node, how to connect to it, how to run a Spring Boot webserver that interacts with your node.
  - name: keywords
    content: corda node connect developer webserver
---

# Tools

## Interaction tools

### Corda standalone shell

Interact with your Corda node using <a href="https://docs.corda.net/head/shell.html#the-standalone-shell" rel="nofollow">Corda standalone shell</a>.

#### Prerequisites

* Install Java 8. See <a href="https://docs.corda.net/getting-set-up.html#set-up-instructions" rel="nofollow">Corda docs: Set-up instructions</a>.
* Download Corda standalone shell from <a href="https://software.r3.com/artifactory/corda-releases/net/corda/corda-tools-shell-cli/4.3/corda-tools-shell-cli-4.3-all.jar" rel="nofollow">Corda artifactory</a>.
* A Corda node deployed with Chainstack.

#### Running the standalone shell

You can connect to your Corda node and interact with it in shell.

To be able to interact with the CorDapps through shell, you must have the CorDapp contract and workflow JAR files both locally on your machine and on the node you are connecting to.

``` sh
java -jar corda-tools-shell-cli-4.3-all.jar --host=CORDA_RPC_HOSTNAME --port=CORDA_RPC_PORT --user=CORDA_RPC_USER --password=CORDA_RPC_PASSWORD --cordapp-directory=⁨/host/path/to/cordapps
```

where

* CORDA_RPC_HOSTNAME — your Corda node RPC hostname.
* CORDA_RPC_PORT — your Corda node RPC port.
* CORDA_RPC_USER — your Corda node RPC username.
* CORDA_RPC_PASSWORD — your Corda node RPC password.
* ⁨/host/path/to/cordapps — path to your local directory with the contract and workflow JAR files that you uploaded to your Corda node. You only need to specify the `--cordapp-directory` parameter if you intend to interact with the CorDapps on the node.

See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` sh
$ java -jar corda-tools-shell-cli-4.3-all.jar --host=nd-123-456-789.rg-123-456.p2pify.com --port=10201 --user=admin --password=pass --cordapp-directory=⁨/home/user/cordapps

   ______               __
  / ____/     _________/ /___ _
 / /     __  / ___/ __  / __ `/
/ /___  /_/ / /  / /_/ / /_/ /
\____/     /_/   \__,_/\__,_/
--- Corda Open Source 4.3 (d679784) ---

Standalone Shell connected to nd-123-456-789.rg-123-456.p2pify.com:10201
```

Once connected, run `help` to see the list of available commands.

### Chainstack standalone shell

Interact with your Corda node using <a href="https://github.com/chainstack/corda-shell-docker" rel="nofollow">Chainstack standalone shell</a> which is a containerized version of [Corda standalone shell](#corda-standalone-shell).

#### Prerequisites

* Download and install Docker. See <a href="https://www.docker.com/get-started" rel="nofollow">Get Started with Docker</a>.
* A Corda node deployed with Chainstack.

#### Running the standalone shell

You can connect to your Corda node and interact with it in shell.

To be able to interact with the CorDapps through shell, you must have the CorDapp contract and workflow JAR files both locally on your machine and on the node you are connecting to.

``` sh
docker run -it -v /host/path/to/cordapps:/cordapps chainstack/corda-shell --host=CORDA_RPC_HOSTNAME --port=CORDA_RPC_PORT --user=CORDA_RPC_USER --password=CORDA_RPC_PASSWORD --cordapp-directory=/cordapps
```

where

* /host/path/to/cordapps — path to your local directory with the contract and workflow JAR files that you uploaded to your Corda node. You only need to specify the `-v` and `--cordapp-directory` parameters if you intend to interact with the CorDapps on the node.
* CORDA_RPC_HOSTNAME — your Corda node RPC hostname.
* CORDA_RPC_PORT — your Corda node RPC port.
* CORDA_RPC_USER — your Corda node RPC username.
* CORDA_RPC_PASSWORD — your Corda node RPC password.

See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` sh
$ docker run -it -v /home/user/cordapps:/cordapps chainstack/corda-shell --host=nd-123-456-789.rg-123-456.p2pify.com --port=10201 --user=username --password=password --cordapp-directory=/cordapps

   ______               __
  / ____/     _________/ /___ _
 / /     __  / ___/ __  / __ `/
/ /___  /_/ / /  / /_/ / /_/ /
\____/     /_/   \__,_/\__,_/
--- Corda Open Source 4.3 (d679784) ---

Standalone Shell connected to nd-123-456-789.rg-123-456.p2pify.com:10201
```

Once connected, run `help` to see the list of available commands.

### Using a client with the CordaRPCClient class

For your application purposes, you need to write your own client in a JVM-compatible language using the <a href="https://docs.corda.net/api/javadoc/net/corda/client/rpc/CordaRPCClient.html" rel="nofollow">CordaRPCClient</a> class. The `CordaRPCClient` class connects to your Corda node and exposes an RPC interaction interface.

For detailed instructions, see <a href="https://docs.corda.net/clientrpc.html" rel="nofollow">Corda documentation: Interacting with a node</a>.

### Over HTTP

Corda does not have its own webserver, so you will need to run your own webserver that uses the <a href="https://docs.corda.net/api/javadoc/net/corda/client/rpc/CordaRPCClient.html" rel="nofollow">CordaRPCClient</a> class to interact with your nodes.

#### Using Spring Boot webserver

Corda provides a template Spring Boot webserver implementation that you can use to interact with your nodes. See <a href="https://github.com/corda/samples/tree/release-V4/spring-webserver" rel="nofollow">Corda Spring webserver</a>.

To use the webserver, do the following:

1. Clone the Corda samples repository:

``` sh
git clone https://github.com/corda/samples.git
```

2. Edit the `spring-webserver/src/main/resources/application.properties` file:

```
server.port=SERVER_PORT
config.rpc.username=CORDA_RPC_USER
config.rpc.password=CORDA_RPC_PASSWORD
config.rpc.host=CORDA_RPC_HOSTNAME
config.rpc.port=CORDA_RPC_PORT
```

where

* SERVER_PORT — your Spring webserver port. Provide any open port that you will use to access the webserver.
* CORDA_RPC_USER — your Corda node RPC username.
* CORDA_RPC_PASSWORD — your Corda node RPC password.
* CORDA_RPC_HOSTNAME — your Corda node RPC hostname.
* CORDA_RPC_PORT — your Corda node RPC port.

See also [View node access and credentials](/platform/view-node-access-and-credentials).

3. Run the Spring webserver:

``` sh
./gradlew runPartyAServer
```

This will engage the `runPartyAServer` task specified in `build.gradle`, start the server, and connect the server to your node.

::: warning
The task progress for the webserver start printed in the output will never reach 100% completion. You can access the webserver at around 95%.
:::

You can access the server locally via `localhost:SERVER_PORT` or from a remote machine via `IP_ADDRESS:SERVER_PORT`.

The Corda Spring webserver implementation builds with the default RPC commands mapped to HTTP requests. See <a href="https://raw.githubusercontent.com/corda/samples/release-V4/spring-webserver/server-kotlin/src/main/kotlin/net/corda/server/controllers/StandardController.kt" rel="nofollow">StandardController.kt</a>.

Example:

``` sh
$ curl http://localhost:10055/identities
[OU=Organization-ND-123-456-789, O=Organization, L=Singapore, C=SG]
```

You can also write your own REST endpoints for your CorDapps. For the examples, see <a href="https://github.com/corda/samples/" rel="nofollow">Corda samples</a> or the [No ticket scalping CorDapp](/tutorials/corda/no-ticket-scalping-cordapp) tutorial.

## Development tools

See <a href="https://docs.corda.net/quickstart-index.html" rel="nofollow">Getting started developing CorDapps</a>.

::: warning Java 8
Corda requires at least Java 8u171 and does *not* support Java 9 or higher.
:::

::: tip See also

* [Installing a CorDapp](/operations/corda/installing-a-cordapp)
* [Node explorer](/operations/corda/node-explorer)
* [No ticket scalping CorDapp](/tutorials/corda/no-ticket-scalping-cordapp)

:::
