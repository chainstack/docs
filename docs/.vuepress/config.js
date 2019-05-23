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
                    '/guides/on-chain-governance',
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
                ]
            }
        ]
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
