<template>
    <div class="likes">
        <img src="../assets/heart_white.png" v-on:click="showLikes" v-if="!likePage"/>
        <img src="../assets/white_filled_heart.png" v-on:click="showLikes" v-if="likePage"/>
    </div>
</template>

<script>
export default {
    props: {
        likePage: Boolean
    },

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
  padding: 23px;
  border-radius: 50%;
  cursor: pointer;
}
</style>