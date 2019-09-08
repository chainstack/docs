# Tools

## Interaction tools

### Chainstack standalone shell

Interact with your Corda node using [Chainstack standalone shell](https://github.com/chainstack/corda-shell-docker).

#### Prerequisites

* Download and install Docker. See [Get Started with Docker](https://www.docker.com/get-started).
* A Corda node deployed with Chainstack.

#### Running the standalone shell

``` sh
docker run -it chainstack/corda-shell --host=CORDA_RPC_HOSTNAME --port=CORDA_RPC_PORT --user=CORDA_RPC_USER --password=CORDA_RPC_PASSWORD
```

where

* CORDA_RPC_HOSTNAME — your Corda node RPC hostname.
* CORDA_RPC_PORT — your Corda node RPC port.
* CORDA_RPC_USER — your Corda node RPC username.
* CORDA_RPC_PASSWORD — your Corda node RPC password.

See also [View node access and credentials](/platform/view-node-access-and-credentials).

Example:

``` sh
$ docker run -it chainstack/corda-shell --host=corda-1234.rg-123-456.int.chainstack.com --port=12345 --user=username --password=password

   ______               __
  / ____/     _________/ /___ _
 / /     __  / ___/ __  / __ `/
/ /___  /_/ / /  / /_/ / /_/ /
\____/     /_/   \__,_/\__,_/
--- Corda Open Source 4.1 (c11f6c1) ---

Standalone Shell connected to corda-1234.rg-123-456.int.chainstack.com:12345
```

Once connected, run `help` to see the list of available commands.

### Using a client with the CordaRPCClient class

For your application purposes, you need to write your own client in a JVM-compatible language using the [CordaRPCClient](https://docs.corda.net/api/javadoc/net/corda/client/rpc/CordaRPCClient.html) class. The `CordaRPCClient` class connects to your Corda node and exposes an RPC interaction interface.

For detailed instructions, see [Corda documentation: Interacting with a node](https://docs.corda.net/clientrpc.html).

### Over HTTP

Corda does not have its own webserver, so you will need to run your own webserver that uses the [CordaRPCClient](https://docs.corda.net/api/javadoc/net/corda/client/rpc/CordaRPCClient.html) class to interact with your nodes.

#### Using Spring Boot webserver

Corda provides a template Spring Boot webserver implementation that you can use to interact with your nodes. See [Corda Spring webserver](https://github.com/corda/samples/tree/release-V4/spring-webserver).

To use the webserver, do the following:

1. Clone the Corda samples repository:

``` sh
git clone https://github.com/corda/samples.git
```

1. Edit the `spring-webserver/src/main/resources/application.properties` file:

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

2. Run the Spring webserver:

``` sh
./gradlew runPartyAServer
```

This will engage the `runPartyAServer` task specified in `build.gradle` and start the server connected to your node.

::: warning
The task progress for the webserver start printed in the output will never reach 100% completion. You can access the webserver at around 85%.
:::

You can access the server locally via `localhost:SERVER_PORT` or from a remote machine via `IP_ADDRESS:SERVER_PORT`.

The Corda Spring webserver implementation builds with the default RPC commands mapped to HTTP requests. See [StandardController.kt](https://raw.githubusercontent.com/corda/samples/release-V4/spring-webserver/src/main/kotlin/net/corda/server/controllers/StandardController.kt).

Example:

``` sh
$ curl http://localhost:10055/identities
[O=Chainstack987, L=Singapore, C=SG]
```

You can also write your own REST endpoints for your CorDapps. For the examples, see [Corda samples](https://github.com/corda/samples/) or TTK CORDAPP TUTORIAL.

## Development tools

See [Getting started developing CorDapps](https://docs.corda.net/quickstart-index.html).

::: warning Java 8
Corda requires at least Java 8u171 and does *not* support Java 9 or higher.
:::
