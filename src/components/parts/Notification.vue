<template>
  <div>
    <div v-if="existNotifications">
      <h2>通知</h2>
      <v-container>
        <div v-for="item in displayNotifications" :key="item.mapValue.fields.notificationId.stringValue" class="content-box" outlined>
          <v-card class="card" width="100%" @click="toPost(item)">
              <div v-if="item.mapValue.fields.type.stringValue == 'respondent'">
                {{item.mapValue.fields.questionerName.stringValue}} の『 {{ item.mapValue.fields.postTitle.stringValue }} 』の質問に対して
                あなたの回答にコメントがつきました。
              </div>
              <div v-else-if="item.mapValue.fields.type.stringValue == 'bestAnswer'">
                <p>{{item.mapValue.fields.questionerName.stringValue}} さんの質問</p>
                <p>『{{item.mapValue.fields.postTitle.stringValue}}』に対するあなたの回答がベストアンサーに選ばれました！</p>
              </div>
              <div v-else>
                <p> あなたの『 {{ item.mapValue.fields.postTitle.stringValue }} 』の質問に対して</p>
                <p v-if="item.mapValue.fields.type.stringValue == 'answer'">{{item.mapValue.fields.respondentName.stringValue}}さんが回答しました</p>
                <p v-else>{{item.mapValue.fields.respondentName.stringValue}}さんがコメントしました</p>
              </div>
              <p>{{ item.mapValue.fields.created_at.timestampValue | dateFormat }}</p>
          </v-card>
        </div>
      </v-container>
    </div>
    <div v-else>
      <h2>通知はありません</h2>
    </div>
  </div>
</template>

<script>
export default {
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
    existNotifications() {
      if (this.displayNotifications !== null) {
        return this.displayNotifications.length;
      }else {
        return null;
      }
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
.notification-link, card {
  padding: 10px;
  cursor: pointer;
}
.card {
  background-color: rgb(204, 191, 216);
}
.card:hover {
  background-color: #eec3c3;
}
</style>
