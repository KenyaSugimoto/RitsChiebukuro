import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import login from "./modules/login";
import logout from "./modules/logout";
import signUp from "./modules/signUp";
import contents from "./modules/contents";
import ritsData from "../assets/rits.json";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    newPosts: null,
    userUid: null,
    department: ritsData.department,
    master: ritsData.master,
  },
  getters: {
    idToken: state => state.idToken,
    newPosts: state => state.newPosts,
    userUid: state => state.userUid,
    department: state => state.department,
    master: state => state.master,
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    },
    updateNewPosts(state, newPosts) {
      state.newPosts = newPosts;
    },
    updateUserUid(state, userUid) {
      state.userUid = userUid;
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
  }
});
