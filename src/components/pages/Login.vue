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


