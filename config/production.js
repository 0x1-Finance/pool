'use strict'
module.exports = {
	chainId: 56,
	cows: [
		{
			id: 1,
			name: "BIN/BNB LP Token",
			image: "https://0x1.finance/assets/images/logos/logo.png",
			desc: "Reward Halving every 30 days, 0 fee on staked tokens for harvest & unstake",
			initialized: true,
			staking: true,
			harvest: true,
			address: "0x852bd83a6c868f11986624e8495082071ea2041e",
			stakeToken: {
				address: "0xb8202415265a84069437699F1Dd2026335808416",
				decimals: 18,
				symbol: "BIN/BNB LP Token"
			},
			yieldToken: {
				address: "0xcc1da2eaa0150b958fd30c3b849d9efe1d365aed",
				decimals: 18,
				symbol: "BIN"
			}
		},
		{
			id: 2,
			name: "BIN/USDT LP Token",
			image: "https://0x1.finance/assets/images/logos/logo.png",
			desc: "Reward Halving every 30 days, 0 fee on staked tokens for harvest & unstake",
			initialized: true,
			staking: true,
			harvest: true,
			address: "0x80bab1bf4fbd9ae310a7f2fa8254ac141e605c7d",
			stakeToken: {
				address: "0x0B98B25Dc0cdEdbF0acC2858540c4aA7414D438a",
				decimals: 18,
				symbol: "BIN/USDT LP Token"
			},
			yieldToken: {
				address: "0xcc1da2eaa0150b958fd30c3b849d9efe1d365aed",
				decimals: 18,
				symbol: "BIN"
			}
		},
		{
			id: 3,
			name: "WMUE/BIN LP Token",
			image: "https://s2.coinmarketcap.com/static/img/coins/200x200/706.png",
			desc: "Reward Halving every 30 days, 0 fee on staked tokens for harvest & unstake",
			initialized: true,
			staking: true,
			harvest: true,
			address: "0x6EdB347A56dEC48dA9e7De7Ed8129C365f6FC66e",
			stakeToken: {
				address: "0xdaf4cCf9D8a95C6304018b514C8961Db71Ec4672",
				decimals: 18,
				symbol: "WMUE/BIN LP Token"
			},
			yieldToken: {
				address: "0xcc1da2eaa0150b958fd30c3b849d9efe1d365aed",
				decimals: 18,
				symbol: "BIN"
			}
		},
		{
			id: 4,
			name: "BNB/USDT LP Token",
			image: "https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png",
			desc: "Reward Halving every 30 days, 0 fee on staked tokens for harvest & unstake",
			initialized: true,
			staking: true,
			harvest: true,
			address: "0x40e082bb2ec0f5801348a9094f434e53c6da3b29",
			stakeToken: {
				address: "0xF7019b0EA2D7bD8BC94394103630e8030788CF12",
				decimals: 18,
				symbol: "BNB/USDT LP Token"
			},
			yieldToken: {
				address: "0xcc1da2eaa0150b958fd30c3b849d9efe1d365aed",
				decimals: 18,
				symbol: "BIN"
			}
		},
		{
			id: 5,
			name: "BTC/USDT LP Token",
			image: "https://www.bobsguide.com/gallery/var/albums/Bitcoin_Logo_.png",
			desc: "Reward Halving every 30 days, 0 fee on staked tokens for harvest & unstake",
			initialized: true,
			staking: true,
			harvest: true,
			address: "0x2fec2854e20F297Be1C932c4c44BCF7D6b85B38d",
			stakeToken: {
				address: "0x3A9d07c6BC6D8c4b6B2a09E72653Ec7a7da4B49f",
				decimals: 18,
				symbol: "BTC/USDT LP Token"
			},
			yieldToken: {
				address: "0xcc1da2eaa0150b958fd30c3b849d9efe1d365aed",
				decimals: 18,
				symbol: "BIN"
			}
		},
		{
			id: 6,
			name: "ETH/USDT LP Token",
			image: "https://cdn4.iconfinder.com/data/icons/cryptocoins/227/ETH-512.png",
			desc: "Reward Halving every 30 days, 0 fee on staked tokens for harvest & unstake",
			initialized: true,
			staking: true,
			harvest: true,
			address: "0xa5A20F6d79d368f03f71bfeC380323e09527Ac6C",
			stakeToken: {
				address: "0xcc177E281c908dC2FF456bFF81B8F48b360F5ADF",
				decimals: 18,
				symbol: "ETH/USDT LP Token"
			},
			yieldToken: {
				address: "0xcc1da2eaa0150b958fd30c3b849d9efe1d365aed",
				decimals: 18,
				symbol: "BIN"
			}
		}
	],
	tokens: [
		{
			symbol: "bnb",
			address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
			decimal: 18
		},
		{
			symbol: "WBNB",
			address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
			decimals: 18,
		}
	],
	pair_BNB_BIN: "0xb8202415265a84069437699F1Dd2026335808416",
	pair_USDT_BIN: "0x0B98B25Dc0cdEdbF0acC2858540c4aA7414D438a",
	pair_WMUE_BIN: "0xdaf4cCf9D8a95C6304018b514C8961Db71Ec4672",
	pair_BNB_USDT: "0xF7019b0EA2D7bD8BC94394103630e8030788CF12",
	pair_WMUE_USDT: "0x912F7aDbA2A86982b9D0Fe3b560CeA17078820Da",
	pair_BTCB_USDT: "0x3A9d07c6BC6D8c4b6B2a09E72653Ec7a7da4B49f",
	pair_ETH_USDT: "0xcc177E281c908dC2FF456bFF81B8F48b360F5ADF",
	web3Provider: "https://bsc-dataseed3.binance.org"
}
