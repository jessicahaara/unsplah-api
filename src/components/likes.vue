<template>
    <div class="likes">
        <img src="../assets/heart_white.png" v-on:click="showLikes" />

    </div>
</template>

<script>
export default {

    methods: {
        showLikes: function () {
            this.$emit('clicked')
        }
    }
}
</script>

<style scoped>
img {
  width: 25px;
  height: auto;
  background-color: #e17f7e;
  padding: 20px;
  border-radius: 50%;
  cursor: pointer;
}
</style>