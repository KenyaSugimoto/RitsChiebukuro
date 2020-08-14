import axiosAuth from '../../axios/axios-auth';
import {toast} from "../../function/toastr.js";

const actions = {
  async sendPasswordResetEmail(context, authData) {
    await axiosAuth.post('/accounts:sendOobCode?key=AIzaSyDpcvWCZbO4hP2Kzl1dcXlisQnihF16LFs',
      {
        requestType: 'PASSWORD_RESET',
        email: authData.email,
      },
      {
        headers: {
          'X-Firebase-Locale': 'ja'
        }
      }
    ).then(() => {
      toast('入力されたメールアドレスに、パスワード変更ページのURLが記載されたメールを送信しました。', "error");
    }).catch(error => {
      for (const err of error.response.data.error.errors) {
        if (err.message == 'EMAIL_NOT_FOUND') {
          toast('入力されたメールアドレスは登録されていません。', "error");
        }
      }
    });
  }
};

export default {
  namespaced: true,
  actions,
};
