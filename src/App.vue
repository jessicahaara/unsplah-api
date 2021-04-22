<template>
  <div id="app">
    <!-- <h1>Unsplash API</h1> -->
    <div class="head">
      <search v-on:submitted="sendUrl" ref="search" />
      <likes v-on:clicked="showLikes" />
    </div>
    <gallery ref="gallery" class="gallery" />
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
    return {};
  },

  methods: {
    sendUrl: function (url, input) {
      this.$refs.gallery.search(url, input);
    },
    showLikes: function () {
      this.$refs.gallery.showLikes();
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
#app {
  font-family: "Open sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
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
