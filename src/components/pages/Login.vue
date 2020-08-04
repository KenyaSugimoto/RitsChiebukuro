<template>
  <div id="app">
    <h2>ログイン</h2>
    <label for="email">Email：</label>
    <input
      type="email"
      id="email"
      v-model="email"
    >
    <br><br>
    <label for="password">パスワード：</label>
    <input
      type="password"
      id="password"
      v-model="password"
    >
    <button @click="login">ログイン</button>

  </div>
</template>

<script>

export default {
  data(){
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login(){
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      this.email = "";
      this.password = "";
    }
  }

}
</script>


