import axiosQuery from "../../axios/axios-query";

const actions = {
  async getUserInfo({rootGetters, commit}) {
    await axiosQuery.post("/documents:runQuery", {
      structuredQuery: {
        select: {
          fields: [
            { fieldPath: "userName" },
            { fieldPath: "grade" },
            { fieldPath: "major" },
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
      const userInformation = response.data[0].document.fields;
      commit('updateUserName', userInformation.userName.stringValue, {root: true});
      commit('updateMajor', userInformation.major.stringValue, {root: true});
      commit('updateGrade', userInformation.grade.stringValue, {root: true});

    });
  },
};

export default {
  namespaced: true,
  actions,
};