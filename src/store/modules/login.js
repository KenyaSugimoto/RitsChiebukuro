import axiosAuth from "../../axios/axios-auth";
import router from "../../router";

const actions = {
  login({rootGetters, dispatch}, authData){
    axiosAuth.post(
      "/accounts:signInWithPassword?key=AIzaSyDpcvWCZbO4hP2Kzl1dcXlisQnihF16LFs",
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }
    ).then(response => {
      dispatch('auth/getEmailVerified', {idToken: response.data.idToken}, { root: true }).then(() => {
        if (rootGetters.emailVerified) {
          dispatch('auth/setAuthData', {
            idToken: response.data.idToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
            userUid: response.data.localId,
          }, {root: true}).then(() => {
            dispatch('getUserInfo/getUserInfo', {}, {root: true}).then(() => {
              router.push('/');
            });
          });
        } else {
          alert('登録されたメールアドレスにメールを送信しました。リンクをクリックしてメールアドレスを確認して下さい。')
        }
      });
    });
  },
  autoLogin({rootGetters, dispatch}) {
    const idToken = rootGetters.idToken;
    if (!idToken) return;  //過去のIDトークンが残っているかの確認
    const now = new Date();
    const expiryTimeMs = rootGetters.expiryTimeMs;
    const isExpired = expiryTimeMs <= now.getTime();
    const refreshToken = rootGetters.refreshToken;
    if (isExpired) {
      //IDトークンの期限が切れている時
      dispatch('auth/refreshIdToken', refreshToken, {root: true});
    } else {
      //IDトークンの期限が切れていない時
      const expiresInMs = expiryTimeMs - now.getTime();
      setTimeout(() => {
        dispatch('auth/refreshIdToken', refreshToken, {root: true});
      }, expiresInMs);
    }
    dispatch('getUserInfo/getUserInfo', {}, {root: true});
  },
};

export default {
  namespaced: true,
  actions,
};
