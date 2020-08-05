import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import login from "./modules/login";
import logout from "./modules/logout";
import register from "./modules/register";
import contents from "./modules/contents";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    newPosts: null,
  },
  getters: {
    idToken: state => state.idToken,
    newPosts: state => state.newPosts,
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    },
    updateNewPosts(state, newPosts) {
      state.newPosts = newPosts;
    },
  },
  actions: {},
  modules: {
    auth,
    login,
    logout,
    register,
    contents,
  }
});
