<template>
    <div class="backdrop" @click="closeModal">
        <div class="modal">
            <h1>{{header_string}}</h1>
            <p> {{information}} </p>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        "header_string",
        "information",
        ],
    methods: {
        closeModal() {
            this.$emit("close")
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