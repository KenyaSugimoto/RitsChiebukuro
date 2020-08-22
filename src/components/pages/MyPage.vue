<template>
  <div>
    <br>
    <h2>{{userName}}さんのマイページ</h2>

    <v-container fulid>
    <hr>

      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto" max-width="100%" outlined @click="toMyPosts">
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">{{userName}}さんの質問</v-list-item-title>
            </v-list-item-content>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="6">
          <v-card class="mx-auto" max-width="100%" outlined @click="toFavorite">
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">気になる質問</v-list-item-title>
            </v-list-item-content>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="6">
          <v-card class="mx-auto" max-width="100%" outlined @click="toResetPassword">
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">パスワードの変更</v-list-item-title>
            </v-list-item-content>
          </v-card>
        </v-col>

      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="6">
          <v-card class="mx-auto" max-width="100%" outlined @click="toNotificationConfig">
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">通知の設定</v-list-item-title>
            </v-list-item-content>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="6">
          <v-card class="mx-auto" max-width="100%" outlined @click="logout">
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">ログアウト</v-list-item-title>
            </v-list-item-content>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
export default {
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout/logout");
    },
    toFavorite() {
      this.$router.push("/favorite").catch(() => {});
    },
    toMyPosts() {
      this.$router.push("/myPosts").catch(() => {});
    },
    toResetPassword() {
      this.$router.push("/resetPassword").catch(() => {});
    },
    toNotificationConfig() {
      this.$router.push("/notificationConfig").catch(() => {});
    },
    toCategory() {
      this.$router.push("/category").catch(() => {});
    },
  },
}
</script>

<style scoped>
.logout {
  padding: 10px;
  cursor: pointer;
}
.logout:hover {
  background-color: #b1abab;
  color: red;
}
</style>
