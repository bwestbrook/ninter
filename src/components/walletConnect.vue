<template>
    <div ref="walletConnectBar" class="headerForWallet">
        <ul class="navigation">
            <div class="connectWalletDisplay" ref="connectWalletDisplay"></div>
            <button @click="walletState" ref="connectWalletButton" class="connect-button">LOAD</button>
        </ul>
    </div>
</template>

<script>

import { getBeaconWallet, reduceAddress, disconnectFromBeacon } from '../services/beacon-services.js'

var reduced_address;

export default {
    data () {
        const connectToBeacon = this.$emit("toggleConnectToBeacon")
        const localConnectToBeacon = connectToBeacon
        return {
            localConnectToBeacon
        }
    },
    emits:[
        "addressReady",
        "toggleConnectToBeacon",
        "hideNft"
    ],
    beforeMount() {
        this.walletState()
    },
    props: [
        "connectToBeacon",
        "walletConnected"
    ],
    methods: {
        async displayWalletState(activeAccount) {
            const address = await activeAccount.address
            console.log(address)
            reduced_address = await reduceAddress(address)
            this.$refs.connectWalletDisplay.innerText = reduced_address
            this.$refs.connectWalletButton.innerText = "DISCONNECT"
            this.reduced_address = reduced_address
            this.setAddress = address
            console.log(this.$emit('addressReady', address))
        },
        async walletState() {
            const wallet = await getBeaconWallet();
            const activeAccount = await wallet.client.getActiveAccount()
            console.log(activeAccount)
            if (this.$refs.connectWalletButton.innerText === "CONNECT" && !activeAccount) {
                const perms = await wallet.requestPermissions()
                console.log(perms)
                const activeAccount = await wallet.client.getActiveAccount()
                this.displayWalletState(activeAccount)
            } else if (this.$refs.connectWalletButton.innerText === "DISCONNECT" && activeAccount) {
                await disconnectFromBeacon()
                this.$refs.connectWalletButton.innerText = "CONNECT"
                this.$refs.connectWalletDisplay.innerText = "..."
                console.log(this.$emit('addressReady', "..."))
                this.$emit("hideNft")
            } else if (this.$refs.connectWalletButton.innerText === "LOAD" && activeAccount) {
                this.displayWalletState(activeAccount)
            } else if (this.$refs.connectWalletButton.innerText === "LOAD" && !activeAccount) {
                this.$refs.connectWalletButton.innerText = "CONNECT"
                this.$refs.connectWalletDisplay.innerText = "..."
            } else if (activeAccount) {
                this.displayWalletState(activeAccount)
            } else {
                console.log("no action")
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
.connectWalletDisplay{
  color: #f0f8ff;
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
.headerForWallet{
    display: flex;
    justify-content: end;
}
</style>