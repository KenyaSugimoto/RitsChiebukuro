<template>
  <div v-if="!xs">
    <v-navigation-drawer app v-model="drawer" temporary right width=600px color="#e2e6e9">
      <Notification></Notification>
    </v-navigation-drawer>
    <header>
      <v-toolbar color="white" dark flat>
        <v-container>
            <img src="../../assets/title.jpg" @click="toHome">

        <v-toolbar-items>
            <v-row justify="center">
              <v-col>
                <v-btn text @click="toMypage" color="black">マイページ</v-btn>
              </v-col>
              <v-col>
                <v-btn text @click="toPostQuestion" color="black">質問する</v-btn>
              </v-col>
              <v-col>
                <v-badge
                  :content="notifications"
                  :value="notifications"
                  color="red"
                  overlap
                >
                  <v-btn text @click="switchOn" color="black"> 通知 </v-btn>
                </v-badge>
              </v-col>
            </v-row>
        </v-toolbar-items>
      </v-container>
      </v-toolbar>
    </header>
    <br><br>
  </div>
  <div v-else>
    <v-toolbar>
        <img src="../../assets/title.jpg" class="img-xs" @click="toHome">
        <v-container>
          <v-row justify="end">
            <v-menu
              v-model="menu"
              offset-y
              value="false"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn right v-bind="attrs" v-on="on"><v-icon>mdi-menu</v-icon></v-btn>
              </template>
              <v-card>
                <v-list>
                  <v-list-item>
                    <v-container fulid>
                      <v-row justify="start">
                        <v-col cols="3">
                          <v-badge
                            :content="notifications"
                            :value="notifications"
                            color="red"
                            overlap
                          >
                            <v-btn text @click="getNotification" color="black"> 通知 </v-btn>
                          </v-badge>
                        </v-col>
                        <v-col cols="4">
                          <v-btn text @click="toPostQuestion" color="black">
                            質問する
                          </v-btn>
                        </v-col>
                        <v-col cols="4">
                          <v-btn text @click="toMypage" color="black">
                            マイページ
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
          </v-row>
        </v-container>
      </v-toolbar>
    <br>

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
  created() {
    console.log(this.$vuetify.breakpoint);
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
