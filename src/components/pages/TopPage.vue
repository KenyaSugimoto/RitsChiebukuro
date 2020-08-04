<template>
  <div>
    <h2>トップページ</h2>
    <router-view name="search"></router-view>

    <h3>投稿</h3>
    <label for="title">タイトル</label>
    <input type="text" id="title" v-model="title">
    <br><br>
    <label for="content">投稿内容</label>
    <textarea id="content" cols="30" rows="10" v-model="content"></textarea>
    <br>
    <button @click="postContent">投稿</button>


    <h3>投稿一覧</h3>
    <hr>
    <!-- <div v-for="post in posts" :key="post.name"> -->
    <div v-for="post in posts" :key="post.name">
      <div>タイトル：{{post.fields.title.stringValue}}</div>
      <div>投稿内容：{{post.fields.content.stringValue}}</div>
      <br>
    </div>
  </div>
</template>

<script>
import axios from "../../axios/axios-post";
export default {
  data(){
    return {
      title: "",
      content: "",
      posts: [],
    }
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    }
  },
  created() {
    axios.get("/contents/", {
      headers: {
        Authorization: `Bearer ${this.idToken}`
      }
    })
    .then(response => {
      this.posts = response.data.documents;
      console.log(this.posts);
    });
  },
  methods: {
    postContent() {
      axios.post(
        "/contents/",
        {
          fields: {
            title: {
              stringValue: this.title
            },
            content: {
              stringValue: this.content
            },
          }
        },
        {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        }
      )
      .then(response => {
        console.log(response);
      });
      this.content = ""
      this.title = ""
    },
  }
}
</script>
