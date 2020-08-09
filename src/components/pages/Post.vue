<template>
  <div>
    <h2>質問{{contentId}}のページ</h2>

    <hr>

    <div class='content-box'>
      <div>
        投稿者：
        <!-- <router-link to='/my-page'> -->
        <div @click="toTargetPage(post.document.fields.uid.stringValue)" class="link">
          {{post.document.fields.userName.stringValue}}さん
        </div>
      </div>

      <div>
        {{post.document.fields.category.stringValue}}
      </div>

      <!-- <div> -->
        <!-- {{post.document.fields.major.stringValue}} {{post.document.fields.grade.stringValue}} -->
      <!-- </div> -->
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
      <div>
        {{post.document.fields.isAnswered.booleanValue ? '解決済み' : '未解決'}}
      </div>
    </div>

    <hr>

    <div class='post-form'>
      <div>
          <label for='content'>*回答内容</label>
          <br>
          <textarea id='content' cols='30' rows='10' v-model='content'></textarea>
      </div>
    </div>

    <br>
    <button>回答する</button>

  </div>
</template>

<script>
import router from "./../../router";
export default {
  data() {
    return {
      content: '',
    }
  },
  props: ['contentId'],
  computed: {
    post() {
      return this.$store.getters.watchingPost;
    }
  },
  methods: {
    toTargetPage(targetUid) {
      this.$store.commit("updateTargetUid", targetUid);
      router.push({name: "user", params: {targetUid: targetUid}});
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
.post-form {
  background-color: rgb(199, 217, 218);
}
.link {
  margin: 5px auto;
  cursor: pointer;
  width: 200px;
  color: rgb(56, 56, 243);
  font-weight: bolder;
}
.link:hover {
  background-color: #b1abab;
  color: red;
}
</style>
