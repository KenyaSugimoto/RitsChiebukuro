<template>
  <div>
      <v-toolbar color="white" dark>
        <img src="../../assets/title.jpg" class="img"/>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text @click="getNotification" color="black"> 通知 </v-btn>

          <v-divider vertical></v-divider>

          <v-btn text color="black">
            質問する
          </v-btn>

          <v-divider vertical></v-divider>

          <v-btn text @click="toMypage" color="black">
            マイページ
          </v-btn>

          <v-divider vertical></v-divider>
        </v-toolbar-items>
      </v-toolbar>

    <Search></Search>
    <header>
      <div class="header-item" @click="getNotification">通知</div>
      <nav>
        <ul class="manu">
          <li>
            <router-link to="/" class="link" active-class="link--active" exact
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              to="/my-page"
              class="link"
              active-class="link--active"
              exact
              >マイページ</router-link
            >
          </li>
          <li>
            <router-link
              to="/category"
              class="link"
              active-class="link--active"
              exact
              >カテゴリ一覧</router-link
            >
          </li>
        </ul>
      </nav>
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
  },
  methods: {
    getNotification() {
      this.$store.dispatch("notification/getNotifications").then(() => {
        const existNotifications = this.displayNotifications != null;
        if (existNotifications) {
          this.$router.push("/notification").catch(() => {});
        }else {
          this.$router.push("/noNotification").catch(() => {});
        }
      });
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
</style>
