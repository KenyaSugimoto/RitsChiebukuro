<template>
  <div>
    <h2>質問{{postId}}のページ</h2>

    <hr>

    <div class='content-box'>
      <div>
        {{post.document.fields.isAnswered.booleanValue ? '解決済み' : '未解決'}}
      </div>

      <div>
        投稿者：
        <router-link to='/my-page'>
          {{post.document.fields.userName.stringValue}}さん
        </router-link>
      </div>

      <div>
        {{post.document.fields.category.stringValue}}
      </div>

      <div class='title'>
        {{post.document.fields.title.stringValue}}
      </div>

      <div class='content box'>
        {{post.document.fields.content.stringValue}}
      </div>

      <div>
        投稿時間：{{post.document.fields.created_at.timestampValue | dateFormat}}
      </div>
      <div>
        編集時間：{{post.document.fields.updated_at.timestampValue | dateFormat}}
      </div>

      <template v-if='uid == post.document.fields.uid.stringValue'>
        <button @click='deletePost'>削除</button>
      </template>
    </div>

    <hr>

    <div class='post-form'>
      <div>
          <label for='answer'>*回答内容</label>
          <br>
          <textarea id='answer' cols='30' rows='10' v-model='answer'></textarea>
      </div>
    </div>

    <br>
    <button>回答する</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      answer: '',
    }
  },
  props: ['postId'],
  computed: {
    post() {
      return this.$store.getters.watchingPost;
    },
    uid() {
      return this.$store.getters.uid;
    }
  },
  methods: {
    deletePost() {
      if (confirm('本当にこの質問を削除しますか？')) {
        this.$store.dispatch('post/deletePost', {postId: this.postId}).then(() => {
          alert('質問を削除しました。');
          this.$router.push('/');
        });
      }
    },
  }
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
.post-form {
  background-color: rgb(199, 217, 218);
}
</style>
