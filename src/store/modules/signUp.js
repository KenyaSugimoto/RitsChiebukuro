import axiosAuth from "../../axios/axios-auth";
import axiosPost from "../../axios/axios-post";
import router from "../../router";

const actions = {
  signUp({rootGetters, dispatch}, authData) {
    axiosAuth.post(
      "/accounts:signUp?key=AIzaSyDpcvWCZbO4hP2Kzl1dcXlisQnihF16LFs",
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      },
    )
    .then(response => {
      dispatch('auth/setAuthData', {
        idToken: response.data.idToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
        userUid: response.data.localId,
      }, {root: true}).then(() => {
        dispatch('signUp/registerUserInfo', {
          uid: rootGetters.userUid,
          email: authData.email,
        }, {root: true});
      });
      router.push('/');
    });
  },
  registerUserInfo({rootGetters}, userInfo) {
    axiosPost.post(
      "/users/",
      {
        fields: {
          uid: {
            stringValue: userInfo.uid
          },
          email: {
            stringValue: userInfo.email
          },
          created_at: {
            timestampValue: new Date().toISOString()
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`
        }
      }
    );
  },
};

export default {
  namespaced: true,
  actions
};
