module.exports = {
    title: 'Chainstack Docs',
    description: "Chainstack documentation",
    themeConfig: {
        nav: [
            { text: 'Try Free', link: 'https://console.chainstack.com' }
        ],
        sidebar: [
            {
                title: 'Guides',
                collapsable: false,
                children: [
                    '/guides/getting-started',
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
                    '/blockchains/hyperledger-fabric',
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
    plugins: ['@vuepress/clean-urls']
}
