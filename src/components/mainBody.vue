<template>
    <a ref="selectedTxl">...</a>
    <div v-if="showModal"> 
        <displayPopup :displayLink="displayLink" :attributes="attributes" />
    </div>
  <p></p>

</template>

<script>
import { IPFS_HTTPS_LINK } from '@/constants.js'
import { getIpfsMetaDataJson, getMyAddress, reduceAddress } from '../services/beacon-services.js'
import displayPopup from "./displayPopup.vue"

export default {
    data () {
        return {
            displayLink: "",
            attributes: null
        }
    },
    components: { 
        displayPopup
    },
    props: [
        "showModal"
    ],
    emits: [
        "toggleModal"
    ],
    methods: { 
        async getLink(address='') {
            const meta_data = await getMyAddress(address)
            return meta_data.artifactUri
        },
        async getMetaData(address='') {
            const input = this.$refs.inputAddress.value
            console.log("input", input, "input")
            if (input) {
                address = input 
            } else {
                address = await getMyAddress()
                console.log("addy is what", address)
            }
            console.log(address)
            const meta_data = await getIpfsMetaDataJson(address)
            console.log(meta_data)
            if (meta_data) {
                return {
                    meta_data
                }
            }
        },
        async displayNftData() {
            const meta_data = await this.getMetaData()
            if (!meta_data) {
                return
            }
            console.log('rehase')
            console.log(meta_data.meta_data)
            const meta_data_hash = meta_data.meta_data.artifactUri.split('/')
            console.log("hash")
            console.log(meta_data_hash)
            const full_meta_data_url = IPFS_HTTPS_LINK + meta_data_hash[2]
            const reduced_url_str = await reduceAddress(full_meta_data_url)
            this.$refs.selectedTxl.innerText = "Link to metatdata: " + reduced_url_str
            this.$refs.selectedTxl.href = full_meta_data_url
            this.displayLink = full_meta_data_url
            this.attributes = meta_data.meta_data.attributes
            this.$emit("toggleModal")
            for (var key in meta_data.attributes) {
                console.log(meta_data.attributes[key])
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
.displayPng{
    top: 0;
    background: rgb(0.1, 0.1, 0.1);
    width: 50%;
    height: 50%;
}
</style>