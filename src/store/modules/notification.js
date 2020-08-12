import axiosDb from '../../axios/axios-db';


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
  async updateQuestionerNotifications({rootGetters, commit}) {
    await axiosDb.get(
      `/notifications/${rootGetters.watchingPost.document.fields.uid.stringValue}`,
      {
        headers: {Authorization: `Bearer ${rootGetters.idToken}`,},
      })
    .then(response => {
      commit("updateQuestionerNotifications", response.data.fields, {root: true});
    });
  },
  addNotification({rootGetters, commit, dispatch}, notificationData) {
    const objectKey = notificationData.notificationId.stringValue;
    const newNotificationData = {
      [objectKey]: {
        mapValue: {
          fields: notificationData
        }
      }
    };
    axiosDb.post(
      `/notifications?documentId=${notificationData.questionerUid.stringValue}`,
      {
        fields: newNotificationData
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
        dispatch("notification/updateQuestionerNotifications", {}, {root: true})
        .then(() => {
          const nowQuestionerNotifications = rootGetters.questionerNotifications;
          nowQuestionerNotifications[objectKey] = newNotificationData[objectKey];
          commit("updateQuestionerNotifications", null, {root: true});
          commit("updateQuestionerNotifications", nowQuestionerNotifications, {root: true});
          const updatedQuestionerNotifications = rootGetters.questionerNotifications;
          var sendObject = {};
          Object.keys(updatedQuestionerNotifications).forEach(function(keyData) {
            const item = {
              notificationId: {
                stringValue: updatedQuestionerNotifications[keyData].mapValue.fields.notificationId.stringValue
              },
              created_at: {
                timestampValue: updatedQuestionerNotifications[keyData].mapValue.fields.created_at.timestampValue
              },
              respondentName: {
                stringValue: updatedQuestionerNotifications[keyData].mapValue.fields.respondentName.stringValue
              },
              threadId: {
                stringValue: updatedQuestionerNotifications[keyData].mapValue.fields.threadId.stringValue
              },
              type: {
                stringValue: updatedQuestionerNotifications[keyData].mapValue.fields.type.stringValue
              },
              questionerUid: {
                stringValue: updatedQuestionerNotifications[keyData].mapValue.fields.questionerUid.stringValue
              },
            };
            sendObject[item.notificationId.stringValue] = {
              mapValue: {
                fields: item
              }
            };
          });
          axiosDb.delete(
            `/notifications/${notificationData.questionerUid.stringValue}`,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.idToken}`,
              },
            }
          ).then(doc => {
            console.log("Document successfully deleted!",doc);
            axiosDb.post(
              `/notifications?documentId=${notificationData.questionerUid.stringValue}`,
              {
                fields: sendObject
              },
              {
                headers: {
                  Authorization: `Bearer ${rootGetters.idToken}`,
                },
              }).then(response => {
                console.log(response);
              });
          });
        });
      }
    });
  },
};

export default {
  namespaced: true,
  actions,
};