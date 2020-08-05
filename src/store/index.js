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
    userUid: null,
  },
  getters: {
    idToken: state => state.idToken,
    userUid: state => state.userUid,
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
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
    register,
  }
});
