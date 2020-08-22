<template>
  <div>
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
