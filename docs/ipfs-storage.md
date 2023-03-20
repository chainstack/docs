---
meta:
  - name: description
    content: Introduction to IPFS and instructions on interacting with your data on the Chainstack platform.
  - name: keywords
    content: subgraph graph query graphql indexing data
---

# IPFS Storage

::: tip Information

This is a closed beta. If you want to participate, contact *support@chainstack.com*.

:::

## Introduction

The decentralized storage solution implemented on the Chainstack platform is a combination of [IPFS](https://ipfs.tech/) and [Storj](https://www.storj.io/).

IPFS is a peer-to-peer file-sharing protocol that is [content-addressed](https://docs.ipfs.tech/concepts/content-addressing/)—each file is uniquely identified based on its cryptographic hash.

Storj is a decentralized cloud object storage network.

While IPFS is focused on the efficient distribution of content through content-addressing, Storj provides out-of-the-box redundant storage of files across the global network. The two technologies compliment each other—by using IPFS to distribute content and Storj for reliable storage, developers benefit from the strengths of both systems, resulting in a robust, decentralized file storage solution.

Each file uploaded to the IPFS Storage implementation is automatically [pinned](https://docs.ipfs.tech/concepts/glossary/#pinning) so that the file is available until you delete it.

## Set up a bucket

A bucket is a logical container for organizing and storing your files.

A bucket can contain any number of files. You can also create folders within buckets to further organize your data.

To create a bucket:

1. On the left pane, click **IPFS Storage**.
1. Click **Create bucket**.
1. Provide a name. Click **Create**.

This will create a bucket.

## Create a folder

Within a bucket, you can optionally create a folder to organize your data.

To create a folder:

1. Click **Create folder**.
1. Provide a name. Click **Create**.

This will create a folder.

## Upload a file

You can upload a file or a folder from your local machine or retrieve it directly off the IPFS network.

To upload from your machine:

1. In your bucket, click **Upload**.
1. Select **Files** or **Folder** and upload the object.

This will upload your object through the Chainstack-hosted IPFS nodes to the Storj network. The file will be automatically pinned.

To upload from the IPFS network:

1. In your bucket, click **Upload**.
1. Select **CID**.
1. Provide the [content identifier](https://docs.ipfs.tech/concepts/glossary/#cid) of a file that is available on the IPFS network.

This will retrieve the file by its CID off the IPFS network and upload it to the Storj network. The file will be automatically pinned.

## Retrieve your files

You can retrieve your files through a non-chargeable free public gateway provided by Chainstack or by using the IPFS tooling and your file's CID.

Retrieve through the public gateway:

1. On the Chainstack platform, navigate to your file.
1. In the **Public gateway** field, click **Copy** or **Open** to get the link to your file.

This is a free public link to your file that you can use.

Retrieve using the file's CID:

1. On the Chainstack platform, navigate to your file.
1. In the **CID** field, click **Copy**.

This will copy the file's CID that you can use to retrieve the file using [IPFS tools](https://awesome.ipfs.tech/tools/).

::: tip See also

* <a href="https://docs.dev.chainstack.com/api/reference/IPFS-Storage" target="_blank">Chainstack IPFS API</a> to programmatically upload and retrieve your files.

:::
