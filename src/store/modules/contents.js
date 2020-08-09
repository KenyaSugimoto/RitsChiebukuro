import axiosDb from "../../axios/axios-db";
import axiosQuery from "../../axios/axios-query";

const fields = [
  { fieldPath: "contentId" },
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

const from = [
  { collectionId: "contents" }
];

const createdAtDesc = [
    {
      field: {
        fieldPath: "created_at",
      },
      direction: "DESCENDING",
    }
];

const actions = {
  getContents({ rootGetters, commit }) {
    axiosQuery
      .post(
        "/documents:runQuery",
        {
          structuredQuery: {
            select: {
              fields
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
        commit("updateNewPosts", response.data, {root: true});
      });
  },
  postContent({ rootGetters }, postData) {
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
            category: {
              stringValue: postData.category,
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
      );
  },
  getIndividualPosts({rootGetters, commit}) {
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
        if ("document" in response.data[0]) {
          commit("updateIndividualNewPosts", response.data, {root: true});
        } else {
          commit("updateIndividualNewPosts", null, {root: true});
        }
      });
  },
  getSelectedCategoryNewPosts({rootGetters, commit}, category) {
    if (!category) {
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
            commit("updateSelectedCategoryNewPosts", response.data, {root: true});
          } else {
            commit("updateSelectedCategoryNewPosts", null, {root: true});
          }
        });
    } else {
      axiosQuery
        .post("/documents:runQuery",
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
          if ("document" in response.data[0]) {
            commit("updateSelectedCategoryNewPosts", response.data, {root: true});
          } else {
            commit("updateSelectedCategoryNewPosts", null, {root: true});
          }
        });
    }
  },
};

export default {
  namespaced: true,
  actions,
};
