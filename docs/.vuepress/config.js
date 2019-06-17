module.exports = {
    title: 'Chainstack Docs',
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
                title: 'Quick Start',
                collapsable: true,
                children: [
                    '/quick-start/qs-intro',
                    '/quick-start/qs-create-account',
                    '/quick-start/qs-create-project',
                    '/quick-start/qs-deploy-network',
                    '/quick-start/qs-explore-network',
                    '/quick-start/qs-invite-member',
                    '/quick-start/qs-access-node',
                ]
            },
            {
                title: 'Deploy a Node or a Network',
                collapsable: true,
                children: [
                    '/deploy-network/deploy-intro',
                    '/deploy-network/deploy-network',
                    '/deploy-network/deploy-node',
                    '/deploy-network/add-network',
                    '/deploy-network/add-node',
                    '/deploy-network/invite-member',
                    '/deploy-network/view-access',
                ]
            },
            {
                title: 'Access Your Node',
                collapsable: true,
                children: [
                    '/access-network/access-intro',
                    '/access-network/access-multichain',
                    '/access-network/access-quorum',
                    '/access-network/access-ethereum',
                ]
            },
            {
                title: 'Develop',
                collapsable: true,
                children: [
                    '/develop/develop-intro',
                    '/develop/install-configure',
                {
                    title: 'MultiChain',
                    collapsable: true,
                    children: [
                        '/develop/multichain/multichain-javascript',
                        '/develop/multichain/multichain-python',
                    ]
                },
                {
                    title: 'Quorum',
                    collapsable: true,
                    children: [
                       '/develop/quorum/quorum-truffle',
                    ]
                },
                {
                    title: 'Ethereum',
                    collapsable: true,
                    children: [
                        '/develop/ethereum/ethereum-truffle',
                        '/develop/ethereum/ethereum-embark',
                    ]
                },
                {
                    title: 'Sample DApps',
                    collapsable: true,
                    children: [
                        '/develop/sample-dapp/ethereum-certificate',
                    ]
                },
            ]
            },
            {
                title: 'Blockchain Essentials',
                collapsable: true,
                children: [
                    '/blockchain-essentials/blockchain-intro',
                {                
                title: 'Networks',
                collapsable: true,
                children: [
                    '/blockchain-essentials/network/multichain',
                    '/blockchain-essentials/network/quorum',
                    '/blockchain-essentials/network/hyperledger',
                    '/blockchain-essentials/network/ethereum',
                    '/blockchain-essentials/network/corda',
                ]
                },
            {
                title: 'Consensus',
                collapsable: true,
                children: [

                    '/blockchain-essentials/consensus/round-robin',
                    '/blockchain-essentials/consensus/raft',
                    '/blockchain-essentials/consensus/ibft',
                    '/blockchain-essentials/consensus/solo',
                    '/blockchain-essentials/consensus/kafka',
                    '/blockchain-essentials/consensus/proof-of-authority',
                    ]
                },
                    
                ]
            },
            {
                title: 'Architecture Reference',
                collapsable: true,
                children: [
                    '/architecture-reference/architecture-intro',
                    '/architecture-reference/architecture-reference',
                ]
            },
              {
                title: 'Feedback',
                collapsable: true,
                children: [
                    '/feedback/feedback',
                ]
            },
                          {
                title: 'Glossary',
                collapsable: true,
                children: [
                    '/glossary/glossary',
                ]
            }
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