import router from "../../router";

const actions = {
  logout({commit}) {
    commit('resetState', {}, {root: true});
    window.localStorage.removeItem('RitsChiebukuro');
    router.push('/login').catch(() => {});
  },
};

export default {
  namespaced: true,
  actions
};
