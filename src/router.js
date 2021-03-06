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
const SearchResult = () => import("./components/pages/SearchResult")
const Notification = () => import("./components/parts/Notification");
const NoNotification = () => import("./components/parts/NoNotification");
const Favorite = () => import("./components/pages/Favorite");
const MyPosts = () => import("./components/pages/MyPosts");
const NotificationConfig = () => import("./components/pages/NotificationConfig");
const NotFoundPost = () => import("./components/pages/NotFoundPost");
const PostQuestion = () => import("./components/pages/PostQuestion");

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
      path: '/resetPassword',
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
      path: "/searchResult",
      components: {
        default: SearchResult,
      }
    },
    {
      path: "/notification",
      name: "notification",
      components: {
        default: Notification,
      },
    },
    {
      path: "/noNotification",
      name: "noNotification",
      components: {
        default: NoNotification,
      },
    },
    {
      path: "/favorite",
      components: {
        default: Favorite,
      },
    },
    {
      path: "/myPosts",
      components: {
        default: MyPosts,
      },
    },
    {
      path: "/notificationConfig",
      components: {
        default: NotificationConfig,
      }
    },
    {
      path: "/notFoundPost",
      name: "notFound",
      components: {
        default: NotFoundPost,
      }
    },
    {
      path: "/postQuestion",
      components: {
        default: PostQuestion,
      }
    },
    // 上記全てのURL以外
    {
      path: "*",
      redirect: "/"
    }
  ]
})
