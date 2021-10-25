<template>
  <div class="pager">
    <p class="prev" v-if="page > 1" v-on:click="prev">Prev 24</p>
    <p v-else></p>
    <p class="pages">{{ page }} / {{ pages }}</p>
    <p class="next" v-if="pages > page" v-on:click="next">Next 24</p>
  </div>
</template>

<script>
export default {
  props: {
    pages: Number,
  },
  data() {
    return {
      page: 1,
    };
  },

  methods: {
    next: function () {
      this.page++;
      console.log(this.page);
      this.$emit("changedPage", this.page);
    },

    prev: function () {
      this.page--;
      console.log(this.page);
      this.$emit("changedPage", this.page);
    },
  },
};
</script>

<style scoped>
.pager {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.next:hover,
.prev:hover {
  cursor: pointer;
}

.pages {
  text-align: center;
}

.next {
  text-align: end;
}

.prev {
  text-align: start;
}
</style>