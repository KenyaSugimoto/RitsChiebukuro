<template>
  <div>
    <!-- 質問 -->
    <v-container>
      <br><hr><br>
      <v-row justify="center" class="title">
        <v-col cols="10"><p><b>質問</b></p></v-col>
      </v-row>

      <!-- 質問詳細 -->
      <v-row justify="center" class="question">
        <v-col cols="11">
          <v-card>

            <!-- 気になるボタン -->
            <v-row justify="end">
              <v-col cols="3" sm="2" md="2" lg="1">
                <v-btn v-if='!favoritePostIds.includes(post.document.fields.postId.stringValue)' icon x-large @click='updateFavorite(true)'><v-icon>mdi-star</v-icon></v-btn>
                <v-btn v-else icon x-large color='#FFE240' @click='updateFavorite(false)'><v-icon>mdi-star</v-icon></v-btn>
              </v-col>
            </v-row>

            <!-- 質問者の名前 -->
            <v-row justify="center">
              <v-col cols="11" sm="11" md="10" lg="10">
                <p><b>{{post.document.fields.userName.stringValue}}</b>さん</p>
                <hr>
              </v-col>
            </v-row>

            <!-- 質問タイトル -->
            <v-row justify="center">
              <v-col cols="11" sm="11" md="10" lg="10">
                <p class="title"><b>{{post.document.fields.title.stringValue}}</b></p>
              </v-col>
            </v-row>

            <!-- 質問カテゴリ -->
            <v-row justify="center">
              <v-col cols="11" sm="11" md="10" lg="10">
                <p>{{post.document.fields.category.stringValue}}</p>
              </v-col>
            </v-row>

            <!-- 質問内容 -->
            <v-row justify="center">
              <v-col cols="11" sm="11" md="10" lg="10">
                <p class="content">{{post.document.fields.content.stringValue}}</p>
              </v-col>
            </v-row>

            <v-row justify="center"><v-col cols="11" md="10"><br><hr><br></v-col></v-row>

            <v-row justify="center">
              <v-col cols="10" sm="5" md="5" lg="5">
                <!-- *** アイコンいれる -->
                <div v-bind:class="{left: !xs}">閲覧数：{{post.document.fields.views.integerValue}}</div>
              </v-col>
              <v-col cols="10" sm="6" md="5" lg="5">
                <!-- ＊＊＊アイコンいれる＊＊＊ -->
                <div v-bind:class="{time: !xs}">{{post.document.fields.created_at.timestampValue | dateFormat}}</div>
                <br>
              </v-col>
            </v-row>
            <v-row justify="center">
              <!-- 削除ボタン -->
              <v-col cols="3" sm="2" md="2" lg="2">
                <v-btn v-if='uid == post.document.fields.uid.stringValue' @click='deletePost' icon class="mx-auto">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <br><br>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <br><br>

      <!-- 回答エリア（ベストアンサーが選ばれたら回答エリアを消す） -->
      <v-row justify="center">
        <v-col>
          <template v-if='!isResolved'>
            <!-- 回答エリア -->
            <template v-if='isDisplayAnswerArea'>
              <v-textarea class='text-area' label='回答' outlined auto-grow rows=8 v-model='answer'></v-textarea>
              <v-btn class='btn' outlined @click='addAnswer'><b>回答を送信</b></v-btn>
            </template>
            <template v-else>
              <v-btn class='btn' outlined @click='displayAnswerArea'><b>回答する</b></v-btn>
            </template>
            <br>
          </template>
        </v-col>
      </v-row>

      <br><br>

      <!-- 回答コメントエリア（回答がある場合） -->
      <v-row justify="center" class="thread">
        <v-col cols="11">
          <template v-if='this.isAnswered'>
            <v-row>
              <v-col>
                <h3>回答 {{thread.answers.arrayValue.values.length}}件</h3>
                <hr><br>
              </v-col>
            </v-row>

            <!-- ベストアンサー -->
            <div v-for='(answer, index) in thread.answers.arrayValue.values' :key='answer.mapValue.fields.answerId.stringValue + "best"'>
              <v-card v-if='answer.mapValue.fields.isBestAnswer.booleanValue'>
                <br>
                <h3>ベストアンサーに選ばれた回答</h3>
                <!-- 回答者のユーザー名 -->
                <v-row justify="center">
                  <v-col cols="11" sm="11" md="10" lg="10">
                    <br><br>
                    <p><b>{{answer.mapValue.fields.userName.stringValue}}</b>さん</p>
                    <hr>
                  </v-col>
                </v-row>

                <!-- 回答内容 -->
                <v-row justify="center">
                  <v-col cols="11" sm="11" md="10" lg="10">
                    <p class="content">{{answer.mapValue.fields.answer.stringValue}}</p>
                    <br><br><hr>
                  </v-col>
                </v-row>

                <!-- 時刻 -->
                <v-row justify="center" v-bind:class="{time: !xs}">
                  <v-col cols="11" sm="11" md="10" lg="10">
                    <div>{{answer.mapValue.fields.created_at.timestampValue | dateFormat}}</div>
                  </v-col>
                </v-row>

                <!-- 回答削除ボタン -->
                <v-row v-if='uid == answer.mapValue.fields.uid.stringValue'>
                  <v-col>
                    <br>
                    <v-btn @click='deleteAnswer(answer.mapValue.fields, false)' icon class="mx-auto">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <br><br>

                <!-- コメントエリア -->
                <v-row justify="center">
                  <v-col cols="10">
                    <v-card class="comments">
                      <div v-for='comment in answer.mapValue.fields.comments.arrayValue.values' :key='comment.mapValue.fields.commentId.stringValue + "best"'>
                        <v-row justify="center">
                          <v-col cols="11">
                            <v-card>
                              <h3>コメント</h3>
                              <!-- コメントした人のユーザー名 -->
                              <v-row justify="center">
                                <v-col cols="11" sm="11" md="10" lg="10">
                                  <br><br>
                                  <p><b>{{comment.mapValue.fields.userName.stringValue}}</b>さん</p>
                                  <hr>
                                </v-col>
                              </v-row>

                              <!-- コメントの内容 -->
                              <v-row justify="center">
                                <v-col cols="11" sm="11" md="10" lg="10">
                                  <p class="content">{{comment.mapValue.fields.comment.stringValue}}</p>
                                  <br><br><hr>
                                </v-col>
                              </v-row>

                              <!-- 時刻 -->
                              <v-row justify="center" v-bind:class="{time: !xs}">
                                <v-col cols="11" sm="11" md="10" lg="10">
                                  <div>{{comment.mapValue.fields.created_at.timestampValue | dateFormat}}</div>
                                </v-col>
                              </v-row>

                              <!-- コメント削除ボタン -->
                              <v-btn v-if='uid == comment.mapValue.fields.uid.stringValue' @click='deleteComment(answer.mapValue.fields, comment.mapValue.fields)' icon class="mx-auto">
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>

                              <br><br>
                            </v-card>
                          </v-col>
                        </v-row>
                        <br><br>
                      </div>
                      <v-row v-if='isDisplayCommentArea[index].value' justify="center">
                        <v-col cols="12">
                          <v-textarea class='text-area' label='コメント' outlined auto-grow rows=4 v-model='comment[index].value'></v-textarea>
                        </v-col>
                        <v-col cols="12">
                          <v-btn class='btn' outlined @click='addComment(answer.mapValue.fields, index)'><b>コメントを送信</b></v-btn>
                          <br><br>
                        </v-col>
                      </v-row>
                      <v-row v-else>
                        <v-col>
                          <v-btn class='btn' outlined @click='displayCommentArea(index)'><b>コメントする</b></v-btn>
                          <br><br>
                        </v-col>
                      </v-row>
                    </v-card>
                    <br>
                  </v-col>
                </v-row>
              </v-card>
            </div>

            <!-- 回答 -->
            <div v-for='(answer, index) in thread.answers.arrayValue.values' :key='answer.mapValue.fields.answerId.stringValue'>
              <br><br>
              <v-card v-if='!answer.mapValue.fields.isBestAnswer.booleanValue'>
                <h3>回答</h3>

                <!-- 回答者のユーザー名 -->
                <v-row justify="center">
                  <v-col cols="11" sm="11" md="10" lg="10">
                    <br><br>
                    <p><b>{{answer.mapValue.fields.userName.stringValue}}</b>さん</p>
                    <hr>
                  </v-col>
                </v-row>

                <!-- 回答内容 -->
                <v-row justify="center">
                  <v-col cols="11" sm="11" md="10" lg="10">
                    <p class="content">{{answer.mapValue.fields.answer.stringValue}}</p>
                    <br><br><hr>
                  </v-col>
                </v-row>

                <!-- 時刻 -->
                <v-row justify="center" v-bind:class="{time: !xs}">
                  <v-col cols="11" sm="11" md="10" lg="10">
                    <div>{{answer.mapValue.fields.created_at.timestampValue | dateFormat}}</div>
                  </v-col>
                </v-row>

                <!-- ベストアンサーボタン -->
                <v-row v-if='!answer.mapValue.fields.isBestAnswer.booleanValue && uid == post.document.fields.uid.stringValue && !thread.isResolved.booleanValue'>
                  <v-col>
                    <v-btn class='btn' outlined @click='updateBestAnswer(answer.mapValue.fields)'><b>この回答をベストアンサーにする</b></v-btn>
                  </v-col>
                </v-row>

                <!-- 回答削除ボタン -->
                <v-row v-if='uid == answer.mapValue.fields.uid.stringValue'>
                  <v-col>
                    <br>
                    <v-btn @click='deleteAnswer(answer.mapValue.fields, false)' icon class="mx-auto">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <br>

                <!-- コメントエリア -->
                <v-row justify="center">
                  <v-col cols="10">
                    <v-card class="comments">
                      <div v-for='comment in answer.mapValue.fields.comments.arrayValue.values' :key='comment.mapValue.fields.commentId.stringValue'>
                        <v-row justify="center">
                          <v-col cols="11">
                            <v-card>
                              <h3>コメント</h3>

                              <!-- コメントした人のユーザー名 -->
                              <v-row justify="center">
                                <v-col cols="11" sm="11" md="10" lg="10">
                                  <br><br>
                                  <p><b>{{comment.mapValue.fields.userName.stringValue}}</b>さん</p>
                                  <hr>
                                </v-col>
                              </v-row>

                              <!-- コメントの内容 -->
                              <v-row justify="center">
                                <v-col cols="11" sm="11" md="10" lg="10">
                                  <p class="content">{{comment.mapValue.fields.comment.stringValue}}</p>
                                  <br><br><hr>
                                </v-col>
                              </v-row>

                              <!-- 時刻 -->
                              <v-row justify="center" v-bind:class="{time: !xs}">
                                <v-col cols="11" sm="11" md="10" lg="10">
                                  <div>{{comment.mapValue.fields.created_at.timestampValue | dateFormat}}</div>
                                </v-col>
                              </v-row>

                              <!-- コメント削除ボタン -->
                              <v-btn v-if='uid == comment.mapValue.fields.uid.stringValue' @click='deleteComment(answer.mapValue.fields, comment.mapValue.fields)' icon class="mx-auto">
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>

                              <br><br>
                            </v-card>
                          </v-col>
                        </v-row>
                        <br><br>
                      </div>
                      <v-row v-if='isDisplayCommentArea[index].value' justify="center">
                        <v-col cols="12">
                          <v-textarea class='text-area' label='コメント' outlined auto-grow rows=4 v-model='comment[index].value'></v-textarea>
                        </v-col>
                        <v-col cols="12">
                          <v-btn class='btn' outlined @click='addComment(answer.mapValue.fields, index)'><b>コメントを送信</b></v-btn>
                          <br><br>
                        </v-col>
                      </v-row>
                      <v-row v-else>
                        <v-col>
                          <v-btn class='btn' outlined @click='displayCommentArea(index)'><b>コメントする</b></v-btn>
                          <br><br>
                        </v-col>
                      </v-row>
                    </v-card>
                    <br>
                  </v-col>
                </v-row>
              </v-card>
              <br><br>
            </div>
          </template>
          <template v-else>
            <v-row justify="center">
              <v-col cols="11">
                <hr><br><br>
                <h3>まだ回答がありません</h3>
              </v-col>
            </v-row>
          </template>
        </v-col>
      </v-row>
    </v-container>

    <br><br>
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
      isDisplayAnswerArea: false,
      data: this.$vuetify.breakpoint,
      isActive: null,
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
    },
    xs() {
      return this.$vuetify.breakpoint.xs;
    }
  },
  methods: {
    deletePost() {
      dialog(this, {
        title: '本当にこの質問を削除しますか？',
        body: `タイトル： ${this.post.document.fields.title.stringValue}`
      }).then((response) => {
        if (response == 'OK') {
          this.$store.dispatch('post/deletePost', this.postId).then(() => {
            toast('質問を削除しました', "success");
            this.$router.push('/');
          });
        }
      });
    },
    addNotificationForQuestioner(type) {
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
      this.$store.dispatch("notification/addNotificationForQuestioner", notificationData);
    },
    addNotificationForRespondent(respondentUid) {
      const notificationId = new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16);
      const notificationData = {
        notificationId: {
          stringValue: notificationId
        },
        created_at: {
          timestampValue: new Date().toISOString()
        },
        questionerName: {
          stringValue: this.post.document.fields.userName.stringValue
        },
        postId: {
          stringValue: this.post.document.fields.postId.stringValue
        },
        postTitle: {
          stringValue: this.$store.getters.watchingPost.document.fields.title.stringValue
        },
        respondentUid: {
          stringValue: respondentUid
        },
        type: {
          stringValue: "respondent"
        },
      };
      this.$store.dispatch("notification/addNotificationForRespondent", notificationData);
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

          this.addNotificationForQuestioner("answer");

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
          this.isDisplayAnswerArea = false;
        }
      });
    },
    addComment(fields, index) {
      dialog(this, {
        title: 'コメントを送信しますか？',
        body: `コメント： ${this.comment[index].value}`
      }).then((response) => {
        if (response == 'OK') {
          const isRespondent = this.uid === fields.uid.stringValue;
          if (isRespondent) {
            // 質問者に通知
            this.addNotificationForQuestioner("comment");
          }else {
            // 回答者に通知
            const respondentUid = fields.uid.stringValue;
            this.addNotificationForRespondent(respondentUid);
          }

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
          this.isDisplayCommentArea[index].value = false;
        }
      });
    },
    displayCommentArea(index) {
      this.isDisplayCommentArea[index].value = true;
    },
    displayAnswerArea() {
      this.isDisplayAnswerArea = true;
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

          // ベストアンサーの通知
          this.$store.dispatch("notification/addBestAnswerNotification", fields);
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
      this.$store.dispatch('post/updateViews', views);
    }
  },
}
</script>

<style scoped>
.text-area {
  width: 75%;
  margin: 0 auto;
}
.btn {
  width: 25%;
  color: #B3424A;
}
.content {
  white-space: pre-wrap;
  text-align:left;
  /* word-break: keep-all; */
}
.title {
  text-align:left;
}
.question p {
  text-align:left;
}
.thread p {
  text-align:left;
}
.time p{
  text-align: right;
}
.time {
  text-align: right;
}
.left {
  text-align: left;
}
</style>
