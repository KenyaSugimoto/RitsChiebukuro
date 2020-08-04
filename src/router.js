import Vue from "vue";
import Router from "vue-router";
import store from "./store";


const TopPage = () => import("./components/pages/TopPage.vue");
const Answer = () => import("./components/pages/Answer.vue");
const Category = () => import("./components/pages/Category.vue");
const MyPage = () => import("./components/pages/MyPage.vue");
const Header = () => import("./components/global/Header.vue");
const Search = () => import("./components/parts/Search.vue");
const Login = () => import("./components/pages/Login.vue");
const Register = () => import("./components/pages/Register.vue");


//Vue Routerの利用宣言
Vue.use(Router)

export default new Router({
  mode: "history",
  routes:[
    {
      path: "/",
      components: {
        default: TopPage,
        header: Header,
        search: Search,
      },
      beforeEnter(to, from, next) {
        if(store.getters.idToken) {
          next();
        }else {
          next("/login");
        }
      }
    },
    {
      path: "/answer",
      components: {
        default: Answer,
        header: Header,
        search: Search,
      },
      beforeEnter(to, from, next) {
        if(store.getters.idToken) {
          next();
        }else {
          next("/login");
        }
      }
    },
    {
      path: "/category",
      components: {
        default: Category,
        header: Header,
        search: Search,
      },
      beforeEnter(to, from, next) {
        if(store.getters.idToken) {
          next();
        }else {
          next("/login");
        }
      }
    },
    {
      path: "/my-page",
      components: {
        default: MyPage,
        header: Header,
        search: Search,
      },
      beforeEnter(to, from, next) {
        if(store.getters.idToken) {
          next();
        }else {
          next("/login");
        }
      }
    },
    {
      path: "/login",
      components: {
        default: Login,
      },
      beforeEnter(to, from, next) {
        if(store.getters.idToken) {
          next("/");
        }else {
          next();
        }
      }
    },
    {
      path: "/register",
      components: {
        default: Register,
      },
      beforeEnter(to, from, next) {
        if(store.getters.idToken) {
          next("/");
        }else {
          next();
        }
      }
    },
  ]
})