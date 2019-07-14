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
                title: 'Guides',
                collapsable: false,
                children: [
                    '/guides/getting-started',
                    '/guides/interacting-with-the-blockchain',
                    '/guides/application-development',
                    '/guides/multichain-hybrid',
                    '/guides/on-chain-governance',
                ]
            },
            {
                title: 'Tutorials',
                collapsable: true,
                children: [
                    '/tutorials/academic-certificates-on-ethereum',
                    '/tutorials/loyalty-program-on-quorum',
                    '/tutorials/food-supply-temperature-control-on-quorum',
                    '/tutorials/decentralized-reputation-on-multichain',
                ]
            },
            {
                title: 'Projects',
                collapsable: true,
                children: [
                    '/projects/',
                    '/projects/consortium',
                    '/projects/public-chain',
                ]
            },
            {
                title: 'Blockchains',
                collapsable: true,
                children: [
                    '/blockchains/',
                    '/blockchains/multichain',
                    '/blockchains/quorum',
                    '/blockchains/fabric',
                    '/blockchains/ethereum',
                ]
            },
            {
                title: 'Reference',
                collapsable: true,
                children: [
                    '/reference/glossary',
                    '/reference/release-notes',                    
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