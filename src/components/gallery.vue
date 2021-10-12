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
              class="link"
            >
              @ Portfolio link
            </a>
            <a
              v-bind:href="instagramLink + picture.user.instagram_username"
              v-else-if="picture.user.instagram_username"
              target="_blank"
              class="link"
            >
              @ Instagram link
            </a>
            <a
              v-bind:href="unsplashLink + picture.user.username"
              v-else-if="picture.user.username"
              target="_blank"
              class="link"
            >
              @ Unsplash link
            </a>
          </div>
          <div class="middle-low">
            <img
              v-bind:src="setHeartPng()"
              class="heart-png"
              v-on:mouseover="hoverHeart()"
              v-on:mouseleave="noHoverHeart()"
              v-on:click="likePhoto(picture)"
              v-if="!likePage"
            />
            <p v-else class="delete" v-on:click="deleteFromLocalStorage(index)">
              X
            </p>
            <a
              v-bind:download="picture.user.name + jpg"
              v-bind:href="picture.urls.regular"
              target="_blank"
            >
              <img
                v-bind:src="setDownloadPng()"
                class="heart-png"
                v-on:mouseover="hoverDownload()"
                v-on:mouseleave="noHoverDownload()"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <lightbox ref="lightbox" v-on:changeImg="changeImg" />
    <div class="pager" v-if="pages > 1 && !likePage">
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
      this.searchWord = "random";
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
        return;
      }
      this.likedPhotos = JSON.parse(localStorage.getItem("likedPhotos"));
      console.log(this.likedPhotos);
      this.results = this.likedPhotos;
      this.searchWord = "Liked";
    },

    hoverHeart() {
      this.heartPhoto = "red_heart.png";
    },

    noHoverHeart() {
      this.heartPhoto = "heart.png";
    },

    hoverDownload() {
      this.downloadPhoto = "red_download.png";
    },

    noHoverDownload() {
      this.downloadPhoto = "download.png";
    },

    setHeartPng() {
      return require("../assets/" + this.heartPhoto);
    },

    setDownloadPng() {
      return require("../assets/" + this.downloadPhoto);
    },
    likePhoto(picture) {
      const likedPhotos = JSON.parse(localStorage.getItem("likedPhotos"));
      likedPhotos.push(picture);
      localStorage.setItem("likedPhotos", JSON.stringify(likedPhotos));
      this.likedPhotos = JSON.parse(localStorage.getItem("likedPhotos"));
    },
    deleteFromLocalStorage(index) {
      this.likedPhotos.splice(index, 1);
      localStorage.setItem("likedPhotos", JSON.stringify(this.likedPhotos));
    },
  },

  data() {
    return {
      link: "",
      instagramLink: "https://instagram.com/",
      unsplashLink: "https://unsplash.com/@",
      pages: 0,
      results: [],
      page: 0,
      img: 0,
      searchWord: "Random",
      likedPhotos: [],
      heartPhoto: "heart.png",
      downloadPhoto: "download.png",
      likeArray: [],
      likePage: false,
      jpg: ".jpg",
    };
  },

  mounted: function () {
    this.getRandomPhotos();
    if (!localStorage.getItem("likedPhotos")) {
      localStorage.setItem("likedPhotos", JSON.stringify(this.likeArray));
    } else {
      this.likedPhotos = JSON.parse(localStorage.getItem("likedPhotos"));
    }
  },

  watch: {
    searchWord() {
      if (this.searchWord === "Liked") {
        this.$emit("changed", true);
        this.likePage = true;
      } else {
        this.$emit("changed", false);
        this.likePage = false;
      }
    },
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
  cursor: pointer;
}

.middle {
  transition: 0.5s ease-in;
  opacity: 0;
  position: absolute;
  top: 4%;
  left: 50%;
  height: 55px;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  background-color: #fff;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
}

.middle-low {
  transition: 0.5s ease-in;
  opacity: 0;
  position: absolute;
  top: 91%;
  left: 50%;
  height: 25px;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  background-color: #fff;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #fff;
}
.img_div:hover image {
  opacity: 0.3;
}

.img_div:hover .middle,
.img_div:hover .middle-low {
  opacity: 1;
}
.name {
  width: 100%;
  text-align: center;
  margin: 0px;
  margin-top: 5px;
}

.delete {
  font-weight: bold;
  margin-left: 15px;
  font-size: 20px;
}

.delete:hover {
  color: #e17f7e;
  font-size: 24px;
  cursor: pointer;
}

a.link {
  width: 100%;
  color: black;
  text-decoration: none;
  margin-top: 2px;
}

a.link:hover {
  color: #e17f7e;
}

.heart-png {
  height: 30px;
  max-width: 50px;
  position: relative;
  object-fit: contain;
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