<template>
  <div id="app">
    <label for="email">Email：</label>
    <input type="email" id="email" v-model="email">

    <br><br>

    <label for="password">パスワード：</label>
    <input type="password" id="password" v-model="password">

    <br><br>
    <br><br>

    <button @click="login">ログイン</button>

    <br><br>
    <hr>

    <h4>または</h4>

    <router-link to="/signUp" class="signUp">ユーザ登録</router-link>

    <br><br>
    <br><br>

    <router-link to="/resetPassword" class="reset-password">パスワードを忘れた方はこちら</router-link>

  </div>
</template>

<script>
import {toast} from "../../function/toastr.js";
export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login() {
      const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      if (this.email == "" || this.password == "") {
        toast('ログイン情報を全て入力してください。', "error");
      } else if (!reg.test(this.email)) {
        toast('正しいメールアドレスを入力してください。', "error");
      } else {
        this.$store.dispatch('login/login', {
        email: this.email,
        password: this.password
      })
      }
    }
  }

}
</script>

<style scoped>
.signUp {
  padding: 10px;
  cursor: pointer;
}
.signUp:hover {
  background-color: #b1abab;
  color: red;
}
.reset-password {
  padding: 10px;
  cursor: pointer;
}
.reset-password:hover {
  background-color: #b1abab;
  color: red;
}
</style>
