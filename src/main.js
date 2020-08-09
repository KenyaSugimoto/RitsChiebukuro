import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  const withoutLogin = ["/login", "/signUp", "/activateAccount", "/resetPassword"];  // ログインなしで閲覧できるページ
  if (withoutLogin.includes(to.path)) {
    // 認証している場合は、トップページに飛ばす
    if (store.getters.idToken) {
      next("/");
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

Vue.filter('dateFormat', function(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}年${month}月${day}日 ${hour}時${minute}分${second}秒`
})

store.dispatch('login/autoLogin').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount("#app");
});
