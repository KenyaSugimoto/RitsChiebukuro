import Vue from "vue";
import Router from "vue-router";

const TopPage = () => import("./components/pages/TopPage");
const Category = () => import("./components/pages/Category");
const MyPage = () => import("./components/pages/MyPage");
const Login = () => import("./components/pages/Login");
const SignUp = () => import("./components/pages/SignUp");
const ActivateAccount = () => import("./components/pages/ActivateAccount");
const ResetPassword = () => import("./components/pages/ResetPassword");
const Post = () => import("./components/pages/Post");
const PostCompleted = () => import("./components/pages/PostCompleted");
const SearchResult = () => import("./components/pages/SearchResult")

//Vue Routerの利用宣言
Vue.use(Router)

export default new Router({
  mode: "history",
  routes:[
    {
      path: "/",
      components: {
        default: TopPage,
      },
    },
    {
      path: "/category",
      components: {
        default: Category,
      },
    },
    {
      path: "/my-page",
      components: {
        default: MyPage,
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
    {
      path: '/ResetPassword',
      components: {
        default: ResetPassword,
      }
    },
    {
      path: '/post/:postId',
      name: 'post',
      component: Post,
      props: true,
    },
    {
      path: "/postCompleted",
      components: {
        default: PostCompleted,
      },
    },
    {
      path: "/searchResult",
      components: {
        default: SearchResult,
      },
    },
    // 上記全てのURL以外
    {
      path: "*",
      redirect: "/"
    }
  ]
})