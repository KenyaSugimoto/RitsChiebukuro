<template>
  <div>
    <div v-if="existNotification">
      <h2>通知</h2>
      <div
        v-for="item in displayNotifications"
        :key="item.mapValue.fields.notificationId.stringValue"
        class="content-box">

        <div @click="toPost(item)" class="notification-link">
          <div v-if="item.mapValue.fields.type.stringValue == 'respondent'">
            <p> {{item.mapValue.fields.questionerName.stringValue}} の『 {{ item.mapValue.fields.postTitle.stringValue }} 』の質問に対して</p>
            あなたの回答にコメントがつきました。
          </div>
          <div v-else-if="item.mapValue.fields.type.stringValue == 'bestAnswer'">
            <p> {{item.mapValue.fields.questionerName.stringValue}} さんの質問
              『{{item.mapValue.fields.postTitle.stringValue}}』に対するあなたの回答がベストアンサーに選ばれました！</p>
          </div>
          <div v-else>
            <p>あなたの『 {{ item.mapValue.fields.postTitle.stringValue }} 』の質問に対して</p>
              {{item.mapValue.fields.respondentName.stringValue}}さんが
            <div v-if="item.mapValue.fields.type.stringValue == 'answer'">回答しました</div>
            <div v-else>コメントしました</div>
            <p>
              投稿時刻:
              {{ item.mapValue.fields.created_at.timestampValue | dateFormat }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <h2>通知はありません</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      existNotification: true,
    }
  },
  computed: {
    displayNotifications() {
      return this.$store.getters.displayNotifications;
    },
    watchingPost() {
      return this.$store.getters.watchingPost;
    },
    notificationConfigValues() {
      return this.$store.getters.notificationConfigValues;
    },
    notificationFlag() {
      return this.existNotification;
    }
  },
  methods: {
    toPost(notification) {
      this.$store.dispatch("post/getPostByPostId", notification.mapValue.fields.postId.stringValue).then((response) => {
        if (response == "OK") {
          const existWatchingPost = "document" in this.watchingPost;
          if (existWatchingPost) {
            //通知の削除
            this.$store.dispatch("notification/deleteNotification", notification).then(() => {
              this.$router.push({name: "post", params: {postId: notification.mapValue.fields.postId.stringValue}});
            }).catch((error) => {
              console.log(error.response);
            });
          }else {
            this.$store.dispatch("notification/deleteNotification", notification).then(() => {
              this.$router.push({name: "notFound"});
            }).catch((error) => {
              console.log(error.response);
            });
          }
        }
      }).catch((error) => {
        console.log(error.response);
      });
    },
  },
};
</script>

<style scoped>
.content-box {
  background-color: rgb(206, 220, 221);
}
.notification-link {
  padding: 10px;
  cursor: pointer;
}
.notification-link:hover {
  background-color: #b1abab;
  color: red;
}
</style>
