<template>
  <div>
    <div>
      <div class="intro">
        <h3>
          {{$t("home.protocol-name")}}
        </h3>
        <p>
          Stake 0x1 LP tokens (generated from <a href="https://0x1.exchange" target="_blank">0x1.exchange</a>) and farm BIN tokens!
        </p>
      </div>
    </div>
    <br>
	
	<div class="price alert alert-success">
      <marquee>1 BIN = {{ priceBNBBIN ? (priceBNBBIN).toFixed(4) : '--' }} BNB ~ {{ priceUSDTBIN ? (priceUSDTBIN).toFixed(2) : '--' }} USDT |
      1 BNB = {{ priceBNBUSDT ? priceBNBUSDT.toFixed(2) : '--' }} USDT |
	  1 BTC = {{ priceBTCBUSDT ? priceBTCBUSDT.toFixed(2) : '--' }} USDT |
	  1 ETH = {{ priceETHUSDT ? (1/priceETHUSDT).toFixed(2) : '--' }} USDT |
	  1 WMUE = {{ priceWMUEUSDT ? (1/priceWMUEUSDT).toFixed(4) : '--' }} USDT</marquee>
	  <small><b>NOTE:</b> PRICE FEED IS IMPORTED FROM 0x1 EXCHANGE</small>
    </div>
	<br>
	
    <div class="row">
      <div class="col-md-4 cow" v-for="(cow, i) in cows" :key="i">
        <div class="card mb-4 text-white bg-card cow">
          <div class="card-body">
            <img :src="cow.image" class="tokenlogo">
            <h8 class="card-title title">{{ cow.name }}</h8>
            <!-- <div class="desc">{{ cow.stakeToken.symbol }}</div> -->
            <div class="desc">{{$t("home.card-desc", { symbol: cow.stakeToken.symbol })}}</div>
            <p class="card-text apy"> APY: {{apy[cow.id]}}% </p>
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
          } else if(cow.id == 2) {
            this.apy[2] = rewardRate.times(60 * 60 * 24 * 365).times(this.priceUSDTBIN).div(balance * 0.101677289248).div(this.priceUSDTBIN).times(100).toFixed(2)
          } else if(cow.id == 3) {
            this.apy[3] = rewardRate.times(60 * 60 * 24 * 365).times(this.priceUSDTBIN).div(balance * 0.01218813509).div(this.priceUSDTBIN).times(100).toFixed(2)
          } else if(cow.id == 4) {
            this.apy[4] = rewardRate.times(60 * 60 * 24 * 365).times(this.priceUSDTBIN).div(balance * 0.14616868513).div(this.priceBNBUSDT).times(100).toFixed(2)
          } else if(cow.id == 5) {
            this.apy[5] = rewardRate.times(60 * 60 * 24 * 365).times(this.priceUSDTBIN).div(balance * 0.00879021139).div(this.priceBTCBUSDT).times(100).toFixed(2)
          } else if(cow.id == 6) {
            this.apy[6] = rewardRate.times(60 * 60 * 24 * 365).times(this.priceUSDTBIN).div(balance * 0.04563867651).times(this.priceETHUSDT).times(100).toFixed(2)
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
    background-color: blue;
  }
  .btn-x:hover {
    color: black;
    background-color: aqua;
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

</style>
