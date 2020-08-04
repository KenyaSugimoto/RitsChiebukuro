import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axiosAuth from "../axios/axios-auth";
import axiosRefresh from "../axios/axios-refresh";

Vue.use(Vuex);

export default new Vuex.Store({
  // namespaced :true,
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
  actions: {
    autoLogin({commit, dispatch}) {
      const idToken = localStorage.getItem('idToken');
      if (!idToken) return; //過去のIDトークンが残っているかの確認
      const now = new Date();
      const expiryTimeMs = localStorage.getItem('expiryTimeMs');
      const isExpired = expiryTimeMs <= now.getTime();
      const refreshToken = localStorage.getItem('refreshToken');
      if(isExpired) {
        //IDトークンの期限が切れている時
        dispatch('refreshIdToken', refreshToken);
      }else {
        //IDトークンの期限が切れていない時
        const expiresInMs = expiryTimeMs - now.getTime();
        setTimeout(() => {
          dispatch('refreshIdToken', refreshToken);
        }, expiresInMs);
        commit('updateIdToken', idToken);
      }

    },
    login({dispatch}, authData){
      axiosAuth.post(
        "/accounts:signInWithPassword?key=AIzaSyDpcvWCZbO4hP2Kzl1dcXlisQnihF16LFs",
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      ).then(response => {
        dispatch('setAuthData', {
          idToken: response.data.idToken,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn
        });
        router.push('/');
      });
    },
    refreshIdToken({dispatch}, refreshToken) {
      axiosRefresh.post(
        "/token?key=AIzaSyDpcvWCZbO4hP2Kzl1dcXlisQnihF16LFs",
        {
          grant_type: "refresh_token",
          refresh_token: refreshToken
        }
      ).then(response => {
        dispatch('setAuthData', {
          idToken: response.data.id_token,
          refreshToken: response.data.refresh_token,
          expiresIn: response.data.expires_in
        });
      });
    },
    register({dispatch}, authData) {
      axiosAuth.post(
        "/accounts:signUp?key=AIzaSyDpcvWCZbO4hP2Kzl1dcXlisQnihF16LFs",
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        },
      )
      .then(response => {
        dispatch('setAuthData', {
          idToken: response.data.idToken,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn
        });
        router.push('/login');
      });
    },
    setAuthData({commit, dispatch}, authData) {
      commit('updateIdToken',authData.idToken);

      const now = new Date();
      const expiryTimeMs = now.getTime() + authData.expiresIn * 1000; //今のトークンの期限が切れる時刻を算出

      localStorage.setItem('idToken',authData.idToken);
      localStorage.setItem('refreshToken',authData.refreshToken);
      localStorage.setItem('expiryTimeMs',expiryTimeMs);

      setTimeout(() => {
        dispatch('refreshIdToken', authData.refreshToken);
      }, authData.expiresIn * 1000);
    },
    logout({commit}) {
      commit('updateIdToken', null);
      localStorage.removeItem('idToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expiryTimeMs');
      router.replace('/login');
    },
  },
});