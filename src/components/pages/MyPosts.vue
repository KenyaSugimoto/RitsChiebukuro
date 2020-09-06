<template>
  <div>
    <h2>{{userName}}さんの質問</h2>

    <v-container>
      <hr><br>

      <template v-if="movile">
        <v-row justify="center">
          <v-col cols="10">
            <v-select
              :items="kindOfQuestions"
              v-model="selectedKindOfQuestions"
              background-color="#ECEFF1"
              color="#9a0002"
              item-color="pink"
              label="質問の種類"
            />
          </v-col>
          <v-col cols="12">
            <div v-if="selectedKindOfQuestions==='回答受付中の質問'"><Posts v-bind:posts='individualNewPosts | acceptingAnswer' name='回答受付中の質問' iconName="mdi-comment-question"></Posts></div>
            <div v-if="selectedKindOfQuestions==='よく見られている質問'"><Posts v-bind:posts='individualNewPosts | manyViews' name='よく見られている質問' iconName="mdi-account-group"></Posts></div>
            <div v-if="selectedKindOfQuestions==='解決済みの質問'"><Posts v-bind:posts='individualNewPosts | resolved' name='解決済みの質問' iconName="mdi-frequently-asked-questions"></Posts></div>
          </v-col>
        </v-row>
      </template>

      <template v-else>
        <v-row justify="center">
          <v-col cols="11">
            <v-tabs
              background-color="#9a0002"
              dark
              v-model="tab"
              grow
              show-arrows
            >
              <v-tab>回答受付中の質問<v-icon x-large>mdi-comment-question</v-icon></v-tab>
              <v-tab>よく見られている質問<v-icon x-large>mdi-account-group</v-icon></v-tab>
              <v-tab>解決済みの質問<v-icon x-large>mdi-frequently-asked-questions</v-icon></v-tab>
            </v-tabs>
          </v-col>
          <v-col sm="12" md="11" lg="9">
            <div v-if="tab===0"><Posts v-bind:posts='individualNewPosts | acceptingAnswer' name='回答受付中の質問' iconName="mdi-comment-question"></Posts></div>
            <div v-if="tab===1"><Posts v-bind:posts='individualNewPosts | manyViews' name='よく見られている質問' iconName="mdi-account-group"></Posts></div>
            <div v-if="tab===2"><Posts v-bind:posts='individualNewPosts | resolved' name='解決済みの質問' iconName="mdi-frequently-asked-questions"></Posts></div>
          </v-col>
        </v-row>
      </template>


<!--
      <v-row justify="center">
        <v-col cols="11">
          <v-tabs
            background-color="#9a0002"
            dark
            v-model="tab"
            grow
            show-arrows
          >
            <v-tab>回答受付中の質問<v-icon x-large>mdi-comment-question</v-icon></v-tab>
            <v-tab>よく見られている質問<v-icon x-large>mdi-account-group</v-icon></v-tab>
            <v-tab>解決済みの質問<v-icon x-large>mdi-frequently-asked-questions</v-icon></v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="12" sm="12" md="9" lg="9" >
          <div v-if="tab===0"><Posts v-bind:posts='individualNewPosts | acceptingAnswer' name='回答受付中の質問' iconName="mdi-comment-question"></Posts></div>
          <div v-if="tab===1"><Posts v-bind:posts='individualNewPosts | manyViews' name='よく見られている質問' iconName="mdi-account-group"></Posts></div>
          <div v-if="tab===2"><Posts v-bind:posts='individualNewPosts | resolved' name='解決済みの質問' iconName="mdi-frequently-asked-questions"></Posts></div>
        </v-col>
      </v-row> -->
    </v-container>

  </div>
</template>

<script>
import Posts from './Posts';
export default {
  data() {
    return {
      tab: null,
      kindOfQuestions: [
        "回答受付中の質問",
        "よく見られている質問",
        "解決済みの質問",
      ],
      selectedKindOfQuestions: "回答受付中の質問",
    }
  },
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
    individualNewPosts() {
      return this.$store.getters.individualNewPosts;
    },
    movile() {
      return this.$vuetify.breakpoint.name === "xs";
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
