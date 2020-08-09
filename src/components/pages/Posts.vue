<template>
  <div>
    <h3>投稿一覧</h3>

    <hr>

    <div v-for='post in posts' :key='post.name' class='content-box'>
      <div class='title'>
        タイトル： {{post.document.fields.title.stringValue}}
      </div>

      <div>
        投稿者：
        <router-link to='/my-page'>
          {{post.document.fields.userName.stringValue}}
        </router-link>
      </div>

      <!-- <div> -->
        <!-- {{post.document.fields.major.stringValue}} {{post.document.fields.grade.stringValue}} -->
      <!-- </div> -->

      <div class='content box'>
        {{post.document.fields.content.stringValue}}
      </div>

      <div>
        カテゴリ：{{post.document.fields.category.stringValue}}
      </div>
      <div>
        投稿時間：{{post.document.fields.created_at.timestampValue | dateFormat}}
      </div>
      <div>
        編集時間：{{post.document.fields.updated_at.timestampValue | dateFormat}}
      </div>
      <div>
        {{post.document.fields.isAnswered.booleanValue ? '解決済み' : '未解決'}}
      </div>

      <br>

      <template v-if='!post.document.fields.isAnswered.booleanValue'>
        <router-link @click.native='updateWatchingPost(post)' :to="{name: 'post', params: {contentId: post.document.fields.contentId.stringValue}}" class="answer-link">
          回答する
        </router-link>
      </template>

      <br>
    </div>
  </div>
</template>

<script>
export default {
  props: ['posts'],
  methods: {
    updateWatchingPost(post) {
      this.$store.commit('updateWatchingPost', post);
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
