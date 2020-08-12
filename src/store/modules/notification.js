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
  getQuestionerNotifications({rootGetters, commit}) {
    axiosDb.get(
      `/notifications/${rootGetters.watchingPost.document.fields.uid.stringValue}`,
      {
        headers: {Authorization: `Bearer ${rootGetters.idToken}`,},
      })
    .then(response => {
      commit("updateQuestionerNotifications", response.data.fields, {root: true});
    });
  },
  addNotification({rootGetters, dispatch}, notificationData) {
    const key = notificationData.notificationId.stringValue;
    const key2 = new Date().getTime().toString(16) + Math.floor(1000*Math.random()).toString(16);
    axiosDb.post(
      `/notifications?documentId=${notificationData.questionerUid.stringValue}`,
      {
        fields: {
          [key]: {
            mapValue: {
              fields: notificationData
            }
          },
          [key2]: {
            mapValue: {
              fields: notificationData
            }
          },
        }
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`,
        },
      }
    ).then(response => {
      console.log(response);
    }).catch(error => {
      const errorStatus = error.response.data.error.status;
      if (errorStatus == "ALREADY_EXISTS") {
        console.log("キャッチ成功");
        // vuexに質問者の通知情報を格納成功
        dispatch("notification/getQuestionerNotifications", {}, {root: true});
        // 今回の通知情報を追加

        // 追加後再送
      }else {
        console.log("キャッチ失敗");
      }
    });
  },
};

export default {
  namespaced: true,
  actions,
};