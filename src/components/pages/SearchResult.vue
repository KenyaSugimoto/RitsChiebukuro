<template>
  <div>
    <br>
    <template v-if='searchResultPosts != null'>
      <Posts v-bind:posts='searchResultPosts' v-bind:name='`${searchKeyWords} の検索結果`'></Posts>
    </template>
    <template v-else>
      <h2>{{searchKeyWords}} の検索結果はありません</h2>
      <router-link to="/">Homeへ戻る</router-link>
    </template>
  </div>
</template>

<script>
import Posts from './Posts';
export default {
  computed: {
    searchResultPosts() {
      return this.$store.getters.searchResultPosts;
    },
    searchKeyWords() {
      return this.$store.getters.searchKeyWords;
    },
  },
  components: {
    Posts
  },
}
</script>
