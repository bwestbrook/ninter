<template>
  <div class="mainBackground">
    <div class="walletConnectDiv">
      <walletConnect :connectToBeacon="connectToBeacon" :walletConnected="walletConnected" @hideNft="hideNft" @nftReady="nftReady" @addressReady="addressReady" @toggleConnectToBeacon="toggleConnectToBeacon" />
    </div>
    <displayPopup :displayLink="displayLink" :attributes="attributes" @loadTxl="loadTxl" />
  </div>
</template>

<script>

import walletConnect from "./components/walletConnect.vue"
import displayPopup from "./components/displayPopup.vue"
import { getKalamintTokens, reduceAddress } from './services/beacon-services.js'
import { ID_LOOKUP, IPFS_HTTPS_LINK, OBJKT_CONTRACT } from './constants.js'


export default {
  name: 'App',
  components: { walletConnect, displayPopup },
  data () {
    return {
      setAddress: "yolo",
      connectToBeacon: false,
      showModal: true,
      walletConnected: false,
      displayLink: "adfdsaf",
      attributes: [
        {'id': 0},
        {'for_sale': false},
        {'rank': 'na'}
        ]
    }
  },
  beforeMount() {
    this.addressReady()
    this.loadTxl(272)
  },
  methods: {
    async loadTxl(token_id) {
      if (token_id < 0  || token_id > 272) {
        alert("Please insert token ID between 1 and 272")
        return
      }
      token_id = ('0000'+token_id).slice(-3);
      console.log(token_id)
      const kalamint_token_id = ID_LOOKUP[token_id]
      console.log(kalamint_token_id)
      const tokens = await getKalamintTokens()
      const thisTxl = await tokens.get(kalamint_token_id)
      let owner = thisTxl.owner
      if (owner === OBJKT_CONTRACT) {
        console.log("NFT FOR SALE")
        owner = '4SALE ON OBJKT'
      } else {
        owner = await reduceAddress(owner)
      }
      const displayLink = IPFS_HTTPS_LINK + thisTxl.ipfs_hash.split('//')[1]
      this.displayLink = displayLink
      this.attributes = [
        {name: 'Kala ID', value: kalamint_token_id},
        {name: 'TXL ID', value: token_id},
        {name: 'owner', value: owner},
        {name: 'TXL Version', value: 1.0}
      ]
      console.log(this.attributes)
      console.log(this.displayLink)
    },
    getTxlData() {
      console.log(this.title)
      console.log(this.$refs.txlId)
      this.$refs.txlId.classList.add("active")
      this.$refs.txlId.focus()
      const new_id = this.$refs.txlId.value
      this.$refs.selectedTxl.innerText = new_id 
    },
    hideNft() {
      this.showModal = false
    },
    toggleConnectToBeacon() {
      if (!this.connectToBeacon) {
        this.connectToBeacon = true
      }
      const connectToBeacon = this.connectToBeacon
      return {
        connectToBeacon
      }
    },
    addressReady(address='') {
      this.setAddress = address
    },
    nftReady(attributes, displayLink) {
      console.log("nftReady")
      console.log(displayLink)
      console.log(attributes)
      this.showModal = true
      this.displayLink = displayLink
      this.attributes = attributes
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.walletConnectDiv{
  background: #2c3e50;
  display: flex;
  padding-bottom: 5px;
  justify-content: flex-end;
}
.inputSectionDiv{
  background: green;
  display: flex;
  justify-content: flex-end;
}
.customHeader{
  border-bottom: 2px solid #ddd;
  display: inline-block;
  padding-bottom: 5px;
}
.mainBackground{
  border-bottom: 1px solid #ddd;
  display: inline-block;
  padding-bottom: 2px;
  border-radius: 2px;
  background: rgb(170, 158, 158);
  width: 90%;
  height: 100%;
}
</style>
