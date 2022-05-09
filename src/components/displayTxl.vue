<template>
    <div class="mainFlex">
        <div class="attributeFlexContainer">
            <div @click="prevTxl" class="bigArrow" ref="prevArrow"> &#x2190; </div>
            <div class="collectionAttributeDisplay"> Loaded 2.725K: {{loadedTxl}} of 272 </div>
            <div class="collectionAttributeDisplay"> Rank TBC of 272 </div>
            <div class="collectionAttributeDisplay" v-for="key in collectionAttributes" :key="key.name">{{key.name}} : {{key.value}}</div>
            <div class="collectionAttributeDisplay" @click="buyOnObjkt" >Buy/Offer on Objkt!</div>
            <button @click="nextTxl" class="bigArrow" ref="nextArrow"> &#x2192; </button>
        </div>
        <div class="ownedTxlFlexContainer">
            <div class="ownedTxlContainer"> My TXLs:</div>
            <div @click="ownedTxlClick" class="ownedTxlContainer" v-for="index in ownedTxls" :key="index"> {{index.name}} </div>
        </div>
        <div class="genericFlex">
            <div class="displayBox">
                <img class="mainNftDisplay" ref="displayPng" :src="displayLink">
            </div>
            <div class="attributeFlexContainer">
                <div  v-for="(val, index) in tokenAttributes" :key="val"  >
                    <div class="attributeCategory" > {{index}} </div>
                    <div class="attributeValue"> {{val}} </div>
                </div>
            </div>
        </div>
         <div class="broswerFlexContainer">
            <div class="navButtons" @click="displayKalaTxl">Enter 2.725K ID</div>
            <input @enter="displayKalaTxl" placeholder="Check out a TXL" type="number" ref="searchTxl"/>
            <button class="navButtons" @click="displayKalaTxl">Check it out!</button>
            <button class="navButtons" @click="randomTxl">View a random 2.725K</button>
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
        "collectionAttributes",
        "tokenAttributes",
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
            let this_id = this.collectionAttributes[0].value
            this_id = Number(this_id)
            if (this_id < 1 || this_id > 272) {
                return
            } 
            if (this.$refs.searchTxl.value) {
                id = this.$refs.searchTxl.value
                console.log('emitting', id)
                this.$emit("loadTxl", id)
            }
        },
        prevTxl () {
            let this_id = this.collectionAttributes[0].value
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
            const random_txl_id = getRandomIntInclusive(1, 272)
            this.$emit("loadTxl", random_txl_id)
        },
        nextTxl () {
            let this_id = this.collectionAttributes[0].value
            let next_id = this_id
            this_id = Number(this_id)
            if (this_id === 272 ) {
                return
            } else {
                next_id = this_id + 1
                this.$emit("loadTxl", next_id)
            }
        },
        buyOnObjkt () {
            const kala_token_id = this.collectionAttributes[2].value
            const objkt_url = OBJKT_KALA_BASE + kala_token_id
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
.broswerFlexContainer{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    background: rgb(143, 128, 128);
}
.attributeFlexContainer{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background: rgb(143, 128, 128);
    }
.ownedTxlFlexContainer{
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    justify-content: space-around;
    background: rgb(143, 128, 128);
}
.ownedTxlContainer{
    padding: 2px;
    background: rgb(3, 2, 2);
    color: aliceblue;
    width: 50px;
    border-radius: 3px;
}
.mainFlex {
    padding: 20px;
    border: 5px;
    display: flex;
    border-radius: 4px;
    background: grey;
    flex-direction: column;
}
.collectionAttributeDisplay{
    padding: 2px;
    height: 75px;
    flex-basis: 100px;
    margin: 10px auto;
    border-radius: 5px;
    color:aliceblue;
    background: rgb(3, 2, 2);
    font: bold;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center; 
}
.attributeValue{
    padding: 2px;
    height: 25px;
    font-size: 20px;
    font: bold;
    margin: 10px auto;
    display: flex;
    border-radius: 5px;
    justify-content: center;
    color:rgb(3, 97, 181);
}
.attributeCategory{
    padding: 2px;
    width: 100px;
    height: 50px;
    flex-basis: 100px;
    margin: 10px auto;
    border-radius: 5px;
    color:aliceblue;
    background: rgb(25, 20, 20);
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
    height: 75px;
    color:aliceblue;
    background: rgb(3, 2, 2);
    font: bold;
    font-size: 50px;
    display: flex;
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
.navButtons{
    border-radius: 4px;
    min-width: 200px;
    margin: 2px; 
    background: rgb(13, 53, 27);
    color:aliceblue;
}

</style>