import axiosDb from "../../axios/axios-db";
import axiosQuery from "../../axios/axios-query";
// import router from "../../router";
import { segmentText } from "./../../function/segmentText.js"
import {toast} from "../../function/toastr.js";

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
  { fieldPath: "isResolved" },
  { fieldPath: "views" },
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
    axiosQuery.post(
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
    ).then((response) => {
      commit("updateNewPosts", null, { root: true });
      commit("updateNewPosts", response.data, { root: true });
    }).catch((error) => {
      console.log(error);
    });
  },
  createPost({ rootGetters, commit }, postData) {
    const Fields = {
      postId: {
        stringValue: new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16)
      },
      title: {
        stringValue: postData.title
      },
      content: {
        stringValue: postData.content
      },
      category: {
        stringValue: postData.category
      },
      isAnswered: {
        booleanValue: false
      },
      uid: {
        stringValue: rootGetters.uid
      },
      userName: {
        stringValue: rootGetters.userName
      },
      major: {
        stringValue: rootGetters.major
      },
      grade: {
        stringValue: rootGetters.grade
      },
      created_at: {
        timestampValue: new Date().toISOString()
      },
      updated_at: {
        timestampValue: new Date().toISOString()
      },
      keyWords: {
        arrayValue: {
          values: segmentText(postData.title).length != 0 ? segmentText(postData.title) : [ { 'nullValue': null } ]
        }
      },
      isResolved: {
        booleanValue: false
      },
      views: {
        integerValue: '0'
      },
    };

    axiosDb.post(`/posts/?documentId=${Fields.postId.stringValue}`,
      {
        fields: Fields,
      },
      {
        headers: {
          Authorization: `Bearer ${postData.idToken}`,
        },
      }
    ).then(() => {
      // Vuexに投稿データを格納する処理
      const newPostData = {document: {
        fields: Fields
      }};
      commit("addNewPost", newPostData, {root: true});
      toast("質問を投稿しました", "success");
      // router.push("/postCompleted");
    }).catch((error) => {
      console.log(error);
    });
  },
  getIndividualPosts({ rootGetters, commit }) {
    axiosQuery.post(
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
    ).then((response) => {
      if ("document" in response.data[0]) {
        commit("updateIndividualNewPosts", null, { root: true });
        commit("updateIndividualNewPosts", response.data, { root: true });
      } else {
        commit("updateIndividualNewPosts", null, { root: true });
      }
    }).catch((error) => {
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
            commit("updateSelectedCategoryNewPosts", null, {root: true});
            commit("updateSelectedCategoryNewPosts", response.data, {root: true});
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
            commit("updateSelectedCategoryNewPosts", null, {root: true});
            commit("updateSelectedCategoryNewPosts", response.data, {root: true});
          } else {
            commit("updateSelectedCategoryNewPosts", null, { root: true });
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  },
  async getPostByPostId({ rootGetters, commit }, postId) {
    await axiosQuery.post(
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
    ).then((response) => {
      commit("updateWatchingPost", null, { root: true });
      commit("updateWatchingPost", response.data[0], { root: true });
    })
    .catch((error) => {
      console.log(error.response);
    });
  },
  async deletePost({rootGetters}, postId) {
    await axiosDb.delete(`posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`,
        },
      }
    ).then(() => {
      axiosDb.delete(`threads/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.idToken}`,
          },
        }
      ).then(() => {
        //
      }).catch((error) => {
        console.log(error.response);
      });
    }).catch((error) => {
      console.log(error.response);
    });
  },
  updateIsAnswered({rootGetters}, isAnswered) {
    axiosDb.patch(`posts/${rootGetters.watchingPost.postId}?updateMask.fieldPaths=isAnswered`,
      {
        fields : {
          isAnswered: {booleanValue: isAnswered},
        },
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`,
        },
      }
    ).then(() => {
      //
    })
    .catch((error) => {
        console.log(error.response);
    });
  },
  updateIsResolved({rootGetters}, isResolved) {
    axiosDb.patch(`posts/${rootGetters.watchingPost.postId}?updateMask.fieldPaths=isResolved`,
      {
        fields : {
          isResolved: {booleanValue: isResolved},
        },
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`,
        },
      }
    ).then(() => {
      //
    })
    .catch((error) => {
        console.log(error.response);
    });
  },
  updateViews({rootGetters, commit}, views) {
    axiosDb.patch(`posts/${rootGetters.watchingPost.postId}?updateMask.fieldPaths=views`,
      {
        fields : {
          views: {integerValue: `${views}`},
        },
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`,
        },
      }
    ).then(() => {
      commit('addWatchedPostId', rootGetters.watchingPost.postId, {root: true});
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
