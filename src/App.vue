<template>
  <div class="mainBackground">
    <div class="walletConnectDiv">
      <walletConnect :connectToBeacon="connectToBeacon" :walletConnected="walletConnected" @hideNft="hideNft" @nftReady="nftReady" @addressReady="addressReady" @toggleConnectToBeacon="toggleConnectToBeacon" />
    </div>
    <div v-if="showModal"> 
      <displayPopup :displayLink="displayLink" :attributes="attributes" />
    </div>
  </div>
</template>

<script>

import walletConnect from "./components/walletConnect.vue"
import displayPopup from "./components/displayPopup.vue"


export default {
  name: 'App',
  components: { walletConnect, displayPopup },
  data () {
    return {
      setAddress: "yolo",
      connectToBeacon: false,
      showModal: false,
      walletConnected: false,
      displayLink: "adfdsaf",
      attributes: ["DF", 3, 'a']
    }
  },
  beforeMount() {
    this.addressReady()
  },
  methods: {
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
  justify-content: end;
}
.inputSectionDiv{
  background: green;
  display: flex;
  justify-content: end;
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
