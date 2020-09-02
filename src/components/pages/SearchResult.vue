<template>
  <div>
    <br>
    <template v-if='searchResultPosts != null'>
      <h2>「{{searchKeyWords}}」 の検索結果 <v-icon large>mdi-magnify</v-icon> </h2>

      <v-container>
        <v-row justify="center">
          <v-col cols="11">
            <v-tabs
              background-color="#9a0002"
              dark
              v-model="tab"
              grow
              show-arrows
            >
              <v-tab>回答受付中の質問<v-icon x-large>mdi-comment-question</v-icon></v-tab>
              <v-tab>よく見られている質問<v-icon x-large>mdi-account-group</v-icon></v-tab>
              <v-tab>解決済みの質問<v-icon x-large>mdi-frequently-asked-questions</v-icon></v-tab>
            </v-tabs>
          </v-col>
          <v-col cols="12" sm="12" md="9" lg="9" >
            <div v-if="tab===0"><Posts v-bind:posts='searchResultPosts | acceptingAnswer' name='回答受付中の質問' iconName="mdi-comment-question"></Posts></div>
            <div v-if="tab===1"><Posts v-bind:posts='searchResultPosts | manyViews' name='よく見られている質問' iconName="mdi-account-group"></Posts></div>
            <div v-if="tab===2"><Posts v-bind:posts='searchResultPosts | resolved' name='解決済みの質問' iconName="mdi-frequently-asked-questions"></Posts></div>
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
  data() {
    return {
      tab: null,
    }
  },
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
