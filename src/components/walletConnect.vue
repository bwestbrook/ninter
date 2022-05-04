<template>
    <div ref="walletConnectBar">
        <button @click="connectWallet" ref="connectWalletButton">Connect Wallet</button>
    </div>
</template>

<script>

import { BeaconWallet } from '@taquito/beacon-wallet'
import { TezosToolkit } from '@taquito/taquito'
import { NODE_URL } from '../constants'

const Tezos = new TezosToolkit(NODE_URL);

let globalWallet = undefined // Starts as a global undefined varible 

const getBeaconInstance = async () => {
    if (!globalWallet) {
        // Create a new BeaconWallet instance. The options will be passed to the DAppClient constructor.
        const wallet = new BeaconWallet({name: "txl"})
        // Setting the wallet as the wallet provider for Taquito.
        Tezos.setWalletProvider(wallet)
        globalWallet = wallet
        console.log(wallet)
        console.log(Tezos)
    }
    console.log("returning")
    console.log(globalWallet)
    return globalWallet
}

export default {
    props: [
        "header_string",
        "information"
        ],
    methods: {
        async connectWallet () {
                const wallet = await getBeaconInstance({name: "TXL"})
                console.log(wallet)
                console.log("requesting permission")
                await wallet.requestPermissions()
        }  
    }
}

</script>

<style scoped>
.modal{
    width: 400px;
    padding: 20px;
    margin: 100px auto;
    border-radius: 10px;
}
.backdrop{
    top: 0;
    background: rgb(0.1, 0.1, 0.1);
    width: 100%;
    height: 100%;
}
</style>