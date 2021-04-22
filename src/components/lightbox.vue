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
    </div>

    <img src="../assets/close.svg" class="close" v-on:click="closeLightbox" />
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
  width: 100%;
  min-height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
}

.lightbox {
  width: 50%;
  height: 80%;
  background-color: #fff;
  position: fixed;
  top: 10%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -25%;
}

img {
  width: 80%;
  max-height: 80%;
}

.prev,
.next {
  cursor: pointer;
  height: 30px;
  margin: 20px;
}

.close {
  cursor: pointer;
  height: 15px;
  position: fixed;
  top: 12%;
  left: 70%;
}

.next {
  transform: scaleX(-1);
}
</style>