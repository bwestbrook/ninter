<template>
    <h1 class="customHeader" > Welcome to the 2.725K 2.0 Minter!</h1>
    <div class="display-address" ref="displayAddress"> </div>
    <input class="addressInput" type="text" ref="inputAddress" :value="setAddress">
    <button @click="displayNftData" ref="getDataButton">Check Account for 2.725Ks</button> 
</template>

<script>
import { IPFS_HTTPS_LINK } from '@/constants.js'
import { getIpfsMetaDataJson } from '../services/beacon-services.js'
//import { IPFS_HTTPS_LINK } from '@/constants.js'
//import { getIpfsMetaDataJson, getMyAddress, reduceAddress } from '../services/beacon-services.js'

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
.addressInput{
    width: 220px;
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