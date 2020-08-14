<template>
  <div>
    <h2>通知</h2>
    <div
      v-for="item in displayNotifications"
      :key="item.mapValue.fields.notificationId.stringValue"
      class="content-box"
    >
      <div @click="toPost(item)" class="notification-link">
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
</template>

<script>
export default {
  computed: {
    displayNotifications() {
      return this.$store.getters.displayNotifications;
    },
  },
  methods: {
    toPost(notification) {
      this.$store.dispatch("post/getPostByPostId", notification.mapValue.fields.postId.stringValue);
      this.$router.push({name: "post", params: {postId: notification.mapValue.fields.postId.stringValue}});
      //通知の削除
      this.$store.dispatch("notification/deleteNotification", notification);
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
