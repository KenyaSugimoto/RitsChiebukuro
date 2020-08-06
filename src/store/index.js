import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import login from "./modules/login";
import logout from "./modules/logout";
import signUp from "./modules/signUp";
import contents from "./modules/contents";

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
      refreshToken: null,
      expiryTimeMs: null,
    },
    postsInfo: {
      newPosts: null,
    },
  },
  getters: {
    // userInfo
    userUid: state => state.userInfo.userUid,
    userName: state => state.userInfo.userName,
    major: state => state.userInfo.major,
    gradeNum: state => state.userInfo.gradeNum,
    // authInfo
    idToken: state => state.authInfo.idToken,
    refreshToken: state => state.authInfo.refreshToken,
    expiryTimeMs: state => state.authInfo.expiryTimeMs,
    // postsInfo
    newPosts: state => state.postsInfo.newPosts,
  },
  mutations: {
    // userInfo
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
    // authInfo
    updateIdToken(state, idToken) {
      state.authInfo.idToken = idToken;
    },
    updateRefreshToken(state, refreshToken) {
      state.authInfo.refreshToken = refreshToken;
    },
    updateExpiryTimeMs(state, expiryTimeMs) {
      state.authInfo.expiryTimeMs = expiryTimeMs;
    },
    // postsInfo
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
  },
  plugins: [
    createPersistedState({
      key: 'RitsChiebukuro'
    })
  ],
});
