<template>
  <div>
    <h2>{{userName}}さんの気になる質問</h2>

    <Posts v-bind:posts='newPosts | favorite(favoritePostIds) | acceptingAnswer' name='回答受付中の質問'></Posts>
    <Posts v-bind:posts='newPosts | favorite(favoritePostIds) | manyViews' name='よく見られている質問'></Posts>
    <Posts v-bind:posts='newPosts | favorite(favoritePostIds) | resolved' name='解決済みの質問'></Posts>
  </div>
</template>

<script>
import Posts from './Posts';
export default {
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
    newPosts() {
      return this.$store.getters.newPosts;
    },
    favoritePostIds() {
      return this.$store.getters.favoritePostIds;
    },
  },
  components: {
    Posts
  }
}
</script>
