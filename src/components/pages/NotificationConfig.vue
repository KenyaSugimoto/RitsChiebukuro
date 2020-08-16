<template>
  <div>
    <h2>通知設定</h2>
    <p>内容を編集して「保存」ボタンを押してください。</p>
    <div class="select-config">
      <br>
      <div>
        <div>
          <input type="checkbox" value="forQuestioner" id="forQuestioner" v-model="notificationConfigValues">
          <label for="forQuestioner">あなたの質問に対する回答やコメントについて通知</label>
        </div>
        <br>
        <div>
          <input type="checkbox" value="forRespondent" id="forRespondent" v-model="notificationConfigValues">
          <label for="forRespondent">あなたが回答した質問のコメントについて通知</label>
        </div>
        <br>
      </div>
    </div>

    <br>
    <button @click="setConfig">保存</button>

      <p> {{notificationConfigValues}} </p>


  </div>
</template>

<script>
export default {
  data() {
    return {
      notificationConfigValues: this.nowNotificationConfigValues,
    }
  },

  methods: {
    setConfig() {
      const nowConfig = this.notificationConfigValues;
      this.$store.commit("updateNotificationConfigValues", nowConfig);
      console.log("nowConfig",nowConfig);
    },
  }
}
</script>

<style scoped>
button {
  width: 70px;
  height: 30px;
}
.select-config {
  background-color: blanchedalmond;
  width: 50%;
  margin: auto;
}
</style>