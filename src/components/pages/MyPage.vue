<template>
  <div>
    <h2>マイページ</h2>

    <Posts v-bind:posts='individualNewPosts' v-bind:name="`${userName}さんの質問`"></Posts>
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
