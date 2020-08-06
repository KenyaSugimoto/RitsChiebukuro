import axiosAuth from "../../axios/axios-auth";
import axiosPost from "../../axios/axios-post";
import router from "../../router";

const actions = {
  signUp({rootGetters, commit, dispatch}, authData) {
    axiosAuth.post(
      "/accounts:signUp?key=AIzaSyDpcvWCZbO4hP2Kzl1dcXlisQnihF16LFs",
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      },
    )
    .then(response => {
      dispatch('auth/setAuthData', {
        idToken: response.data.idToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
        userUid: response.data.localId,
      }, {root: true}).then(() => {
        commit('updateUserName', authData.userName, {root: true});
        commit('updateMajor', authData.major, {root: true});
        commit('updateGradeNum', authData.gradeNum, {root: true});

        dispatch('signUp/registerUserInfo', {
          uid: rootGetters.userUid,
          email: authData.email,
          userName: authData.userName,
          major: authData.major,
          gradeNum: authData.gradeNum,
        }, {root: true});
        router.push('/');
      });
    });
  },
  registerUserInfo({rootGetters}, userInfo) {
    axiosPost.post(
      "/users/",
      {
        fields: {
          uid: {
            stringValue: userInfo.uid
          },
          email: {
            stringValue: userInfo.email
          },
          userName: {
            stringValue: userInfo.userName
          },
          major: {
            stringValue: userInfo.major
          },
          gradeNum: {
            stringValue: userInfo.gradeNum
          },
          created_at: {
            timestampValue: new Date().toISOString()
          },
        }
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`
        }
      }
    );
  },
};

export default {
  namespaced: true,
  actions
};
