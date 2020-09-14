<template>
  <!-- スマホ画面用レイアウト -->
  <v-container v-if="screenSize === 'xs'">
    <header>
      <v-toolbar elevation="0" color="#9b1423" :height="headerHeight">
        <img src="../../assets/header.png" class="img-xs" @click="toHome">
        <v-spacer></v-spacer>
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
      </v-toolbar>

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
          <v-toolbar elevation="0" color="#9b1423" :height="headerHeight">
            <img src="../../assets/header.png" :class="headerImgSize" @click="toHome">
            <v-spacer></v-spacer>
            <v-btn text @click="toMypage" x-large color="#fefefe">
              <v-icon>mdi-account</v-icon>
              <h2 v-if="screenSize === 'lg' || screenSize === 'xl'">マイページ</h2>
              <h4 v-if="screenSize === 'md' || screenSize === 'sm'">マイページ</h4>
            </v-btn>
            <v-btn text @click="toPostQuestion" x-large color="#fefefe">
              <v-icon>mdi-help</v-icon>
              <h2 v-if="screenSize === 'lg' || screenSize === 'xl'">質問する</h2>
              <h4 v-if="screenSize === 'md' || screenSize === 'sm'">質問する</h4>
            </v-btn>
            <v-badge
              :content="notifications"
              :value="notifications"
              color="red"
              overlap
            >
              <v-btn text @click="switchOn" x-large color="#fefefe">
                <v-icon left>mdi-bell-ring</v-icon>
                <h2 v-if="screenSize === 'lg' || screenSize === 'xl'">通知</h2>
                <h4 v-if="screenSize === 'md' || screenSize === 'sm'">通知</h4>
              </v-btn>
            </v-badge>
          </v-toolbar>
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
    headerHeight() {
      switch (this.screenSize) {
        case 'sm': return '70px'
        case 'md': return '80px'
        case 'lg': return '150px'
        case 'xl': return '150px'
      }
      return "65px"
    }
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