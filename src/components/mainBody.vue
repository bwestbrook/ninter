<template>
    <div ref="displayAddress" class="display-address"> </div>
        <input type="text" ref="txlId" placeholder="Enter TXL ID">
    <button @click="getLink" ref="getDataButton">Get Data</button> 
    <button @click="toggleModal" ref="showModalButton">SHOW</button> 
    <a ref="selectedTxl">...</a>
</template>

<script>
import { getIpfsLink, getMyAddress, reduceAddress } from '../services/beacon-services.js'

export default {
    methods: { 
        async getLink() {
            const address = await getMyAddress()
            const ipfs_link = await getIpfsLink(address)
            console.log(ipfs_link)
            const reduced_ipfs_str = await reduceAddress(ipfs_link)
            this.$refs.selectedTxl.innerText = "Link to metatdata: " + reduced_ipfs_str
            this.$refs.selectedTxl.href = ipfs_link
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