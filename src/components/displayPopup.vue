<template>
    <div class="modal">
        <img class="mainNftDisplay" ref="displayPng" :src="displayLink">
        <div class="attributeFlexContainer">
            <div class="attribtueDisplay" v-for="key in attributes" :key="key.name">{{key.name}} : {{key.value}}</div>
        </div>
    </div>
    <div class="inputDiv">
        <input @enter="displayKalaTx" placeholder="Check out a TXL" type="number" ref="searchTxl"/>
        <button @click="displayKalaTxl">Check it out!</button>
    </div>

    <div>{{description}}</div>
</template>

<script>

import { PROJECT_DESCRIPTION } from '../constants.js'

export default {
    data () {
        return {
            description: PROJECT_DESCRIPTION
        }
    },
    emits: [
        "loadTxl",  
        ],
    props: [
        "attributes",
        "displayLink",
        ],
    methods: {
        closeModal() {
            console.log("hi close ")
        },
        displayKalaTxl (id = 102) {
            if (this.$refs.searchTxl) {
                id = this.$refs.searchTxl.value
            }
            this.$emit("loadTxl", id)
        }
    }
}
</script>

<style scoped>
.modal{
    padding: 20px;
    margin: 100px auto;
    border-radius: 10px;
    display: flex;
}
.inputDiv{
    padding: 20px;
    margin: 100px auto;
    border-radius: 10px;
    display: flex;
    justify-content: flex-end;
}
.backdrop{
    top: 0;
    background: rgb(44, 159, 80);
    width: 100%;
    height: 100%;
}
.mainNftDisplay{
    width: 500px;
    aspect-ratio: 1;
}
.attributeFlexContainer{
    display: flex;
    background: blanchedalmond;
    flex-wrap: wrap;
    align-items: center;
    }
.attribtueDisplay{
    padding: 2px;
    height: 100px;
    flex-basis: 100px;
    margin: 10px auto;
    border-radius: 10px;
    border: 5px;
    color:rgb(199, 226, 175);
    background: rgb(143, 128, 128);
    font: bold;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center; 
}
</style>