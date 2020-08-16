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
      notificationConfigValues: this.$store.getters.notificationConfigValues,
    }
  },

  methods: {
    setConfig() {
      const selectedConfig = this.notificationConfigValues.filter(value => value !== null).map(value => value);
      // 前の設定と同じ場合はクエリを送信したくない
      const sortMethod = (a, b) => {
        if (a > b) return -1;
        else if (a < b) return 1;
        else return 0;
      };
      const sortedSelectedConfig = selectedConfig.sort(sortMethod);
      const sortedNotificationConfigValues = this.$store.getters.notificationConfigValues.map(value => value).sort(sortMethod);
      if (sortedSelectedConfig.length == 0) {
        sortedSelectedConfig[0] = undefined;
      }

      const isSame = JSON.stringify(sortedSelectedConfig) == JSON.stringify(sortedNotificationConfigValues);
      console.log(isSame);

      if (isSame) {
        return;
      }else {
        this.$store.commit("updateNotificationConfigValues", selectedConfig);
        this.$store.dispatch("user/updateNotificationConfigValues");
      }


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