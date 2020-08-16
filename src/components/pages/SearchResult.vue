<template>
  <div>
    <br>
    <template v-if='searchResultPosts != null'>
      <h2>「{{searchKeyWords}}」 の検索結果</h2>
      <Posts v-bind:posts='searchResultPosts | acceptingAnswer' name='回答受付中の質問'></Posts>
      <Posts v-bind:posts='searchResultPosts | manyViews' name='よく見られている質問'></Posts>
      <Posts v-bind:posts='searchResultPosts | resolved' name='解決済みの質問'></Posts>
    </template>
    <template v-else>
      <h2>「{{searchKeyWords}}」 の検索結果はありません</h2>
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
