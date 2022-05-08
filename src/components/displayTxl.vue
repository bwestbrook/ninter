<template>
    <div class="mainFlex">

        <div class="attributeFlexContainer">
            <div class="attributeDisplay"> Loaded TXL: {{loadedTxl}} of 272 </div>
            <div @click="ownedTxlClick" class="attributeDisplay" v-for="index in ownedTxls" :key="index"> {{index.name}} </div>
            <div class="genericVerticalFlex">
                <input @enter="displayKalaTxl" placeholder="Check out a TXL" type="number" ref="searchTxl"/>
                <button @click="displayKalaTxl">Check it out!</button>
                <button @click="randomTxl">Random 2.725K</button>
                <button @click="buyOnObjkt" :url="objktUrl">Buy on Objkt!</button>
            </div>
        </div>
        <div class="attributeFlexContainer">
            <div class="attributeDisplay" v-for="key in attributes" :key="key.name">{{key.name}} : {{key.value}}</div>
        </div>
        <div class="genericFlex">
            <div @click="prevTxl" class="bigArrow" ref="prevArrow"> &#8711; </div>
            <div class="displayBox">
                <img class="mainNftDisplay" ref="displayPng" :src="displayLink">
            </div>
            <div class="attributeFlexContainer">
                <p>Hello World</p>
            </div>

            <button @click="nextTxl" class="bigArrow" ref="nextArrow"> &#916; </button>
        </div>
        <div>{{description}}</div>
    </div>    
</template>

<script>


import { getRandomIntInclusive } from '../services/utilities.js'
import { PROJECT_DESCRIPTION, OBJKT_KALA_BASE } from '../constants.js'
import $ from 'jquery'


export default {
    data () {
        return {
            description: PROJECT_DESCRIPTION
        }
    },
    beforeMount(){
        this.randomTxl()
    },
    emits: [
        "loadTxl",  
        "canBuyOnObjkt"
        ],
    props: [
        "attributes",
        "displayLink",
        "objktUrl",
        "loadedTxl",
        "ownedTxls",
        "clickedOwnedTxl"
        ],
    methods: {
        ownedTxlClick: function (e) {
            var clickedOwnedTxl = e.target;
            const txl_id = $(clickedOwnedTxl).text()
            this.$emit("loadTxl", txl_id)
            clickedOwnedTxl = txl_id
            return clickedOwnedTxl
        },
        closeModal() {
            console.log("hi close ")
        },
        displayKalaTxl (id = 102) {
            let this_id = this.attributes[1].value
            this_id = Number(this_id)
            if (this_id < 1 || this_id > 272) {
                return
            } 
            if (this.$refs.searchTxl.value) {
                id = this.$refs.searchTxl.value
                this.$emit("loadTxl", id)
            }
        },
        prevTxl () {
            console.log("changing", this.attributes[1])
            let this_id = this.attributes[1].value
            let next_id = this_id
            this_id = Number(this_id)
            if (this_id === 1 ) {
                return
            } else {
                next_id = this_id - 1
                this.$emit("loadTxl", next_id)
            }
        },
        randomTxl () {
            console.log("")
            const random_txl_id = getRandomIntInclusive(1, 272)
            this.$emit("loadTxl", random_txl_id)
        },
        nextTxl () {
            console.log("changing", this.attributes[1])
            let this_id = this.attributes[1].value
            let next_id = this_id
            this_id = Number(this_id)
            if (this_id === 272 ) {
                return
            } else {
                next_id = this_id + 1
                console.log("this nex")
                console.log(next_id)
                this.$emit("loadTxl", next_id)
            }
        },
        buyOnObjkt () {
            const token_id = this.attributes[3].value
            const objkt_url = OBJKT_KALA_BASE + token_id
            window.open(objkt_url, '_blank');

        }
    }
}
</script>

<style scoped>
.genericFlex{
    padding: 10px;
    margin: 1px auto;
    border-radius: 10px;
    display: flex;
    background: rgb(143, 128, 128);
    justify-content: end;
}
.genericVerticalFlex{
    padding: 10px;
    margin: 1px auto;
    border-radius: 10px;
    display: flex;
    background: rgb(143, 128, 128);
    justify-content: end;
    flex-direction: column; 
}
.inputDiv{
    padding: 20px;
    margin: 100px auto;
    border-radius: 10px;
    display: flex;
    justify-content: flex-end;
}
.mainNftDisplay{
    width: 500px;
    height: 500px;
    scale: inherit;
    display: flex;
    justify-content: center;
    align-self: center;
}
.displayBox{
    width: 650px;
    height: 510px;
    background-color: rgb(32, 24, 29);
    border: 5px;    
    border-radius: 5px;   
    display: flex;
    justify-content: center;
    align-self: center;
}
.attributeFlexContainer{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background: rgb(143, 128, 128);
    }
.chonky{
    padding: 2px;
    background: rgb(230, 77, 77);
    height: 100px;
}
.mainFlex {
    padding: 20px;
    border: 5px;
    display: flex;
    border-radius: 4px;
    background: grey;
    flex-direction: column;
}
.attributeDisplay{
    padding: 2px;
    height: 100px;
    flex-basis: 100px;
    margin: 10px auto;
    border-radius: 10px;
    border: 5px;
    color:rgb(199, 226, 175);
    background: rgb(90, 45, 45);
    font: bold;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center; 
}
.bigArrow{
    padding: 3px;
    flex-basis: 100px;
    margin: 0px auto;
    border-radius: 10px;
    border: 5px;
    height: 5%;
    color:rgb(199, 226, 175);
    background: rgb(60, 52, 57);
    font: bold;
    font-size: 50px;
    justify-content: center;
    align-items: center; 
}
.connectButton{
    padding: 5px;
    border: 50px;
    border-radius: 4px;
    min-width: 200px;
    margin: 2px; 
    background: rgb(150, 31, 193);
    color:aliceblue;
}
</style>