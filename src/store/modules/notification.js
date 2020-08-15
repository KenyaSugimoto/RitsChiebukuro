import axiosDb from "../../axios/axios-db";
import router from "../../router";

const actions = {
  async getNotifications({ rootGetters, commit }) {
    await axiosDb.get(
      `/notifications/${rootGetters.uid}`,
      {headers: { Authorization: `Bearer ${rootGetters.idToken}` },}
    ).then((response) => {
      const data = response.data.fields.notifications.arrayValue.values[0].mapValue.fields;

      let list = [];
      Object.keys(data).forEach(key => {
        list.push(data[key]);
      });
      const sortedList = list.sort((a, b) => {
        if (a.mapValue.fields.created_at.timestampValue > b.mapValue.fields.created_at.timestampValue) {
          return -1;
        }else if (a.mapValue.fields.created_at.timestampValue < b.mapValue.fields.created_at.timestampValue) {
          return 1;
        }else {
          return 0;
        }
      });

      commit("updateDisplayNotifications", null, { root: true });
      commit("updateDisplayNotifications", sortedList, { root: true });

    }).catch(() => {
      console.log("通知はありません");
      router.push({ name: "noNotification" }).catch(() => {});
    });
  },

  async getQuestionerNotifications({ rootGetters, commit }, questionerUid) {
    await axiosDb.get(
      `/notifications/${questionerUid}`,
      {
        headers: { Authorization: `Bearer ${rootGetters.idToken}` },
      }).then((response) => {
        const data = response.data.fields.notifications.arrayValue.values[0].mapValue.fields;
        commit("updateQuestionerNotifications", null, { root: true });
        commit("updateQuestionerNotifications", data, { root: true });
      }).catch(() => {
        commit("updateQuestionerNotifications", null, { root: true });
        console.log("まだドキュメントが登録されていません（でした）");
      });
  },

  addNotificationForQuestioner({ rootGetters, dispatch }, notificationData) {
    // patchの準備
    // 今回の通知情報
    const objectKey = notificationData.notificationId.stringValue;
    const newNotificationData = {
      [objectKey]: {
        mapValue: {
          fields: notificationData,
        },
      },
    };

    dispatch("notification/getQuestionerNotifications", notificationData.questionerUid.stringValue, {root: true})
    .then(() => {
      const updatedNotificationsData = newNotificationData;
      Object.assign(updatedNotificationsData, JSON.parse(JSON.stringify(rootGetters.questionerNotifications)));
      axiosDb.patch(
        `notifications/${notificationData.questionerUid.stringValue}?updateMask.fieldPaths=notifications`,
        {
          fields: {
            notifications: {
              arrayValue: {
                values: [
                  {
                    mapValue: {
                      fields: updatedNotificationsData,
                    },
                  },
                ],
              },
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${rootGetters.idToken}`,
          },
        }
      );
    });
  },
  deleteNotification({ rootGetters, commit, dispatch }, selectedNotification) {
    let updatedNotifications = {};
    const notificationsLength = rootGetters.displayNotifications.length;
    const type = selectedNotification.mapValue.fields.type.stringValue;
    let uid = "";
    if (type === "respondent") {
      uid = selectedNotification.mapValue.fields.respondentUid.stringValue;
    }else {
      uid = selectedNotification.mapValue.fields.questionerUid.stringValue;
    }

    if (notificationsLength <= 1) {
      dispatch("notification/deleteNotificationDocument", uid, {root: true});
    }else {
      let displayNotifications = rootGetters.displayNotifications;
      const selectedPostId = selectedNotification.mapValue.fields.postId.stringValue;

      let updatedNotificationsList = displayNotifications.filter((notification) => {
        return notification.mapValue.fields.postId.stringValue !== selectedPostId;
      });

      updatedNotificationsList.forEach((item) => {
        let itemNotificationId = item.mapValue.fields.notificationId.stringValue;
        updatedNotifications[itemNotificationId] = item;
      });

      if (updatedNotificationsList.length == 0) {
        dispatch("notification/deleteNotificationDocument", uid, {root: true});
      }else {
        axiosDb.patch(
          `/notifications/${uid}?updateMask.fieldPaths=notifications`,
          {
            fields: {
              notifications: {
                arrayValue: {
                  values: [
                    {
                      mapValue: {
                        fields: updatedNotifications,
                      },
                    },
                  ],
                },
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${rootGetters.idToken}`,
            },
          }
        ).then(() => {
          commit("updateDisplayNotifications", null, {root: true});
        });
      }
    }
  },
  async deleteNotificationDocument({rootGetters, commit}, uid) {
    await axiosDb.delete(
      `/notifications/${uid}`,
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`,
        },
      }).then(() => {
        commit("updateDisplayNotifications", null, {root: true});
      });
  },
  addNotificationForRespondent({ rootGetters, dispatch }, notificationData) {
    // patchの準備
    // 今回の通知情報
    const objectKey = notificationData.notificationId.stringValue;
    const newNotificationData = {
      [objectKey]: {
        mapValue: {
          fields: notificationData,
        },
      },
    };

    dispatch("notification/getRespondentNotifications", notificationData.respondentUid.stringValue, {root: true})
    .then(() => {
      const updatedNotificationsData = newNotificationData;

      Object.assign(updatedNotificationsData, JSON.parse(JSON.stringify(rootGetters.respondentNotifications)));
      axiosDb.patch(
        `notifications/${notificationData.respondentUid.stringValue}?updateMask.fieldPaths=notifications`,
        {
          fields: {
            notifications: {
              arrayValue: {
                values: [
                  {
                    mapValue: {
                      fields: updatedNotificationsData,
                    },
                  },
                ],
              },
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${rootGetters.idToken}`,
          },
        }
      );
    });
  },
  async getRespondentNotifications({ rootGetters, commit }, respondentUid) {
    await axiosDb.get(
      `/notifications/${respondentUid}`,
      {
        headers: { Authorization: `Bearer ${rootGetters.idToken}` },
      }).then((response) => {
        const data = response.data.fields.notifications.arrayValue.values[0].mapValue.fields;
        commit("updateRespondentNotifications", null, { root: true });
        commit("updateRespondentNotifications", data, { root: true });
      }).catch(() => {
        commit("updateRespondentNotifications", null, { root: true });
        console.log("まだドキュメントが登録されていません（でした）");
      });
  },
};



export default {
  namespaced: true,
  actions,
};
