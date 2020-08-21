<template>
  <div>
    <br>
    <template v-if='searchResultPosts != null'>
      <h2>「{{searchKeyWords}}」 の検索結果</h2>

      <v-container>
        <v-row>
          <v-col>
            <Posts v-bind:posts='searchResultPosts | acceptingAnswer' name='回答受付中の質問'></Posts>
          </v-col>
          <v-col>
            <Posts v-bind:posts='searchResultPosts | manyViews' name='よく見られている質問'></Posts>
          </v-col>
          <v-col>
            <Posts v-bind:posts='searchResultPosts | resolved' name='解決済みの質問'></Posts>
          </v-col>
        </v-row>
      </v-container>

    </template>
    <template v-else>
      <h3>「{{searchKeyWords}}」 の検索結果はありません</h3>
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
