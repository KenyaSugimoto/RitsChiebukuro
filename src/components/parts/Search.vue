<template>
  <div>
    <v-text-field label="キーワード検索" single-line solo class="search" v-model='keywords'>
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
