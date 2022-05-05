<template>
    <div ref="walletConnectBar" class="d-flex flex-row">
        <ul class="navigation">
            <div ref="connectWalletDisplay"></div>
            <button @click="displayWalletState" ref="connectWalletButton" class="connect-button">LOAD</button>
        </ul>
    </div>
</template>

<script>

import { getBeaconWallet, reduceAddress, disconnectFromBeacon } from '../services/beacon-services.js'

var reduced_address;


export default {
    emits:[
        "addressReady",
        "toggleConnectToBeacon"
    ],
    beforeMount() {
        this.displayWalletState()
    },
    props: [
        "connectToBeacon",
        "walletConnected"
    ],
    methods: {
        async walletState() {
            if (this.$refs.connectWalletButton.innerText === "CONNECT") {
                console.log('it was clicked to toggle Beacon')
                console.log(this.connectToBeacon)
                console.log(this.$emit("toggleConnectToBeacon"))
                const connectToBeacon = this.$emit("toggleConnectToBeacon")
                console.log(connectToBeacon)
                this.displayWalletState('false', 'false')
            } 
        },
        async displayWalletState() {
            const wallet = await getBeaconWallet();
            const activeAccount = await wallet.client.getActiveAccount()
            if (this.$refs.connectWalletButton.innerText === "DISCONNECT" && activeAccount) {
                await disconnectFromBeacon()
                this.$refs.connectWalletDisplay.innerText = '...'
                this.$refs.connectWalletButton.innerText = "CONNECT"
                console.log(this.$emit('addressReady', ""))
            } else if (this.$refs.connectWalletButton.innerText === "LOAD") {
                this.$refs.connectWalletButton.innerText = "CONNECT"
            } else {
                const activeAccount = await wallet.client.getActiveAccount()
                if (!activeAccount) {
                    await wallet.requestPermissions()
                    const activeAccount = await wallet.client.getActiveAccount()
                    const address = await activeAccount.address
                    reduced_address = await reduceAddress(address)
                    this.$refs.connectWalletDisplay.innerText = reduced_address
                    this.$refs.connectWalletButton.innerText = "DISCONNECT"
                    this.reduced_address = reduced_address
                    this.setAddress = address
                    console.log(this.$emit('addressReady', address))
                } else {
                    const activeAccount = await wallet.client.getActiveAccount()
                    const address = await activeAccount.address
                    reduced_address = await reduceAddress(address)
                    this.$refs.connectWalletDisplay.innerText = reduced_address
                    this.$refs.connectWalletButton.innerText = "DISCONNECT"
                    this.reduced_address = reduced_address
                    this.setAddress = address
                    console.log(this.$emit('addressReady', address))
                }

            }
        }
    }
}


</script>

<style scoped>
.modal {
  width: 400px;
  padding: 20px;
  margin: 100px auto;
  border-radius: 10px;
}
.backdrop {
  top: 0;
  background: rgb(0.1, 0.1, 0.1);
  width: 100%;
  height: 100%;
}
.navigation {
    padding: 20px;
    border: 5px;
    display: inline-flex;
    border-radius: 4px;
    list-style-type: none;
}
.connect-button{
    padding: 2px;
    border: 50px;
    border-radius: 4px;
    background: rgb(28, 51, 121);
    color:aliceblue;
    justify-content: center;
    align-content: center;
    flex-direction: column;
}
.display-address{
    padding: 20px;
    border: 5px;
}
</style>