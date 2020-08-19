<template>
  <div>
    <header>
      <v-toolbar color="white" dark>
        <img src="../../assets/title.jpg" class="img" @click="toHome">

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          <v-container>
            <v-row>
              <v-badge
                :content="notifications"
                :value="notifications"
                color="red"
                overlap
              >
                <v-btn text @click="getNotification" color="black"> 通知 </v-btn>
              </v-badge>
              <v-divider class="mx-4" vertical></v-divider>
              <v-btn text @click="toPostQuestion" color="black">
                質問する
              </v-btn>
              <v-divider class="mx-4" vertical></v-divider>
              <v-btn text @click="toMypage" color="black">
                マイページ
              </v-btn>
              <v-divider class="mx-4" vertical></v-divider>

            </v-row>
          </v-container>
        </v-toolbar-items>
      </v-toolbar>

    </header>
  </div>
</template>

<script>
export default {
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
  },

};
</script>

<style scoped>
img {
  width: 210px;
  height: 58px;
  cursor: pointer;
}

</style>
