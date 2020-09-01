<template>
  <div>
    <h2>{{userName}}さんの質問</h2>

    <v-container>
      <hr><br>
      <v-row justify="center">
        <v-col cols="12" sm="12" md="6" lg="5">
          <Posts v-bind:posts='individualNewPosts | acceptingAnswer' name='回答受付中の質問' iconName="mdi-comment-question"></Posts>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="5">
          <Posts v-bind:posts='individualNewPosts | resolved' name='解決済みの質問' iconName="mdi-frequently-asked-questions"></Posts>
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
