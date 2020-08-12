<template>
  <div>
    <h2>通知</h2>
    <div
      v-for="item in notifications"
      :key="item.mapValue.fields.notificationId.stringValue"
      class="content-box"
    >
      <div @click="toPost(item)" class="notification-link">
        <p>{{ item.mapValue.fields.notificationId.stringValue }}</p>
        あなたの投稿に対して{{
          item.mapValue.fields.respondentName.stringValue
        }}さんが
        <div v-if="item.mapValue.fields.type.stringValue == 'answer'">
          回答しました
        </div>
        <div v-else>コメントしました</div>
        <!-- <p>経過時刻: {{elapsedTime(item)}} </p> -->
        <p>
          投稿時刻:
          {{ item.mapValue.fields.created_at.timestampValue | dateFormat }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    notifications() {
      return this.$store.getters.notifications;
    },
    // notificationIds() {
    //   return this.$store.getters.notificationIds;
    // },
    // elapsedTime(notification) {
    //   // const now = new Date();
    //   // return now.getTime() - Date.parse(notification.mapValue.fields.created_at.timestampValue);
    //   // return
    // },
  },
  methods: {
    toPost(notification) {
      this.$store.dispatch(
        "post/getPostByPostId",
        notification.mapValue.fields.threadId.stringValue
      );
      this.$router.push({
        name: "post",
        params: { postId: notification.mapValue.fields.threadId.stringValue },
      });
      //通知の削除
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
