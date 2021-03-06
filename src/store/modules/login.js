import axiosAuth from '../../axios/axios-auth';
import router from '../../router';
import {toast} from "../../function/toastr.js";

const actions = {
  login({rootGetters, dispatch}, authData) {
    axiosAuth.post(
      '/accounts:signInWithPassword?key=AIzaSyDpcvWCZbO4hP2Kzl1dcXlisQnihF16LFs',
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }
    ).then(response => {
      dispatch('auth/getEmailVerified', {idToken: response.data.idToken}, {root: true}).then(() => {
        if (rootGetters.emailVerified) {
          dispatch('auth/setAuthData', {
            idToken: response.data.idToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
            uid: response.data.localId,
          }, {root: true}).then(() => {
            dispatch('user/getUserInfo', {}, {root: true}).then(() => {
              router.push('/');
            });
          });
        } else {
          toast('登録されたメールアドレスに、アカウントを有効化するためのURLが記載されたメールを送信しました。URLをクリックしてアカウントを有効化してください。', "error");
        }
      });
    }).catch(error => {
      for (const err of error.response.data.error.errors) {
        if (err.message == 'EMAIL_NOT_FOUND') {
          toast('ログインに失敗しました。入力されたメールアドレスが間違っています。', "error");
        } else if (err.message == 'INVALID_PASSWORD') {
          toast('ログインに失敗しました。入力されたパスワードが間違っています。', "error");
        }
      }
    });
    dispatch("notification/getNotifications", {}, {root: true});
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
    dispatch('user/getUserInfo', {}, {root: true});
  },
};

export default {
  namespaced: true,
  actions,
};
