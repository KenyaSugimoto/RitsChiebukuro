<template>
  <div>
    <v-container>
      <div class="search-area">
        <v-row justify="center">
          <v-col cols="11">
            <v-tabs v-model="tab" color="basil">
              <v-tab>キーワードで探す</v-tab>
              <v-tab>ジャンル別で探す</v-tab>
            </v-tabs>
          </v-col>
        </v-row>

        <v-row v-if="tab === 0" justify="center">
          <v-col cols="11">
            <v-text-field label="キーワードで探す" outlined class="search" v-model='keywords'>
              <template v-slot:append-outer>
                <v-btn icon @click='search'><v-icon x-large>mdi-magnify</v-icon></v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-else justify="center">
          <v-col cols="11">
            <v-select :items="categoryData" label="カテゴリを選択してください" outlined class="select-box" v-model="selectedCategory"></v-select>
          </v-col>
          <v-col cols="11" sm="7" md="5" lg="4">
            <h2 v-if="selectedCategory">カテゴリ：{{selectedCategory}}</h2>
            <h2 v-else> 全てのカテゴリ</h2>
            <hr><br>
          </v-col>
        </v-row>
      </div>

      <v-row v-if="tab === 0" justify="center">
        <v-col cols="12" sm="12" md="6" lg="4">
          <Posts v-bind:posts='newPosts | acceptingAnswer' name='回答受付中の質問' iconName="mdi-comment-question"></Posts>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
          <Posts v-bind:posts='newPosts | manyViews' name='よく見られている質問' iconName="mdi-account-group"></Posts>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
          <Posts v-bind:posts='newPosts | resolved' name='解決済みの質問' iconName="mdi-frequently-asked-questions"></Posts>
        </v-col>
      </v-row>

      <v-row v-else justify="center">
        <v-col cols="12" sm="12" md="6" lg="4">
          <Posts v-bind:posts='selectedCategoryNewPosts | acceptingAnswer' name='回答受付中の質問'></Posts>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
          <Posts v-bind:posts='selectedCategoryNewPosts | manyViews' name='よく見られている質問'></Posts>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
          <Posts v-bind:posts='selectedCategoryNewPosts | resolved' name='解決済みの質問'></Posts>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import Posts from './Posts';
import categoryFromJson from "../../assets/categoryData.json";

export default {
  data() {
    return {
      keywords: '',
      categoryData: categoryFromJson.categoryData,
      selectedCategory: "",
      tab: null,
    }
  },
  computed: {
    newPosts() {
      return this.$store.getters.newPosts;
    },
    selectedCategoryNewPosts() {
      return this.$store.getters.selectedCategoryNewPosts;
    },
    name() {
      return this.selectedCategory ? `${this.selectedCategory}の質問` : '全てのカテゴリの質問';
    },
  },
  created() {
    this.$store.dispatch("post/getPosts");
    this.$store.commit("updateSelectedCategoryNewPosts", null, {root: true});
    this.getSelectedCategoryPosts();
  },
  methods: {
    search() {
      this.$store.dispatch('search/searchWithKeyWords', this.keywords);
      this.keywords = '';
    },
    getSelectedCategoryPosts() {
      this.$store.dispatch("post/getSelectedCategoryNewPosts", this.selectedCategory);
    },
  },
  watch: {
    selectedCategory: function() {
      this.getSelectedCategoryPosts();
    }
  },
  components: {
    Posts,
  }
};
</script>

<style scoped>
img {
  width: 210px;
  height: 58px;
  cursor: pointer;
}
/* .search-area {
  height: 20rem;
} */

</style>
