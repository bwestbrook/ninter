<template>
   <h1 class="customHeader" > Welcome to the 2.725K 2.0 Minter!</h1>
   <div ref="displayAddress" class="display-address"> </div>
        <input type="text" ref="inputAddress" :value="setAddress">
    <button @click="displayNftData" ref="getDataButton">Check My Account for 2.725Ks</button> 
</template>

<script>
export default {
    props: [
        "setAddress"
    ]
}
</script>

<style>

</style>