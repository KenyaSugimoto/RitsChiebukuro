<template>
  <div id="app">
    <hr>

    <h2>ログインページ</h2>

    <br><br>

    <label for="email">Email：</label>
    <input type="email" id="email" v-model="email">

    <br><br>

    <label for="password">パスワード：</label>
    <input type="password" id="password" v-model="password">

    <br><br>
    <br><br>

    <button @click="login">ログイン</button>

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


