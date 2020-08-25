---
meta:
  - name: description
    content: A tutorial on working with the Chainstack managed blockchain services through API.
  - name: keywords
    content: create api consortium blockchain node network
---

# Quick tutorial

This tutorial will walk you through creating a consortium network through the Chainstack API.

For detailed description of all the available API endpoints, see <a :href="$themeConfig.apiDocsURL" target="_blank">API reference</a>.

## Overview

To get from zero to a running consortium network through the Chainstack API, do the following:

1. Get your API key.
1. Export your API variables.
1. Create a project.
1. Create a network.
1. Add a node to the network.
1. Get the node access and credentials.

## Step-by-step

### Get your API key

See [Create an API key](/platform/create-an-api-key).

### Export your API variables

To save the time when interacting with the API, export your API variables:

``` sh
export APIURL="https://api.chainstack.com/v1"
export APIKEY="YOUR_API_KEY"
export HDR_AUTH="Authorization: Bearer $APIKEY"
export HDR_CT="Content-Type: application/json"
```

where

* YOUR_API_KEY — your key to access the Chainstack API.

### Create a project

``` sh
curl -X POST "$APIURL/projects/" --header "$HDR_AUTH" --header "$HDR_CT" --data '{"name":"YOUR_NAME","description":"YOUR_DESCRIPTION"}'
```

where

* YOUR_NAME — any name you want to give to your project.
* YOUR_DESCRIPTION — any description you want to give to your project.

See also API reference: <a :href="$themeConfig.apiDocsURL + '#operation/createProject'" target="_blank">Create Project</a>.

### Create a network

``` sh
curl -X POST "$APIURL/networks/" --header "$HDR_AUTH" --header "$HDR_CT" --data '{"name":"NETWORK_NAME","project":"PROJECT_ID","protocol":"PROTOCOL","configuration":{"consensus":"CONSENSUS"},"nodes":[{"name":"NODE_NAME","type":"NODE_TYPE","role":"peer","provider":"CLOUD_PROVIDER","region":"LOCATION","configuration":{}}]}'
```

where

* NETWORK_NAME — any name you want to give to your network.
* PROJECT_ID — the ID of the project where the network will be deployed. You can get project IDs by running `curl -X GET "$APIURL/projects/" --header "$HDR_AUTH"`.
* PROTOCOL — the protocol of the network you want to deploy:
	* `corda` — [Corda](/blockchains/corda).
	* `fabric` — [Hyperledger Fabric](/blockchains/fabric).
	* `quorum` — [Quorum](/blockchains/quorum).
	* `multichain` — [MultiChain](/blockchains/multichain).
* CONSENSUS — the consensus of the protocol you want to deploy:
	* [Corda Single Notary](/blockchains/corda#consensus) — `single-notary`.
	* [Hyperledger Fabric Raft](/blockchains/fabric#consensus) — `raft`.
	* [Quorum Raft](/blockchains/quorum#raft) — `raft`.
	* [Quorum IBFT](/blockchains/quorum#ibft) — `ibft`.
	* [MultiChain round-robin](/blockchains/multichain#consensus) — `round-robin`.
* NODE_NAME — any name you want to give to your first peer node deployed as part of the network.
* NODE_TYPE — `dedicated` is the only available option for consortium networks.
* PROVIDER — choose the cloud provider for your node:
	* `aws` — Amazon Web Services.
	* `gcloud` — Google Cloud Platform.
	* `azure` — Microsoft Azure.
* LOCATION — choose the location for your node:
	* `apac` — Asia-Pacific. Available only for Amazon Web Services and Google Cloud Platform.
	* `us` — the United States. Available only for Amazon Web Services.
	* `eu` — Europe. Available only for Microsoft Azure.

Example to create a Corda network on Google Cloud Platform in Asia-Pacific:

``` sh
curl -X POST "$APIURL/networks/" --header "$HDR_AUTH" --header "$HDR_CT" --data '{"name":"NETWORK_NAME","project":"PR-123-456","protocol":"corda","configuration":{"consensus":"single-notary"},"nodes":[{"name":"My node name","type":"dedicated","role":"peer","provider":"gcloud","region":"apac","configuration":{}}]}'
```

See also API reference: <a :href="$themeConfig.apiDocsURL + '#operation/createNetwork'" target="_blank">Create Network</a>.

### Add a peer node to the network

``` sh
curl -X POST "$APIURL/nodes/" --header "$HDR_AUTH" --header "$HDR_CT" --data '{"name":"NODE_NAME","network":"NETWORK_ID","type": "dedicated","role":"peer","provider":"PROVIDER","region":"LOCATION","configuration":{}}'
```

where

* NODE_NAME — any name you want to give to your node.
* NETWORK_ID — the ID of the network where the node will be deployed. You can get network IDs by running `curl -X GET "$APIURL/networks/" --header "$HDR_AUTH"`.
* PROVIDER — choose the cloud provider for your node:
	* `aws` — Amazon Web Services.
	* `gcloud` — Google Cloud Platform.
	* `azure` — Microsoft Azure.
* LOCATION — choose the location for your node:
	* `apac` — Asia-Pacific. Available only for Amazon Web Services and Google Cloud Platform.
	* `us` — the United States. Available only for Amazon Web Services.
	* `eu` — Europe. Available only for Microsoft Azure.

Example to add a node on Microsoft Azure in Europe:

``` sh
curl -X POST "$APIURL/nodes/" --header "$HDR_AUTH" --header "$HDR_CT" --data '{"name":"My node name","network":"NW-123-456-7","type": "dedicated","role":"peer","provider":"azure","region":"eu","configuration":{}}'
```

See also API reference: <a :href="$themeConfig.apiDocsURL + '#operation/createNode'" target="_blank">Create Node</a>.

### Get the node access and credentials

``` sh
curl -X GET "$APIURL/nodes/NODE_ID/" --header "$HDR_AUTH"
```

where

* NODE_ID — the ID of the node. You can get node IDs by running `curl -X GET "$APIURL/nodes/" --header "$HDR_AUTH"`.

See also API reference: <a :href="$themeConfig.apiDocsURL + '#operation/retrieveNode'" target="_blank">Retrieve Node</a>.

You have created a [consortium project](/glossary/consortium-project), deployed a consortium network, added a node to the network, and retrived the node's access and credentials.

::: tip See also

* <a :href="$themeConfig.apiDocsURL" target="_blank">API reference</a>
* [Delete an API key](/platform/delete-an-api-key)

:::
