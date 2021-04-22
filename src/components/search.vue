<template>
  <div>
    <form
      class="searchForm"
      v-on:submit.prevent="onSubmit(searchInput)"
      autocomplete="off"
    >
      <img src="../assets/search.png" />
      <input
        type="text"
        name="search"
        placeholder="Search photos"
        required
        v-model="searchInput"
      />

      <div class="show">
        <input type="submit" value="go" class="show" />
      </div>

    </form>
  </div>
</template>

<script>
export default {
  methods: {
    onSubmit: function (input) {
      let url = "search/photos?per_page=24&query=" + input + "&page=";
      this.$emit("submitted", url, input);
      this.searchInput = "";
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

img {
  width: 25px;
  height: auto;
  position: absolute;
  background-color: #e17f7e;
  padding: 20px;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: none;
}


input[type="text"] {
  width: 5px;
  height: 63px;
  padding-left: 20px;
  cursor: pointer;
  margin-left: 28px;
  margin-top: 0;
  border: none;
  transition: 0.5s ease-in;
}

input[type="text"]:focus {
  background-color: #e17f7e;
  transition: 0.5s ease;
  width: 300px;
  cursor: text;
  padding-left: 70px;
  border-radius: 2px 50px 50px 2px;
  outline: none;
  color: #fff
}

input[type="text"]::placeholder {
  color: #fff
}

input {
  font-family: "Open sans", sans-serif;
}

input[type="submit"] {
  background: url(../assets/go.png) no-repeat;
  background-size: cover;
  background-position: center;
  width: 30px;
  height: 30px;
  margin-left: 10px;
  font-size: 0;
  cursor: pointer;
  border-style: none;

}

input[type="submit"]:focus {
  outline: none;
}

.show {
  position: relative;
  top: -25px;
  left: 170px;
}

</style>