<template>
  <div>
    <br>
    <h2>{{userName}}さんのマイページ</h2>

    <v-container fulid>
    <hr>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto" max-width="100%" outlined @click="toMyPosts">
            <br>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1"><v-icon x-large color="#9a0002">mdi-tooltip-account</v-icon>{{userName}}さんの質問</v-list-item-title>
            </v-list-item-content>
            <br>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="6">
          <v-card class="mx-auto" max-width="100%" outlined @click="toFavorite">
            <br>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1"><v-icon x-large color='#FFE240'>mdi-star</v-icon>気になる質問</v-list-item-title>
            </v-list-item-content>
            <br>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="6">
          <v-card class="mx-auto" max-width="100%" outlined @click="toGoogleForm">
            <br>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1"><v-icon x-large color='#111111'>mdi-email</v-icon> お問い合わせ</v-list-item-title>
            </v-list-item-content>
            <br>
          </v-card>
        </v-col>

      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="6">
          <v-card class="mx-auto" max-width="100%" outlined @click="toNotificationConfig">
            <br>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1"><v-icon x-large color="#111111">mdi-bell-outline</v-icon> 通知の設定</v-list-item-title>
            </v-list-item-content>
            <br>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="6">
          <v-card class="mx-auto" max-width="100%" outlined @click="logout">
            <br>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1"><v-icon x-large color="#00ce60">mdi-logout</v-icon> ログアウト</v-list-item-title>
            </v-list-item-content>
            <br>
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
    toGoogleForm() {
      window.open("https://forms.gle/EJSVnMuKKKtT7Le68", "_blank");
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
