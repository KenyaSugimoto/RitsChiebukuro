<template>
  <div id="app">

    <template v-if="isAuthenticated">
      <Header></Header>
      <router-view name="search"></router-view>
    </template>

    <template v-if="!isAuthenticated">
      <header>
        <router-link to="/login" class="header-item">ログイン</router-link>
        <router-link to="/signUp" class="header-item">登録</router-link>
      </header>
      <template v-if="!isBeginResetPassword && !isBeginActivate">
        <span>
          <router-link to="/resetPassword" class="reset-password">パスワードを忘れた方はこちら</router-link>
        </span>
      </template>
    </template>

    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/global/Header";
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.idToken !== null;
    },
    isBeginResetPassword() {
      return this.$store.getters.beginResetPassword;
    },
    isBeginActivate() {
      return this.$store.getters.beginActivate;
    },
  },
  components: {
    Header,
  },
  created() {
    try {
      const ls = JSON.parse(localStorage.getItem('RitsChiebukuro'));
      Object.assign(this.$store.state, JSON.parse(JSON.stringify(ls)));
    } catch (error) {
      localStorage.removeItem('RitsChiebukuro');
    }
  },
}
</script>

<style scoped>
.header-item {
  padding: 10px;
  cursor: pointer;
}
.header-item:hover {
  background-color: #b1abab;
  color: red;
}
.reset-password {
  padding: 10px;
  cursor: pointer;
}
.reset-password:hover {
  background-color: #b1abab;
  color: red;
}
span {
  float: right;
}
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
