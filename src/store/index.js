import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import login from "./modules/login";
import logout from "./modules/logout";
import signUp from "./modules/signUp";
import contents from "./modules/contents";
import getUserInfo from "./modules/getUserInfo";

Vue.use(Vuex);

export const initialState = {
  userInfo: {
    uid: null,
    userName: null,
    major: null,
    grade: null,
  },
  authInfo: {
    idToken: null,
    refreshToken: null,
    expiryTimeMs: null,
    emailVerified: false,
    beginActivate: false,
  },
  postsInfo: {
    newPosts: null,
  },
};

export default new Vuex.Store({
  state: initialState,
  getters: {
    // userInfo
    uid: state => state.userInfo.uid,
    userName: state => state.userInfo.userName,
    major: state => state.userInfo.major,
    grade: state => state.userInfo.grade,
    // authInfo
    idToken: state => state.authInfo.idToken,
    refreshToken: state => state.authInfo.refreshToken,
    expiryTimeMs: state => state.authInfo.expiryTimeMs,
    emailVerified: state => state.authInfo.emailVerified,
    beginActivate: state => state.authInfo.beginActivate,
    // postsInfo
    newPosts: state => state.postsInfo.newPosts,
  },
  mutations: {
    // userInfo
    updateUid(state, uid) {
      state.userInfo.uid = uid;
    },
    updateUserName(state, userName) {
      state.userInfo.userName = userName;
    },
    updateMajor(state, major) {
      state.userInfo.major = major;
    },
    updateGrade(state, grade) {
      state.userInfo.grade = grade;
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
    updateEmailVerified(state, emailVerified) {
      state.authInfo.emailVerified = emailVerified;
    },
    updateBeginActivate(state, beginActivate) {
      state.authInfo.beginActivate = beginActivate;
    },
    // postsInfo
    updateNewPosts(state, newPosts) {
      state.postsInfo.newPosts = newPosts;
    },
    // stateを初期化
    resetState(state) {
      Object.assign(state, JSON.parse(JSON.stringify(initialState)));
    }
  },
  actions: {},
  modules: {
    auth,
    login,
    logout,
    signUp,
    contents,
    getUserInfo,
  },
  plugins: [
    createPersistedState({
      key: 'RitsChiebukuro'
    })
  ],
});
