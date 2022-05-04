<template>
    <div ref="walletConnectBar">
        <button @click="connectWallet" ref="connectWalletButton">Connect Wallet</button>
    </div>
</template>

<script>

import { DAppClient } from "@airgap/beacon-sdk";

export default {
    props: [
        "header_string",
        "information"
        ],
    methods: {
        async connectWallet () {

                const dAppClient = new DAppClient({ name: "Beacon Docs" });

                let myAddress = "";
                console.log(myAddress)
                const activeAccount = await dAppClient.getActiveAccount();
                console.log("aadgdafa")
                console.log(activeAccount)
                if (activeAccount) {
                    console.log("Already connected:", activeAccount.address);
                    myAddress = activeAccount.address;

                } else {
                    const permissions = await dAppClient.requestPermissions();
                    console.log("New connection:", permissions.address);
                    myAddress = permissions.address;
                }
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