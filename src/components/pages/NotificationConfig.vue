<template>
  <div>
    <h2>通知の設定</h2>
    <p>通知する内容を選択してください。</p>

    <v-container fulid>
      <hr><br>
      <v-row justify="center">
        <v-col cols="10" xl="3" lg="4" md="5" sm="5">
          <v-switch v-model="notificationConfigValues" label="あなたの質問に対する回答やコメント" value="forQuestioner"></v-switch>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" xl="3" lg="4" md="5" sm="5">
          <v-switch v-model="notificationConfigValues" label="あなたが回答した質問のコメント" value="forRespondent"></v-switch>
        </v-col>
      </v-row>
      <br>
      <v-row>
        <v-col>
          <v-btn outlined color="#B3424A" @click="setConfig" width="20%" height="50px"><font color='black'><b>保存</b></font></v-btn>
        </v-col>
      </v-row>
    </v-container>


  </div>
</template>

<script>
import {toast} from "../../function/toastr";
export default {
  data() {
    return {
      notificationConfigValues: this.$store.getters.notificationConfigValues,
      data: this.$vuetify.breakpoint,
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