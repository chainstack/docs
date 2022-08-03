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
                    '/platform/change-a-user-role-in-the-organization',
                    '/platform/add-a-network-to-a-project',
                    '/platform/add-a-node-to-a-network',
                    '/platform/view-node-access-and-credentials',
                    '/platform/view-node-requests-metrics',
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
                    '/platform/top-up-your-balance-with-crypto',
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
                            '/operations/ethereum/warp-transactions',
                            '/operations/ethereum/mev-api',
                            '/operations/ethereum/debug-and-trace-apis',
                            '/operations/ethereum/clients',
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
                            '/operations/polygon/warp-transactions',
                            '/operations/polygon/debug-and-trace-apis',
                            '/operations/polygon/tools',
                        ]
                    },
                    {
                        title: 'BNB Smart Chain',
                        collapsable: true,
                        children: [
                            '/operations/bsc/',
                            '/operations/bsc/networks',
                            '/operations/bsc/types',
                            '/operations/bsc/modes',
                            '/operations/bsc/warp-transactions',
                            '/operations/bsc/debug-and-trace-apis',
                            '/operations/bsc/clients',
                            '/operations/bsc/tools',
                        ]
                    },
                    {
                        title: 'Avalanche',
                        collapsable: true,
                        children: [
                            '/operations/avalanche/',
                            '/operations/avalanche/networks',
                            '/operations/avalanche/types',
                            '/operations/avalanche/modes',
                            '/operations/avalanche/debug-and-trace-apis',
                            '/operations/avalanche/tools',
                        ]
                    },
                    {
                        title: 'NEAR',
                        collapsable: true,
                        children: [
                            '/operations/near/',
                            '/operations/near/networks',
                            '/operations/near/types',
                            '/operations/near/modes',
                            '/operations/near/tools',
                        ]
                    },
                    {
                        title: 'Fantom',
                        collapsable: true,
                        children: [
                            '/operations/fantom/',
                            '/operations/fantom/networks',
                            '/operations/fantom/types',
                            '/operations/fantom/modes',
                            '/operations/fantom/debug-and-trace-apis',
                            '/operations/fantom/tools',
                        ]
                    },
                    {
                        title: 'Solana',
                        collapsable: true,
                        children: [
                            '/operations/solana/',
                            '/operations/solana/networks',
                            '/operations/solana/types',
                            '/operations/solana/tools',
                        ]
                    },
                    {
                        title: 'Harmony',
                        collapsable: true,
                        children: [
                            '/operations/harmony/',
                            '/operations/harmony/networks',
                            '/operations/harmony/types',
                            '/operations/harmony/modes',
                            '/operations/harmony/debug-and-trace-apis',
                            '/operations/harmony/tools',
                        ]
                    },
                    {
                        title: 'StarkNet',
                        collapsable: true,
                        children: [
                            '/operations/starknet/',
                            '/operations/starknet/networks',
                            '/operations/starknet/types',
                            '/operations/starknet/tools',
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
                        title: 'BNB Smart Chain',
                        collapsable: true,
                        children: [
                            '/tutorials/bsc/',
                            '/tutorials/bsc/bep-1155-contract-with-truffle-and-openzeppelin',
                        ]
                    },
                    {
                        title: 'Avalanche',
                        collapsable: true,
                        children: [
                            '/tutorials/avalanche/',
                            '/tutorials/avalanche/aave-flash-loans-with-brownie',
                        ]
                    },
                    {
                        title: 'NEAR',
                        collapsable: true,
                        children: [
                            '/tutorials/near/',
                            '/tutorials/near/creating-and-upgrading-a-simple-message-contract',
                        ]
                    },
                    {
                        title: 'Fantom',
                        collapsable: true,
                        children: [
                            '/tutorials/fantom/',
                            '/tutorials/fantom/erc-721-collection-contract-with-truffle-and-openzeppelin',
                        ]
                    },
                    {
                        title: 'Solana',
                        collapsable: true,
                        children: [
                            '/tutorials/solana/',
                            '/tutorials/solana/creating-a-token-and-vesting-the-token-in-your-program',
                        ]
                    },
                    {
                        title: 'Harmony',
                        collapsable: true,
                        children: [
                            '/tutorials/harmony/',
                            '/tutorials/harmony/simple-metaverse-contract-with-foundry',
                        ]
                    },
                    {
                        title: 'StarkNet',
                        collapsable: true,
                        children: [
                            '/tutorials/starknet/',
                            '/tutorials/starknet/nft-contract-with-nile-and-l1-l2-reputation-messaging',
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
                    [`https://${process.env.DOCS_HOSTNAME}/api/reference/`, 'Platform API reference'],
                    '/api/node-api-reference',
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
                    '/blockchains/avalanche',
                    '/blockchains/near',
                    '/blockchains/fantom',
                    '/blockchains/solana',
                    '/blockchains/harmony',
                    '/blockchains/starknet',
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
                    '/glossary/elastic-node',
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
                    '/glossary/user',
                    '/glossary/vault',
                ]
            },
        '/release-notes',
        ],
        sidebarDepth: 2,
        algolia: {
            apiKey: `${process.env.ALGOLIA_KEY}`,
            indexName: 'chainstack',
            appId: 'XNMMO9QAGN'
        },
        docsRepo: 'chainstack/docs',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: 'Edit on GitHub',
        nextLinks: false,
        prevLinks: false
    },
    plugins: {
        '@vuepress/active-header-links': true,
        '@vuepress/back-to-top': true,
        '@vuepress/google-analytics': {
            'ga': `${process.env.GA_ID}`
        },
        'clean-urls': {
            normalSuffix: ''
        },
        'sitemap': {
            hostname: `https://${process.env.DOCS_HOSTNAME}`,
        },
        'check-md': true,
        'code-switcher': true,
        '@dovyp/vuepress-plugin-clipboard-copy': true,
        '@limdongjin/vuepress-plugin-simple-seo': {
            default_image: '/img/social-image.png',
            root_url: `https://${process.env.DOCS_HOSTNAME}`,
            default_site_name: 'Chainstack documentation'
        },
    }
}
