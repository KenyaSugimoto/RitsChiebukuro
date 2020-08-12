import axiosDb from "../../axios/axios-db";
import axiosQuery from "../../axios/axios-query";
import router from "../../router";

const fields = [
  { fieldPath: "postId" },
  { fieldPath: "title" },
  { fieldPath: "content" },
  { fieldPath: "category" },
  { fieldPath: "isAnswered" },
  { fieldPath: "uid" },
  { fieldPath: "userName" },
  { fieldPath: "major" },
  { fieldPath: "grade" },
  { fieldPath: "created_at" },
  { fieldPath: "updated_at" },
];

const from = [{ collectionId: "posts" }];

const createdAtDesc = [
  {
    field: {
      fieldPath: "created_at",
    },
    direction: "DESCENDING",
  },
];

const actions = {
  getPosts({ rootGetters, commit }) {
    axiosQuery
      .post(
        "/documents:runQuery",
        {
          structuredQuery: {
            select: {
              fields,
            },
            from,
            orderBy: createdAtDesc,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${rootGetters.idToken}`,
          },
        }
      )
      .then((response) => {
        commit("updateNewPosts", response.data, { root: true });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  createPost({ rootGetters, commit }, postData) {
    const Fields = {
      postId: {
        stringValue: "",
      },
      title: {
        stringValue: postData.title,
      },
      content: {
        stringValue: postData.content,
      },
      category: {
        stringValue: postData.category,
      },
      isAnswered: {
        booleanValue: false,
      },
      uid: {
        stringValue: rootGetters.uid,
      },
      userName: {
        stringValue: rootGetters.userName,
      },
      major: {
        stringValue: rootGetters.major,
      },
      grade: {
        stringValue: rootGetters.grade,
      },
      created_at: {
        timestampValue: new Date().toISOString(),
      },
      updated_at: {
        timestampValue: new Date().toISOString(),
      },
    };

    axiosDb
      .post(
        "/posts/",
        {
          fields: Fields,
        },
        {
          headers: {
            Authorization: `Bearer ${postData.idToken}`,
          },
        }
      )
      .then((response) => {
        const documentId = response.data.name.split("/")[6];
        axiosDb.patch(
          `posts/${documentId}?updateMask.fieldPaths=postId`,
          {
            fields: {
              postId: { stringValue: documentId },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${postData.idToken}`,
            },
          }
        );
        //Vuexに投稿データを格納する処理
        const newPostData = {
          document: {
            fields: Fields,
          },
        };
        commit("addNewPost", newPostData, { root: true });
        router.push("/postCompleted");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getIndividualPosts({ rootGetters, commit }) {
    axiosQuery
      .post(
        "/documents:runQuery",
        {
          structuredQuery: {
            select: {
              fields,
            },
            from,
            orderBy: createdAtDesc,
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
                      },
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
      )
      .then((response) => {
        if ("document" in response.data[0]) {
          commit("updateIndividualNewPosts", response.data, { root: true });
        } else {
          commit("updateIndividualNewPosts", null, { root: true });
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
  getSelectedCategoryNewPosts({ rootGetters, commit }, category) {
    if (!category || category == "全て") {
      axiosQuery
        .post(
          "/documents:runQuery",
          {
            structuredQuery: {
              select: {
                fields,
              },
              from,
              orderBy: createdAtDesc,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${rootGetters.idToken}`,
            },
          }
        )
        .then((response) => {
          if ("document" in response.data[0]) {
            commit("updateSelectedCategoryNewPosts", response.data, {
              root: true,
            });
          } else {
            commit("updateSelectedCategoryNewPosts", null, { root: true });
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      axiosQuery
        .post(
          "/documents:runQuery",
          {
            structuredQuery: {
              select: {
                fields,
              },
              from,
              orderBy: createdAtDesc,
              where: {
                compositeFilter: {
                  op: "AND",
                  filters: [
                    {
                      fieldFilter: {
                        field: {
                          fieldPath: "category",
                        },
                        op: "EQUAL",
                        value: {
                          stringValue: category,
                        },
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
        )
        .then((response) => {
          if ("document" in response.data[0]) {
            commit("updateSelectedCategoryNewPosts", response.data, {
              root: true,
            });
          } else {
            commit("updateSelectedCategoryNewPosts", null, { root: true });
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  },
  async deletePost({ rootGetters }, post) {
    const documentId = post.postId;
    await axiosDb.delete(`posts/${documentId}`, {
      headers: {
        Authorization: `Bearer ${rootGetters.idToken}`,
      },
    });
  },
  getPostByPostId({ rootGetters, commit }, postId) {
    axiosQuery
      .post(
        "/documents:runQuery",
        {
          structuredQuery: {
            select: {
              fields,
            },
            from,
            where: {
              compositeFilter: {
                op: "AND",
                filters: [
                  {
                    fieldFilter: {
                      field: {
                        fieldPath: "postId",
                      },
                      op: "EQUAL",
                      value: {
                        stringValue: postId,
                      },
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
      )
      .then((response) => {
        commit("updateWatchingPost", response.data[0], { root: true });
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
};

export default {
  namespaced: true,
  actions,
};
