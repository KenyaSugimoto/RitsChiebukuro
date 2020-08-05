<template>
  <div id="app">

    <template v-if="isAuthenticated">
      <header>
        <!-- <router-link to="/" class="header-item">掲示板</router-link> -->
        <span class="header-item" @click="logout">ログアウト</span>
        <router-view name="header"></router-view>
      </header>
      <router-view name="search"></router-view>
    </template>

    <template v-if="!isAuthenticated">
      <header>
        <router-link to="/login" class="header-item">ログイン</router-link>
        <router-link to="/register" class="header-item">登録</router-link>
      </header>
    </template>
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated(){
      return this.$store.getters.idToken !== null;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout/logout');
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
