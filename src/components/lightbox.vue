<template>
  <div class="screen" v-bind:class="{ hide: hidden }">
    <div class="lightbox">
      <img
        src="../assets/arrow.svg"
        class="prev"
        v-on:click="changeImg('-')"
        v-bind:class="{ hide: hiddenPrev }"
      />

      <img v-bind:src="imgLink" />

      <img
        src="../assets/arrow.svg"
        class="next"
        v-on:click="changeImg('+')"
        v-bind:class="{ hide: hiddenNext }"
      />
      <img src="../assets/close.svg" class="close" v-on:click="closeLightbox" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showLightbox: function (img) {
      this.hidden = false;
      this.imgLink = img;
    },

    closeLightbox: function () {
      this.hidden = true;
      this.hiddenPrev = false;
      this.hiddenNext = false;
    },

    changeImg: function (op) {
      this.operator = op;
      this.$emit("changeImg", this.operator);
    },

    hidePrev: function () {
      this.hiddenPrev = true;
    },
    showPrev: function () {
      this.hiddenPrev = false;
    },

    hideNext: function () {
      this.hiddenNext = true;
    },
    showNext: function () {
      this.hiddenNext = false;
    },
  },

  data() {
    return {
      imgLink: "",
      hidden: true,
      operator: "",
      hiddenPrev: false,
      hiddenNext: false,
    };
  },
};
</script>

<style scoped>
.hide {
  visibility: hidden;
}

.screen {
  width: 100vw;
  min-height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
}

.lightbox {
  width: 60vw;
  height: 85vh;
  background-color: #fff;
  top: 8vh;
  left: 19vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

img {
  max-width: 80%;
  max-height: 80%;
}

.prev,
.next {
  cursor: pointer;
  height: 30px;
}
.prev {
  position: absolute;
  left: 1vw;
}

.next {
  position: absolute;
  left: 57.5vw;
}
.close {
  cursor: pointer;
  height: 15px;
  position: absolute;
  top: 3vh;
  left: 57.5vw;
}

.next {
  transform: scaleX(-1);
}

@media only screen and (max-width: 900px) {
  .lightbox {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    align-items: center;
  }

  img {
    position: relative;
    top: -50px;
    max-width: 90%;
    max-height: 80%;
  }

  .close {
    left: 90vw;
  }

  .prev,
  .next {
    top: 80vh;
  }

  .prev {
    left: 5vw;
  }

  .next {
    left: 90vw;
  }
}
</style>