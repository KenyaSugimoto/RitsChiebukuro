<template>
  <div>
    <h2>質問</h2>

    <hr>

    <!-- 質問 -->
    <div class='content-box'>
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
        閲覧数：{{post.document.fields.views.integerValue}}
      </div>

      <template v-if='!favoritePostIds.includes(post.document.fields.postId.stringValue)'>
        <button @click='updateFavorite(true)'>気になる</button>
      </template>
      <template v-else>
        <button @click='updateFavorite(false)'>気にならない</button>
      </template>

      <template v-if='uid == post.document.fields.uid.stringValue'>
        <div>
          <button @click='deletePost'>削除</button>
        </div>
      </template>
    </div>

    <hr>

    <!-- ベストアンサーが選ばれたら回答エリアを消す -->
    <template v-if='!isResolved'>
      <!-- 回答エリア -->
      <div class='post-form'>
        <div>
            <label for='answer'>*回答内容</label>
            <br>
            <textarea id='answer' cols='30' rows='10' v-model='answer'></textarea>
        </div>
      </div>

      <hr>

      <button @click='addAnswer'>回答を送信</button>
    </template>

    <br><br>
    <br><br>

    <!-- 回答がある場合 -->
    <template v-if='this.isAnswered'>
      <h3>回答{{thread.answers.arrayValue.values.length}}件</h3>

      <hr>

      <!-- ベストアンサー -->
      <div v-for='(answer, index) in thread.answers.arrayValue.values' :key='answer.mapValue.fields.answerId.stringValue + "best"' class='content-box'>
        <template v-if='answer.mapValue.fields.isBestAnswer.booleanValue'>
          <h3>ベストアンサーに選ばれた回答</h3>
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
            <div>
              <button @click='deleteAnswer(answer.mapValue.fields, true)'>削除</button>
            </div>
          </template>

          <hr>

          <!-- コメントエリア -->
          <div v-for='comment in answer.mapValue.fields.comments.arrayValue.values' :key='comment.mapValue.fields.commentId.stringValue + "best"'>
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
              <button @click='deleteComment(answer.mapValue.fields, comment.mapValue.fields)'>削除</button>
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

            <button @click='addComment(answer.mapValue.fields, index)'>コメントを送信</button>
          </template>
          <template v-else>
            <button @click='displayCommentArea(index)'>コメントする</button>
          </template>
        </template>
      </div>

      <!-- ベストアンサーと回答を区切るための<hr> -->
      <template v-if='isResolved'>
        <hr>
      </template>

      <!-- 回答 -->
      <div v-for='(answer, index) in thread.answers.arrayValue.values' :key='answer.mapValue.fields.answerId.stringValue' class='content-box'>
        <template v-if='!answer.mapValue.fields.isBestAnswer.booleanValue'>
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
          <template v-if='!answer.mapValue.fields.isBestAnswer.booleanValue && uid == post.document.fields.uid.stringValue && !thread.isResolved.booleanValue'>
            <div>
              <button @click='updateBestAnswer(answer.mapValue.fields)'>ベストアンサーにする</button>
            </div>
          </template>

          <template v-if='uid == answer.mapValue.fields.uid.stringValue'>
            <div>
              <button @click='deleteAnswer(answer.mapValue.fields, false)'>削除</button>
            </div>
          </template>

          <hr>

          <!-- コメントエリア -->
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
              <button @click='deleteComment(answer.mapValue.fields, comment.mapValue.fields)'>削除</button>
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

            <button @click='addComment(answer.mapValue.fields, index)'>コメントを送信</button>
          </template>
          <template v-else>
            <button @click='displayCommentArea(index)'>コメントする</button>
          </template>

          <hr>
        </template>
      </div>
    </template>

    <template v-else>
      <h3>まだ回答がありません</h3>
    </template>

  </div>
</template>

