import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  const withoutLogin = ["/login", "/signUp"];  // ログインなしで閲覧できるページ
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

store.dispatch('login/autoLogin').then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount("#app");
});
