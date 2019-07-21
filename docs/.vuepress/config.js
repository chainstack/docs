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
                    '/quickstart/create-account',
                    '/quickstart/create-project',
                    '/quickstart/deploy-network',
                    '/quickstart/invite-member',
                    '/quickstart/view-node-access',
                    '/quickstart/explore-network',
                ]
            },
            {
                title: 'Control panel',
                collapsable: true,
                children: [
                    '/control-panel/introduction',
                    '/control-panel/supported-protocols',
                    '/control-panel/supported-cloud-hosting',
                    '/control-panel/create-project',
                    '/control-panel/deploy-consortium-network',
                    '/control-panel/join-public-chain',
                    '/control-panel/invite-member',
                    '/control-panel/add-network',
                    '/control-panel/add-node',
                    '/control-panel/view-node-access',
                    '/control-panel/explore-network',
                    '/control-panel/delete-node',
                    '/control-panel/delete-network',
                    '/control-panel/delete-project',
                    '/control-panel/view-user-settings',
                ]
            },
            {
                title: 'Key concepts',
                collapsable: true,
                children: [
                    {
                        title: 'Projects',
                        collapsable: true,
                        children: [
                         '/key-concepts/project',
                         '/key-concepts/consortium-project',
                         '/key-concepts/public-chain-project',
                         ]
                     },
                     '/key-concepts/public-node-types',
                     '/key-concepts/bolt',
                     '/key-concepts/multichain-considerations',
                     '/key-concepts/quorum-considerations',
                     '/key-concepts/ethereum-considerations',                    
                ]
            },
            {
                title: 'Developer materials',
                collapsable: true,
                children: [
                {
                    title: 'Interaction methods',
                    collapsable: true,
                    children: [
                        '/developer-materials/interaction-methods/ethereum-geth',
                        '/developer-materials/interaction-methods/multichain-json-rpc',
                        '/developer-materials/interaction-methods/quorum-geth',
                        '/developer-materials/interaction-methods/quorum-json-rpc',

                    ]
                },
                {
                    title: 'Development tools',
                    collapsable: true,
                    children: [
                        '/developer-materials/development-tools/ethereum-truffle',
                        '/developer-materials/development-tools/ethereum-embark',
                        '/developer-materials/development-tools/multichain-javascript',
                        '/developer-materials/development-tools/multichain-python',
                        '/developer-materials/development-tools/quorum-truffle',

                    ]
                },
                {
                    title: 'Tutorials',
                    collapsable: true,
                    children: [
                        '/developer-materials/tutorials/academic-certificates-on-ethereum',
                        '/developer-materials/tutorials/asset-tokenization-on-ethereum',
                        '/developer-materials/tutorials/food-supply-temperature-control-on-quorum',
                        '/developer-materials/tutorials/loyalty-program-on-quorum',
                    ]
                },
            ]
            },
            {
                title: 'Blockchain essentials',
                collapsable: true,
                children: [
                    '/blockchain-essentials/introduction',
                {                
                title: 'Protocols',
                collapsable: true,
                children: [
                    '/blockchain-essentials/protocols/ethereum',
                    '/blockchain-essentials/protocols/multichain',
                    '/blockchain-essentials/protocols/quorum',
                ]
                },
            {
                title: 'Consensus algorithms',
                collapsable: true,
                children: [
                    '/blockchain-essentials/consensus-algorithms/round-robin',
                    '/blockchain-essentials/consensus-algorithms/raft',
                    '/blockchain-essentials/consensus-algorithms/ibft',
                    ]
                },        
                ]
            }, 
            {
                title: 'Operations',
                collapsable: true,
                children: [
                    '/operations/multichain-hybrid',
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