import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import login from "./modules/login";
import logout from "./modules/logout";
import signUp from "./modules/signUp";
import post from "./modules/post";
import user from "./modules/user";
import reset from "./modules/reset";
import notification from "./modules/notification";
import thread from "./modules/thread";
import search from "./modules/search";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export const initialState = {
  userInfo: {
    uid: null,
    userName: null,
    major: null,
    grade: null,
    watchedPostIds: [],
    favoritePostIds: [],
    notificationConfigValues: null,
  },
  authInfo: {
    idToken: null,
    refreshToken: null,
    expiryTimeMs: null,
    emailVerified: false,
  },
  postsInfo: {
    newPosts: null,
    individualNewPosts: null,
    selectedCategoryNewPosts: null,
    watchingPost: null,
    searchResultPosts: null,
    searchKeyWords: null,
    favoritePosts: null,
  },
  notificationInfo: {
    questionerNotifications: null,
    displayNotifications: null,
    respondentNotifications: null,
  },
  threadInfo: {
    thread: null,
    isResolved: false,
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
    favoritePostIds: state => state.userInfo.favoritePostIds,
    notificationConfigValues: state => state.userInfo.notificationConfigValues,
  },
  // authInfo
  ... {
    idToken: state => state.authInfo.idToken,
    refreshToken: state => state.authInfo.refreshToken,
    expiryTimeMs: state => state.authInfo.expiryTimeMs,
    emailVerified: state => state.authInfo.emailVerified,
  },
  // postsInfo
  ... {
    newPosts: state => state.postsInfo.newPosts,
    individualNewPosts: state => state.postsInfo.individualNewPosts,
    selectedCategoryNewPosts: state => state.postsInfo.selectedCategoryNewPosts,
    watchingPost: state => state.postsInfo.watchingPost,
    searchResultPosts: state => state.postsInfo.searchResultPosts,
    searchKeyWords: state => state.postsInfo.searchKeyWords,
    favoritePosts: state => state.postsInfo.favoritePosts,
  },

  // notificationInfo
  ... {
    questionerNotifications: state => state.notificationInfo.questionerNotifications,
    respondentNotifications: state => state.notificationInfo.respondentNotifications,
    displayNotifications: state => state.notificationInfo.displayNotifications,
  },
  // threadInfo
  ... {
    thread: state => state.threadInfo.thread,
    isResolved: state => state.threadInfo.isResolved,
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
    updateFavoritePostIds(state, favoritePostIds) {
      state.userInfo.favoritePostIds = favoritePostIds;
    },
    updateNotificationConfigValues(state, notificationConfigValues) {
      state.userInfo.notificationConfigValues = notificationConfigValues;
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
    },
    updateFavoritePosts(state, favoritePosts) {
      state.postsInfo.favoritePosts = favoritePosts;
    }
  },
  // notificationInfo
  ... {
    updateQuestionerNotifications(state, questionerNotifications) {
      state.notificationInfo.questionerNotifications = questionerNotifications;
    },
    updateRespondentNotifications(state, respondentNotifications) {
      state.notificationInfo.respondentNotifications = respondentNotifications;
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
    updateIsResolved(state, isResolved) {
      state.threadInfo.isResolved = isResolved;
    },
  },
};


export default new Vuex.Store({
  state: JSON.parse(JSON.stringify(initialState)),
  getters,
  mutations,
  actions: {},
  modules: {
    auth,
    login,
    logout,
    signUp,
    post,
    user,
    reset,
    notification,
    thread,
    search,
  },
  plugins: [
    createPersistedState({
      key: 'RitsChiebukuro',
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key),
      },
    }),
  ],
});
