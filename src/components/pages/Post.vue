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
    <button @click="addNotification">テスト用ボタン（ここを押すと通知情報が追加されます）</button>
    <hr>

    <button @click='addAnswer'>回答を送信</button>

    <br><br>
    <br><br>

    <template v-if='this.isAnswered'>
      <h3>回答{{thread.answers.arrayValue.values.length}}件</h3>

      <hr>

      <div v-for='(answer, index) in thread.answers.arrayValue.values' :key='answer.mapValue.fields.answerId.stringValue' class='content-box'>
        <h3>回答</h3>
        <div>
          {{answer.mapValue.fields.userName.stringValue}}さん
        </div>
        <div>
          {{answer.mapValue.fields.answer.stringValue}}
        </div>
        <div>
          {{answer.mapValue.fields.created_at.timestampValue | dateFormat}}
        </div>
        <template v-if='uid == answer.mapValue.fields.uid.stringValue'>
          <button @click='deleteAnswer(answer.mapValue.fields.answerId.stringValue)'>削除</button>
        </template>
        <hr>

        <div v-for='comment in answer.mapValue.fields.comments.arrayValue.values' :key='comment.mapValue.fields.commentId.stringValue'>
          <h3>コメント</h3>
          <div>
            {{comment.mapValue.fields.userName.stringValue}}さん
          </div>
          <div>
            {{comment.mapValue.fields.comment.stringValue}}
          </div>
          <div>
            {{comment.mapValue.fields.created_at.timestampValue | dateFormat}}
          </div>
          <template v-if='uid == comment.mapValue.fields.uid.stringValue'>
            <button @click='deleteComment(answer.mapValue.fields.answerId.stringValue, comment.mapValue.fields.commentId.stringValue)'>削除</button>
          </template>
          <hr>
        </div>

        <template v-if='isDisplayCommentArea[index].value'>
          <div class='post-form'>
            <div>
                <label for='comment'>*コメント内容</label>
                <br>
                <textarea id='comment' cols='30' rows='10' v-model='comment[index].value'></textarea>
            </div>
          </div>

          <button @click='addComment(answer.mapValue.fields.answerId.stringValue, index)'>コメントを送信</button>
        </template>
        <template v-else>
          <button @click='displayCommentArea(index)'>コメントする</button>
        </template>

        <hr>
      </div>
    </template>

    <template v-else>
      <h3>まだ回答がありません</h3>
    </template>

  </div>
</template>

<script>
import {toast} from "../../function/toastr.js";
export default {
  data() {
    return {
      answer: '',
      comment: [
        { value: '' },
      ],
      isDisplayCommentArea: [
        { value: false },
      ],
      isAnswered: false,
      threadExists: false,
    }
  },
  props: ['postId'],
  computed: {
    post() {
      return this.$store.getters.watchingPost;
    },
    uid() {
      return this.$store.getters.uid;
    },
    thread() {
      return this.$store.getters.thread;
    },
  },
  methods: {
    deletePost() {
      if (confirm('本当にこの質問を削除しますか？')) {
        this.$store.dispatch('post/deletePost', {postId: this.postId}).then(() => {
          toast('質問を削除しました', "success");
          this.$router.push('/');
        });
      }
    },
    addNotification() {
      const notificationId = new Date().getTime().toString(16) + Math.floor(1000*Math.random()).toString(16);
      const notificationData = {
        notificationId: {
          stringValue: notificationId
        },
        created_at: {
          timestampValue: new Date().toISOString()
        },
        respondentName: {
          stringValue: this.$store.getters.userName
        },
        threadId: {
          stringValue: this.$store.getters.watchingPost.document.fields.postId.stringValue
        },
        type: {
          stringValue: "answer"
        },
        questionerUid: {
          stringValue: this.$store.getters.watchingPost.document.fields.uid.stringValue
        },
      };
      this.$store.dispatch("notification/addNotification", notificationData);
    },
    addAnswer() {
      this.comment.push({ value: '' });
      this.isDisplayCommentArea.push({ value: false });

      const answer = {
        mapValue: {
          fields: {
            answer: { stringValue: this.answer },
            answerId: { stringValue: new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16) },
            uid: { stringValue: this.$store.getters.uid },
            userName: { stringValue: this.$store.getters.userName },
            created_at: { timestampValue: new Date().toISOString() },
            updated_at: { timestampValue: new Date().toISOString() },
            comments: { arrayValue: { values: [] } },
          }
        }
      }

      if (this.threadExists) {
        this.$store.dispatch('thread/addThread', {
          postId: this.postId,
          answer: answer,
          type: 'answer',
        }).then((response) => {
          if (response == 'OK') {
            this.isAnswered = true;
          }
        });
      } else {
        this.$store.dispatch('thread/createThread', {
          postId: this.postId,
          fields: {
            answers: {
              arrayValue: {
                values: [
                  answer
                ]
              }
            }
          },
        }).then((response) => {
          if (response == 'OK') {
            this.threadExists = true;
            this.isAnswered = true;
          } else if (response == 'ALREADY_EXISTS') {
            this.$store.dispatch('thread/addThread', {
              postId: this.postId,
              answer: answer,
              type: 'answer',
            });
          }
        });
      }
      this.answer = '';
    },
    addComment(answerId, index) {
      const comment = {
        mapValue: {
          fields: {
            comment: { stringValue: this.comment[index].value },
            commentId: { stringValue: new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16) },
            uid: { stringValue: this.$store.getters.uid },
            userName: { stringValue: this.$store.getters.userName },
            created_at: { timestampValue: new Date().toISOString() },
            updated_at: { timestampValue: new Date().toISOString() },
          }
        }
      };

      this.$store.dispatch('thread/addThread', {
        postId: this.postId,
        answerId,
        comment,
        type: 'comment',
      });

      this.comment[index].value = '';
      // this.isDisplayCommentArea[index].value = false;
    },
    displayCommentArea(index) {
      this.isDisplayCommentArea[index].value = true;
    },
    deleteAnswer(answerId) {
      this.$store.dispatch('thread/deleteAnswer', {
        postId: this.postId,
        answerId,
      }).then(() => {
        if (this.$store.getters.thread.answers.arrayValue.values.length == 0) {
          this.isAnswered = false;
        }
      });
    },
    deleteComment(answerId, commentId) {
      this.$store.dispatch('thread/deleteComment', {
        postId: this.postId,
        answerId,
        commentId,
      })
    }
  },
  created() {
    this.$store.dispatch('thread/getThread', this.postId).then(() => {
      if (this.$store.getters.thread !== null) {
        const answers = this.$store.getters.thread.answers.arrayValue.values;
        if (typeof(answers) !== 'undefined') {
          for (let i = 0; i < answers.length - 1; i++) {
            this.comment.push({ value: '' });
            this.isDisplayCommentArea.push({ value: false });
          }
          this.isAnswered = true;
        }
        this.threadExists = true;
      }
    });
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
</style>
