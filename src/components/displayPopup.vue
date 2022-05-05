<template>
    <div class="backdrop">
        <div class="modal">
            <img class="mainNftDisplay" ref="displayPng" :src="displayLink">
            <div class="keyColumn">
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
    width: 400px;
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
.attribtueDisplay{
    width: 200px;
    padding: 2px;
    margin: 10px auto;
    border-radius: 10px;
    border: 5px;
    color:rgb(199, 226, 175);
    background: rgb(143, 128, 128);
    font: bold;
    font-size: 15px;
}
</style>