<template>
  <walletConnect />
  <div v-if="showModal"> 
     <displayPopup />
  </div>
  <mainBody />
</template>


<script>

import displayPopup from "./components/displayPopup.vue"
import walletConnect from "./components/walletConnect.vue"
import mainBody from "./components/mainBody.vue"


export default {
  name: 'App',
  components: { displayPopup, walletConnect, mainBody },
  data () {
    return {
      title: "TXL Minter be like it do",
      header_string: "This be the header yo",
      showModal: false
    }
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
    toggleModal () {
      this.showModal = !this.showModal
      if (!this.showModal) {
            this.$refs.showModalButton.innerText = "SHOW"
        } else {
          this.$refs.showModalButton.innerText = "HIDE"
        }
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
  margin-top: 60px;
}
h1{
  border-bottom: 1px solid #ddd;
  display: inline-block;
  padding-bottom: 10px;
}
</style>
