<template>
  <div>
    <header>
      <v-toolbar color="white" dark>
        <img src="../../assets/title.jpg" class="img" @click="toHome">

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          <v-badge
            :content="notifications"
            :value="notifications"
            color="red"
            overlap
          >
            <v-btn text @click="getNotification" color="black"> 通知 </v-btn>
          </v-badge>


          <v-divider vertical></v-divider>

          <v-btn text @click="toPostQuestion" color="black">
            質問する
          </v-btn>

          <v-divider vertical></v-divider>

          <v-btn text @click="toMypage" color="black">
            マイページ
          </v-btn>

          <v-divider vertical></v-divider>
        </v-toolbar-items>
      </v-toolbar>

      <br><br>
      <Search></Search>
      <br>
    </header>
  </div>
</template>

<script>
import Search from "./../parts/Search";
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
  components: {
    Search,
  },
};
</script>

<style scoped>
.link {
  font-size: 20px;
}
.manu li {
  width: 150px;
  height: 30px;
  background: #aed3b3;
  border-bottom: solid 6px #b3ffa0;
  border-radius: 9px;
}
.link--active {
  font-size: 22px;
  font-weight: bolder;
  color: #000;
}
router-link {
  margin-right: 10px;
}
.manu {
  list-style: none;
  display: flex;
  justify-content: center;
}
.manu li :hover {
  background: #b1abab;
}
.header-item {
  padding: 10px;
  cursor: pointer;
}
.header-item:hover {
  background-color: #b1abab;
  color: red;
}
img {
  width: 170px;
  height: 40px;
  cursor: pointer;
}

</style>
