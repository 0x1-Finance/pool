<template>
  <div>
    <div>
      <div class="intro">
        <h3>
          <b style="color: #23c153;">{{$t("home.protocol-name")}}</b>
        </h3>
        <p>
          Stake 0x1 LP tokens (generated from <a href="https://0x1.exchange" target="_blank">0x1.exchange</a>) and earn BIN!
        </p>
      </div>
    </div>
    <br>
	
	<div class="price alert top">
      1 BIN = {{ priceBNBBIN ? (priceBNBBIN).toFixed(4) : '--' }} BNB ~ {{ priceUSDTBIN ? (priceUSDTBIN).toFixed(2) : '--' }} USDT |
      1 BNB = {{ priceBNBUSDT ? priceBNBUSDT.toFixed(2) : '--' }} USDT<br>
	  <small><b>NOTE:</b> PRICE FEED IS IMPORTED FROM 0x1 EXCHANGE</small>
    </div>
	<br>
	
    <div class="row">
      <div class="col-md-4 cow" v-for="(cow, i) in cows" :key="i">
        <div class="card mb-4 text-white bg-card cow">
          <div class="card-body">
            <!-- <div class="desc">{{ cow.stakeToken.symbol }}</div> -->
            <div class="desc"><b style="color: #b90505;">{{cow.name2}}</b></div>
			<table style="margin: 15px 0px 20px 0px;">
				<tr>
					<td style="width: 50%; text-align: left;">
						<p class="card-text apy" style="color: #118735; font-weight: bold; padding-top: 5px; margin-bottom: 0;"> Allocation: </p>
						<p class="card-text apy" style="color: #118735; font-weight: bold; padding-top: 5px; margin-bottom: 0;"> Reward Rate: </p>
						<p class="card-text apy" style="color: #118735; font-weight: bold; padding-top: 5px; margin-bottom: 0;"> Current APY: </p>
						<p class="card-text apy" style="color: #118735; font-weight: bold; padding-top: 5px; margin-bottom: 0;"> Pool Fee: </p>
						<p class="card-text apy" style="color: #118735; font-weight: bold; padding-top: 5px; margin-bottom: 0;"> Start Date: </p>
						<p class="card-text apy" style="color: #118735; font-weight: bold; padding-top: 5px; margin-bottom: 0;"> Pool Duration: </p>
						<p class="card-text apy" style="color: #118735; font-weight: bold; padding-top: 5px;"> Reward Halving: </p>
					</td>
					<td style="width: 50%; text-align: right;">
						<p class="card-text apy" style="color: #118735; font-weight: bold; padding-top: 5px; margin-bottom: 0;"> <font style="font-weight: normal; color: #b90505;">{{cow.allo}} BIN</font> </p>
						<p class="card-text apy" style="color: #118735; font-weight: bold; padding-top: 5px; margin-bottom: 0;"> <font style="font-weight: normal; color: #b90505;">{{rate[cow.id]}} BIN/sec</font> </p>
						<p class="card-text apy" style="color: #118735; font-weight: bold; padding-top: 5px; margin-bottom: 0;"> <font style="color: #b90505;">{{apy[cow.id]}}%</font> </p>
						<p class="card-text apy" style="color: #118735; font-weight: bold; padding-top: 5px; margin-bottom: 0;"> <font style="font-weight: normal; color: #b90505;">{{cow.fee}}</font> </p>
						<p class="card-text apy" style="color: #118735; font-weight: bold; padding-top: 5px; margin-bottom: 0;"> <font style="font-weight: normal; color: #b90505;">{{cow.start}}</font> </p>
						<p class="card-text apy" style="color: #118735; font-weight: bold; padding-top: 5px; margin-bottom: 0;"> <font style="font-weight: normal; color: #b90505;">{{cow.duration}}</font> </p>
						<p class="card-text apy" style="color: #118735; font-weight: bold; padding-top: 5px;"> <font style="font-weight: normal; color: #b90505;">{{cow.halving}}</font> </p>
					<td>
				</tr>
			</table>
			<a :href="'/pool/' + cow.id" v-if="cow.initialized" class="btn btn-block btn-x">
              {{$t("home.select")}}
            </a>
            <a href="#" v-else class="btn btn-secondary btn-block">{{$t("home.coming-soon")}}</a>
          </div>
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
  import config from '~/config'
  import { Pair, Erc20Reader, CowReader } from '~/contracts'
  import { BigNumber } from 'bignumber.js'

  export default {
    data () {
      return {
        cows: config.cows,
        priceBNBBIN: null,
		priceUSDTBIN: null,
        priceWMUEBIN: null,
		priceBNBUSDT: null,
		priceWMUEUSDT: null,
		priceBTCBUSDT: null,
		priceETHUSDT: null,
        apy: {
          1: '--',
		  2: '--',
		  3: '--',
		  4: '--',
		  5: '--',
		  6: '--'
        },
		rate: {
          1: '--',
		  2: '--',
		  3: '--',
		  4: '--',
		  5: '--',
		  6: '--'
		}
      }
    },
    methods: {

    },
    async mounted() {
      let pair = new Pair()
      let promises = [ pair.getPriceOfBNBBIN(), pair.getPriceOfUSDTBIN(), pair.getPriceOfBNBUSDT(), pair.getPriceOfWMUEBIN(), pair.getPriceOfWMUEUSDT(), 
	  pair.getPriceOfBTCBUSDT(), pair.getPriceOfETHUSDT()];
      let prices = await Promise.all(promises);

      this.priceBNBBIN =  BigNumber(prices[0]);
      this.priceUSDTBIN = BigNumber(prices[1]);
	  this.priceBNBUSDT = BigNumber(prices[2]);
      this.priceWMUEBIN = BigNumber(prices[3]);
	  this.priceWMUEUSDT = BigNumber(prices[4]);
	  this.priceBTCBUSDT = BigNumber(prices[5]);
	  this.priceETHUSDT = BigNumber(prices[6]);
      

      this.cows.map(async(cow) => {
        if(cow.initialized) {
          let erc20Reader = new Erc20Reader(cow.stakeToken.address, cow.stakeToken.symbol, cow.stakeToken.decimals)
          let cowReader = new CowReader(cow.address, cow.stakeToken, cow.yieldToken)
          let rewardRate = await cowReader.rewardRate();
          let balance = await cowReader.totalSupply();
          let rewards = rewardRate.times(365 * 24 * 60 * 60).div(balance)

          if(cow.id == 1) {
            this.apy[1] = rewardRate.times(60 * 60 * 24 * 365).times(this.priceUSDTBIN).div(balance * 3.13606317891).div(this.priceBNBUSDT).times(100).toFixed(2)
			this.rate[1] = rewardRate.toFixed(6)
          } else if(cow.id == 2) {
            this.apy[2] = rewardRate.times(60 * 60 * 24 * 365).times(this.priceUSDTBIN).div(balance * 0.101677289248).div(this.priceUSDTBIN).times(100).toFixed(2)
			this.rate[2] = rewardRate.toFixed(6)
          } else if(cow.id == 3) {
            this.apy[3] = rewardRate.times(60 * 60 * 24 * 365).times(this.priceUSDTBIN).div(balance * 0.01218813509).div(this.priceUSDTBIN).times(100).toFixed(2)
			this.rate[3] = rewardRate.toFixed(6)
          } else if(cow.id == 4) {
            this.apy[4] = rewardRate.times(60 * 60 * 24 * 365).times(this.priceUSDTBIN).div(balance * 0.14616868513).div(this.priceBNBUSDT).times(100).toFixed(2)
			this.rate[4] = rewardRate.toFixed(6)
          } else if(cow.id == 5) {
            this.apy[5] = rewardRate.times(60 * 60 * 24 * 365).times(this.priceUSDTBIN).div(balance * 0.00879021139).div(this.priceBTCBUSDT).times(100).toFixed(2)
			this.rate[5] = rewardRate.toFixed(6)
          } else if(cow.id == 6) {
            this.apy[6] = rewardRate.times(60 * 60 * 24 * 365).times(this.priceUSDTBIN).div(balance * 0.04563867651).div(this.priceETHUSDT).times(100).toFixed(2)
			this.rate[6] = rewardRate.toFixed(6)
          }
        }
        return cow
      });
    }
  }
