<template>
  <div>
    <h2>トップページ</h2>
    <router-view name="search"></router-view>

    <h3>投稿</h3>
    <!-- <label for="title">タイトル</label>
    <input type="text" id="title" v-model="title" />
    <br />
    <br />
    <label for="content">投稿内容</label>
    <textarea id="content" cols="30" rows="10" v-model="content"></textarea>
    <br />
    <button @click="postContent">投稿</button> -->
    <v-col cols="12" sm="6" md="3" id="post">
      <label for="title">タイトル</label>
      <v-text-field v-model="title" label="タイトル" solo></v-text-field>
      <label for="content">投稿内容</label>
      <v-textarea solo label="投稿内容" v-model="content"></v-textarea>
      <v-btn @click="postContent">投稿</v-btn>
    </v-col>

    <h3>投稿一覧</h3>
    <hr />
    <div id="contents">
      <div v-for="post in displayLists" :key="post.name">
        <div>タイトル：{{ post.document.fields.title.stringValue }}</div>
        <div>投稿内容：{{ post.document.fields.content.stringValue }}</div>
        <div>
          投稿時間：{{ post.document.fields.created_at.timestampValue }}
        </div>
        <div>
          編集時間：{{ post.document.fields.updated_at.timestampValue }}
        </div>
        <div>回答有無：{{ post.document.fields.isAnswered.booleanValue }}</div>
        <br />
      </div>
    </div>
    <div>
      <v-pagination
        v-model="page"
        :length="pageLength"
        circle
        @input="pageChange"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      page: 1,
    };
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    },
    newPosts() {
      return this.$store.getters.newPosts;
    },
    displayLists() {
      return this.$store.getters.displayLists;
    },
    pageLength() {
      return this.$store.getters.pageLength;
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
    pageChange(pageNumber) {
      this.$store.dispatch("contents/getDisplayLists", pageNumber);
    },
  },
};
</script>

<style>
#contents {
  height: 600px;
}
#post {
  margin: 0 auto;
}
</style>
