<template>
    <div class="displayAddressDiv" ref="displayAddress"> 
        <input class="addressInput" ref="inputAddress" type="text" :value="setAddress">
        <button @click="displayNftData" ref="getDataButton">Check Account for 2.725Ks</button> 
    </div>
</template>

<script>
import { IPFS_HTTPS_LINK } from '@/constants.js'
import { getIpfsMetaDataJson } from '../services/beacon-services.js'


export default {
    data () {
        return {
            attributes: [],
            displayLink: ""
        }
    },
    emits: [
        "addressReady",
        "toggleModal",
        "hideNft",
        "nftReady"
    ],
    props: [
        "setAddress"
    ],
    methods: {
        async displayNftData() {
            console.log(this.setAddress)
            const ipfs_meta_data_json = await getIpfsMetaDataJson(this.setAddress)
            const displayLink = IPFS_HTTPS_LINK + ipfs_meta_data_json.artifactUri.split('//')[1]
            this.$emit("nftReady", ipfs_meta_data_json.attributes, displayLink)
            this.$emit("toggleModal")
        }
    }
}
</script>

<style>
.displayAddressDiv{
    display: flex;
    width: 100%;
    justify-content: space-around;
    background-color: aqua;
}
.addressInput{
    display: flex;
    min-width: 300px;
    border-radius: 3px;
}
.customHeader{
    border: 5px;
    color: blue;
    border-bottom: 2px solid #ddd;
    display: inline-block;
    padding-bottom: 10px;
}
</style>