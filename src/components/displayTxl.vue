<template>
    <div class="mainFlex">
        <div v-if="false" class="tabFlexContainer">
            <div class="tabButtons"> LearnMore </div>
            <div class="tabButtons"> Browsing View </div>
            <div class="tabButtons"> Gallery View </div>
            <div class="tabButtons"> Leader Board </div>
        </div>
        <div class="ownedTxlFlexContainer">
            <div class="attributeCategory"> Total Sold  </div>
            <div class="attributeCategory"> {{soldTxls.length}}  </div>
            <div class="attributeCategory"> Unique Wallets </div>
            <div class="attributeCategory"> {{uniqueTxlOwners.size}}   </div>
        </div>
        <div class="howToFlexContainer">    
            <div class="description"> {{howTo}}</div>
        </div>
        <div class="ownedTxlFlexContainer">
            <div class="ownedTxlContainer"> ID (Rank) </div>
            <button @click="ownedTxlClick" class="ownedTxlButton" v-for="index in ownedTxls" :key="index"> {{index.name}} ({{index.rank}}) </button>
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

        <div class="attributeFlexContainer">
            <div @click="prevTxl" class="bigArrow" ref="prevArrow"> &#x2190; </div>
            <div class="collectionAttributeDisplay"> Rank {{txlRank + 1}} of 272 </div>
            <div class="collectionAttributeDisplay" v-for="key in collectionAttributes" :key="key.name">{{key.name}} : {{key.value}}</div>
            <div class="attributeFlexButton" @click="buyOnObjkt" >Buy/Offer on Objkt!</div>
            <button @click="nextTxl" class="bigArrow" ref="nextArrow"> &#x2192; </button>
        </div>
        <div class="broswerFlexContainer">
            <input v-on:keydown.enter="displayKalaTxlRank" placeholder="Search By Rank" type="number" ref="searchRankTxl"/>
            <input v-on:keydown.enter="displayKalaTxl" placeholder="Search By ID" type="number" ref="searchTxl"/>
            <button class="navButtons" @click="randomTxl">View a random 2.725K</button>
        </div>
        <div class="primaryFlexContainer">
            <div> All of the 2.725Ks below are on primary! </div>
        </div>
        <div class="unSoldTxlFlexContainer">
            <div class="ownedTxlContainer"> ID (RANK)  </div>
            <button @click="ownedTxlClick" class="ownedTxlButton" v-for="index in unSoldTxls" :key="index"> {{index.name}} ({{index.rank}}) </button>
        </div>
        <div class="ownedTxlFlexContainer">
            Learn more about these awesome NFTs!
        </div>
        <div class="descriptionFlexContainer">
            <div class="description"> {{description}}</div>
            <img src="../assets/Promo_Small.gif" style="width:300px;height:300px;">
            <img src="../assets/Physical_Chips.jpg" style="width:500px;height:300px;">
        </div>
        <div class="descriptionFlexContainer">
            <div class="description"> {{status}}</div>
        </div>
        <div class="descriptionFlexContainer">
            <a href="{{rankings_hash}}">IPFS LINK TO ALL METADETA: {{rankings_hash}}</a>
        </div>
        <div class="descriptionFlexContainer">
            <div>{{footer}}</div>
        </div>
    </div>
  
</template>

<script>


import { getRandomIntInclusive } from '../services/utilities.js'
import {
    PROJECT_DESCRIPTION, 
    FOOTER,
    PROJECT_STATUS,
    HOW_TO,
    OBJKT_KALA_BASE,
    TXL_REV_RANKINGS,
    RANKINGS_HASH } from '../constants.js'
import $ from 'jquery'


