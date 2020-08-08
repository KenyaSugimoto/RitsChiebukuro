import axiosDb from "../../axios/axios-db";
import axiosQuery from "../../axios/axios-query";

const actions = {
  getContents({ rootGetters, commit }) {
    axiosQuery
      .post(
        "/documents:runQuery",
        {
          structuredQuery: {
            select: {
              fields: [
                { fieldPath: "created_at" },
                { fieldPath: "content" },
                { fieldPath: "title" },
                { fieldPath: "updated_at" },
                { fieldPath: "isAnswered" },
                { fieldPath: "uid" },
                { fieldPath: "contentId" },
                { fieldPath: "userName" },
              ],
            },
            from: [
              {
                collectionId: "contents",
              },
            ],
            orderBy: [
              {
                field: {
                  fieldPath: "created_at",
                },
                direction: "DESCENDING",
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${rootGetters.idToken}`,
          },
        }
      )
      .then((response) => {
        commit("updateNewPosts", response.data, {root: true});
      });
  },
  postContent({ rootGetters }, postData) {
    console.log(rootGetters.uid);
    axiosDb
      .post(
        "/contents/",
        {
          fields: {
            title: {
              stringValue: postData.title,
            },
            content: {
              stringValue: postData.content,
            },
            uid: {
              stringValue: rootGetters.uid,
            },
            userName: {
              stringValue: rootGetters.userName,
            },
            created_at: {
              timestampValue: new Date().toISOString(),
            },
            updated_at: {
              timestampValue: new Date().toISOString(),
            },
            contentId: {
              stringValue:
                new Date().getTime().toString(16) +
                Math.floor(1000 * Math.random()).toString(16),
            },
            isAnswered: {
              booleanValue: false,
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${postData.idToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  },
  getIndividualPosts({rootGetters, commit}) {
    axiosQuery
      .post(
        "/documents:runQuery",
        {
          structuredQuery: {
            select: {
              fields: [
                { fieldPath: "created_at" },
                { fieldPath: "content" },
                { fieldPath: "title" },
                { fieldPath: "updated_at" },
                { fieldPath: "isAnswered" },
                { fieldPath: "uid" },
                { fieldPath: "contentId" },
                { fieldPath: "userName" },
              ],
            },
            from: [
              {
                collectionId: "contents",
              },
            ],
            orderBy: [
              {
                field: {
                  fieldPath: "created_at",
                },
                direction: "DESCENDING",
              },
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
            Authorization: `Bearer ${rootGetters.idToken}`,
          },
        }
      )
      .then((response) => {
        commit("updateIndividualNewPosts", response.data, {root: true});
        console.log(response.data);
      }).catch((err) => {
        console.log(err);
      });
  },
};

export default {
  namespaced: true,
  actions,
};
