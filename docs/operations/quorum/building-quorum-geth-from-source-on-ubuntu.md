# Building Quorum Geth from Source on Ubuntu

To interact with your Quorum network, you must install a [Quorum Geth client](https://github.com/jpmorganchase/quorum/releases/).

Quorum Geth is a fork of [Geth](https://github.com/ethereum/go-ethereum/).

This section guides you through downloading the latest release of Quorum Geth and building it on Ubuntu.

## Install Go

To be able to build Quorum Geth, you must install [Go](https://golang.org/).

Install Go from the `longsleep/golang-backports` PPA:

``` sh
sudo add-apt-repository ppa:longsleep/golang-backports
sudo apt-get update
sudo apt-get install golang-go
```

## Build Quorum Geth

Download the latest [Quorum Geth release](https://github.com/jpmorganchase/quorum/releases/):

``` sh
wget https://github.com/jpmorganchase/quorum/archive/v2.2.4.tar.gz
```

Unpack the downloaded archive:

``` sh
tar -xvzf v2.2.4.tar.gz
```

Change to the Quorum Geth directory:

``` sh
cd quorum-2.2.4
```

Run `make` to build Quorum Geth:

``` sh
make geth
```

Copy the executable `geth` file to `/usr/local/bin` to make it easily accessible from the command-line:

``` sh
sudo cp /root/quorum-2.2.4/build/bin/geth /usr/local/bin
```

You can now connect to the Quorum nodes with the `geth attach` command. See [Interaction tools](/operations/quorum/tools#interaction-tools).

::: tip See also

* [Operations: Quorum](/operations/quorum/)

:::
