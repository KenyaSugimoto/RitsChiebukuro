import axiosAuth from '../../axios/axios-auth';
import axiosDb from '../../axios/axios-db';
import axiosQuery from '../../axios/axios-query';
import router from '../../router';

const actions = {
  signUp({commit, dispatch}, authData) {
    axiosAuth.post('/accounts:signUp?key=AIzaSyDpcvWCZbO4hP2Kzl1dcXlisQnihF16LFs',
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      },
    ).then(response => {
      commit('updateUserName', authData.userName, {root: true});
      commit('updateMajor', authData.major, {root: true});
      commit('updateGradeNum', authData.gradeNum, {root: true});
      dispatch('signUp/checkUserName', {
        idToken: response.data.idToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
        userUid: response.data.localId,
        major: authData.major,
        grade: authData.grade,
      }, {root: true});
    }).catch(error => {
      for (const err of error.response.data.error.errors) {
        if (err.message == 'EMAIL_EXISTS') {
          alert('入力されたメールアドレスはすでに登録されています。')
        }
      }
    });
  },
  registerUserInfo({rootGetters}, userInfo) {
    axiosDb.post(
      '/users/',
      {
        fields: {
          uid: {
            stringValue: userInfo.userUid
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
          grade: {
            stringValue: userInfo.grade
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
  checkUserName({dispatch}, userInfo) {
    axiosQuery.post('/documents:runQuery', {
      structuredQuery: {
        select: {
          fields: [
            { fieldPath: 'userName' },
          ]
        },
        from: [
          {
            collectionId: 'users'
          }
        ],
        where: {
          compositeFilter: {
            op: 'AND',
            filters: [
              {
                fieldFilter: {
                  field: {
                    fieldPath: 'userName',
                  },
                  op: 'EQUAL',
                  value: {
                    stringValue: userInfo.userName,
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
        Authorization: `Bearer ${userInfo.idToken}`
      }
    }).then(res => {
      if (typeof(res.data[0].document) !== 'undefined') {
        // ユーザ名が登録済みの場合
        dispatch('signUp/deleteAccount', {idToken: userInfo.idToken}, {root: true});
      } else {
        // ユーザ名が未登録の場合
        dispatch('auth/setAuthData', {
          idToken: userInfo.idToken,
          refreshToken: userInfo.refreshToken,
          expiresIn: userInfo.expiresIn,
          userUid: userInfo.userUid,
        }, {root: true}).then(() => {
          dispatch('signUp/registerUserInfo', {
            userUid: userInfo.userUid,
            email: userInfo.email,
            userName: userInfo.userName,
            major: userInfo.major,
            gradeNum: userInfo.gradeNum,
          }, {root: true});
          router.push('/');
        });
      }
    }).catch(error => {
      console.log(error)
    });
  },
  deleteAccount(context, userInfo) {
    axiosAuth.post('/accounts:delete?key=AIzaSyDpcvWCZbO4hP2Kzl1dcXlisQnihF16LFs',
      {
        idToken: userInfo.idToken
      },
    ).then(() => {
      alert('このユーザ名は既に存在しています。');
    });
  }
};

export default {
  namespaced: true,
  actions
};
