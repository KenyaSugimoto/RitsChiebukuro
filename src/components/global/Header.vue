<template>
  <div v-if="!xs">
    <v-navigation-drawer app v-model="drawer" temporary right width=600px color="#e2e6e9">
      <br><br><br><br><br>

      <Notification></Notification>
    </v-navigation-drawer>
    <header>
      <v-toolbar color="white" dark flat>
        <v-container>
          <img src="../../assets/title.jpg" @click="toHome">
          <v-toolbar-items>
            <v-row justify="center">
              <v-col cols="3">
                <v-btn text @click="toMypage" color="black"><v-icon x-large>mdi-account</v-icon>マイページ</v-btn>
              </v-col>
              <v-col cols="3">
                <v-btn text @click="toPostQuestion" color="black"><v-icon large>mdi-help</v-icon>質問する</v-btn>
              </v-col>
              <v-col cols="3">
                <v-badge
                  :content="notifications"
                  :value="notifications"
                  color="red"
                  overlap
                >
                  <v-btn text @click="switchOn" color="black"><v-icon large>mdi-bell-ring</v-icon> 通知 </v-btn>
                </v-badge>
              </v-col>
            </v-row>
          </v-toolbar-items>
        </v-container>
      </v-toolbar>
    </header>
    <br><hr><br>

  </div>
  <div v-else>
    <v-toolbar flat>
      <v-container>
        <img src="../../assets/title.jpg" class="img-xs" @click="toHome">

        <v-row justify="end">
          <v-col cols="3">
            <v-menu v-model="menu" offset-x value="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn right v-bind="attrs" v-on="on"><v-icon>mdi-menu</v-icon></v-btn>
              </template>
              <v-card width="400px">
                <v-row justify="center">
                  <v-col cols="12">
                    <v-btn text @click="toMypage" color="black"><v-icon>mdi-account</v-icon>マイページ</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-badge
                      :content="notifications"
                      :value="notifications"
                      color="red"
                      overlap
                    >
                      <v-btn text @click="getNotification" color="black"><v-icon>mdi-bell-ring</v-icon> 通知 </v-btn>
                    </v-badge>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn text @click="toPostQuestion" color="black"><v-icon>mdi-help</v-icon>質問する</v-btn>
                  </v-col>
                </v-row>

              </v-card>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>
    <br><hr><br>
  </div>
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
img {
  width: 210px;
  height: 58px;
  cursor: pointer;
}
</style>
