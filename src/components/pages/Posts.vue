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
        <!-- <router-link to='/my-page'> -->
        <router-link :to="{name: 'user', params: {targetUid: post.document.fields.uid.stringValue}}" class="header-item">
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
        <router-link :to="{name: 'post', params: {contentId: post.document.fields.contentId.stringValue}}" class="header-item">
          回答する
        </router-link>
      </template>

      <br>
    </div>
  </div>
</template>

<script>
export default {
  props: ['posts']
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
.header-item {
  padding:  10px;
  cursor: pointer;
}
.header-item:hover {
  background-color: #b1abab;
  color: red;
}
</style>