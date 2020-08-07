import router from "../../router";

const actions = {
  logout({commit}) {
    localStorage.removeItem('RitsChiebukuro');
    commit('resetState', {}, {root: true});
    commit('updateIdToken', null, {root: true});
    commit('updateRefreshToken', null, {root: true});
    commit('updateExpiryTimeMs', null, {root: true});
    commit('updateUserUid', null, {root: true});
    router.replace('/login');
  },
};

export default {
  namespaced: true,
  actions
};
