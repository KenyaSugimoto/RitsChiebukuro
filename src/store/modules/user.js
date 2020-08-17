import axiosQuery from "../../axios/axios-query";
import axiosDb from "../../axios/axios-db";
import {toast} from "../../function/toastr.js";

const actions = {
  async getUserInfo({rootGetters, commit}) {
    await axiosQuery.post("/documents:runQuery", {
      structuredQuery: {
        select: {
          fields: [
            { fieldPath: "userName" },
            { fieldPath: "grade" },
            { fieldPath: "major" },
            { fieldPath: "favoritePostIds" },
            { fieldPath: "notificationConfigValues" },
          ]
        },
        from: [
          {
            collectionId: "users"
          }
        ],
        where: {
          compositeFilter: {
            op: "AND",
            filters: [
              {
                fieldFilter: {
                  field: {
                    fieldPath: "uid",
                  },
                  op: "EQUAL",
                  value: {
                    stringValue: rootGetters.uid,
                  }
                },
              }
            ],
          }
        },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${rootGetters.idToken}`
      }
    }).then(response => {
      const userInfo = response.data[0].document.fields;
      commit('updateUserName', userInfo.userName.stringValue, {root: true});
      commit('updateMajor', userInfo.major.stringValue, {root: true});
      commit('updateGrade', userInfo.grade.stringValue, {root: true});
      let favoritePostIds = userInfo.favoritePostIds.arrayValue.values.filter(value => value.stringValue);
      favoritePostIds = favoritePostIds.map(function(value) {
        if (value.stringValue) {
          return value.stringValue;
        }
      });
      commit('updateFavoritePostIds', favoritePostIds, {root: true});

      const existConfigValue = "values" in userInfo.notificationConfigValues.arrayValue;
      let notificationConfigValues = [];
      if (existConfigValue) {
        notificationConfigValues = userInfo.notificationConfigValues.arrayValue.values;
        notificationConfigValues = notificationConfigValues.map(function(value) {
          if (value.stringValue) {
            return value.stringValue;
          }
        });
        commit('updateNotificationConfigValues', notificationConfigValues, {root: true});
      }

    });
  },
  updateFavoritePostIds({rootGetters, commit}, isFavorite) {
    let favoritePostIds = rootGetters.favoritePostIds.concat();

    if (isFavorite) {
      favoritePostIds.push(rootGetters.watchingPost.document.fields.postId.stringValue);
    } else {
      favoritePostIds = favoritePostIds.filter(postId => postId != rootGetters.watchingPost.document.fields.postId.stringValue);
    }

    if (favoritePostIds.length == 0) {
      favoritePostIds = [ { 'nullValue': null } ];
    } else {
      favoritePostIds = favoritePostIds.map(function(postId) {
        return {stringValue: postId}
      });
    }

    axiosDb.patch(`users/${rootGetters.uid}?updateMask.fieldPaths=favoritePostIds`,
      {
        fields : {
          favoritePostIds: {
            arrayValue: {
              values: favoritePostIds
            }
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`,
        },
      }
    ).then((response) => {
      favoritePostIds = response.data.fields.favoritePostIds.arrayValue.values.filter(value => value.stringValue);
      favoritePostIds = favoritePostIds.map(function(value) {
        if (value.stringValue) {
          return value.stringValue;
        }
      });
      commit('updateFavoritePostIds', favoritePostIds, {root: true});
      if (isFavorite) {
        toast("気になる質問に登録しました", "success");
      } else {
        toast("気になる質問から解除しました", "success");
      }
    })
    .catch((error) => {
        console.log(error.response);
    });
  },

  updateNotificationConfigValues({rootGetters}) {
    let selectedConfig = rootGetters.notificationConfigValues.concat();

    const isUndefined = selectedConfig[0] == undefined;
    let notificationConfigValues = [];
    if (isUndefined) {
      notificationConfigValues = [{"nullValue": null}];
    }else {
      notificationConfigValues = selectedConfig.map(value => {
        return {"stringValue": value};
      });
    }

    axiosDb.patch(`users/${rootGetters.uid}?updateMask.fieldPaths=notificationConfigValues`,
      {
        fields : {
          "notificationConfigValues": {
            arrayValue: {
              values: notificationConfigValues
            }
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`,
        },
      }
    ).then((response) => {
      console.log("response.data", response.data);
      toast("通知設定を変更しました", "success");

    }).catch((error) => {
        console.log(error.response);
    });
  },
};

export default {
  namespaced: true,
  actions,
};
