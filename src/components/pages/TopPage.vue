<template>
  <div>
    <h2>トップページ</h2>

    <hr>

    <div class="post-form">
      <h3>投稿フォーム</h3>

      <label for="title">*タイトル</label>
      <input type="text" id="title" v-model="title">

      <br><br>

      <div>
        <label for="content">*質問内容</label>
        <br>
        <textarea id="content" cols="30" rows="10" v-model="content"></textarea>
      </div>

      <label for="categoryData">*質問カテゴリ</label>
      <select id="categoryData" v-model="selectedCategory">
        <option disabled value="">カテゴリを選択してください。</option>
        <option v-for="(item) in categoryData" v-bind:key="item.id"> {{item}} </option>
      </select>

      <br><br>

      <button @click="createPost">投稿</button>
    </div>

    <Posts v-bind:posts='newPosts' name='新着の質問'></Posts>

  </div>
</template>

<script>
import categoryFromJson from "../../assets/categoryData.json";
import Posts from './Posts';
export default {
  data() {
    return {
      title: "",
      content: "",
      categoryData: categoryFromJson.categoryData,
      selectedCategory: "",
    };
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    },
    newPosts() {
      return this.$store.getters.newPosts;
    },
  },
  created() {
    this.$store.dispatch("post/getPosts");
  },
  methods: {
    createPost() {
      if (!this.title || !this.content || !this.selectedCategory) {
        alert("入力に不備があります。");
      } else {
        this.$store.dispatch("post/createPost", {
          title: this.title,
          content: this.content,
          category: this.selectedCategory,
          idToken: this.idToken,
        });
        this.content = "";
        this.title = "";
        this.selectedCategory = "";
      }
    },
  },
  components: {
    Posts
  }
};
</script>

<style scoped>
.post-form {
  background-color: rgb(199, 217, 218);
}
</style>
