import Vue from "vue";
import Router from "vue-router";

const TopPage = () => import("./components/pages/TopPage.vue");
const Answer = () => import("./components/pages/Answer.vue");
const Category = () => import("./components/pages/Category.vue");
const MyPage = () => import("./components/pages/MyPage.vue");
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
        search: Search,
      },
    },
    {
      path: "/answer",
      components: {
        default: Answer,
        search: Search,
      },
    },
    {
      path: "/category",
      components: {
        default: Category,
        search: Search,
      },
    },
    {
      path: "/my-page",
      components: {
        default: MyPage,
        search: Search,
      },
    },
    {
      path: "/login",
      components: {
        default: Login,
      },
    },
    {
      path: "/register",
      components: {
        default: Register,
      },
    },
    // 上記全てのURL以外
    {
      path: "*",
      redirect: "/"
    }
  ]
})