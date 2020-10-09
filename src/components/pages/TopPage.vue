<template>
  <v-container>
    <!-- 検索エリア -->
    <template class="search-area">
      <!-- 検索条件選択 -->
      <v-row justify="center">
        <v-col cols="12">
          <v-tabs v-model="tab" color="#a82e2e">
            <v-tab>キーワードで探す</v-tab>
            <v-tab>ジャンル別で探す</v-tab>
          </v-tabs>
        </v-col>
      </v-row>

      <!-- キーワードで探す -->
      <v-row v-if="tab === 0" justify="center">
        <v-col cols="11">
          <v-text-field label="キーワードで探す" outlined class="search" v-model='keywords'>
            <template v-slot:append-outer>
              <v-btn @click='search' icon><v-icon x-large>mdi-magnify</v-icon></v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <!-- ジャンル別で探す -->
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
    </template>

    <!-- 質問一覧表示部分 -->
    <template>
      <!-- キーワード検索結果（デフォルト） -->
      <v-row v-if="tab === 0" justify="center">
        <!-- スマホ用 -->
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
          </v-row>
          <v-col cols="12">
            <div v-if="selectedKindOfQuestions==='回答受付中の質問'"><Posts v-bind:posts='newPosts | acceptingAnswer' name='回答受付中の質問' iconName="mdi-comment-question"></Posts></div>
            <div v-if="selectedKindOfQuestions==='よく見られている質問'"><Posts v-bind:posts='newPosts | manyViews' name='よく見られている質問' iconName="mdi-account-group"></Posts></div>
            <div v-if="selectedKindOfQuestions==='解決済みの質問'"><Posts v-bind:posts='newPosts | resolved' name='解決済みの質問' iconName="mdi-frequently-asked-questions"></Posts></div>
          </v-col>
        </template>

        <!-- スマホ以外 -->
        <template v-else>
          <v-col cols="11">
            <v-tabs
              background-color="#9a0002"
              dark
              v-model="tab2"
              grow
              show-arrows
            >
              <v-tab>回答受付中の質問<v-icon x-large>mdi-comment-question</v-icon></v-tab>
              <v-tab>よく見られている質問<v-icon x-large>mdi-account-group</v-icon></v-tab>
              <v-tab>解決済みの質問<v-icon x-large>mdi-frequently-asked-questions</v-icon></v-tab>
            </v-tabs>
          </v-col>
          <v-col sm="12" md="11" lg="9">
            <div v-if="tab2===0"><Posts v-bind:posts='newPosts | acceptingAnswer' name='回答受付中の質問' iconName="mdi-comment-question"></Posts></div>
            <div v-if="tab2===1"><Posts v-bind:posts='newPosts | manyViews' name='よく見られている質問' iconName="mdi-account-group"></Posts></div>
            <div v-if="tab2===2"><Posts v-bind:posts='newPosts | resolved' name='解決済みの質問' iconName="mdi-frequently-asked-questions"></Posts></div>
          </v-col>
        </template>
      </v-row>

      <!-- ジャンル別検索結果 -->
      <v-row v-else justify="center">
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
          </v-row>
          <v-col cols="12">
            <div v-if="selectedKindOfQuestions==='回答受付中の質問'"><Posts v-bind:posts='newPosts | acceptingAnswer' name='回答受付中の質問' iconName="mdi-comment-question"></Posts></div>
            <div v-if="selectedKindOfQuestions==='よく見られている質問'"><Posts v-bind:posts='newPosts | manyViews' name='よく見られている質問' iconName="mdi-account-group"></Posts></div>
            <div v-if="selectedKindOfQuestions==='解決済みの質問'"><Posts v-bind:posts='newPosts | resolved' name='解決済みの質問' iconName="mdi-frequently-asked-questions"></Posts></div>
          </v-col>
        </template>

        <template v-else>
          <v-col cols="11">
            <v-tabs
              background-color="#9a0002"
              dark
              v-model="tab2"
              grow
              show-arrows
            >
              <v-tab>回答受付中の質問<v-icon x-large>mdi-comment-question</v-icon></v-tab>
              <v-tab>よく見られている質問<v-icon x-large>mdi-account-group</v-icon></v-tab>
              <v-tab>解決済みの質問<v-icon x-large>mdi-frequently-asked-questions</v-icon></v-tab>
            </v-tabs>
          </v-col>
          <v-col sm="12" md="11" lg="9">
            <div v-if="tab2===0"><Posts v-bind:posts='selectedCategoryNewPosts | acceptingAnswer' name='回答受付中の質問' iconName="mdi-comment-question"></Posts></div>
            <div v-if="tab2===1"><Posts v-bind:posts='selectedCategoryNewPosts | manyViews' name='よく見られている質問' iconName="mdi-account-group"></Posts></div>
            <div v-if="tab2===2"><Posts v-bind:posts='selectedCategoryNewPosts | resolved' name='解決済みの質問' iconName="mdi-frequently-asked-questions"></Posts></div>
          </v-col>
        </template>
      </v-row>
    </template>
  </v-container>
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
      tab2: null,
      kindOfQuestions: [
        "回答受付中の質問",
        "よく見られている質問",
        "解決済みの質問",
      ],
      selectedKindOfQuestions: "回答受付中の質問",
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
    movile() {
      return this.$vuetify.breakpoint.name === "xs";
    }
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

</style>
