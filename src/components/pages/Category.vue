<template>
  <div>
    <h2>カテゴリ一覧ページ</h2>

    <hr>

    <select id="categoryData" v-model="selectedCategory">
      <option disabled value="">カテゴリを選択してください。</option>
      <option v-for="(item) in categoryData" v-bind:key="item.id"> {{item}} </option>
    </select>

    <p v-if="selectedCategory">カテゴリ：{{selectedCategory}}</p>
    <p v-else> 全てのカテゴリ</p>

    <Posts v-bind:posts='selectedCategoryNewPosts' v-bind:name='name'></Posts>
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
