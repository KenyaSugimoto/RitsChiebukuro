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
                // { fieldPath: "userUid" },
                { fieldPath: "uuid" },
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
    console.log(rootGetters.userUid);
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
            userUid: {
              stringValue: rootGetters.userUid,
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
            uuid: {
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
};

export default {
  namespaced: true,
  actions,
};
