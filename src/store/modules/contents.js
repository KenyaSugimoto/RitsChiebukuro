import axiosPost from "../../axios/axios-post";

const actions = {
  getContents({ commit }, idToken) {
    axiosPost
      .get("/contents/", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
      .then((response) => {
        commit("updateNewPosts", response.data.documents, { root: true });
      });
  },
  postContent({ rootGetters }, postData) {
    console.log(rootGetters.userUid);
    axiosPost
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
};

export default {
  namespaced: true,
  actions,
};
