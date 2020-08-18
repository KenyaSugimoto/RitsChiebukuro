<template>
  <div class="posts-area">
    <div>
      <h2>{{ name }}</h2>

    <template v-if='posts !== null && typeof(posts[0]) !== "undefined"'>
      <div
        v-for="post in posts"
        :key="post.document.fields.postId.stringValue"
      >
        <v-card
          class="card"
          width="100%"
          @click="toPost(post)"
        >
          <v-card-text>
            <div class="title">
              {{ post.document.fields.title.stringValue }}
            </div>
            <div>
              {{ post.document.fields.created_at.timestampValue | dateFormat }}
            </div>
          </v-card-text>
        </v-card>
      </div>
    </template>

    <template v-else>
      <h3>{{name}}はありません</h3>
    </template>

    <br><br>
    </div>
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
.card {
  margin: 10px;
}
.title {
  font: bold;
}
</style>
