import axiosRefresh from "../../axios/axios-refresh";
import axiosAuth from "../../axios/axios-auth";

const actions = {
  refreshIdToken({ dispatch }, refreshToken) {
    axiosRefresh
      .post("/token?key=AIzaSyDpcvWCZbO4hP2Kzl1dcXlisQnihF16LFs", {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      })
      .then((response) => {
        dispatch(
          "auth/setAuthData",
          {
            idToken: response.data.id_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expires_in,
            uid: response.data.user_id,
          },
          { root: true }
        );
      });
  },
  setAuthData({ commit, dispatch }, authData) {
    const now = new Date();
    const expiryTimeMs = now.getTime() + authData.expiresIn * 1000; //今のトークンの期限が切れる時刻を算出

    commit("updateIdToken", authData.idToken, { root: true });
    commit("updateRefreshToken", authData.refreshToken, { root: true });
    commit("updateExpiryTimeMs", expiryTimeMs, { root: true });
    commit("updateUid", authData.uid, { root: true });

    setTimeout(() => {
      dispatch("auth/refreshIdToken", authData.refreshToken, { root: true });
    }, authData.expiresIn * 1000);
  },
  async getEmailVerified({commit}, authData) {
    await axiosAuth.post('/accounts:lookup?key=AIzaSyDpcvWCZbO4hP2Kzl1dcXlisQnihF16LFs',
      {
        requestType: 'VERIFY_EMAIL',
        idToken: authData.idToken
      },
    ).then(response => {
      const emailVerified = response.data.users[0].emailVerified;
      commit('updateEmailVerified', emailVerified, { root: true });
    });
  }
};

export default {
  namespaced: true,
  actions,
};
