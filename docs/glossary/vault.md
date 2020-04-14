# Vault

[Vault](https://console.chainstack.com/vault) is a secure storage for your organization's identities.

All identity key material in the vault is split into data chunks. Each chunk is AES-256 encrypted with a unique key.

The unique keys protecting the chunks are also AES-256 encrypted with key encryption keys.

The key encryption keys are stored in a key management service—a service built specifically for storing keys. No keys can be exported from the key management service—all encryption and decryption is done in the service.

Each key stored in the key management service is managed by access control lists—only authorized users can use the keys on per operation per user basis.

::: tip See also

* [Manage your organization's identity](/platform/manage-your-organization-identity)

:::
