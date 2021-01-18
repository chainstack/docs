---
meta:
  - name: description
    content: Add and delete your organization's private cloud integrations
  - name: keywords
    content: private amazon aws cluster integration blockchain deploy kubernetes k8s
---

# Manage your organization's integration

You can add [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/) or a self-managed Kubernetes cluster as an integration to deploy your nodes and networks to it.

While Chainstack supports Amazon EKS out of the box, to add a self-managed Kubernetes cluster, please <a href="https://chainstack.com/contact/" target="_blank">contact us</a>.

For instructions on how to set up your Amazon EKS cluster for Chainstack integration, see <a href="https://support.chainstack.com/hc/en-us/articles/900004174426" target="_blank">Setting up an Amazon EKS cluster to integrate with Chainstack</a>.

## Add Amazon EKS as an integration

1. On Chainstack, click <a href="https://console.chainstack.com/integrations" target="_blank">Integrations</a>.
1. Provide any name.
1. Under **Type**, select **Amazon Elastic Kubernetes Service**.
1. Select the region where you have a deployed Amazon EKS service.
1. Provide the access key and secret of the user you have specifically created for the Chainstack integration.
1. Provide the Kubernetes namespace you have specifically created for the Chainstack integration.
1. Provide any domain name for the deployment. This domain name will be a part of your node's endpoint URL.
1. Click **Add connection**.

Once the integration is validated, you can use it to deploy your nodes and networks.

## Delete an integration

1. On Chainstack, click <a href="https://console.chainstack.com/integrations" target="_blank">Integrations</a>.
1. Select an integration.
1. Click **Edit** > **Delete**.

::: tip See also

* [Deploy a consortium network](/platform/deploy-a-consortium-network)
* [Join a public network](/platform/join-a-public-network)
* <a href="https://support.chainstack.com/hc/en-us/articles/900004174426" target="_blank">Setting up an Amazon EKS cluster to integrate with Chainstack.</a>

:::
