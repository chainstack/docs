---
meta:
  - name: description
    content: Add and delete your organization's private cloud integrations
  - name: keywords
    content: private amazon aws cluster integration blockchain deploy kubernetes k8s
---

# Manage your organization integrations

You can add the following Kubernetes clusters as an integration to deploy your nodes and networks to:

* [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/)
* [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/en-us/services/kubernetes-service/)
* [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine)
* Self-managed Kubernetes cluster.

While Chainstack supports Amazon EKS out of the box, to add other Kubernetes clusters, please <a href="https://chainstack.com/contact/" target="_blank">contact us</a>.

The integrations feature is available on the Business and Enterprise <a href="https://chainstack.com/pricing/" target="_blank">subscription plans</a>.

For instructions on how to create an IAM user with programmatic access, node group size requirements, and how to set up your Amazon EKS cluster for Chainstack integration, see <a href="https://support.chainstack.com/hc/en-us/articles/900004174426" target="_blank">Setting up an Amazon EKS cluster to integrate with Chainstack</a>.

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

This will delete Chainstack-added Pods from the cluster. This will not delete the cert-manager.

::: tip See also

* [Deploy a consortium network](/platform/deploy-a-consortium-network)
* [Join a public network](/platform/join-a-public-network)
* <a href="https://support.chainstack.com/hc/en-us/articles/900004174426" target="_blank">Setting up an Amazon EKS cluster to integrate with Chainstack</a>
* [Stop or start a node](/platform/stop-or-start-a-node)

:::
