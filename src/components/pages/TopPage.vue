<template>
  <div>
    <h2>トップページ</h2>
    <!-- <router-view name="search"></router-view> -->

    <h3>投稿</h3>
    <label for="title">タイトル</label>
    <input type="text" id="title" v-model="title" class="input-box"/>
    <br/><br/>
    <label for="content">投稿内容</label>
    <textarea id="content" cols="30" rows="10" v-model="content" class="input-box"></textarea>
    <br/>
    <button @click="postContent" class="button-box">投稿</button>
    <br/><br/>

    <h3>投稿一覧</h3>
    <hr />
    <div id="contents">
      <div v-for="post in displayLists" :key="post.name"  class="content-box">
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

#contents {
  height: 600px;
}

.input-box {
  border: 1.5px solid black;
}
.button-box {
  border: 1.5px solid black;
  border-radius: 3%;
  padding: 10px 30px;
}
</style>
