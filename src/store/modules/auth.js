import axiosRefresh from "../../axios/axios-refresh";

const actions = {
  refreshIdToken({commit, dispatch}, refreshToken) {
    axiosRefresh.post(
      "/token?key=AIzaSyDpcvWCZbO4hP2Kzl1dcXlisQnihF16LFs",
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken
      }
    ).then(response => {
      dispatch('auth/setAuthData', {
        idToken: response.data.id_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in
      }, {root: true});
      commit('updateUserUid', response.data.user_id, {root: true});
    });
  },
  setAuthData({commit, dispatch}, authData) {
    commit('updateIdToken', authData.idToken, {root: true});

    const now = new Date();
    const expiryTimeMs = now.getTime() + authData.expiresIn * 1000; //今のトークンの期限が切れる時刻を算出

    localStorage.setItem('idToken', authData.idToken);
    localStorage.setItem('refreshToken', authData.refreshToken);
    localStorage.setItem('expiryTimeMs', expiryTimeMs);

    setTimeout(() => {
      dispatch('auth/refreshIdToken', authData.refreshToken, {root: true});
    }, authData.expiresIn * 1000);
  },
};

export default {
  namespaced: true,
  actions
};
