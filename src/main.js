import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


Vue.config.productionTip = false;

axios.defaults.baseURL = "https://firestore.googleapis.com/v1/projects/rits-chiebukuro/databases/(default)/documents";

router.beforeEach((to, from, next) => {
  const withoutLogin = ["/login", "/register"];  // ログインなしで閲覧できるページ
  if (withoutLogin.includes(to.path)) {
    // ログインしている場合は、トップページに飛ばす
    if (store.getters.idToken) {
      next("/");
    } else {
      next();
    }
  } else {
    // ログインしていない場合、ログインページに飛ばす
    if (store.getters.idToken) {
      next();
    } else {
      next("/login");
    }
  }
});

store.dispatch('autoLogin').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount("#app");
});


