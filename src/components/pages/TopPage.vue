<template>
  <div>
    <h2>トップページ</h2>

    <hr>
    <br><br>

    <div class="post-form">
      <h2>質問する</h2>

      <v-textarea class='text-area' label='タイトル' outlined auto-grow rows=4 v-model='title'></v-textarea>
      <br><br>
      <v-textarea class='text-area' label='質問' outlined auto-grow rows=8 v-model='content'></v-textarea>

      <v-select :items="categoryData" label="質問カテゴリ" solo class="select-box" v-model="selectedCategory"></v-select>


      <br><br>

      <button @click="createPost">投稿</button>
    </div>

    <v-container>
      <v-row>
        <v-col>
          <Posts v-bind:posts='newPosts | acceptingAnswer' name='回答受付中の質問'></Posts>
        </v-col>
        <v-col>
          <Posts v-bind:posts='newPosts | manyViews' name='よく見られている質問'></Posts>
        </v-col>
        <v-col>
          <Posts v-bind:posts='newPosts | resolved' name='解決済みの質問'></Posts>
        </v-col>
      </v-row>
    </v-container>

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
.text-area {
  width: 560px;
  margin: 0 auto;
}
.posts-area {
  display: flex;
}
.select-box {
  width: 50%;
  margin: 0 auto;
}
</style>
