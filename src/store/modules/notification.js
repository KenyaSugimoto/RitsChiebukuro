import axiosDb from "../../axios/axios-db";
import router from "../../router";

const actions = {
  async getNotifications({ rootGetters, commit }) {
    await axiosDb.get(
      `/notifications/${rootGetters.uid}`,
      {headers: { Authorization: `Bearer ${rootGetters.idToken}` },}
    ).then((response) => {
      const data = response.data.fields.notifications.arrayValue.values[0].mapValue.fields;

      // 通知する通知情報のみを取得
      const configValues = rootGetters.notificationConfigValues;

      let notificationTypeList = ["bestAnswer"];
      if (configValues.includes("forQuestioner")) notificationTypeList.push("answer", "comment");
      if (configValues.includes("forRespondent")) notificationTypeList.push("respondent");

      let list = [];
      Object.keys(data).forEach(key => {
        list.push(data[key]);
      });
      const filteredNotifications = list.filter(item => notificationTypeList.includes(item.mapValue.fields.type.stringValue));


      // // 通知を時系列順にソート
      const sortedList = filteredNotifications.sort((a, b) => {
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

      const displayNotifications = rootGetters.displayNotifications;
      if (displayNotifications.length == 0) {
        // （前の設定時に既にきてた）通知は存在するけど、その通知を消す前に設定変えて表示できない通知がある場合
        router.push({ name: "noNotification" }).catch(() => {});
      }

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
    if (type === "respondent" || type === "bestAnswer") {
      uid = selectedNotification.mapValue.fields.respondentUid.stringValue;
    }
    else {
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
  async addBestAnswerNotification({rootGetters}, bestAnswerData) {
    const notificationId = new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16);
    const watchingPost = rootGetters.watchingPost.document.fields;
    const bestAnswerUserUid = bestAnswerData.uid.stringValue;
    const notificationData = {
      notificationId: {
        stringValue: notificationId
      },
      created_at: {
        timestampValue: bestAnswerData.created_at.timestampValue
      },
      postId: {
        stringValue: watchingPost.postId.stringValue
      },
      postTitle: {
        stringValue: watchingPost.title.stringValue
      },
      questionerName: {
        stringValue: watchingPost.userName.stringValue
      },
      type: {
        stringValue: "bestAnswer"
      },
      respondentUid: {
        stringValue: bestAnswerData.uid.stringValue
      },
    };

    const newNotificationData = {
      [notificationId]: {
        mapValue: {
          fields: notificationData,
        },
      },
    };

    // 通知先（ベストアンサーのユーザ）の通知情報をget
    await axiosDb.get(
      `/notifications/${bestAnswerUserUid}`,
      {
        headers: { Authorization: `Bearer ${rootGetters.idToken}` },
      }).then((response) => {
        const data = response.data.fields.notifications.arrayValue.values[0].mapValue.fields;
        const updatedNotificationsData = newNotificationData;
        Object.assign(updatedNotificationsData, JSON.parse(JSON.stringify(data)));

        axiosDb.patch(
          `notifications/${bestAnswerUserUid}?updateMask.fieldPaths=notifications`,
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
          {headers: {Authorization: `Bearer ${rootGetters.idToken}`}}
        );
      }).catch(() => {
        console.log("まだドキュメントが登録されていません（でした）");
      });






  },
};



export default {
  namespaced: true,
  actions,
};
