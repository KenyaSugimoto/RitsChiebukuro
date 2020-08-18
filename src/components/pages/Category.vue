<template>
  <div>
    <h2>カテゴリ一覧ページ</h2>

    <v-select :items="categoryData" label="カテゴリを選択してください" solo class="select-box" v-model="selectedCategory"></v-select>

    <h2 v-if="selectedCategory">カテゴリ：{{selectedCategory}}</h2>
    <h2 v-else> 全てのカテゴリ</h2>

    <hr>
    <br>

    <v-container>
      <v-row>
        <v-col>
          <Posts v-bind:posts='selectedCategoryNewPosts | acceptingAnswer' name='回答受付中の質問'></Posts>
        </v-col>
        <v-col>
          <Posts v-bind:posts='selectedCategoryNewPosts | manyViews' name='よく見られている質問'></Posts>
        </v-col>
        <v-col>
          <Posts v-bind:posts='selectedCategoryNewPosts | resolved' name='解決済みの質問'></Posts>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import categoryFromJson from "../../assets/categoryData.json";
import Posts from './Posts';
export default {
  data() {
    return {
      categoryData: categoryFromJson.categoryData,
      selectedCategory: "",
    }
  },
  computed: {
    selectedCategoryNewPosts() {
      return this.$store.getters.selectedCategoryNewPosts;
    },
    name() {
      return this.selectedCategory ? `${this.selectedCategory}の質問` : '全てのカテゴリの質問';
    }
  },
  created() {
    this.$store.commit("updateSelectedCategoryNewPosts", null, {root: true});
    this.getSelectedCategoryPosts();
  },
  methods: {
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
    Posts
  }
}
</script>

<style scoped>
.select-box {
  width: 40%;
  margin: 0 auto;
}
</style>
