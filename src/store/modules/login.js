import axiosAuth from "../../axios/axios-auth";
import router from "../../router";

const actions = {
  login({dispatch}, authData){
      axiosAuth.post(
        "/accounts:signInWithPassword?key=AIzaSyDpcvWCZbO4hP2Kzl1dcXlisQnihF16LFs",
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      ).then(response => {
        dispatch('auth/setAuthData', {
          idToken: response.data.idToken,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn,
          userUid: response.data.localId,
        },{root: true});
        router.push('/');
      });
    },
    autoLogin({commit, dispatch}) {
      const idToken = localStorage.getItem('idToken');
      if (!idToken) return; //過去のIDトークンが残っているかの確認
      const now = new Date();
      const expiryTimeMs = localStorage.getItem('expiryTimeMs');
      const isExpired = expiryTimeMs <= now.getTime();
      const refreshToken = localStorage.getItem('refreshToken');
      if(isExpired) {
        //IDトークンの期限が切れている時
        dispatch('auth/refreshIdToken', refreshToken, {root: true});
      }else {
        //IDトークンの期限が切れていない時
        const expiresInMs = expiryTimeMs - now.getTime();
        setTimeout(() => {
          dispatch('auth/refreshIdToken', refreshToken, {root: true});
        }, expiresInMs);
        commit('updateIdToken', idToken, {root: true});
      }
    },
};

export default {
  namespaced: true,
  actions
};
