<template>
  <div>
    <h2>通知</h2>
    <div v-for='item in notifications' :key="item.mapValue.fields.notificationId.stringValue" class='content-box'>
      <div>
        <p>{{item.mapValue.fields.notificationId.stringValue}}</p>
        あなたの投稿に対して{{item.mapValue.fields.respondentName.stringValue}}さんが
        <div v-if='item.mapValue.fields.type.stringValue == "answer"'>回答しました</div>
        <div v-else>コメントしました</div>
        <!-- <p>経過時刻: {{elapsedTime(item)}} </p> -->
        <p>投稿時刻: {{item.mapValue.fields.created_at.timestampValue | dateFormat}} </p>
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
  }

}
</script>

<style scoped>
.content-box {
  background-color: rgb(206, 220, 221);
}
</style>