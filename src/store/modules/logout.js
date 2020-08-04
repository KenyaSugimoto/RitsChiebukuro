import router from "../../router";

const actions = {
  logout({commit}) {
    commit('updateIdToken', null, {root: true});
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiryTimeMs');
    router.replace('/login');
  },
};

export default {
  namespaced: true,
  actions
};
