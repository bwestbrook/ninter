<template>
    <div class="navigationBarFlex">
        <div class="navBarTitle">{{title}}</div>
        <div class="genericFlex">
            <div class="walletFlexItem" ref="balanceDisplay"></div>
            <div class="walletFlexItem" ref="txlBalanceDisplay"> 2.725K Bal: {{ownedTxls.length}} </div>
        </div>
        <div class="genericFlex">
            <div class="walletFlexItem" @click="walletState" ref="connectWalletButton" >LOAD</div>
            <div class="walletFlexItem" ref="addressDisplay"></div>
        </div>

    </div>
</template>

<script>

import { NODE_URL } from '../constants'
import { TezosToolkit } from '@taquito/taquito'
import { getBeaconWallet, disconnectFromBeacon } from '../services/tezos-services.js'
import { reduceAddress } from '../services/utilities.js'


const Tezos = new TezosToolkit(NODE_URL);

var reduced_address;

export default {
    data () {
        const connectToBeacon = this.$emit("toggleConnectToBeacon")
        const localConnectToBeacon = connectToBeacon
        return {
            setAddress: "",
            title: "Welcome to the TXL 2.725K Explorer!",
            localConnectToBeacon
        }
    },
    emits:[
        "addressReady",
        "toggleConnectToBeacon",
        "toggleModal",
        "hideNft",
        "nftReady",
        "updateOwnedTxls",
        "loggedOut"
    ],
    beforeMount() {
        this.walletState()
    },
    props: [
        "connectToBeacon",
        "walletConnected",
        "ownedTxls",
        "nOwnedTxls"
    ],
    methods: {
        resetWalletUiState () {
            this.$refs.connectWalletButton.innerText = "CONNECT"
            this.$refs.addressDisplay.innerText = "Addr: ..."
            this.$refs.balanceDisplay.innerText = "Bal: ..."
            this.$refs.txlBalanceDisplay.innerText = "2.725K Bal: ..."
            this.$emit("loggedOut")
        },
        async displayWalletState(activeAccount) {
            const address = await activeAccount.address
            const balance = await Tezos.rpc.getBalance(address)
            const balance_num = (balance.toNumber() * 1e-6).toFixed(3) // mutez to Tez 
            reduced_address = await reduceAddress(address)
            this.$refs.addressDisplay.innerText = 'Addr: ' + reduced_address
            this.$refs.balanceDisplay.innerText = 'Bal: ' + balance_num + ' $XTZ'
            this.$refs.connectWalletButton.innerText = "DISCONNECT"
            this.$refs.txlBalanceDisplay.innerText = '2.725K Bal: ' + this.ownedTxls.length
            this.$emit("addressReady", address)
            this.$emit("updateOwnedTxls", address)
        },
        async walletState() {
            const wallet = await getBeaconWallet();
            const activeAccount = await wallet.client.getActiveAccount()
            if (this.$refs.connectWalletButton.innerText === "CONNECT" && !activeAccount) {
                const perms = await wallet.requestPermissions()
                console.log(perms)
                const activeAccount = await wallet.client.getActiveAccount()
                this.displayWalletState(activeAccount)
            } else if (this.$refs.connectWalletButton.innerText === "DISCONNECT" && activeAccount) {
                await disconnectFromBeacon()
                this.resetWalletUiState()
                this.$emit("hideNft")
            } else if (this.$refs.connectWalletButton.innerText === "LOAD" && activeAccount) {
                this.displayWalletState(activeAccount)
            } else if (this.$refs.connectWalletButton.innerText === "LOAD" && !activeAccount) {
                this.resetWalletUiState()
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
.backdrop {
  top: 0;
  background: rgb(0.1, 0.1, 0.1);
  width: 100%;
  height: 100%;
}
.navigationBarFlex {
    flex-shrink: 50;
    padding: 2px;
    width: 100%;
    border: 5px;
    display: flex;
    border-radius: 4px;
    background: grey;
    justify-content: flex-end;
}
.wallConnectFlex {
    flex-shrink: 1;
    padding: 20px;
    border: 5px;
    display: flex;
    border-radius: 4px;
    background: grey;
    flex-direction: column;
}
.walletFlexItem{
    color: #2f77b5;
    background: rgb(1, 10, 10);
    background-color: rgb(180, 161, 161); 
    margin: 2px; 
    text-align: center; 
    border-radius: 4px;
    max-width: 300px;
    padding: 5px;
    font-size: 16px; 
}
.connectButton{
    padding: 5px;
    border: 5px;
    border-radius: 4px;
    min-width: 200px;
    margin: 2px; 
    background-color: rgb(180, 161, 161); 
    color:aliceblue;
}
.displayAddress{
    padding: 20px;
    border: 5px;
}
.addressInput {
    font-size: 9.5px;
}
.navBarTitle{
    padding: 20px;
    border: 5px;
    font-size: xx-large;
    width: 60%;
}
.headerForWallet{
    display: flex;
    justify-content: flex-end;
}
</style>