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

export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login/login', {
        email: this.email,
        password: this.password
      })
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
