<template>
  <div>
    <h2>{{userName}}さんの気になる質問</h2>

    <Posts v-bind:posts='favoritePosts | acceptingAnswer' name='回答受付中の質問'></Posts>
    <Posts v-bind:posts='favoritePosts | manyViews' name='よく見られている質問'></Posts>
    <Posts v-bind:posts='favoritePosts | resolved' name='解決済みの質問'></Posts>
  </div>
</template>

<script>
import Posts from './Posts';
export default {
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
    favoritePosts() {
      return this.$store.getters.favoritePosts;
    },
  },
  created() {
    this.$store.dispatch('post/getFavoritePosts');
  },
  components: {
    Posts
  }
}
</script>
