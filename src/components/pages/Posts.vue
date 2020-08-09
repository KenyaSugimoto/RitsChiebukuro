<template>
  <div>
    <h3>投稿一覧</h3>

    <hr>

    <div v-for='post in posts' :key='post.name' class='content-box'>
      <div>
        <div @click='toPost(post)' class="answer-link title">
          {{post.document.fields.title.stringValue}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ['posts'],
  methods: {
    toPost(post) {
      this.$store.commit('updateWatchingPost', post);
      this.$router.push({name: 'post', params: {contentId: post.document.fields.contentId.stringValue}});
    },
  },
}
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
  padding:  10px;
  cursor: pointer;
}
.answer-link:hover {
  background-color: #b1abab;
  color: red;
}
</style>
