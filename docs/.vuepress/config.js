module.exports = {
    title: 'Chainstack Docs',
    description: "Chainstack documentation",
    themeConfig:{
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
                title: 'Permissioned blockchains',
                collapsable: true,
                children: [
                    '/permissioned-blockchains/',
                    '/permissioned-blockchains/multichain',
                    '/permissioned-blockchains/quorum',
                    '/permissioned-blockchains/hyperledger-fabric',
                ]
            },            
            {
                title: 'Public blockchains',
                collapsable: true,
                children: [                
                    '/public-blockchains/ethereum',
                ]
            },                        
            {
                title: 'Reference',
                collapsable: true,
                children: [
                    '/reference/glossary'
                ]
            }
        ],
        lastUpdated: 'Last Updated',
    }
}