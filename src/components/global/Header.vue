<template>
  <!-- スマホ画面用レイアウト -->
  <v-container v-if="screenSize === 'xs'">
    <header>
      <v-row justify="space-between">
        <!-- ヘッダー画像 -->
        <v-col cols="8">
          <img src="../../assets/header.png" class="img-xs" @click="toHome">
        </v-col>

        <!-- ハンバーガーメニュー部分 -->
        <v-col cols="2" align-self="end">
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
    </header>
  </v-container>

  <!-- スマホ以外のレイアウト -->
  <v-container v-else>
    <v-navigation-drawer app v-model="drawer" temporary right width=600px color="#e2e6e9">
      <br><br><br><br><br>
      <Notification></Notification>
    </v-navigation-drawer>

    <header>
      <v-container>
        <v-row justify="space-between">
          <!-- ヘッダー画像 -->
          <v-col sm="3" md="1" lg="4">
            <img src="../../assets/header.png" :class="headerImgSize" @click="toHome">
          </v-col>

          <!-- ヘッダーメニュー -->
          <v-col sm="8" md="10" lg="8" align-self="end">
            <v-toolbar-items>
              <v-row justify="space-around" justify-md="end" v-if="screenSize === 'md' || screenSize === 'sm'">
                <v-col cols="3">
                  <v-btn text @click="toMypage" color="black" x-large><v-icon>mdi-account</v-icon><h4>マイページ</h4></v-btn>
                </v-col>
                <v-col cols="3">
                  <v-btn text @click="toPostQuestion" color="black" x-large><v-icon>mdi-help</v-icon><h4>質問する</h4></v-btn>
                </v-col>
                <v-col cols="3">
                  <v-badge
                    :content="notifications"
                    :value="notifications"
                    color="red"
                    overlap
                  >
                    <v-btn text @click="switchOn" color="black" x-large><v-icon left>mdi-bell-ring</v-icon><h4>通知</h4></v-btn>
                  </v-badge>
                </v-col>
              </v-row>

              <v-row justify="center" justify-md="end" v-else>
                <v-col cols="3">
                  <v-btn text @click="toMypage" color="black" x-large><v-icon x-large>mdi-account</v-icon><h2>マイページ</h2></v-btn>
                </v-col>
                <v-col cols="3">
                  <v-btn text @click="toPostQuestion" color="black" x-large><v-icon large>mdi-help</v-icon><h2>質問する</h2></v-btn>
                </v-col>
                <v-col cols="3">
                  <v-badge
                    :content="notifications"
                    :value="notifications"
                    color="red"
                    overlap
                  >
                    <v-btn text @click="switchOn" color="black" x-large><v-icon large left>mdi-bell-ring</v-icon><h2>通知</h2></v-btn>
                  </v-badge>
                </v-col>
              </v-row>
            </v-toolbar-items>
          </v-col>
        </v-row>
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
    screenSize() {
      return this.$vuetify.breakpoint.name;
    },
    headerImgSize() {
      return "img-" + this.$vuetify.breakpoint.name;
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
.img-lg, .img-xl {
  width: 450px;
  height: 150px;
  cursor: pointer;
}

.img-md {
  width: 240px;
  height: 80px;
  cursor: pointer;
}

.img-sm {
  width: 210px;
  height: 70px;
  cursor: pointer;
}

.img-xs {
  width: 195px;
  height: 65px;
  cursor: pointer;
}
</style>