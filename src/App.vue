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
    </template>

    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/global/Header";
export default {
  computed: {
    isAuthenticated(){
      return this.$store.getters.authInfo.idToken !== null;
    }
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
.header-item{
  padding:  10px;
  cursor: pointer;
}
.header-item:hover {
  background-color: #b1abab;
  color: red;
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
