<template>
   <h1 class="customHeader" > Welcome to the 2.725K 2.0 Minter!</h1>
   <div ref="displayAddress" class="display-address"> </div>
        <input class="addressInput" type="text" ref="inputAddress" :value="setAddress">
    <button @click="displayNftData" ref="getDataButton">Check My Account for 2.725Ks</button> 
</template>

<script>
export default {
    emits: [
        "addressReady"
    ],
    props: [
        "setAddress"
    ]
}
</script>

<style>
.addressInput{
    width: 300px;

}
.customHeader{
    border: 5px;
    color: blue;
    border-bottom: 2px solid #ddd;
    display: inline-block;
    padding-bottom: 10px;
}
</style>