import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css";
import vuetify from './plugins/vuetify';
import '@babel/polyfill'

Vue.use(VuejsDialog);
Vue.use(Vuetify)

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const withoutLogin = ["/login", "/signUp", "/activateAccount", "/resetPassword"];  // ログインなしで閲覧できるページ
  if (withoutLogin.includes(to.path)) {
    // 認証している場合は、トップページに飛ばす
    if (store.getters.idToken) {
      if (to.path == '/resetPassword') {
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

Vue.filter('dateFormat', function(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  // const second = date.getSeconds();
  return `${year}年${month}月${day}日 ${hour}時${minute}分`
  // return `${year}年${month}月${day}日 ${hour}時${minute}分${second}秒`
});

Vue.filter('acceptingAnswer', function(posts) {
  if (posts !== null) {
    const acceptingAnswerPosts = posts.filter(post => post.document.fields.isResolved.booleanValue == false);
    return acceptingAnswerPosts;
  } else {
    return posts;
  }
});

Vue.filter('resolved', function(posts) {
  if (posts !== null) {
    const resolvedPosts = posts.filter(post => post.document.fields.isResolved.booleanValue == true);
    return resolvedPosts;
  } else {
    return posts;
  }
});

Vue.filter('manyViews', function(posts) {
  if (posts !== null) {
    let newPosts = posts.concat();
    newPosts.sort((a, b) => {
      return Number(a.document.fields.views.integerValue) < Number(b.document.fields.views.integerValue) ? 1 : -1;
    });
    return newPosts;
  } else {
    return posts;
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
