<template>
  <div id="app">
    <h2>登録</h2>
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
    <button @click="signup">登録</button>

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
    signup(){
      this.$store.dispatch('signUp/signUp', {
        email: this.email,
        password: this.password
      })
      this.email = "";
      this.password = "";
    }
  }

}
</script>


