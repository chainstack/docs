# Manage your organization's identity

You can add and delete new identities in your organization's [vault](https://console.chainstack.com/vault).

Chainstack currently supports identity management for the following networks:

* [Corda Network](https://corda.network/)
* [Corda Pre-Production Network](https://corda.network/participation/preprod)

A Corda identity consists of the following Java KeyStore (JKS) files:

* `nodekeystore.jks` — a keystore with the node's identity key pairs and certificates; protected by **Keystore password**.
* `sslkeystore.jks` — a keystore with the node's TLS key pair and certificate; protected by **Keystore password**.
* `truststore.jks` — a keystore with the network operator's root certificate; protected by **Truststore password**.

## Add a new identity

1. Complete steps 1 and 2 of the [Corda Network Foundation guide](https://corda.network/participation/index/).
1. On Chainstack, navigate to [your vault](https://console.chainstack.com/vault). Click **Add identity**.
1. Under **Blockchain protocol**, select **Corda**.
1. Under **Network**, select **Corda Network** or **Corda Pre-Production Network**. Click **Next**.
1. Under **Identification**, provide the email and X.500 name that you used to sign up with the Corda Network Foundation.
1. Review the summary and click **Add identity**.

This will send the new certificate signing request to the Corda Network Foundation. Once the Corda Network Foundation approves your request, you will be able to deploy your nodes in Corda Network or Corda Pre-Production Network using this identity.

## Export an identity

You may want to export your existing identity from the vault to host a Corda node elsewhere as part of Corda Network or Corda Pre-Production Network.

To export an identity:

1. Navigate to [your vault](https://console.chainstack.com/vault) and select the identity to export.
1. Click **Export**.

This will download the identity keystore files.

## Delete an identity

1. Navigate to [your vault](https://console.chainstack.com/vault) and select the identity to delete.
1. Click **Edit** > **Delete**.

This will irrevocably delete the identity keystore files.

::: tip See also

* [Join a public network](/platform/join-a-public-network)
* [View your organization's vault](/platform/view-your-organization-vault)
* [Vault](/glossary/vault)

:::
