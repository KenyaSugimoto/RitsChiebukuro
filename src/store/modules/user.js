import axiosQuery from "../../axios/axios-query";
import axiosDb from "../../axios/axios-db";

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
    });
  },
  updateFavoritePostIds({rootGetters, commit}, isFavorite) {
    let favoritePostIds = rootGetters.favoritePostIds.concat();

    if (isFavorite) {
      favoritePostIds.push(rootGetters.watchingPost.postId);
    } else {
      favoritePostIds = favoritePostIds.filter(postId => postId != rootGetters.watchingPost.postId);
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
    })
    .catch((error) => {
        console.log(error.response);
    });
  }
};

export default {
  namespaced: true,
  actions,
};
