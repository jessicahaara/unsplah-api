<template>
  <div>
    <h1>{{ searchWord }} Photos</h1>
    <div class="grid">
      <div
        v-for="(picture, index) in results"
        v-bind:key="index"
        class="img_div"
      >
        <div class="pic">
          <img v-bind:src="picture.urls.small" v-on:click="sendImg(index)" />

          <div class="middle">
            <p class="name">Photo by: {{ picture.user.name }}</p>
            <a
              v-bind:href="picture.user.portfolio_url"
              v-if="picture.user.portfolio_url"
              target="_blank"
            >
              @ Portfolio link
            </a>
          </div>
        </div>
      </div>
    </div>
    <lightbox ref="lightbox" v-on:changeImg="changeImg" />
    <div class="pager" v-if="pages > 1">
      <pager v-on:changedPage="changedPage" v-bind:pages="pages" />
    </div>
    <div class="no-pager" v-else></div>
  </div>
</template>

<script>
import pager from "./pager.vue";
import lightbox from "./lightbox.vue";
import { getPhotos } from "@/api/api.js";

export default {
  components: {
    pager,
    lightbox,
  },

  methods: {
    getRandomPhotos: async function () {
      const data = await getPhotos("/photos/random?count=24");
      this.results = data;
    },

    search: async function (url, input) {
      console.log(input);
      this.searchWord = input;
      this.page = 1;
      this.link = url + this.page;
      const data = await getPhotos(this.link);

      console.log(data);

      this.results = data.results;
      this.pages = data.total_pages;
    },

    changePage: async function (url) {
      window.scrollTo(0, 0);
      this.link = url + this.page;
      const data = await getPhotos(this.link);

      console.log(data);

      this.results = data.results;
      this.pages = data.total_pages;
    },

    changedPage: function (page) {
      let url = this.link;
      this.page = page;
      this.changePage(url.substring(0, url.length - 1));
    },

    sendImg: function (i) {
      this.img = i;
      console.log(this.img);
      this.$refs.lightbox.showLightbox(this.results[i].urls.regular);
      if (this.img === this.results.length - 1) {
        this.$refs.lightbox.hideNext();
      } else if (this.img === this.results.length - 2) {
        this.$refs.lightbox.showNext();
      } else if (this.img === 0) {
        this.$refs.lightbox.hidePrev();
      } else if (this.img === 1) {
        this.$refs.lightbox.showPrev();
      }
    },

    changeImg: function (op) {
      if (op === "+") {
        this.img++;
        this.sendImg(this.img);
      } else if (op === "-") {
        this.img--;
        this.sendImg(this.img);
      }
    },

    showLikes: function () {
      if (this.likedPhotos.length === 0) {
        alert("no likes");
      }
    },
  },

  data() {
    return {
      link: "",
      instagramLink: "https://instagram.com/",
      pages: 0,
      results: [],
      page: 0,
      img: 0,
      searchWord: "Random",
      likedPhotos: [],
    };
  },

  mounted: function () {
    this.getRandomPhotos();
  },
};
</script>

<style scoped>
h1 {
  text-transform: uppercase;
  margin-top: 0px;
}
.grid {
  width: 100%;
  display: grid;
  column-gap: 1%;
  row-gap: 0.6%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 20px auto 50px auto;
}

.img_div {
  width: 100%;
  position: relative;
  margin: 0 auto 0 auto;
}

img {
  height: 300px;
  width: 100%;

  object-fit: cover;
  opacity: 1;
  display: block;
  transition: 0.5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: 0.5s ease-in;
  opacity: 0;
  position: absolute;
  top: 3%;
  left: 50%;
  height: 55px;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  background-color: #fff;
  /* padding-top: 8px;
  padding-bottom: 4px;
  margin-top: 10px; */
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
}

.img_div:hover image {
  opacity: 0.3;
}

.img_div:hover .middle {
  opacity: 1;
}
.name {
  width: 100%;
  text-align: center;
  margin: 0px;
}

a {
  width: 100%;
  color: black;
  text-decoration: none;
}

a:hover {
  color: #e17f7e;
}

.pager {
  margin-top: 50px;
}
.no-pager {
  height: 100px;
}

@media only screen and (max-width: 1200px) {
  .grid {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1.5%;
    row-gap: 0.5%;
  }
  .pager {
  margin-top: 80px;
}
}

@media only screen and (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    column-gap: 2%;
    row-gap: 0.3%;
  }
  .pager {
  margin-top: 120px;
}
}

@media only screen and (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
   .pager {
  margin-top: 500px;
}
}
</style>