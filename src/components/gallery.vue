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
              v-bind:href="unsplashLink + picture.user.username"
              target="_blank"
              class="link"
            >
              @ Unsplash link
            </a>
          </div>
          <div class="middle-low">


            <div
              v-bind:class="{
                blackheart: !picture.liked_by_user,
                pinkheart: picture.liked_by_user,
              }"
              v-if="!likePage"
              v-on:click="likePhoto(picture)"
            ></div>
            <p v-else class="delete" v-on:click="deleteFromLocalStorage(index)">
              X
            </p>
            <a
              v-bind:download="picture.user.name + jpg"
              v-bind:href="picture.urls.regular"
              target="_blank"
            >
              <div class="blackdownload" v-on:click="likePhoto(picture)"></div>
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

      const likedPhotos = JSON.parse(localStorage.getItem("likedPhotos"));

      let likedPhotosId = [];

      likedPhotos.forEach((element) => {
        likedPhotosId.push(element.id);
      });

      data.forEach((element) => {
        for (let i = 0; i < likedPhotosId.length; i++) {
          if (likedPhotosId[i] === element.id) {
            element.liked_by_user = true;
            break;
          } else {
            element.liked_by_user = false;
          }
        }
      });

      console.log(likedPhotosId);
      console.log(data);
      this.results = data;
    },

    search: async function (input, page) {
      let url = "search/photos?per_page=24&query=" + input + "&page=" + page;
      this.searchWord = input;
      this.page = page;
      const data = await getPhotos(url);

      const likedPhotos = JSON.parse(localStorage.getItem("likedPhotos"));

      let dataResults = data.results;

      let likedPhotosId = [];

      likedPhotos.forEach((element) => {
        likedPhotosId.push(element.id);
      });

      dataResults.forEach((element) => {
        for (let i = 0; i < likedPhotosId.length; i++) {
          if (likedPhotosId[i] === element.id) {
            element.liked_by_user = true;
            break;
          } else {
            element.liked_by_user = false;
          }
        }
      });

      console.log(likedPhotosId);
      console.log(dataResults);

      this.results = dataResults;
      this.pages = data.total_pages;
    },

    changedPage: function (page) {
      this.page = page;
      this.search(this.searchWord, page);
      window.scrollTo(0, 0);
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
      this.likedPhotos = JSON.parse(localStorage.getItem("likedPhotos"));
      console.log(this.likedPhotos);
      this.results = this.likedPhotos;
      this.searchWord = "Liked";
    },

    likePhoto(picture) {
      const likedPhotos = JSON.parse(localStorage.getItem("likedPhotos"));
      likedPhotos.push(picture);
      localStorage.setItem("likedPhotos", JSON.stringify(likedPhotos));
      this.likedPhotos = JSON.parse(localStorage.getItem("likedPhotos"));
      console.log(this.searchWord);

      this.search(this.searchWord, this.page);
    },
    deleteFromLocalStorage(index) {
      this.likedPhotos.splice(index, 1);
      localStorage.setItem("likedPhotos", JSON.stringify(this.likedPhotos));
    },
  },

  data() {
    return {
      unsplashLink: "https://unsplash.com/@",
      pages: 0,
      results: [],
      page: 0,
      img: 0,
      searchWord: "Random",
      likedPhotos: [],
      likeArray: [],
      likePage: false,
      jpg: ".jpg",
      mediaQuery: window.matchMedia("(min-width: 900px)"),
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

.blackheart {
  background-image: url("~@/assets/heart.png");
  background-position: center;
  background-size: cover;
  width: 35px;
  height: 35px;
  cursor: pointer;
  margin-left: 20px;
  margin-top: 5px;
}

.blackdownload {
  background-image: url("~@/assets/download.png");
  background-position: center;
  background-size: cover;
  width: 30px;
  height: 30px;
  margin-right: 20px;
  margin-top: 5px;
}

.pinkheart {
  background-image: url("~@/assets/red_heart.png");
  background-position: center;
  background-size: cover;
  width: 30px;
  height: 30px;
  margin-left: 20px;
  margin-top: 5px;
}

a {
  text-decoration: none;
}

.blackheart:hover {
  background-image: url("~@/assets/red_heart.png");
}

.blackdownload:hover {
  background-image: url("~@/assets/red_download.png");
}

.delete {
  font-weight: bold;
  margin-left: 20px;
  font-size: 22px;
  margin-top: 25px;
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
    row-gap: 120px;
    margin-top: 90px;
  }
  .pager {
    margin-top: 120px;
  }

  .middle {
    top: -50px;
  }

  .middle-low {
    top: 100%;
  }

  .middle-low,
  .middle {
    opacity: 1;
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