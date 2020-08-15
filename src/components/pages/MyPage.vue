<template>
  <div>
    <h2>マイページ</h2>

    <Posts v-bind:posts='individualNewPosts | acceptingAnswer' name='回答受付中の質問'></Posts>
    <Posts v-bind:posts='individualNewPosts | manyViews' name='よく見られている質問'></Posts>
    <Posts v-bind:posts='individualNewPosts | resolved' name='解決済みの質問'></Posts>
  </div>
</template>


<script>
import Posts from './Posts';
export default {
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
    individualNewPosts() {
      return this.$store.getters.individualNewPosts;
    },
  },
  created() {
    this.$store.dispatch('post/getIndividualPosts');
  },
  components: {
    Posts
  }
}
</script>
