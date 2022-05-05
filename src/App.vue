<template>
  <div class="mainBackground">
    <walletConnect :connectToBeacon="connectToBeacon" :walletConnected="walletConnected" @addressReady="addressReady" @toggleConnectToBeacon="toggleConnectToBeacon" />
    <inputSection :setAddress="setAddress" @addressReady="addressReady" />
    <mainBody :showModal="showModal"  />
  </div>
</template>

<script>

import walletConnect from "./components/walletConnect.vue"
import inputSection from "./components/inputSection.vue"
import mainBody from "./components/mainBody.vue"


export default {
  name: 'App',
  components: { walletConnect, inputSection, mainBody },
  data () {
    return {
      setAddress: "yolo",
      connectToBeacon: false,
      showModal: false,
      walletConnected: false
    }
  },
  beforeMount() {
    this.addressReady()
    this.checkWallet()
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
    toggleModal() {
      this.showModal = !this.showModal
    },
    toggleConnectToBeacon() {
      console.log("toggling beacon state")
      console.log(this.connectToBeacon)
      if (!this.connectToBeacon) {
        this.connectToBeacon = true
      }
      console.log(this.connectToBeacon)
      console.log("toggled beacon state")
      const connectToBeacon = this.connectToBeacon
      return {
        connectToBeacon
      }
    },
    addressReady(address='') {
      this.setAddress = address
      console.log(this.setAddress)
      console.log('estoy aui')
    },
    checkWallet() {
      console.log('esdsafdsatoy aui')
    },    
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
.customHeader{
  border-bottom: 2px solid #ddd;
  display: inline-block;
  padding-bottom: 10px;
}
.mainBackground{
  border-bottom: 1px solid #ddd;
  display: inline-block;
  padding-bottom: 10px;
  border-radius: 2px;
  background: rgb(170, 158, 158);
  width: 100%;
  height: 100%;
}
</style>
