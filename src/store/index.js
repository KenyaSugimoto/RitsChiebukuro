import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import login from "./modules/login";
import logout from "./modules/logout";
import register from "./modules/register";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
  },
  getters: {
    idToken: state => state.idToken
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    },
  },
  actions: {},
  modules: {
    auth,
    login,
    logout,
    register,
  }
});
