module.exports = {
    title: 'Chainstack documentation',
    description: "Chainstack documentation",
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    themeConfig: {
        logo: '/img/docs-logo.svg',
        nav: [
            { text: 'Support', link: 'https://support.chainstack.com' },
            { text: 'Log in', link: (process.env.CONSOLE_HOSTNAME ? 'https://' + process.env.CONSOLE_HOSTNAME : 'http://localhost:3000') + '/user/login' },
            { text: 'Start for free', link: (process.env.WEBSITE_HOSTNAME ? 'https://' + process.env.WEBSITE_HOSTNAME : 'http://localhost') + '/pricing/' }
        ],
        sidebar: [
            {
                title: 'Quickstart',
                collapsable: true,
                children: [
                    '/quickstart/',
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
                    '/platform/',
                    '/platform/supported-protocols',
                    '/platform/supported-cloud-hosting-providers',
                    '/platform/create-a-project',
                    '/platform/deploy-a-consortium-network',
                    '/platform/join-a-public-network',
                    '/platform/invite-a-member-to-the-project',
                    '/platform/invite-a-user-to-the-organization',
                    '/platform/add-a-network-to-a-project',
                    '/platform/add-a-node-to-a-network',
                    '/platform/view-node-access-and-credentials',
                    '/platform/view-node-and-network-status',
                    '/platform/explore-a-network',
                    '/platform/delete-a-node',
                    '/platform/delete-a-network',
                    '/platform/delete-a-project',
                    '/platform/manage-your-organization-identity',
                    '/platform/view-your-organization-vault',
                    '/platform/view-activity-log',
                    '/platform/view-your-user-settings',
                ]
            },
            {
                title: 'Operations',
                collapsable: true,
                children: [
                    '/operations/',
                    {
                        title: 'Corda',
                        collapsable: true,
                        children: [
                            '/operations/corda/',
                            '/operations/corda/networks',
                            '/operations/corda/node-explorer',
                            '/operations/corda/installing-a-cordapp',
                            '/operations/corda/tools',
                        ]
                    },
                    {
                        title: 'Hyperledger Fabric',
                        collapsable: true,
                        children: [
                            '/operations/fabric/tools',
                        ]
                    },
                    {
                        title: 'Quorum',
                        collapsable: true,
                        children: [
                            '/operations/quorum/',
                            '/operations/quorum/configuring-consensus',
                            '/operations/quorum/default-addresses',
                            '/operations/quorum/key-management',
                            '/operations/quorum/tools',
                        ]
                    },
                    {
                        title: 'MultiChain',
                        collapsable: true,
                        children: [
                            '/operations/multichain/',
                            '/operations/multichain/default-addresses',
                            '/operations/multichain/node-permissions',
                            '/operations/multichain/external-key-management',
                            '/operations/multichain/cold-node-key-management',
                            '/operations/multichain/deploying-a-hybrid-network',
                            '/operations/multichain/tools',
                        ]
                    },
                    {
                        title: 'Ethereum',
                        collapsable: true,
                        children: [
                            '/operations/ethereum/',
                            '/operations/ethereum/networks',
                            '/operations/ethereum/types',
                            '/operations/ethereum/modes',
                            '/operations/ethereum/tools',
                        ]
                    },
                    {
                        title: 'Bitcoin',
                        collapsable: true,
                        children: [
                            '/operations/bitcoin/',
                            '/operations/bitcoin/networks',
                            '/operations/bitcoin/types',
                            '/operations/bitcoin/tools',
                        ]
                    },
                ]
            },
            {
                title: 'Tutorials',
                collapsable: true,
                children: [
                    '/tutorials/',
                    {
                        title: 'Corda',
                        collapsable: true,
                        children: [
                            '/tutorials/corda/',
                            '/tutorials/corda/no-ticket-scalping-cordapp',
                        ]
                    },
                    {
                        title: 'Hyperledger Fabric',
                        collapsable: true,
                        children: [
                            '/tutorials/fabric/',
                            '/tutorials/fabric/universal-basic-income-opt-in-chaincode',
                        ]
                    },
                    {
                        title: 'Quorum',
                        collapsable: true,
                        children: [
                            '/tutorials/quorum/',
                            '/tutorials/quorum/food-supply-temperature-control-with-web3',
                            '/tutorials/quorum/loyalty-program-with-truffle',
                        ]
                    },
                    {
                        title: 'MultiChain',
                        collapsable: true,
                        children: [
                            '/tutorials/multichain/',
                            '/tutorials/multichain/distributed-company-scrips',
                        ]
                    },
                    {
                        title: 'Ethereum',
                        collapsable: true,
                        children: [
                            '/tutorials/ethereum/',
                            '/tutorials/ethereum/academic-certificates-with-truffle',
                            '/tutorials/ethereum/asset-tokenization-with-embark',
                            '/tutorials/ethereum/trust-fund-account-with-remix',
                        ]
                    },
                ]
            },
            {
                title: 'Blockchains',
                collapsable: true,
                children: [
                    '/blockchains/',
                    '/blockchains/corda',
                    '/blockchains/fabric',
                    '/blockchains/quorum',
                    '/blockchains/multichain',
                    '/blockchains/ethereum',
                    '/blockchains/bitcoin',
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
                    '/glossary/vault',
                    ]
            },
        '/release-notes',
        ],
        sidebarDepth: 2,
        algolia: {
            apiKey: '1194997ecec7d141de5c746bc3463e9c',
            indexName: 'chainstack'
        },
        docsRepo: 'chainstack/docs',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: 'Edit on GitHub',
        nextLinks: false,
        prevLinks: false
    },
    plugins: {
        'clean-urls': {
            normalSuffix: ''
        },
        'google-tag-manager': {
            gtm: 'GTM-PXSGW6M'
        },
        'sitemap': {
            hostname: (process.env.DOCS_HOSTNAME ? 'https://' + process.env.DOCS_HOSTNAME : 'http://localhost:8080')
        },
        '@limdongjin/vuepress-plugin-simple-seo': {
            default_image: '/img/social-image.png',
            root_url: (process.env.DOCS_HOSTNAME ? 'https://' + process.env.DOCS_HOSTNAME : 'http://localhost:8080'),
            default_site_name: 'Chainstack documentation'
        },
        'check-md': {}
    }
}
