<template>
  <div id="app">
    <h2>ログイン</h2>
    <!-- <label for="email">Email：</label> -->
    <!-- <input type="email" id="email" v-model="email" /> -->
    <!-- <label for="password">パスワード：</label>-->
    <!-- <input type="password" id="password" v-model="password" /> -->
    <v-col cols="12" sm="6" md="3" id="contents">
      <v-text-field
        label="Email"
        v-model="email"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-btn @click="login" v-if="password.length >= 8 && email != ''"
        >ログイン</v-btn
      >
      <v-btn disabled v-else>ログイン</v-btn>
    </v-col>
    <!-- <button @click="login">ログイン</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login/login", {
        email: this.email,
        password: this.password,
      });
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
#contents {
  margin: 0 auto;
}
</style>