export default {
    data () {
        return {
            description: PROJECT_DESCRIPTION,
            footer: FOOTER,
            status: PROJECT_STATUS,
            howTo: HOW_TO,
            rankings_hash: RANKINGS_HASH
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
        "unSoldTxls",
        "soldTxls",
        "txlRank",
        "uniqueTxlOwners",
        "clickedOwnedTxl"
        ],
    methods: {
        ownedTxlClick: function (e) {
            var clickedOwnedTxl = e.target;
            console.log($(clickedOwnedTxl).text().split(' ')[0])
            const txl_id = $(clickedOwnedTxl).text().split(' ')[0]
            console.log(txl_id)
            this.$emit("loadTxl", txl_id)
            clickedOwnedTxl = txl_id
            return clickedOwnedTxl
        },
        closeModal() {
            console.log("hi close ")
        },
        displayKalaTxlRank () {
            if (this.$refs.searchRankTxl.value) {
                if (Number(this.$refs.searchRankTxl.value) < 1 || Number(this.$refs.searchRankTxl.value) > 272 ) {
                    return
                }
                const txl_rank = Number(this.$refs.searchRankTxl.value) - 1
                const txl_id = TXL_REV_RANKINGS[txl_rank]
                this.$emit("loadTxl", txl_id)
            }
        },
        displayKalaTxl () {
            if (this.$refs.searchTxl.value) {
                if (Number(this.$refs.searchTxl.value) < 1 || Number(this.$refs.searchTxl.value) > 272 ) {
                    return
                }
                const txl_id = String(this.$refs.searchTxl.value)
                this.$emit("loadTxl", txl_id)
            }
        },
        prevTxl () {
            let this_rank = this.txlRank
            this_rank = Number(this_rank)
            let prev_rank = this_rank
            if (this_rank === 0) {
                return
            } else {
                prev_rank = this_rank - 1
                const txl_id = TXL_REV_RANKINGS[prev_rank]
                this.$emit("loadTxl", txl_id)
            }
        },
        nextTxl () {
            let this_rank = this.txlRank
            this_rank = Number(this_rank)
            let next_rank = this_rank
            if (this_rank === 271 ) {
                return
            } else {
                next_rank = this_rank + 1
                const txl_id = TXL_REV_RANKINGS[next_rank]
                this.$emit("loadTxl", txl_id)
            }
        },
        randomTxl () {
            const random_txl_id = getRandomIntInclusive(1, 272)
            this.$emit("loadTxl", random_txl_id)
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
    background: rgb(115, 96, 96);
    justify-content: flex-end;
}
.genericVerticalFlex{
    padding: 10px;
    margin: 1px auto;
    border-radius: 10px;
    display: flex;
    background: rgb(143, 128, 128);
    justify-content: flex-end;
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
.attributeFlexButton{
    padding: 2px;
    height: 75px;
    flex-basis: 100px;
    margin: 10px auto;
    border-radius: 5px;
    border-style: solid;
    color:aliceblue;
    background: rgb(59, 37, 37);
    font: bold;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center; 
}
.ownedTxlFlexContainer{
    display: flex;
    flex-wrap: wrap;
    margin: 1px;
    padding: 3px;
    align-content: space-between;
    justify-content: space-between;
    background: rgb(143, 128, 128);
}
.unSoldTxlFlexContainer{
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: space-between;
    background: rgb(115, 96, 96);   
}
.ownedTxlButton{
    padding: 2px;
    background: rgb(87, 58, 58);
    color: aliceblue;
    border-radius: 5px;
    border-style: solid;
    border-color: aliceblue;
    margin: 2px;
    width: 75px;
    border-radius: 6px;
}
.ownedTxlContainer{
    padding: 2px;
    background: rgb(3, 2, 2);
    color: aliceblue;
    width: 100px;
    height: 20px;
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
    width: 125px;
    font-size: 16px;
    font: bold;
    margin: 10px auto;
    display: flex;
    border-radius: 5px;
        border-style: solid;
    border: 1px;
    border-color: aliceblue;
    justify-content: center;
    color:rgb(4, 25, 44);
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
    border: 1px;
    border-style: solid;
    height: 75px;
    color:aliceblue;
    background: rgb(59, 37, 37);
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
.tabFlexContainer{
    display: flex;
    background: rgb(143, 128, 128);
    align-content: space-between;
    justify-content: space-between;
}
.tabButtons{
    border-radius: 4px;
    min-width: 200px;
    margin: 2px; 
    display: flex;
    background: rgb(46, 17, 17);
    color:aliceblue;
}
.navButtons{
    border-radius: 4px;
    min-width: 200px;
    margin: 2px; 
    background: rgb(22, 32, 25);
    color:aliceblue;
}
.primaryFlexContainer{
    display: flex;
    font-size: 30px;
    color: rgb(8, 19, 29);
    font-stretch: expanded;
    font-style: bold;
    align-content: center;
    justify-content: center;
}
.howToFlexContainer{
    display: flex;
    align-content: center;
    justify-content: center;
}
.descriptionFlexContainer{
    display: flex;
    align-content: center;
    justify-content: flex-start;
    background: rgb(143, 128, 128);
}
.descriptionContainer{
    display: flex;
    justify-content: flex-start;
    align-content: center;
    height: 30px;
    margin: 1px;
    color:aliceblue;
}
.description{
    display: flex;
    justify-content: flex-start;
    align-content: center;
    color:aliceblue;
}

</style>