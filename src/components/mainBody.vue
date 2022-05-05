<template>
    <div ref="displayAddress" class="display-address"> </div>
        <input type="text" ref="inputAddress" placeholder="Enter TXL ID">
    <button @click="getLink" ref="getDataButton">Check My Account for 2.725Ks</button> 
    <a ref="selectedTxl">...</a>
    <div v-if="showModal"> 
        <displayPopup @open="displayNft" />
  </div>
</template>

<script>
import { getIpfsLink, getMyAddress, reduceAddress } from '../services/beacon-services.js'
import displayPopup from "./displayPopup.vue"

export default {
    components: { 
        displayPopup
    },
    props: [
        "showModal"
    ],
    methods: { 
        async getLink() {
            var address
            const input = this.$refs.inputAddress.value
            if (input) {
                address = input 
            } else {
                address = await getMyAddress()
            }
            const meta_data = await getIpfsLink(address)
            if (meta_data.artifactUri) {
                const reduced_url_str = await reduceAddress(meta_data.artifactUri)
                this.$refs.selectedTxl.innerText = "Link to metatdata: " + reduced_url_str
                const full_meta_data_url = 'https://' + meta_data.artifactUri
                this.$refs.selectedTxl.href = full_meta_data_url
        
                this.displayNft(full_meta_data_url)
            }
        },
        displayNft(full_meta_data_url) {
            console.log(full_meta_data_url)
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