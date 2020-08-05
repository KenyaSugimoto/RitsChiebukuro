import axiosAuth from "../../axios/axios-auth";
import router from "../../router";

const actions = {
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
      dispatch('auth/setAuthData', {
        idToken: response.data.idToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
        userUid: response.data.localId,
      }, {root: true});
      router.push('/');
    });
  },
};

export default {
  namespaced: true,
  actions
};
