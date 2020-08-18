<template>
  <div>
    <h2>{{ name }}</h2>

    <hr />

    <template v-if='posts !== null && typeof(posts[0]) !== "undefined"'>
      <div
        v-for="post in posts"
        :key="post.document.fields.postId.stringValue"
        class="content-box"
      >
        <div>
          <div @click="toPost(post)" class="answer-link title">
            {{ post.document.fields.title.stringValue }}
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <h3>{{name}}はありません</h3>
    </template>

    <hr>
    <br><br>
  </div>
</template>

<script>
export default {
  props: ["posts", "name"],
  computed: {
    watchingPost() {
      return this.$store.getters.watchingPost;
    }
  },
  methods: {
    toPost(post) {
      this.$store.dispatch("post/getPostByPostId", post.document.fields.postId.stringValue).then((response) => {
        if (response == "OK") {
          const existWatchingPost = "document" in this.watchingPost;
          if (existWatchingPost) {
            this.$router.push({
              name: "post",
              params: { postId: this.watchingPost.document.fields.postId.stringValue },
            });
          } else {
            this.$router.push({name: "notFound"});
          }
        }
      });
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
.box {
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
.answer-link {
  padding: 10px;
  cursor: pointer;
}
.answer-link:hover {
  background-color: #b1abab;
  color: red;
}
</style>
