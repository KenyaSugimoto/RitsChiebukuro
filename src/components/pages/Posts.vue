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
  methods: {
    toPost(post) {
      console.log("post", post);
      this.$store.commit("updateWatchingPost", null);
      this.$store.commit("updateWatchingPost", post);
      this.$router.push({
        name: "post",
        params: { postId: post.document.fields.postId.stringValue },
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
