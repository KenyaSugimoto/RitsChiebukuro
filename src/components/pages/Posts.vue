<template>
  <div>
    <h3>投稿一覧</h3>

    <hr>

    <div v-for='post in posts' :key='post.name' class='content-box'>
      <div @click='toPost(post)' class="answer-link">
        <div class="title">
          {{post.document.fields.title.stringValue}}
        </div>
        <p v-if="post.document.fields.content.stringValue.length > 50">
          {{post.document.fields.content.stringValue.slice(0,50)}}...
        </p>
        <p v-else>
          {{post.document.fields.content.stringValue.slice(0,50)}}
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import router from './../../router';
export default {
  props: ['posts'],
  methods: {
    toPost(post) {
      this.$store.commit('updateWatchingPost', post);
      router.push({name: 'post', params: {contentId: post.document.fields.contentId.stringValue}});
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
