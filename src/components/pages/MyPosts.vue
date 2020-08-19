<template>
  <div>
    <h2>{{userName}}さんの質問</h2>

    <v-container>
      <v-row>
        <v-col>
          <Posts v-bind:posts='individualNewPosts | acceptingAnswer' name='回答受付中の質問'></Posts>
        </v-col>
        <v-col>
          <Posts v-bind:posts='individualNewPosts | manyViews' name='よく見られている質問'></Posts>
        </v-col>
        <v-col>
          <Posts v-bind:posts='individualNewPosts | resolved' name='解決済みの質問'></Posts>
        </v-col>
      </v-row>
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
