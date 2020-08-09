<template>
  <div>
    <h2>マイページ</h2>

    <p> {{userName}}さんの新着投稿</p>

    <Posts v-bind:posts='individualNewPosts'></Posts>
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
    this.$store.dispatch('contents/getIndividualPosts');
  },
  components: {
    Posts
  }
}
</script>
