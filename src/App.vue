<template>
  <v-container>
    <v-app>
      <template v-if="isAuthenticated">
        <Header></Header>
      </template>

      <router-view></router-view>
      <br>
      <Footer></Footer>
    </v-app>
  </v-container>
</template>

<script>
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.idToken !== null;
    },
  },
  components: {
    Header,
    Footer,
  },
  created() {
    try {
      const ls = JSON.parse(localStorage.getItem('RitsChiebukuro'));
      Object.assign(this.$store.state, JSON.parse(JSON.stringify(ls)));
    } catch (error) {
      localStorage.removeItem('RitsChiebukuro');
    }
  },
  watch: {
    '$route': function (to, from) {
      if (to.path !== from.path) {
        this.$store.dispatch("notification/getNotifications");
      }
    }
  }
}
</script>

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
