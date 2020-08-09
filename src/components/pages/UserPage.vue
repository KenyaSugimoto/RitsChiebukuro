<template>
  <div>
    <h2> {{targetUid}} 個別ページ</h2>

    <Posts v-bind:posts='individualNewPosts'></Posts>

  </div>
</template>


<script>
import Posts from './Posts';
export default {
  props: ['targetUid'],
  computed: {
    individualNewPosts() {
      return this.$store.getters.individualNewPosts;
    },
  },
  created() {
    this.$store.commit('updateIndividualNewPosts', null);
    this.$store.dispatch('contents/getIndividualPosts');
  },
  components: {
    Posts
  },

}
</script>

<style scoped>
h2 {
  color: red;
}
</style>