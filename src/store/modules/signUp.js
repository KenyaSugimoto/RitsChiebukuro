import axiosAuth from '../../axios/axios-auth';
import axiosDb from '../../axios/axios-db';
import axiosQuery from '../../axios/axios-query';
import router from '../../router';
import {toast} from "../../function/toastr.js";

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
      commit('updateGrade', authData.grade, {root: true});
      dispatch('signUp/checkUserName', {
        idToken: response.data.idToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
        uid: response.data.localId,
        email: authData.email,
        major: authData.major,
        grade: authData.grade,
        userName: authData.userName,
      }, {root: true});
    }).catch(error => {
      for (const err of error.response.data.error.errors) {
        if (err.message == 'EMAIL_EXISTS') {
          toast('入力されたメールアドレスはすでに登録されています。', "error");
        }
      }
    });
  },
  registerUserInfo(context, userInfo) {
    axiosDb.post(
      `/users?documentId=${userInfo.uid}`,
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
          grade: {
            stringValue: userInfo.grade
          },
          favoritePostIds: {
            arrayValue: {
              values: [ { 'nullValue': null } ]
            }
          },
          created_at: {
            timestampValue: new Date().toISOString()
          },
          notificationConfigValues: {
            arrayValue: {
              values: [
                {stringValue: "forQuestioner"},
                {stringValue: "forRespondent"}
              ]
            }
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.idToken}`
        }
      }
    );
  },
  checkUserName({commit, dispatch}, userInfo) {
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
        dispatch('signUp/registerUserInfo', {
          idToken: userInfo.idToken,
          uid: userInfo.uid,
          email: userInfo.email,
          userName: userInfo.userName,
          major: userInfo.major,
          grade: userInfo.grade,
        }, {root: true});
        dispatch('signUp/sendEmailVerification', {idToken: userInfo.idToken}, {root: true});
        commit('updateBeginActivate', true, {root: true});
        router.push('/activateAccount');
      }
    });
  },
  deleteAccount(context, userInfo) {
    axiosAuth.post('/accounts:delete?key=AIzaSyDpcvWCZbO4hP2Kzl1dcXlisQnihF16LFs',
      {
        idToken: userInfo.idToken
      },
    ).then(() => {
      toast('このユーザ名は既に存在しています。', "error");
    });
  },
  sendEmailVerification(context, userInfo) {
    axiosAuth.post('/accounts:sendOobCode?key=AIzaSyDpcvWCZbO4hP2Kzl1dcXlisQnihF16LFs',
      {
        requestType: 'VERIFY_EMAIL',
        idToken: userInfo.idToken
      },
      {
        headers: {
          'X-Firebase-Locale': 'ja'
        }
      }
    );
  },
};

export default {
  namespaced: true,
  actions
};
