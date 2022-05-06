<template>
    <div class="backdrop">
        <div class="modal">
            <img class="mainNftDisplay" ref="displayPng" :src="displayLink">
            <div class="attributeFlexContainer">
                <div class="attribtueDisplay" v-for="key in attributes" :key="key.name">{{key.name}} : {{key.value}}</div>
            </div>
            <a ref="selectedTxl">...</a>
        </div>
    </div>
</template>

<script>

export default {
    props: [
        "attributes",
        "displayLink"
        ],
    methods: {
        closeModal() {
            console.log("hi close ")
        }
    }
}

</script>

<style scoped>
.modal{
    padding: 20px;
    margin: 100px auto;
    border-radius: 10px;
}
.backdrop{
    top: 0;
    background: rgb(44, 159, 80);
    width: 100%;
    height: 100%;
}
.mainNftDisplay{
    width: 200px;
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