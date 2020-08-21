<template>
  <div>
    <h2>通知設定</h2>
    <p>内容を編集して「保存」ボタンを押してください。</p>

    <!-- <v-container >
      <v-checkbox v-model="notificationConfigValues" label="あなたの質問に対する回答やコメントについて通知" value="forQuestioner"></v-checkbox>
      <v-checkbox v-model="notificationConfigValues" label="あなたが回答した質問のコメントについて通知" value="forRespondent"></v-checkbox>
    </v-container> -->
    <v-container class="mx-auto">
      <v-switch v-model="notificationConfigValues" label="あなたの質問に対する回答やコメントについて通知" value="forQuestioner"></v-switch>
      <v-switch v-model="notificationConfigValues" label="あなたが回答した質問のコメントについて通知" value="forRespondent"></v-switch>
    </v-container>

    <v-container>
      <v-btn outlined color="#B3424A" @click="setConfig" width="20%" height="50px"><font color='black'><b>保存</b></font></v-btn>
    </v-container>

  </div>
</template>

<script>
import {toast} from "../../function/toastr";
export default {
  data() {
    return {
      notificationConfigValues: this.$store.getters.notificationConfigValues,
    }
  },

  methods: {
    setConfig() {
      const selectedConfig = this.notificationConfigValues.filter(value => value !== null).map(value => value);
      const sortMethod = (a, b) => {
        if (a > b) return -1;
        else if (a < b) return 1;
        else return 0;
      };
      const sortedSelectedConfig = selectedConfig.sort(sortMethod);
      const sortedNotificationConfigValues = this.$store.getters.notificationConfigValues.map(value => value).sort(sortMethod);

      if (sortedSelectedConfig.length == 0) {
        sortedSelectedConfig[0] = undefined;
      } else if (sortedSelectedConfig.length != 1 && sortedSelectedConfig.slice(-1)[0] == undefined) {
        sortedSelectedConfig.pop();
      }

      // 前の設定と同じ場合はクエリを送信しない
      const isSame = JSON.stringify(sortedSelectedConfig) == JSON.stringify(sortedNotificationConfigValues);
      if (isSame) {
        toast("同じ通知設定です", "error");
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
.mx-auto {
  padding: 0 0 0 30%;
}

</style>