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

    <Posts v-bind:posts='newPosts | acceptingAnswer' name='回答受付中の質問'></Posts>
    <Posts v-bind:posts='newPosts | manyViews' name='よく見られている質問'></Posts>
    <Posts v-bind:posts='newPosts | resolved' name='解決済みの質問'></Posts>

  </div>
</template>

<script>
import categoryFromJson from "../../assets/categoryData.json";
import Posts from './Posts';
import {toast} from "../../function/toastr.js";
import {dialog} from "../../function/dialog.js";

export default {
  data() {
    return {
      title: "",
      content: "",
      categoryData: categoryFromJson.categoryData.filter(category => category != '全て'),
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
        toast('入力に不備があります。', "error");
      } else {
        dialog(this, {
          title: '質問を投稿しますか？',
          body: `タイトル： ${this.title} <br><br><br> 質問内容： ${this.content}`
        }, true).then((response) => {
          if (response == 'OK') {
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
        });
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
