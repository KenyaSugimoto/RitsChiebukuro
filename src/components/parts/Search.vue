<template>
  <div>
    <v-container>
      <v-text-field label="キーワードで探す" outlined class="search" v-model='keywords'>
        <template v-slot:append-outer>
          <img src="../../assets/search-icon.svg" class="search-button" @click='search'>
        </template>
      </v-text-field>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: '',
    }
  },
  methods: {
    search() {
      this.$store.dispatch('search/searchWithKeyWords', this.keywords);
      this.keywords = '';
    }
  }

}
</script>

<style scoped>
.search-button {
  cursor: pointer;
  width: 40px;
  height: 40px;
}

.search {
  background-color: white;
}
</style>
