module.exports = {
    title: 'Chainstack documentation',
    description: "Chainstack documentation",
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    markdown: {
        externalLinks: { target: '_blank', rel: 'nofollow noopener' }
    },
    themeConfig: {
        logo: '/img/docs-logo.svg',
        apiDocsURL: `https://${process.env.DOCS_HOSTNAME}/api/reference/`,
        nav: [
            { text: 'Support', link: 'https://support.chainstack.com' },
            { text: 'Log in', link: 'https://console.chainstack.com/user/login' },
            { text: 'Start for free', link: 'https://chainstack.com/pricing/' }
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
                    '/platform/supported-hosting-options',
                    '/platform/create-a-project',
                    '/platform/join-a-public-network',
                    '/platform/deploy-a-consortium-network',
                    '/platform/invite-a-member-to-the-project',
                    '/platform/invite-a-user-to-the-organization',
                    '/platform/add-a-network-to-a-project',
                    '/platform/add-a-node-to-a-network',
                    '/platform/view-node-access-and-credentials',
                    '/platform/view-service-nodes',
                    '/platform/view-node-and-network-status',
                    '/platform/view-node-resources-allocation',
                    '/platform/view-node-logs',
                    '/platform/explore-a-network',
                    '/platform/stop-or-start-a-node',
                    '/platform/delete-a-node',
                    '/platform/delete-a-network',
                    '/platform/delete-a-project',
                    '/platform/manage-your-organization-identities',
                    '/platform/manage-your-organization-integrations',
                    '/platform/view-your-organization-vault',
                    '/platform/view-activity-log',
                    '/platform/view-your-user-settings',
                    '/platform/enable-two-factor-authentication',
                    '/platform/disable-two-factor-authentication',
                    '/platform/recover-your-account-protected-with-two-factor-authentication',
                    '/platform/create-an-api-key',
                    '/platform/delete-an-api-key',
                ]
            },
            {
                title: 'Operations',
                collapsable: true,
                children: [
                    '/operations/',
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
                        title: 'Polygon PoS',
                        collapsable: true,
                        children: [
                            '/operations/polygon/',
                            '/operations/polygon/networks',
                            '/operations/polygon/types',
                            '/operations/polygon/modes',
                            '/operations/polygon/tools',
                        ]
                    },
                    {
                        title: 'Binance Smart Chain',
                        collapsable: true,
                        children: [
                            '/operations/bsc/',
                            '/operations/bsc/networks',
                            '/operations/bsc/types',
                            '/operations/bsc/modes',
                            '/operations/bsc/tools',
                        ]
                    },
                    {
                        title: 'Tezos',
                        collapsable: true,
                        children: [
                            '/operations/tezos/',
                            '/operations/tezos/networks',
                            '/operations/tezos/types',
                            '/operations/tezos/modes',
                            '/operations/tezos/tools',
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
                    {
                        title: 'Hyperledger Fabric',
                        collapsable: true,
                        children: [
                            '/operations/fabric/',
                            '/operations/fabric/service-nodes',
                            '/operations/fabric/tools',
                        ]
                    },
                    {
                        title: 'Corda',
                        collapsable: true,
                        children: [
                            '/operations/corda/',
                            '/operations/corda/networks',
                            '/operations/corda/service-nodes',
                            '/operations/corda/node-explorer',
                            '/operations/corda/installing-a-cordapp',
                            '/operations/corda/tools',
                        ]
                    },
                    {
                        title: 'Quorum',
                        collapsable: true,
                        children: [
                            '/operations/quorum/',
                            '/operations/quorum/configuring-consensus',
                            '/operations/quorum/default-addresses',
                            '/operations/quorum/default-network-id',
                            '/operations/quorum/key-management',
                            '/operations/quorum/service-nodes',
                            '/operations/quorum/tools',
                        ]
                    },
                    {
                        title: 'MultiChain',
                        collapsable: true,
                        children: [
                            '/operations/multichain/',
                            '/operations/multichain/default-addresses',
                            '/operations/multichain/default-chain-name',
                            '/operations/multichain/node-permissions',
                            '/operations/multichain/external-key-management',
                            '/operations/multichain/cold-node-key-management',
                            '/operations/multichain/deploying-a-hybrid-network',
                            '/operations/multichain/service-nodes',
                            '/operations/multichain/tools',
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
                        title: 'Ethereum',
                        collapsable: true,
                        children: [
                            '/tutorials/ethereum/',
                            '/tutorials/ethereum/academic-certificates-with-truffle',
                            '/tutorials/ethereum/asset-tokenization-with-embark',
                            '/tutorials/ethereum/trust-fund-account-with-remix',
                        ]
                    },
                    {
                        title: 'Polygon PoS',
                        collapsable: true,
                        children: [
                            '/tutorials/polygon/',
                            '/tutorials/polygon/bridging-erc20-from-ethereum-to-polygon',
                        ]
                    },
                    {
                        title: 'Binance Smart Chain',
                        collapsable: true,
                        children: [
                            '/tutorials/bsc/',
                            '/tutorials/bsc/bep-1155-contract-with-truffle-and-openzeppelin',
                        ]
                    },
                    {
                        title: 'Tezos',
                        collapsable: true,
                        children: [
                            '/tutorials/tezos/',
                            '/tutorials/tezos/simple-fund-contract-in-ligo',
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
                        title: 'Corda',
                        collapsable: true,
                        children: [
                            '/tutorials/corda/',
                            '/tutorials/corda/no-ticket-scalping-cordapp',
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
                ]
            },
            {
                title: 'API',
                collapsable: true,
                children: [
                    '/api/',
                    '/api/quick-tutorial',
                    [`https://${process.env.DOCS_HOSTNAME}/api/reference/`, 'API reference'],
                ]
            },
            {
                title: 'Blockchains',
                collapsable: true,
                children: [
                    '/blockchains/',
                    '/blockchains/ethereum',
                    '/blockchains/polygon',
                    '/blockchains/bsc',
                    '/blockchains/tezos',
                    '/blockchains/bitcoin',
                    '/blockchains/fabric',
                    '/blockchains/corda',
                    '/blockchains/quorum',
                    '/blockchains/multichain',
                ]
            },
            {
                title: 'Glossary',
                collapsable: true,
                children: [
                    '/glossary/application',
                    '/glossary/bft',
                    '/glossary/blockchain-protocol',
                    '/glossary/bolt',
                    '/glossary/cft',
                    '/glossary/cloud',
                    '/glossary/consortium-project',
                    '/glossary/consortium',
                    '/glossary/cross-cloud',
                    '/glossary/cross-region',
                    '/glossary/cryptogen',
                    '/glossary/dedicated-node',
                    '/glossary/fabric-ca',
                    '/glossary/hybrid',
                    '/glossary/identity',
                    '/glossary/identity-issuer',
                    '/glossary/member',
                    '/glossary/network',
                    '/glossary/node',
                    '/glossary/on-premises',
                    '/glossary/organization',
                    '/glossary/peer-node',
                    '/glossary/project',
                    '/glossary/public-chain-project',
                    '/glossary/service-node',
                    '/glossary/shared-node',
                    '/glossary/user',
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
            hostname: `https://${process.env.DOCS_HOSTNAME}`,
        },
        '@limdongjin/vuepress-plugin-simple-seo': {
            default_image: '/img/social-image.png',
            root_url: `https://${process.env.DOCS_HOSTNAME}`,
            default_site_name: 'Chainstack documentation'
        },
        'check-md': {},
        '@dovyp/vuepress-plugin-clipboard-copy': true,
        'code-switcher': true
    }
}
