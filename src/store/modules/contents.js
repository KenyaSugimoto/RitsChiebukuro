import axiosPost from "../../axios/axios-post";

const actions = {
  getContents({commit}, idToken) {
    axiosPost.get("/contents/", {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    })
    .then(response => {
      console.log(response.data.documents);
      commit('updateNewPosts', response.data.documents, {root:true});
    });
  },
  postContent(contexts, postData) {
    axiosPost.post(
      "/contents/",
      {
        fields: {
          title: {
            stringValue: postData.title
          },
          content: {
            stringValue: postData.content
          },
        }
      },
      {
        headers: {
          Authorization: `Bearer ${postData.idToken}`
        }
      }
    )
    .then(response => {
      console.log(response);
    });

  },
}

export default {
  namespaced: true,
  actions
};
