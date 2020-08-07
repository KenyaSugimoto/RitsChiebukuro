import router from "../../router";

const actions = {
  logout({commit}) {
    localStorage.removeItem('RitsChiebukuro');
    commit('resetState', {}, {root: true});
    router.push('/login');
  },
};

export default {
  namespaced: true,
  actions
};
