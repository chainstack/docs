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
                    '/platform/manage-your-organization-subscription-plan-and-support-level',
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
                        title: 'Arbitrum',
                        collapsable: true,
                        children: [
                            '/operations/arbitrum/',
                            '/operations/arbitrum/networks',
                            '/operations/arbitrum/types',
                            '/operations/arbitrum/modes',
                            '/operations/arbitrum/debug-and-trace-apis',
                            '/operations/arbitrum/tools',
                        ]
                    },
                    {
                        title: 'Polygon zkEVM',
                        collapsable: true,
                        children: [
                            '/operations/polygon-zkevm/',
                            '/operations/polygon-zkevm/networks',
                            '/operations/polygon-zkevm/types',
                            '/operations/polygon-zkevm/modes',
                            '/operations/polygon-zkevm/tools',
                        ]
                    },
                    {
                        title: 'Optimism',
                        collapsable: true,
                        children: [
                            '/operations/optimism/',
                            '/operations/optimism/networks',
                            '/operations/optimism/types',
                            '/operations/optimism/modes',
                            '/operations/optimism/debug-and-trace-apis',
                            '/operations/optimism/tools',
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
                        title: 'Aurora',
                        collapsable: true,
                        children: [
                            '/operations/aurora/',
                            '/operations/aurora/networks',
                            '/operations/aurora/types',
                            '/operations/aurora/modes',
                            '/operations/aurora/tools',
                        ]
                    },
                    {
                        title: 'Solana',
                        collapsable: true,
                        children: [
                            '/operations/solana/',
                            '/operations/solana/networks',
                            '/operations/solana/types',
                            '/operations/solana/modes',
                            '/operations/solana/tools',
                        ]
                    },
                    {
                        title: 'Aptos',
                        collapsable: true,
                        children: [
                            '/operations/aptos/',
                            '/operations/aptos/networks',
                            '/operations/aptos/types',
                            '/operations/aptos/modes',
                            '/operations/aptos/tools',
                        ]
                    },
                    {
                        title: 'Gnosis Chain',
                        collapsable: true,
                        children: [
                            '/operations/gnosis/',
                            '/operations/gnosis/networks',
                            '/operations/gnosis/types',
                            '/operations/gnosis/modes',
                            '/operations/gnosis/debug-and-trace-apis',
                            '/operations/gnosis/clients',
                            '/operations/gnosis/tools',
                        ]
                    },
                    {
                        title: 'Cronos',
                        collapsable: true,
                        children: [
                            '/operations/cronos/',
                            '/operations/cronos/networks',
                            '/operations/cronos/types',
                            '/operations/cronos/modes',
                            '/operations/cronos/tools',
                        ]
                    },
                    {
                        title: 'Filecoin',
                        collapsable: true,
                        children: [
                            '/operations/filecoin/',
                            '/operations/filecoin/networks',
                            '/operations/filecoin/types',
                            '/operations/filecoin/tools',
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
                        title: 'Fuse',
                        collapsable: true,
                        children: [
                            '/operations/fuse/',
                            '/operations/fuse/networks',
                            '/operations/fuse/types',
                            '/operations/fuse/modes',
                            '/operations/fuse/tools',
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
                        title: 'Arbitrum',
                        collapsable: true,
                        children: [
                            '/tutorials/arbitrum/',
                            '/tutorials/arbitrum/simple-l1-to-l2-messaging',
                        ]
                    },
                    {
                       title: 'Polygon zkEVM',
                       collapsable: true,
                       children: [
                           '/tutorials/polygon-zkevm/',
                           '/tutorials/polygon-zkevm/deploy-smart-contract-to-polygon-zkevm-using-hardhat',
                       ]
                   },
                    {
                       title: 'Optimism',
                       collapsable: true,
                       children: [
                           '/tutorials/optimism/',
                           '/tutorials/optimism/bridge-ether-from-ethereum-l1-to-optimism-l2-using-the-optimism-javascript-sdk',
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
                        title: 'Aurora',
                        collapsable: true,
                        children: [
                            '/tutorials/aurora/',
                            '/tutorials/aurora/simple-on-chain-governance-with-remix-and-openzeppelin-wizard',
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
                        title: 'Aptos',
                        collapsable: true,
                        children: [
                            '/tutorials/aptos/',
                            '/tutorials/aptos/publish-module-to-save-and-retrieve-message-on-aptos',
                        ]
                    },
                    {
                        title: 'Gnosis Chain',
                        collapsable: true,
                        children: [
                            '/tutorials/gnosis/',
                            '/tutorials/gnosis/simple-soulbound-token-with-remix-and-openzeppelin',
                        ]
                    },
                    {
                        title: 'Cronos',
                        collapsable: true,
                        children: [
                            '/tutorials/cronos/',
                            '/tutorials/cronos/nft-dutch-auction-contract-with-hardhat',
                        ]
                    },
                    {
                        title: 'Filecoin',
                        collapsable: true,
                        children: [
                            '/tutorials/filecoin/',
                            '/tutorials/filecoin/deploy-an-erc20-token-on-filecoin-with-hardhat',
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
                        title: 'StarkNet',
                        collapsable: true,
                        children: [
                            '/tutorials/starknet/',
                            '/tutorials/starknet/nft-contract-with-nile-and-l1-l2-reputation-messaging',
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
                        title: 'Tezos',
                        collapsable: true,
                        children: [
                            '/tutorials/tezos/',
                            '/tutorials/tezos/simple-fund-contract-in-ligo',
                        ]
                    },
                     {
                        title: 'Fuse',
                        collapsable: true,
                        children: [
                            '/tutorials/fuse/',
                            '/tutorials/fuse/simple-multisig-contract-with-hardhat',
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
        title: "API",
        collapsable: true,
        children: [
          "/api/",
          "/api/quick-tutorial",
          [
            `https://${process.env.DOCS_HOSTNAME}/api/reference/`,
            "Platform API reference",
          ],
          {
            title: "Ethereum API",
            collapsable: true,
            children: [
              "api/ethereum/ethereum-api-reference",
              "api/ethereum/deploy-your-ethereum-node-to-enable-debug-and-trace-api-methods",
              "api/ethereum/debug_traceBlockByHash",
              "api/ethereum/debug_traceBlockByNumber",
              "api/ethereum/debug_traceCall",
              "api/ethereum/debug_traceTransaction",
              "api/ethereum/eth_blocknumber",
              "api/ethereum/eth_call",
              "api/ethereum/eth_chainid",
              "api/ethereum/eth_estimategas",
              "api/ethereum/eth_gasprice",
              "api/ethereum/eth_getbalance",
              "api/ethereum/eth_getblockbyhash",
              "api/ethereum/eth_getblockbynumber",
              "api/ethereum/eth_getBlockReceipts",
              "api/ethereum/eth_getblocktransactioncountbyhash",
              "api/ethereum/eth_getblocktransactioncountbynumber",
              "api/ethereum/eth_getcode",
              "api/ethereum/eth_getfilterchanges",
              "api/ethereum/eth_getlogs",
              "api/ethereum/eth_getstorageat",
              "api/ethereum/eth_gettransactionbyblockhashandindex",
              "api/ethereum/eth_gettransactionbyblocknumberandindex",
              "api/ethereum/eth_gettransactionbyhash",
              "api/ethereum/eth_gettransactioncount",
              "api/ethereum/eth_gettransactionreceipt",
              "api/ethereum/eth_getunclebyblocknumberandindex",
              "api/ethereum/eth_getunclecountbyblockhash",
              "api/ethereum/eth_mining",
              "api/ethereum/eth_newblockfilter",
              "api/ethereum/eth_newfilter",
              "api/ethereum/eth_newpendingtransactionfilter",
              "api/ethereum/eth_sendrawtransaction",
              "api/ethereum/eth_syncing",
              "api/ethereum/web3js-subscriptions",
              "api/ethereum/eth_v1_beacon_genesis",
              "api/ethereum/eth_v1_beacon_states_state_id_root",
              "api/ethereum/eth_v1_beacon_states_state_id_fork",
              "api/ethereum/eth_v1_beacon_states_state_id_finality_checkpoints",
              "api/ethereum/eth_v1_beacon_states_state_id_validators",
              "api/ethereum/eth_v1_beacon_states_state_id_validators_validator_id",
              "api/ethereum/eth_v1_beacon_states_state_id_validator_balances",
              "api/ethereum/eth_v1_beacon_states_state_id_committees",
              "api/ethereum/eth_v1_beacon_states_state_id_sync_committees",
              "api/ethereum/eth_v1_beacon_headers",
              "api/ethereum/eth_v1_beacon_headers_block_id",
              "api/ethereum/eth_v2_beacon_blocks_block_id",
              "api/ethereum/eth_v1_beacon_blocks_block_id_root",
              "api/ethereum/eth_v1_beacon_blocks_block_id_attestations",
              "api/ethereum/eth_v1_beacon_pool_attestations",
              "api/ethereum/eth_v1_beacon_pool_attester_slashings",
              "api/ethereum/eth_v1_beacon_pool_proposer_slashings",
              "api/ethereum/eth_v1_beacon_pool_voluntary_exits",
              "api/ethereum/eth_v1_config_fork_schedule",
              "api/ethereum/eth_v1_config_spec",
              "api/ethereum/eth_v1_config_deposit_contract",
              "api/ethereum/eth_v1_events",
              "api/ethereum/eth_v1_node_identity",
              "api/ethereum/eth_v1_node_peers",
              "api/ethereum/eth_v1_node_peers_peer_id",
              "api/ethereum/eth_v1_node_peer_count",
              "api/ethereum/eth_v1_node_version",
              "api/ethereum/eth_v1_node_syncing",
              "api/ethereum/eth_v1_node_health",
              "api/ethereum/trace_block",
              "api/ethereum/trace_call",
              "api/ethereum/trace_callMany",
              "api/ethereum/trace_filter",
              "api/ethereum/trace_replayBlockTransactions",
              "api/ethereum/trace_replayTransaction",
              "api/ethereum/trace_transaction",
              "api/ethereum/txpool_content",
              "api/ethereum/txpool_inspect",
              "api/ethereum/txpool_status",
            ],
          },
          {
            title: "Polygon API",
            collapsable: true,
            children: [
              "api/polygon/polygon-api-reference",
              "api/polygon/eth_blocknumber",
              "api/polygon/eth_call",
              "api/polygon/eth_chainid",
              "api/polygon/eth_estimategas",
              "api/polygon/eth_gasprice",
              "api/polygon/eth_getblockbyhash",
              "api/polygon/eth_getblockbynumber",
              "api/polygon/eth_getblocktransactioncountbyhash",
              "api/polygon/eth_getblocktransactioncountbynumber",
              "api/polygon/eth_getcode",
              "api/polygon/eth_getfilterchanges",
              "api/polygon/eth_getlogs",
              "api/polygon/eth_getstorageat",
              "api/polygon/eth_gettransactionbyblockhashandindex",
              "api/polygon/eth_gettransactionbyblocknumberandindex",
              "api/polygon/eth_gettransactionbyhash",
              "api/polygon/eth_gettransactioncount",
              "api/polygon/eth_gettransactionreceipt",
              "api/polygon/eth_getunclebyblocknumberandindex",
              "api/polygon/eth_getunclecountbyblockhash",
              "api/polygon/eth_mining",
              "api/polygon/eth_newblockfilter",
              "api/polygon/eth_newfilter",
              "api/polygon/eth_newpendingtransactionfilter",
              "api/polygon/eth_sendrawtransaction",
              "api/polygon/eth_syncing",
              "api/polygon/web3js-subscriptions",
            ],
          },
          {
            title: "Avalanche API",
            collapsable: true,
            children: [
              "api/avalanche/avalanche-api-reference",
              "api/avalanche/eth_blocknumber",
              "api/avalanche/eth_call",
              "api/avalanche/eth_chainid",
              "api/avalanche/eth_estimategas",
              "api/avalanche/eth_gasprice",
              "api/avalanche/eth_getblockbyhash",
              "api/avalanche/eth_getblockbynumber",
              "api/avalanche/eth_getblocktransactioncountbyhash",
              "api/avalanche/eth_getblocktransactioncountbynumber",
              "api/avalanche/eth_getcode",
              "api/avalanche/eth_getfilterchanges",
              "api/avalanche/eth_getlogs",
              "api/avalanche/eth_getstorageat",
              "api/avalanche/eth_gettransactionbyblockhashandindex",
              "api/avalanche/eth_gettransactionbyblocknumberandindex",
              "api/avalanche/eth_gettransactionbyhash",
              "api/avalanche/eth_gettransactioncount",
              "api/avalanche/eth_gettransactionreceipt",
              "api/avalanche/eth_getunclebyblocknumberandindex",
              "api/avalanche/eth_getunclecountbyblockhash",
              "api/avalanche/eth_mining",
              "api/avalanche/eth_newblockfilter",
              "api/avalanche/eth_newfilter",
              "api/avalanche/eth_newpendingtransactionfilter",
              "api/avalanche/eth_sendrawtransaction",
              "api/avalanche/eth_syncing",
              "api/avalanche/web3js-subscriptions",
            ],
          },
          {
            title: "Arbitrum API",
            collapsable: true,
            children: [
              "api/arbitrum/arbitrum-api-reference",
              "api/arbitrum/eth_blocknumber",
              "api/arbitrum/eth_call",
              "api/arbitrum/eth_chainid",
              "api/arbitrum/eth_estimategas",
              "api/arbitrum/eth_gasprice",
              "api/arbitrum/eth_getblockbyhash",
              "api/arbitrum/eth_getblockbynumber",
              "api/arbitrum/eth_getblocktransactioncountbyhash",
              "api/arbitrum/eth_getblocktransactioncountbynumber",
              "api/arbitrum/eth_getcode",
              "api/arbitrum/eth_getfilterchanges",
              "api/arbitrum/eth_getlogs",
              "api/arbitrum/eth_getstorageat",
              "api/arbitrum/eth_gettransactionbyblockhashandindex",
              "api/arbitrum/eth_gettransactionbyblocknumberandindex",
              "api/arbitrum/eth_gettransactionbyhash",
              "api/arbitrum/eth_gettransactioncount",
              "api/arbitrum/eth_gettransactionreceipt",
              "api/arbitrum/eth_getunclebyblocknumberandindex",
              "api/arbitrum/eth_getunclecountbyblockhash",
              "api/arbitrum/eth_mining",
              "api/arbitrum/eth_newblockfilter",
              "api/arbitrum/eth_newfilter",
              "api/arbitrum/eth_newpendingtransactionfilter",
              "api/arbitrum/eth_sendrawtransaction",
              "api/arbitrum/eth_syncing",
              "api/arbitrum/web3js-subscriptions",
            ],
          },
          {
            title: "Solana API",
            collapsable: true,
            children: [
              "api/solana/solana-api-reference",
              "api/solana/getaccountinfo",
              "api/solana/getbalance",
              "api/solana/getblock",
              "api/solana/getblockheight",
              "api/solana/getblockproduction",
              "api/solana/getblocks",
              "api/solana/getblocktime",
              "api/solana/getepochinfo",
              "api/solana/gethealth",
              "api/solana/getidentity",
              "api/solana/getlatestblockhash",
              "api/solana/getmultipleaccounts",
              "api/solana/getprogramaccounts",
              "api/solana/getslot",
              "api/solana/getslotleader",
              "api/solana/gettokenaccountsbydelegate",
              "api/solana/gettokenaccountsbyowner",
              "api/solana/gettokenlargestaccounts",
              "api/solana/gettransaction",
              "api/solana/gettransactioncount",
              "api/solana/websocket-subscriptions",
              "api/solana/accountsubscribe",
              "api/solana/accountunsubscribe",
              "api/solana/logssubscribe",
              "api/solana/logsunsubscribe",
              "api/solana/slotsubscribe",
              "api/solana/slotunsubscribe",
            ],
          },
          {
            title: "Gnosis Chain API",
            collapsable: true,
            children: [
              "api/gnosis/gnosis-api-reference",
              "api/gnosis/eth_v1_beacon_genesis",
              "api/gnosis/eth_v1_beacon_states_state_id_root",
              "api/gnosis/eth_v1_beacon_states_state_id_fork",
              "api/gnosis/eth_v1_beacon_states_state_id_finality_checkpoints",
              "api/gnosis/eth_v1_beacon_states_state_id_validators",
              "api/gnosis/eth_v1_beacon_states_state_id_validators_validator_id",
              "api/gnosis/eth_v1_beacon_states_state_id_validator_balances",
              "api/gnosis/eth_v1_beacon_states_state_id_committees",
              "api/gnosis/eth_v1_beacon_states_state_id_sync_committees",
              "api/gnosis/eth_v1_beacon_headers",
              "api/gnosis/eth_v1_beacon_headers_block_id",
              "api/gnosis/eth_v2_beacon_blocks_block_id",
              "api/gnosis/eth_v1_beacon_blocks_block_id_root",
              "api/gnosis/eth_v1_beacon_blocks_block_id_attestations",
              "api/gnosis/eth_v1_beacon_pool_attestations",
              "api/gnosis/eth_v1_beacon_pool_attester_slashings",
              "api/gnosis/eth_v1_beacon_pool_proposer_slashings",
              "api/gnosis/eth_v1_beacon_pool_voluntary_exits",
              "api/gnosis/eth_v1_config_fork_schedule",
              "api/gnosis/eth_v1_config_spec",
              "api/gnosis/eth_v1_config_deposit_contract",
              "api/gnosis/eth_v1_events",
              "api/gnosis/eth_v1_node_identity",
              "api/gnosis/eth_v1_node_peers",
              "api/gnosis/eth_v1_node_peers_peer_id",
              "api/gnosis/eth_v1_node_peer_count",
              "api/gnosis/eth_v1_node_version",
              "api/gnosis/eth_v1_node_syncing",
              "api/gnosis/eth_v1_node_health",
            ],
          },
        ],
      },
      '/subgraphs',
      '/ipfs-storage',
      '/marketplace',
            {
                title: 'Blockchains',
                collapsable: true,
                children: [
                    '/blockchains/',
                    '/blockchains/ethereum',
                    '/blockchains/polygon',
                    '/blockchains/bsc',
                    '/blockchains/avalanche',
                    '/blockchains/arbitrum',
                    '/blockchains/polygon-zkevm',
                    '/blockchains/optimism',
                    '/blockchains/near',
                    '/blockchains/aurora',
                    '/blockchains/solana',
                    '/blockchains/aptos',
                    '/blockchains/gnosis',
                    '/blockchains/cronos',
                    '/blockchains/filecoin',
                    '/blockchains/fantom',
                    '/blockchains/starknet',
                    '/blockchains/harmony',
                    '/blockchains/tezos',
                    '/blockchains/fuse',
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
                    '/glossary/chainstack-cloud',
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
