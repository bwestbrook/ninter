<template>
  <div class="body">
    <div class="mainFlex">
      <div>
        <walletConnect 
          :connectToBeacon="connectToBeacon" :walletConnected="walletConnected" :ownedTxls="ownedTxls"
          @addressReady="addressReady" @loggedOut="clearOwnedTxls" @toggleConnectToBeacon="toggleConnectToBeacon" 
        />
      </div>
      <displayTxl 
          :displayLink="displayLink" :collectionAttributes="collectionAttributes" :uniqueTxlOwners="uniqueTxlOwners"
          :tokenAttributes="tokenAttributes" :txlRank="txlRank"
          :objktUrl="objktUrl" :unSoldTxls="unSoldTxls" :soldTxls="soldTxls"
          :loadedTxl="loadedTxl" :ownedTxls="ownedTxls" @loadTxl="loadTxl" @canBuyOnObjkt="canBuyOnObjkt"
      />
    </div>
  </div>
</template>

<script>

import walletConnect from "./components/walletConnect.vue"
import displayTxl from "./components/displayTxl.vue"
import { getAllKalamintTokens } from './services/tezos-services.js'
import { reduceAddress, zeroFillId } from './services/utilities.js'
import { ID_LOOKUP, IPFS_HTTPS_LINK, OBJKT_CONTRACT, FULL_TXL_STATS, TXL_RANKINGS } from './constants.js'


export default {
  name: 'App',
  components: { walletConnect, displayTxl },
  data () {
    return {
      setAddress: "yolo",
      connectToBeacon: false,
      showModal: true,
      loadedTxl: -1,
      kalaTxls: [
      ],
      ownedTxls: [
      ],
      unSoldTxls: [
      ],
      uniqueTxlOwners: [
      ],
      soldTxls: [
      ],
      txlRank: -1,
      walletConnected: false,
      objktUrl: "", 
      displayLink: "",
      collectionAttributes: [
        {name: 'TXL ID', value: 1},
        {name: 'owner', value: ""},
        {name: 'Kala ID', value: 0}
      ],
      tokenAttributes: {}
    }
  },
  beforeMount() {
    this.addressReady()
    this.getAllTxlKalamintTokens()
  },
  methods: {
    canBuyOnObjkt (objkt_link) {
      this.objktUrl = objkt_link
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
      this.updateTxlLedger()
    },
    async updateTxlLedger () {
      let txl_id = 1
      this.ownedTxls = []
      this.unSoldTxls = []
      this.soldTxls = []
      let txlOwners = []

      for (txl_id; txl_id <= 272; ++txl_id) {
        const zero_filled_txl_id = zeroFillId(txl_id)
        const thisTxl = this.kalaTxls[txl_id - 1]
        if (this.kalaTxls[txl_id - 1]) {
          const thisTxlOwner = thisTxl.owner
          const index0 = txlOwners.length
          txlOwners[index0] = thisTxlOwner
          this.uniqueTxlOwners = [new Set(txlOwners)]
          this.uniqueTxlOwners = this.uniqueTxlOwners[0]
          if (thisTxlOwner === this.setAddress) {
            const index = this.ownedTxls.length
            const thisTxlRank = Number(TXL_RANKINGS[txl_id])
            this.ownedTxls[index] = {name: zero_filled_txl_id, value: txl_id, rank: thisTxlRank}
            const index2 = this.soldTxls.length
            this.soldTxls[index2] = {name: zero_filled_txl_id, value: txl_id}
          } else if (thisTxlOwner === OBJKT_CONTRACT) {
            const index = this.unSoldTxls.length
            const thisTxlRank = Number(TXL_RANKINGS[txl_id])
            this.unSoldTxls[index] = {name: zero_filled_txl_id, value: txl_id, rank: thisTxlRank}
          } else {
            const index3 = this.soldTxls.length
            this.soldTxls[index3] = {name: zero_filled_txl_id, value: txl_id}
          }
        }
      }
    },
    clearOwnedTxls () {
      this.ownedTxls = []
      this.setAddress = ""
    },
    async getAllTxlKalamintTokens () {
      const kala_tokens = await getAllKalamintTokens()
      let txl_id = 1
      for (txl_id; txl_id <= 272; ++txl_id) {
        const zero_filled_txl_id = zeroFillId(txl_id)
        let kala_token_id = ID_LOOKUP[zero_filled_txl_id]
        try {
          const thisTxl = await kala_tokens.get(kala_token_id)
          this.kalaTxls[txl_id - 1] = thisTxl
          this.updateTxlLedger()
        }
        catch (e) {
          console.log(e)
          this.kalaTxls[txl_id - 1] = undefined
        }
        this.loadedTxl = txl_id
      }
    },
    async loadTxl(token_id) {
      this.tokenAttributes = []
      this.txlRank = Number(TXL_RANKINGS[Number(token_id)])
      console.log(this.txlRank)
      if (token_id < 0  || token_id > 272) {
        alert("Please insert token ID between 1 and 272")
        return
      }
      const zero_filled_token_id = zeroFillId(token_id)
      const kalamint_token_id = ID_LOOKUP[zero_filled_token_id]
      const kalamint_tokens = await getAllKalamintTokens()

      token_id = Number(token_id)
      this.tokenAttributes = FULL_TXL_STATS[token_id]
      const thisTxl = await kalamint_tokens.get(kalamint_token_id)
      let owner = thisTxl.owner
      if (owner === OBJKT_CONTRACT) {
        owner = 'OBJKT MKTPLC'
      } else {
        owner = await reduceAddress(owner)
      }
      const displayLink = IPFS_HTTPS_LINK + thisTxl.ipfs_hash.split('//')[1]
      this.displayLink = displayLink
      this.collectionAttributes = [
        {name: 'TXL ID', value: token_id},
        {name: 'owner', value: owner},
        {name: 'Kala ID', value: kalamint_token_id}
      ]
      this.updateTxlLedger()
    },
    hideNft() {
      this.showModal = false
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
  color: #000000;
  background: black;
  margin:0;
  width: 100%;
  
}
body{
  margin:0px;
}
mainFlex {
    margin: 0px;
    display: flex;
    background: rgb(0, 0, 0);
    flex-direction: column;
}
</style>
