<template>
  <div>
    <form
      class="searchForm"
      v-on:submit.prevent="onSubmit(searchInput)"
      autocomplete="off"
    >
      <input
        type="text"
        name="search"
        required
        v-model="searchInput"
        v-on:focus="showSubmit()"
        v-on:blur="onSubmit(searchInput)"
      />

      <input
        type="submit"
        value="go"
        v-bind:class="{
          show: show,
          dontshow: !show,
        }"
      />
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    onSubmit: function (input) {
      if (this.searchInput.length > 0) {
        this.$emit("submitted", input, 1);
        this.searchInput = "";
      }
      this.show = false;
    },

    showSubmit: function () {
      this.show = true;
    },
  },

  data() {
    return {
      searchInput: "",
      show: false,
    };
  },
};
</script>

<style scoped>
.form {
  display: flex;
}

input[type="text"] {
  font-family: "Open sans", sans-serif;
  font-size: 1.1em;
  background: url(../assets/search.png) no-repeat;
  background-size: 30px;
  background-position: center;
  width: 57px;
  background-color: #e17f7e;
  height: 60px;
  border-radius: 50px 50px 50px 50px;
  cursor: pointer;
  margin-top: 0;
  border: none;
  transition: 0.5s ease-in;
}

input[type="text"]:focus {
  background-size: 35px;
  background-position: 10px 50%;
  background-color: #e17f7e;
  transition: 0.5s ease;
  width: 40vw;
  cursor: text;
  padding-left: 70px;
  border-radius: 50px 50px 50px 50px;
  outline: none;
  color: #fff;
}

input[type="text"]::placeholder {
  color: #fff;
} 

.dontshow {
  display: none;
}

.show {
  background: url(../assets/go.png) no-repeat;
  background-size: cover;
  background-position: center;
  width: 30px;
  height: 30px;
  font-size: 0;
  cursor: pointer;
  border-style: none;
  position: relative;
  left: -40px;
  top: -6px;
}

input[type="submit"]:focus {
  outline: none;
}

@media only screen and (max-width: 900px) {

  input[type="text"]:focus {
    width: 38vw;
    font-size: 1em;
    padding-left: 50px;
  }

  .show {
    width: 20px;
    height: 20px;
  }
}
</style>