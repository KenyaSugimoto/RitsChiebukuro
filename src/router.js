import Vue from "vue";
import Router from "vue-router";

const TopPage = () => import("./components/pages/TopPage.vue");
const Category = () => import("./components/pages/Category.vue");
const MyPage = () => import("./components/pages/MyPage.vue");
const Search = () => import("./components/parts/Search.vue");
const Login = () => import("./components/pages/Login.vue");
const SignUp = () => import("./components/pages/SignUp.vue");
const ActivateAccount = () => import("./components/pages/ActivateAccount");

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
      path: "/signUp",
      components: {
        default: SignUp,
      },
    },
    {
      path: '/activateAccount',
      components: {
        default: ActivateAccount,
      },
    },
    // 上記全てのURL以外
    {
      path: "*",
      redirect: "/"
    }
  ]
})