</script>

<style scoped>

  .intro {
    background-color: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.5) 5px 5px 5px 0px;
    padding: 15px 15px 5px 15px;
  }
  .btn-x {
    color: white;
    background-color: #23c153;
  }
  .btn-x:hover {
    color: black;
    background-color: #23c153b5;
  }
  .bg-card {
    background-color: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.5) 5px 5px 5px 0px;
    padding: 15px 15px 5px 15px;
  }
  .cover {
    text-align: center;
  }
  .title {
    margin-bottom: 0.1rem !important;
  }
  .desc {
    font-size: 0.9rem;
    color: #ac1cee;
  }
  @media (max-width:767px){
    .col-md-4.cow {
      width: 100%;
    }
    .cow.card img.tokenlogo{
      max-width: 100px;
    }
  }
  .cow.card img.tokenlogo {
    display:block;
    margin: 0 auto;
    max-width:150px;
  }
  .cover img {
    display: inline-block;
    width: 50px;
    text-align: center;
  }
  .cow {
    margin-bottom: 1rem;
  }
  .cow img {
    width: 100%;
    padding: 1rem;
    text-align: center;
    display: inline-block;
  }
  .avatar {
    text-align: center;
    font-size: 5rem;
  }
  .milk {
    width: 3rem;
  }
  .apy {
    font-size: 0.9rem;
    color: #007bff;
  }
  .top {
    color: #000;
    font-size: 20px;
    font-weight: 600;
  }

</style>
