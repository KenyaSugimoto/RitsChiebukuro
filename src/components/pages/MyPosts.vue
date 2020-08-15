<template>
  <div>
    <h2>{{userName}}さんの質問</h2>

    <Posts v-bind:posts='newPosts | user(uid) | acceptingAnswer' name='回答受付中の質問'></Posts>
    <Posts v-bind:posts='newPosts | user(uid) | manyViews'  name='よく見られている質問'></Posts>
    <Posts v-bind:posts='newPosts | user(uid) | resolved' name='解決済みの質問'></Posts>
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
    uid() {
      return this.$store.getters.uid;
    },
  },
  components: {
    Posts
  }
}
</script>
