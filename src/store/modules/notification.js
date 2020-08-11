import axiosDb from '../../axios/axios-db';

const actions = {
  getNotifications({rootGetters, commit}) {
    axiosDb.get(
      `/notifications/${rootGetters.uid}`,
      {
        headers: {Authorization: `Bearer ${rootGetters.idToken}`,},
      })
    .then(response => {
      // console.log(Object.keys(response.data.fields).length);  //個数の取得
      // console.log(response.data.fields);
      commit("updateNotifications", response.data.fields, {root: true});
      // commit("updateNotificationIds", Object.keys(response.data.fields), {root: true});
    });
  },
};

export default {
  namespaced: true,
  actions,
};