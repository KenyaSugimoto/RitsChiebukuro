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
        :length="length"
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
      displayLists: [],
      pageSize: 4,
      length: 0,
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
    this.$store.dispatch("contents/getContents");
    this.length = Math.ceil(
      this.$store.getters.newPosts.length / this.pageSize
    );
    this.displayLists = this.$store.getters.newPosts.slice(0, this.pageSize);
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
      this.displayLists = this.$store.getters.newPosts.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    },
  },
};
</script>

<style>
#contents {
  height: 600px;
}
</style>
