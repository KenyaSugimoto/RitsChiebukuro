<template>
  <div>
    <h2>{{userName}}さんの気になる質問</h2>
    <v-container>
      <Posts v-bind:posts='favoritePosts' name="気になる質問"></Posts>
    </v-container>

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
