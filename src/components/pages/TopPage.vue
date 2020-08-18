<template>
  <div>
    <h2>トップページ</h2>

    <hr>
    <br>
    <v-container>
      <v-row>
        <v-col>
          <Posts v-bind:posts='newPosts | acceptingAnswer' name='回答受付中の質問'></Posts>
        </v-col>
        <v-col>
          <Posts v-bind:posts='newPosts | manyViews' name='よく見られている質問'></Posts>
        </v-col>
        <v-col>
          <Posts v-bind:posts='newPosts | resolved' name='解決済みの質問'></Posts>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Posts from './Posts';

export default {
  computed: {
    newPosts() {
      return this.$store.getters.newPosts;
    },
  },
  created() {
    this.$store.dispatch("post/getPosts");
  },

  components: {
    Posts
  }
};
</script>

