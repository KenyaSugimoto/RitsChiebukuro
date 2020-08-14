import axiosDb from "../../axios/axios-db";
import router from "../../router";

const actions = {
  async getNotifications({ rootGetters, commit }) {
    await axiosDb.get(
      `/notificationsTest/${rootGetters.uid}`,
      {headers: { Authorization: `Bearer ${rootGetters.idToken}` },}
    ).then((response) => {
      const data = response.data.fields.notifications.arrayValue.values[0].mapValue.fields;
      commit("updateNotifications", null, { root: true });
      commit("updateNotifications", data, { root: true });

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
      `/notificationsTest/${questionerUid}`,
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

  addNotification({ rootGetters, dispatch }, notificationData) {
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

    dispatch("notification/getQuestionerNotifications", notificationData.questionerUid.stringValue, {root: true })
    .then(() => {
      const updatedNotificationsData = newNotificationData;
      Object.assign(updatedNotificationsData, JSON.parse(JSON.stringify(rootGetters.questionerNotifications)));
      axiosDb.patch(
        `notificationsTest/${notificationData.questionerUid.stringValue}?updateMask.fieldPaths=notifications`,
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
  async deleteNotification({ rootGetters, commit }, selectedNotification) {
    const notificationsLength = Object.keys(rootGetters.notifications).length;
    let updatedNotifications = {};
    if (notificationsLength <= 1) {
      axiosDb.delete(
        `/notificationsTest/${selectedNotification.mapValue.fields.questionerUid.stringValue}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.idToken}`,
          },
        });
        commit("updateNotifications", null, {root: true});
        commit("updateDisplayNotifications", null, {root: true});
    }else {
      let displayNotifications = rootGetters.displayNotifications;
      const selectedPostId = selectedNotification.mapValue.fields.threadId.stringValue;

      let updatedNotificationsList = displayNotifications.filter((notification) => {
        return notification.mapValue.fields.threadId.stringValue !== selectedPostId;
      });

      console.log("updatedNotificationsList", updatedNotificationsList);

      updatedNotificationsList.forEach((item) => {
        let itemNotificationId = item.mapValue.fields.notificationId.stringValue;
        updatedNotifications[itemNotificationId] = item;
      });
      console.log("updatedNotifications", updatedNotifications);
      console.log("len", updatedNotificationsList.length);

      if (updatedNotificationsList.length == 0) {
        axiosDb.delete(
          `/notificationsTest/${selectedNotification.mapValue.fields.questionerUid.stringValue}`,
          {
            headers: {
              Authorization: `Bearer ${rootGetters.idToken}`,
            },
          });
          commit("updateNotifications", null, {root: true});
          commit("updateDisplayNotifications", null, {root: true});
      }else {
        axiosDb.patch(
          `/notificationsTest/${selectedNotification.mapValue.fields.questionerUid.stringValue}?updateMask.fieldPaths=notifications`,
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
        );
      }
    }
  },
};



export default {
  namespaced: true,
  actions,
};
