<template>
  <div>
    <hr>
    <br><br>

    <h2>パスワード再発行ページ</h2>
    <h3>アカウントのメールアドレスを入力して、パスワードを変更するを押してください。</h3>
    <h3>メールアドレスに<font color='red'>パスワード変更ページのURL</font>が記載されたメールを送信します。</h3>

    <br><br>

    <v-container>
      <v-text-field v-model='email' label="メールアドレス" filled></v-text-field>
      <v-btn outlined color="#B3424A" @click="sendPasswordResetEmail" width="30%" height="50px"><font color='black'><b>パスワードを変更する</b></font></v-btn>
    </v-container>



  </div>
</template>

<script>
import {toast} from "../../function/toastr.js";
export default {
  data() {
    return {
      email: '',
    }
  },
  methods: {
    sendPasswordResetEmail() {
      const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      if (this.email == '') {
        toast('メールアドレスを入力してください。', "error");
      } else if (!reg.test(this.email)) {
        toast('正しいメールアドレスを入力してください。', "error");
      } else {
        this.$store.dispatch('reset/sendPasswordResetEmail', {
          email: this.email,
        }).then(() => {
          this.email = '';
        });
      }
    }
  },
};
</script>
