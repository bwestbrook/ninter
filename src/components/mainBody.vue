<template>
    <div v-if="showModal"> 
        <displayPopup :displayLink="displayLink" :attributes="attributes" />
    </div>
  <p></p>

</template>

<script>

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