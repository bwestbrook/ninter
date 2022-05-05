<template>
    <div ref="walletConnectBar" class="d-flex flex-row">
        <ul class="navigation">
            <div ref="connectWalletDisplay"></div>
            <button @click="displayWalletState" ref="connectWalletButton" class="connect-button">CONNECT</button>
        </ul>
    </div>
</template>

<script>

import { connectToBeacon, reduceAddress, disconnectFromBeacon } from '../services/beacon-services.js'

var reduced_address;

export default {
    methods: {
        async displayWalletState() {
            const wallet = await connectToBeacon();
            const activeAccount = await wallet.client.getActiveAccount()
            if (this.$refs.connectWalletButton.innerText === "DISCONNECT" && activeAccount) {
                console.log("d")
                await disconnectFromBeacon()
                this.$refs.connectWalletDisplay.innerText = '...'
                this.$refs.connectWalletButton.innerText = "    CONNECT"
            } else {
                console.log(activeAccount.address)
                reduced_address = await reduceAddress(activeAccount.address)
                this.$refs.connectWalletDisplay.innerText = reduced_address
                this.$refs.connectWalletButton.innerText = "DISCONNECT"
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