<script>
import {toast} from "../../function/toastr.js";
import {dialog} from "../../function/dialog.js";

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
    favoritePostIds() {
      return this.$store.getters.favoritePostIds;
    },
    isResolved() {
      return this.$store.getters.isResolved;
    }
  },
  methods: {
    deletePost() {
      dialog(this, {
        title: '本当にこの質問を削除しますか？',
        body: `タイトル： ${this.post.document.fields.title.stringValue} <br><br><br> 質問内容： ${this.post.document.fields.content.stringValue}`
      }).then((response) => {
        if (response == 'OK') {
          this.$store.dispatch('post/deletePost', this.postId).then(() => {
            toast('質問を削除しました', "success");
            this.$router.push('/');
          });
        }
      });
    },
    addNotification(type) {
      const notificationId = new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16);
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
        postId: {
          stringValue: this.post.document.fields.postId.stringValue
        },
        postTitle: {
          stringValue: this.$store.getters.watchingPost.document.fields.title.stringValue
        },
        questionerUid: {
          stringValue: this.post.document.fields.uid.stringValue
        },
        type: {
          stringValue: type
        },
      };
      this.$store.dispatch("notification/addNotification", notificationData);
    },
    addAnswer() {
      dialog(this, {
        title: '回答を送信しますか？',
        body: `回答： ${this.answer}`
      }).then((response) => {
        if (response == 'OK') {
          // 回答が存在しない場合、回答なし --> 回答ありにする
          if (!this.isAnswered) {
            this.$store.dispatch('post/updateIsAnswered', true);
          }

          this.addNotification("answer");

          this.comment.push({ value: '' });
          this.isDisplayCommentArea.push({ value: false });

          const answer = {
            mapValue: {
              fields: {
                answer: { stringValue: this.answer },
                answerId: { stringValue: new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16) },
                isBestAnswer: { booleanValue: false },
                uid: { stringValue: this.uid },
                userName: { stringValue: this.$store.getters.userName },
                created_at: { timestampValue: new Date().toISOString() },
                updated_at: { timestampValue: new Date().toISOString() },
                comments: { arrayValue: { values: [] } },
              }
            }
          }

          if (this.threadExists) {
            // スレッドが存在する場合、スレッドに回答を追加し、回答ありに設定
            this.$store.dispatch('thread/addThread', {
              answer: answer,
              type: 'answer',
            }).then((response) => {
              if (response == 'OK') {
                this.isAnswered = true;
              }
            });
          } else {
            // スレッドが存在しない場合、スレッドを作成し、スレッドあり・回答ありに設定
            this.$store.dispatch('thread/createThread', {
              answers: {
                arrayValue: {
                  values: [
                    answer
                  ]
                }
              },
              isResolved: { booleanValue: false },
              created_at: { timestampValue: new Date().toISOString() },
            }).then((response) => {
              this.threadExists = true;
              if (response == 'OK') {
                this.isAnswered = true;
              } else if (response == 'ALREADY_EXISTS') {
                // スレッドが存在する場合、スレッドに回答を追加し、回答ありに設定
                this.$store.dispatch('thread/addThread', {
                  answer: answer,
                  type: 'answer',
                }).then((response) => {
                  if (response == 'OK') {
                    this.isAnswered = true;
                  }
                });
              }
            });
          }
          this.answer = '';
        }
      });
    },
    addComment(fields, index) {
      dialog(this, {
        title: 'コメントを送信しますか？',
        body: `コメント： ${this.comment[index].value}`
      }).then((response) => {
        if (response == 'OK') {
          this.addNotification("comment");

          const comment = {
            mapValue: {
              fields: {
                comment: { stringValue: this.comment[index].value },
                commentId: { stringValue: new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16) },
                uid: { stringValue: this.uid },
                userName: { stringValue: this.$store.getters.userName },
                created_at: { timestampValue: new Date().toISOString() },
                updated_at: { timestampValue: new Date().toISOString() },
              }
            }
          };

          this.$store.dispatch('thread/addThread', {
            answerId: fields.answerId.stringValue,
            comment,
            type: 'comment',
          });

          this.comment[index].value = '';
          // this.isDisplayCommentArea[index].value = false;
        }
      });
    },
    displayCommentArea(index) {
      this.isDisplayCommentArea[index].value = true;
    },
    deleteAnswer(fields, isBestAnswer) {
      dialog(this, {
        title: '本当にこの回答を削除しますか？',
        body: `回答： ${fields.answer.stringValue}`
      }).then((response) => {
        if (response == 'OK') {
          this.$store.dispatch('thread/deleteAnswer', fields.answerId.stringValue).then(() => {
            // 全ての回答が削除された場合、回答あり --> 回答なし
            if (this.thread.answers.arrayValue.values.length == 0) {
              this.isAnswered = false;
              this.$store.dispatch('post/updateIsAnswered', false);
            }
            // ベストアンサーが削除された場合、解決済み --> 未解決にする
            if (isBestAnswer) {
              this.$store.dispatch('thread/updateBestAnswer', {
                answerId: fields.answerId.stringValue,
                isResolved: false
              });
            }
          });
        }
      });
    },
    deleteComment(answerFields, commentFields) {
      dialog(this, {
        title: '本当にこのコメントを削除しますか？',
        body: `コメント： ${commentFields.comment.stringValue}`
      }).then((response) => {
        if (response == 'OK') {
          this.$store.dispatch('thread/deleteComment', {
            answerId: answerFields.answerId.stringValue,
            commentId: commentFields.commentId.stringValue,
          });
        }
      });
    },
    updateBestAnswer(fields) {
      dialog(this, {
        title: 'この回答をベストアンサーにしますか？',
        body: `回答： ${fields.answer.stringValue}`
      }).then((response) => {
        if (response == 'OK') {
          this.$store.dispatch('thread/updateBestAnswer', {
            answerId: fields.answerId.stringValue,
            isResolved: true
          });
        }
      });
    },
    updateFavorite(isFavorite) {
      this.$store.dispatch('user/updateFavoritePostIds', isFavorite);
    },
  },
  created() {
    // スレッドの取得
    this.$store.dispatch('thread/getThread').then(() => {
      if (this.thread !== null) {
        const answers = this.thread.answers.arrayValue.values;
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

    // 質問者以外が、ログインしてから初めて閲覧した場合、閲覧数を更新
    if (!this.$store.getters.watchedPostIds.includes(this.postId) && this.uid != this.post.document.fields.uid.stringValue) {
      let views = Number(this.post.document.fields.views.integerValue);
      views = views + 1;
      this.$store.dispatch('post/updateViews', {
        postId: this.postId,
        views
      });
    }
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
