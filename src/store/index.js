import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import login from "./modules/login";
import logout from "./modules/logout";
import signUp from "./modules/signUp";
import contents from "./modules/contents";
import ritsData from "../assets/rits.json";
import Category from "../assets/categoryData.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      userUid: null,
      userName: null,
      major: null,
      gradeNum: null,
    },
    authInfo: {
      idToken: null,
    },
    postsInfo: {
      newPosts: null,
    },
    constantData: {
      department: ritsData.department,
      master: ritsData.master,
      categoryData: Category.categoryData,
    }
  },
  getters: {
    userUid: state => state.userInfo.userUid,
    userName: state => state.userInfo.userName,
    major: state => state.userInfo.major,
    gradeNum: state => state.userInfo.gradeNum,

    idToken: state => state.authInfo.idToken,

    newPosts: state => state.postsInfo.newPosts,

    department: state => state.constantData.department,
    master: state => state.constantData.master,
    categoryData: state => state.constantData.categoryData,
  },
  mutations: {
    updateUserUid(state, userUid) {
      state.userInfo.userUid = userUid;
    },
    updateUserName(state, userName){
      state.userInfo.userName = userName;
    },
    updateMajor(state, major){
      state.userInfo.major = major;
    },
    updateGradeNum(state, gradeNum){
      state.userInfo.gradeNum = gradeNum;
    },

    updateIdToken(state, idToken) {
      state.authInfo.idToken = idToken;
    },

    updateNewPosts(state, newPosts) {
      state.postsInfo.newPosts = newPosts;
    },


  },
  actions: {},
  modules: {
    auth,
    login,
    logout,
    signUp,
    contents,
    ritsData,
    Category,
  },
});
