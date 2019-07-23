module.exports = {
    title: 'Chainstack documentation',
    description: "Chainstack documentation",
    head: [
        ['link', { rel: 'icon', href: './favicon.ico' }]
      ],
    themeConfig: {
        nav: [
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
                    '/operations/deploying-a-hybrid-multichain-network',
                    '/operations/multichain-overview',
                    '/operations/quorum-overview',
                    '/operations/ethereum-overview',
                ]
            },
            {
                title: 'Key concepts',
                collapsable: true,
                children: [
                     '/key-concepts/project',
                     '/key-concepts/consortium-project',
                     '/key-concepts/public-chain-project',
                     '/key-concepts/public-network-node-types',
                     '/key-concepts/bolt',                   
                ]
            },
            {
                title: 'Developer materials',
                collapsable: true,
                children: [
                     '/developer-materials/introduction',
                     '/developer-materials/multichain',
                     '/developer-materials/quorum',
                     '/developer-materials/ethereum',
                     '/developer-materials/decentralized-reputation-on-multichain',
                     '/developer-materials/food-supply-temperature-control-on-quorum',
                     '/developer-materials/loyalty-program-on-quorum',
                     '/developer-materials/academic-certificates-on-ethereum',
                     '/developer-materials/asset-tokenization-on-ethereum',
            ]
            },
            {
                title: 'Blockchain essentials',
                collapsable: true,
                children: [
                    '/blockchain-essentials/introduction',
                    '/blockchain-essentials/ethereum',
                    '/blockchain-essentials/multichain',
                    '/blockchain-essentials/quorum',
                    '/blockchain-essentials/hyperledger-fabric',
                    ]
            },
        '/feedback',
        '/glossary',
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