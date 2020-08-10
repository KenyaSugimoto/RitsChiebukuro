import axiosDb from "../../axios/axios-db";
import axiosQuery from "../../axios/axios-query";

const actions = {
  getContents({ rootGetters, commit }) {
    axiosQuery
      // .get("/contents/", {
      //   headers: {
      //     Authorization: `Bearer ${rootGetters.idToken}`,
      //   },
      // })
      // .then((response) => {
      //   commit("updateNewPosts", response.data.documents, { root: true });
      // });
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
                { fieldPath: "uuid" },
              ],
            },
            from: [
              {
                collectionId: "posts",
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
        commit("updateNewPosts", response.data, {
          root: true,
        });
        commit(
          "updateDisplayLists",
          rootGetters.newPosts.slice(0, rootGetters.pageSize),
          {
            root: true,
          }
        );
        commit(
          "updatePageLength",
          Math.ceil(response.data.length / rootGetters.pageSize),
          { root: true }
        );
      });
  },
  postContent({ rootGetters }, postData) {
    console.log(rootGetters.userUid);
    axiosDb
      .post(
        "/posts/",
        {
          fields: {
            title: {
              stringValue: postData.title,
            },
            content: {
              stringValue: postData.content,
            },
            uid: {
              stringValue: rootGetters.userUid,
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
  getDisplayLists({ rootGetters, commit }, pageNumber) {
    console.log(rootGetters.newPosts);
    commit(
      "updateDisplayLists",
      rootGetters.newPosts.slice(
        rootGetters.pageSize * (pageNumber - 1),
        rootGetters.pageSize * pageNumber
      ),
      {
        root: true,
      }
    );
  },
};

export default {
  namespaced: true,
  actions,
};
