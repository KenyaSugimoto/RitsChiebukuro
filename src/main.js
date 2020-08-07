import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  const withoutLogin = ["/login", "/signUp", "/activateAccount"];  // ログインなしで閲覧できるページ
  if (withoutLogin.includes(to.path)) {
    // 認証している場合は、トップページに飛ばす
    if (store.getters.idToken) {
      next("/");
    } else if (to.path == '/activateAccount') {
      if (store.getters.beginActivate) {
        store.commit('updateBeginActivate', false);
        next();
      } else {
        next("/");
      }
    } else {
      next();
    }
  } else {
    // 認証されていない場合、ログインページに飛ばす
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
    render: h => h(App),
  }).$mount("#app");
});
