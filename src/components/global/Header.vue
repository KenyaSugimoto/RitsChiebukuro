<template>
  <div>
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
    userName() {
      return this.$store.getters.userName;
    },
  },
  methods: {
    getNotification() {
      this.$store.dispatch("notification/getNotifications");

      this.$router.push("/notification").catch(() => {});
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
  /* border-bottom: solid 6px #b3ffa0; */
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
