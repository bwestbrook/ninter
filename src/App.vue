<template>
  <div class="mainBackground">
    <walletConnect />
    <inputSection :setAddress="setAddress" />
    <mainBody :showModal="showModal" @toggleModal="toggleModal" />
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
      showModal: false
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
    toggleModal() {
      this.showModal = !this.showModal
    },
    addressReady() {
      this.setAddress = "FAERTESDf"
      console.log('estoy aui')
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
