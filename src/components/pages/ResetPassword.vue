<template>
  <div>
    <br><br>
    <hr>

    <h2>パスワード再発行ページ</h2>
    <h3>アカウントのメールアドレスを入力して、パスワードを変更するを押してください。</h3>
    <h3>メールアドレスに<font color='red'>パスワード変更ページのURL</font>が記載されたメールを送信します。</h3>

    <br><br>

    <label for='email'>Email：</label>
    <input type='email' id='email' v-model='email'>

    <br><br>
    <br><br>

    <button @click='sendPasswordResetEmail'>パスワードを変更する</button>

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
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit('updateBeginResetPassword', true);
    });
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('updateBeginResetPassword', false);
    next();
  },
};
</script>
