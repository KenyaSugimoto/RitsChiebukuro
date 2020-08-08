<template>
  <div>
    <h2>トップページ</h2>
    <router-view name="search"></router-view>

    <h3>投稿</h3>
    <label for="title">タイトル</label>
    <input type="text" id="title" v-model="title" />
    <br />
    <br />
    <label for="content">投稿内容</label>
    <textarea id="content" cols="30" rows="10" v-model="content"></textarea>
    <br />
    <button @click="postContent">投稿</button>

    <h3>投稿一覧</h3>
    <hr />
    <div v-for="post in newPosts" :key="post.name" class="content-box">
      <div class="title">{{post.document.fields.title.stringValue}}</div>
      <div>
        <router-link to="/my-page">
          {{post.document.fields.userName.stringValue}}
        </router-link>
      </div>
      <div class="content box">{{post.document.fields.content.stringValue}}</div>
      <div>投稿時間：{{post.document.fields.created_at.timestampValue}}</div>
      <!-- <div>投稿者：{{post.document.fields.userName.timestampValue}}</div> -->
      <!-- <div>編集時間：{{post.document.fields.updated_at.timestampValue}}</div> -->
      <!-- <div>回答有無：{{post.document.fields.isAnswered.booleanValue}}</div> -->
      <br />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  computed: {
    idToken() {
      return this.$store.getters.authInfo.idToken;
    },
    newPosts() {
      return this.$store.getters.postsInfo.newPosts;
    },
  },
  created() {
    this.$store.dispatch("contents/getContents");
  },

  methods: {
    postContent() {
      this.$store.dispatch("contents/postContent", {
        title: this.title,
        content: this.content,
        idToken: this.idToken,
      });
      this.content = "";
      this.title = "";
    },
  },
};
</script>

<style scoped>
div .title {
  font-size: larger;
  font-weight: bolder;
  padding-top: 15px;
}

.box{
  width: 50%;
  padding: 0.5em 1em;
  margin: auto;
  background: #edeef0;
  color: rgb(231, 9, 9);
}

.content-box {
  background-color: rgb(251, 242, 209);
  border-radius: 9px;
  width: 70%;
  margin: 20px auto;
}

</style>
