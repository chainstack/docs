module.exports = {
    title: 'Chainstack documentation',
    description: "Chainstack documentation",
    head: [
        ['link', { rel: 'icon', href: './favicon.ico' }]
      ],
    themeConfig: {
        nav: [
            { text: 'Support', link: 'https://support.chainstack.com/' },
            { text: 'Contact us', link: 'https://chainstack.com/contact/' },
            { text: 'Try free', link: 'https://chainstack.com/pricing/' }
        ],
        sidebar: [
            {
                title: 'Quickstart',
                collapsable: true,
                children: [
                    '/quickstart/introduction',
                    '/quickstart/create-an-account',
                    '/quickstart/create-a-project',
                    '/quickstart/deploy-a-network-or-a-node',
                    '/quickstart/invite-a-member-to-the-project',
                    '/quickstart/view-node-access-and-credentials',
                    '/quickstart/explore-the-network',
                ]
            },
            {
                title: 'Platform',
                collapsable: true,
                children: [
                    '/platform/introduction',
                    '/platform/supported-protocols',
                    '/platform/supported-cloud-hosting-providers',
                    '/platform/create-a-project',
                    '/platform/deploy-a-consortium-network',
                    '/platform/join-a-public-network',
                    '/platform/invite-a-member-to-the-project',
                    '/platform/add-a-network-to-a-project',
                    '/platform/add-a-node-to-a-network',
                    '/platform/view-node-access-and-credentials',
                    '/platform/explore-a-network',
                    '/platform/delete-a-node',
                    '/platform/delete-a-network',
                    '/platform/delete-a-project',
                    '/platform/view-your-user-settings',
                ]
            },
            {
                title: 'Operations',
                collapsable: true,
                children: [
                    '/operations/introduction',
                    {
                        title: 'Ethereum',
                        collapsable: true,
                        children: [
                            '/operations/ethereum/introduction',
                            '/operations/ethereum/networks',
                            '/operations/ethereum/tools',
                          ]
                     },
                     {
                        title: 'MultiChain',
                        collapsable: true,
                        children: [
                            '/operations/multichain/introduction',
                            '/operations/multichain/default-addresses',
                            '/operations/multichain/node-permissions',
                            '/operations/multichain/external-key-management',
                            '/operations/multichain/deploying-a-hybrid-network',
                            '/operations/multichain/tools',
                          ]
                     },
                     {
                        title: 'Quorum',
                        collapsable: true,
                        children: [
                           '/operations/quorum/introduction',
                           '/operations/quorum/configuring-consensus',
                           '/operations/quorum/default-addresses',
                           '/operations/quorum/key-management',
                           '/operations/quorum/tools',
                          ]
                     },
                ]
            },
            {
                title: 'Tutorials',
                collapsable: true,
                children: [
                    '/tutorials/introduction',
                    '/tutorials/academic-certificates-on-ethereum',
                    '/tutorials/asset-tokenization-on-ethereum',
                    '/tutorials/decentralized-reputation-on-multichain',
                    '/tutorials/food-supply-temperature-control-on-quorum',
                    '/tutorials/loyalty-program-on-quorum',
                    ]
             },
            {
                title: 'Blockchains',
                collapsable: true,
                children: [
                    '/blockchains/introduction',
                    '/blockchains/ethereum',
                    '/blockchains/multichain',
                    '/blockchains/quorum',
                    ]
            },
            {
                title: 'Glossary',
                collapsable: true,
                children: [
                    '/glossary/bft',
                    '/glossary/blockchain-protocol',
                    '/glossary/bolt',
                    '/glossary/cft',
                    '/glossary/cloud',
                    '/glossary/consortium-project',
                    '/glossary/consortium',
                    '/glossary/dedicated-node',
                    '/glossary/hybrid',
                    '/glossary/member',
                    '/glossary/network',
                    '/glossary/node',
                    '/glossary/on-premises',
                    '/glossary/project',
                    '/glossary/public-chain-project',
                    '/glossary/shared-node',
                    ]
            },

        '/release-notes',
        ],
        algolia: {
            apiKey: '1194997ecec7d141de5c746bc3463e9c',
            indexName: 'chainstack'
        },
        docsRepo: 'chainstack/docs',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: 'Edit on GitHub'
   
    },
    plugins: {
        '@vuepress/google-analytics': {
            'ga': 'UA-118674508-7'
        },
        'clean-urls': {
            normalSuffix: ''
        },
        'sitemap': {
            hostname: 'https://docs.chainstack.com'
        },
    }
}