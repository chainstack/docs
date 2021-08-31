---
meta:
  - name: description
    content: Manage your organization identities consisting of key pairs and certificates securely with the Chainstack vault.
  - name: keywords
    content: key identity vault secure certificate corda hyperledger fabric
---

# Manage your organization identities

You can add and delete new identities in your organization [vault](https://console.chainstack.com/vault).

Chainstack currently supports identity management for the following networks:

* Hyperledger Fabric networks
* [Corda Network](https://corda.network/)
* [Corda Pre-Production Network](https://corda.network/participation/preprod)

## Manage your Hyperledger Fabric identity

A Hyperledger Fabric identity is a private key and a cerftificate. See Hyperledger Fabric documentation: [Identity](https://hyperledger-fabric.readthedocs.io/en/release-2.2/identity/identity.html).

A Hyperledger Fabric identity issuer is the entity issuing certificates. Chainstack supports [cryptogen](/glossary/cryptogen) or [Fabric CA](/glossary/fabric-ca) as an identity issuer.

Each organization on Chainstack must have an identity and an identity issuer to deploy a Hyperledger Fabric network or add a node to an existing network.

### Add a new identity

By default, your identity is issued automatically by [cryptogen](/glossary/cryptogen).

If you would like to use [Fabric CA](/glossary/fabric-ca) as identity issuer, <a href="https://chainstack.com/contact/" target="_blank">contact Chainstack</a>.

### View an identity

To view an identity:

1. Navigate to [your vault](https://console.chainstack.com/vault)
1. Click **Identities** and select the identity to view.

This will show the details of the identity.

### Add a new identity issuer

1. Navigate to [your vault](https://console.chainstack.com/vault)
1. Click **Issuers** > **Add**.
1. Select **Hyperledger Fabric**.
1. Select [cryptogen](/glossary/cryptogen).
1. Click **Add issuer**.

This will add an identity issuer and create an admin identity.

### View an identity issuer

To view an identity issuer:

1. Navigate to [your vault](https://console.chainstack.com/vault)
1. Click **Issuers** and select the identity issuer to view.

This will show the details of the identity issuer.

### Export an identity

To export an identity:

1. Navigate to [your vault](https://console.chainstack.com/vault)
1. Click **Identities** and select the identity to export.
1. Click **Export**.

This will download the identity private key and certficate files.

### Export an identity issuer

To export an identity issuer:

1. Navigate to [your vault](https://console.chainstack.com/vault)
1. Click **Issuers** and select the identity issuer to export.
1. Click **Export**.

This will download the identity issuer private key and certficate files.

### Delete an identity

You can only delete an identity by deleting its issuer.

### Delete an identity issuer

You can only delete an identity issuer after deleting the associated network.

1. Navigate to [your vault](https://console.chainstack.com/vault) and select the identity issuer to delete.
1. Click trash icon next to the identity issuer.

This will irrevocably delete the both the identity and the identity issuer private keys and certificate files.

## Manage your Corda identity

A Corda identity consists of the following Java KeyStore (JKS) files:

* `nodekeystore.jks` — a keystore with the node's identity key pairs and certificates; protected by **Keystore password**.
* `sslkeystore.jks` — a keystore with the node's TLS key pair and certificate; protected by **Keystore password**.
* `truststore.jks` — a keystore with the network operator's root certificate; protected by **Truststore password**.

### Add a new identity

1. Complete steps 1 and 2 of the [Corda Onboarding Workflow guide](https://corda.network/joining-corda-network/onboarding-workflow).
1. On Chainstack, navigate to  <a href="https://console.chainstack.com/vault" target="_blank">your vault</a>. Click **Add identity**.
1. Under **Blockchain protocol**, select **Corda**.
1. Under **Issuing network**, select **Corda Network** or **Corda Pre-Production Network**. Click **Next**.
1. Under **Identification**, provide the email and X.500 name that you used to sign up with the Corda Network Foundation.
1. Review the summary and click **Add identity**.

This will send the new certificate signing request to the Corda Network Foundation. Once the Corda Network Foundation approves your request, you will be able to deploy your nodes in Corda Network or Corda Pre-Production Network using this identity.

### View an identity

To view an identity:

1. Navigate to [your vault](https://console.chainstack.com/vault)
1. Click **Identities** and select the identity to view.

This will show the details of the identity.

### Export an identity

You may want to export your existing identity from the vault to host a Corda node elsewhere as part of Corda Network or Corda Pre-Production Network.

To export an identity:

1. Navigate to <a href="https://console.chainstack.com/vault" target="_blank">your vault</a> and select the identity to export.
1. Click **Export**.

This will download the identity keystore files.

### Delete an identity

1. Navigate to <a href="https://console.chainstack.com/vault" target="_blank">your vault</a> and select the identity to delete.
1. Click **Edit** > **Delete**.

This will irrevocably delete the identity keystore files.

::: tip See also

* [Join a public network](/platform/join-a-public-network)
* [View your organization vault](/platform/view-your-organization-vault)
* [Vault](/glossary/vault)

:::
