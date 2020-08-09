<template>
  <div>
    <h3>投稿一覧</h3>

    <hr>

    <div v-for='post in posts' :key='post.name' class='content-box'>
      <div class='title'>
        {{post.document.fields.title.stringValue}}
      </div>

      <div>
        <router-link to='/my-page'>
          {{post.document.fields.userName.stringValue}}
        </router-link>
      </div>

      <div>
        {{post.document.fields.major.stringValue}} {{post.document.fields.grade.stringValue}}
      </div>

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
        投稿者：{{post.document.fields.userName.stringValue}}
      </div>
      <div>
        編集時間：{{post.document.fields.updated_at.timestampValue}}
      </div>
      <div>
        回答有無：{{post.document.fields.isAnswered.booleanValue}}
      </div>

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
</style>