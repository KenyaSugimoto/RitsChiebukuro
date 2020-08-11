import axiosDb from '../../axios/axios-db';
// import axiosQuery from '../../axios/axios-query';


const actions = {
  getNotifications({rootGetters, commit}) {
    axiosDb.get(
      `/notifications/${rootGetters.uid}`,
      {
        headers: {Authorization: `Bearer ${rootGetters.idToken}`,},
      })
    .then(response => {
      commit("updateNotifications", response.data.fields, {root: true});
    });
  },
  addNotification({rootGetters}, notificationData) {
    const key = notificationData.notificationId.stringValue;
    console.log(key);
    axiosDb.post(
      `/notifications?documentId=${notificationData.questionerUid.stringValue}`,
      {
        fields: {
          [key]: {
            mapValue: {
              fields: notificationData
            }
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`,
        },
      }
    ).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  },
};

export default {
  namespaced: true,
  actions,
};