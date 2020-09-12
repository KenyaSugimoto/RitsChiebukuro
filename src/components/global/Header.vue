<template>
  <!-- スマホ画面用レイアウト -->
  <v-container v-if="xs">
    <!-- ヘッダー画像 -->
    <img src="../../assets/header.jpg" class="img-xs" @click="toHome">

    <!-- ハンバーガーメニュー部分 -->
    <v-row justify="start">
      <v-col cols="1">
        <v-menu v-model="menu" offset-x value="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon><v-icon>mdi-menu</v-icon></v-btn>
          </template>
          <v-card width="400px" color="#fff5f0e5">

            <!-- マイページボタン -->
            <v-row justify="center">
              <v-col cols="11">
                <v-btn text @click="toMypage" color="black"><v-icon>mdi-account</v-icon>マイページ</v-btn>
                <br><hr>
              </v-col>
            </v-row>

            <!-- 通知ボタン -->
            <v-row justify="center">
              <v-col cols="11">
                <v-badge
                  :content="notifications"
                  :value="notifications"
                  color="red"
                  overlap
                >
                  <v-btn text @click="getNotification" color="black"><v-icon>mdi-bell-ring</v-icon> 通知 </v-btn>
                </v-badge>
                <hr>
              </v-col>
            </v-row>

            <!-- 質問投稿ボタン -->
            <v-row>
              <v-col cols="12">
                <v-btn text @click="toPostQuestion" color="black"><v-icon>mdi-help</v-icon>質問する</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>
    <hr>
  </v-container>

  <!-- スマホ以外のレイアウト -->
  <v-container v-else>
    <v-navigation-drawer app v-model="drawer" temporary right width=600px color="#e2e6e9">
      <br><br><br><br><br>
      <Notification></Notification>
    </v-navigation-drawer>

    <header>
      <v-container>
        <img src="../../assets/header2.jpg" class="img-not-xs" @click="toHome">
        <br>
        <v-toolbar-items>
          <v-row justify="center">
            <v-col cols="3">
              <v-btn text @click="toMypage" color="black" x-large><v-icon large>mdi-account</v-icon>マイページ</v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn text @click="toPostQuestion" color="black" x-large><v-icon medium>mdi-help</v-icon>質問する</v-btn>
            </v-col>
            <v-col cols="3">
              <v-badge
                :content="notifications"
                :value="notifications"
                color="red"
                overlap
              >
                <v-btn text @click="switchOn" color="black" x-large><v-icon medium left>mdi-bell-ring</v-icon> 通知 </v-btn>
              </v-badge>
            </v-col>
          </v-row>
        </v-toolbar-items>
      </v-container>
      <hr>
    </header>
  </v-container>

</template>

<script>
import Notification from "../parts/Notification";
export default {
  data() {
    return {
      drawer: false,
      menu: false,
    }
  },
  computed: {
    displayNotifications() {
      return this.$store.getters.displayNotifications;
    },
    notifications() {
      if (this.displayNotifications !== null) {
        return this.displayNotifications.length;
      }else {
        return 0;
      }
    },
    xs() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  methods: {
    getNotification() {
      const existNotifications = this.displayNotifications != null;
      if (existNotifications) {
        this.$router.push("/notification").catch(() => {});
      }else {
        this.$router.push("/noNotification").catch(() => {});
      }
    },
    toMypage() {
      this.$router.push("/my-page").catch(() => {});
    },
    toHome() {
      this.$router.push("/").catch(() => {});
    },
    toPostQuestion() {
      this.$router.push("/postQuestion").catch(() => {});
    },
    switchOn() {
      this.drawer = true;
    },
  },
  components: {
    Notification,
  }

};
</script>

<style scoped>
.img-not-xs {
  width: 90%;
  height: 50%;
  cursor: pointer;
}
.img-xs {
  width: 90%;
  height: 70%;
  cursor: pointer;
}
</style>
