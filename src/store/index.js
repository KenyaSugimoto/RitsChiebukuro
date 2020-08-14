import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import login from "./modules/login";
import logout from "./modules/logout";
import signUp from "./modules/signUp";
import post from "./modules/post";
import getUserInfo from "./modules/getUserInfo";
import reset from "./modules/reset";
import notification from "./modules/notification";
import thread from "./modules/thread";
import search from "./modules/search";

Vue.use(Vuex);

export const initialState = {
  userInfo: {
    uid: null,
    userName: null,
    major: null,
    grade: null,
    watchedPostIds: [],
  },
  authInfo: {
    idToken: null,
    refreshToken: null,
    expiryTimeMs: null,
    emailVerified: false,
    beginActivate: false,
    beginResetPassword: false,
  },
  postsInfo: {
    newPosts: null,
    individualNewPosts: null,
    selectedCategoryNewPosts: null,
    watchingPost: null,
    searchResultPosts: null,
    searchKeyWords: null,
  },
  notificationInfo: {
    questionerNotifications: null,
    displayNotifications: null,
  },
  threadInfo: {
    thread: null,
  },
};

const getters = {
  // userInfo
  ... {
    uid: state => state.userInfo.uid,
    userName: state => state.userInfo.userName,
    major: state => state.userInfo.major,
    grade: state => state.userInfo.grade,
    watchedPostIds: state => state.userInfo.watchedPostIds,
  },
  // authInfo
  ... {
    idToken: state => state.authInfo.idToken,
    refreshToken: state => state.authInfo.refreshToken,
    expiryTimeMs: state => state.authInfo.expiryTimeMs,
    emailVerified: state => state.authInfo.emailVerified,
    beginActivate: state => state.authInfo.beginActivate,
    beginResetPassword: state => state.authInfo.beginResetPassword,
  },
  // postsInfo
  ... {
    newPosts: state => state.postsInfo.newPosts,
    individualNewPosts: state => state.postsInfo.individualNewPosts,
    selectedCategoryNewPosts: state => state.postsInfo.selectedCategoryNewPosts,
    watchingPost: state => state.postsInfo.watchingPost,
    searchResultPosts: state => state.postsInfo.searchResultPosts,
    searchKeyWords: state => state.postsInfo.searchKeyWords,
  },

  // notificationInfo
  ... {
    questionerNotifications: state => state.notificationInfo.questionerNotifications,
    displayNotifications: state => state.notificationInfo.displayNotifications,
  },
  // threadInfo
  ... {
    thread: state => state.threadInfo.thread,
  },
};

const mutations = {
  // userInfo
  ...{
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
    addWatchedPostId(state, watchedPostId) {
      state.userInfo.watchedPostIds.push(watchedPostId);
    },
  },
  // authInfo
  ... {
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
    updateBeginResetPassword(state, beginResetPassword) {
      state.authInfo.beginResetPassword = beginResetPassword;
    },
    resetState(state) {
      Object.assign(state, JSON.parse(JSON.stringify(initialState)));
    }
  },
  // postsInfo
  ... {
    updateNewPosts(state, newPosts) {
      state.postsInfo.newPosts = newPosts;
    },
    updateIndividualNewPosts(state, individualNewPosts) {
      state.postsInfo.individualNewPosts = individualNewPosts;
    },
    updateSelectedCategoryNewPosts(state, selectedCategoryNewPosts) {
      state.postsInfo.selectedCategoryNewPosts = selectedCategoryNewPosts;
    },
    updateWatchingPost(state, watchingPost) {
      state.postsInfo.watchingPost = watchingPost;
    },
    updateSearchResultPosts(state, searchResultPosts) {
      state.postsInfo.searchResultPosts = searchResultPosts;
    },
    updateSearchKeyWords(state, searchKeyWords) {
      state.postsInfo.searchKeyWords = searchKeyWords;
    },
    addNewPost(state, newPostData) {
      state.postsInfo.newPosts.unshift(newPostData);
    }
  },
  // notificationInfo
  ... {
    updateQuestionerNotifications(state, questionerNotifications) {
      state.notificationInfo.questionerNotifications = questionerNotifications;
    },
    updateDisplayNotifications(state, displayNotifications) {
      state.notificationInfo.displayNotifications = displayNotifications;
    },
  },
  // threadInfo
  ...{
    updateThread(state, thread) {
      state.threadInfo.thread = thread;
    },
  },
};


export default new Vuex.Store({
  state: initialState,
  getters,
  mutations,
  actions: {},
  modules: {
    auth,
    login,
    logout,
    signUp,
    post,
    getUserInfo,
    reset,
    notification,
    thread,
    search,
  },
  plugins: [
    createPersistedState({
      key: 'RitsChiebukuro'
    })
  ],
});
