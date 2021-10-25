<template>
  <div id="app">
    <div class="head">
      <search v-on:submitted="sendUrl" ref="search" />
      <likes v-on:clicked="showLikes" v-bind:likePage="likePage" />
    </div>
    <gallery ref="gallery" class="gallery" v-on:changed="setLikePage" />
  </div>
</template>

<script>
import search from "./components/search.vue";
import gallery from "./components/gallery.vue";
import likes from "./components/likes.vue";

export default {
  name: "App",
  components: {
    search,
    gallery,
    likes,
  },

  data() {
    return {
      likePage: false,
    };
  },

  methods: {
    sendUrl: function (url, input) {
      this.$refs.gallery.search(url, input);
    },
    showLikes: function () {
      if (!this.likePage) {
        this.$refs.gallery.showLikes();
      } else {
        this.likePage = false;
        this.$refs.gallery.getRandomPhotos();
      }
    },
    setLikePage(bool) {
      this.likePage = bool;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
#app {
  font-family: "Open sans", sans-serif;
  margin: 60px auto 20px auto;
  width: 80%;
}
.head {
  display: flex;
  justify-content: space-between;
}
.gallery {
  margin-bottom: 50px;
}
</style>
