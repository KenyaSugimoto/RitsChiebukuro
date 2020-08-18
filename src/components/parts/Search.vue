<template>
  <div>
    <v-text-field label="キーワードで探す" Filled class="search" v-model='keywords'>
      <template v-slot:append-outer>
        <v-btn color="primary" @click='search'>検索</v-btn>
      </template>
    </v-text-field>
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
.search {
  width: 70%;
  padding-left: 30%;
}
</style>
