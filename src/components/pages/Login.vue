<template>
  <div id="app">
    <v-container>
      <v-row justify="center">
        <v-col cols="11" lg="7" md="8" sm="9">
          <h2>ログイン</h2>
        </v-col>
        <v-col cols="11" lg="6" md="8" sm="9">
          <v-text-field class='text-field' label='Email' v-model='email' suffix='@ed.ritsumei.ac.jp' :rules="[rules.email]" />
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="11" lg="6" md="8" sm="9">
          <v-text-field
            class='text-field'
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.min]"
            :type="show1 ? 'text' : 'password'"
            label="パスワード"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="11" lg="6" md="8" sm="9">
          <v-btn width="40%" color="#B3424A" @click="login">
            <strong class="login-button">ログイン</strong>
          </v-btn>
        </v-col>
      </v-row>

      <br>
      <v-row justify="center"><v-col cols="11" lg="6" md="8" sm="9"><hr></v-col></v-row>
      <br><br>

      <v-row justify="center">
        <v-col cols="11" lg="6" md="8" sm="9">
          <p>または</p>
          <v-btn
            outlined
            width="30%"
            color="#B3424A"
            @click="signUp"
          >
            <strong class="signup-button">ユーザ登録</strong>
          </v-btn>
        </v-col>
      </v-row>

    </v-container>

  </div>
</template>

<script>
import {toast} from "../../function/toastr.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      rules: {
        min: value => value.length >= 6 || '最低6文字必要です',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))$/
          return pattern.test(value) || '不正なEmailアドレスです';
        },
      },
      show1: false,
    }
  },
  methods: {
    login() {
      const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*$/;
      if (this.email == "" || this.password == "") {
        toast('ログイン情報を全て入力してください。', "error");
      } else if (!reg.test(this.email)) {
        toast('正しいメールアドレスを入力してください。', "error");
      } else {
        this.$store.dispatch('login/login', {
          email: `${this.email}@ed.ritsumei.ac.jp`,
          password: this.password
        });
      }
    },
    signUp() {
      this.$router.push('/signUp');
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
.login-button {
  color: white;
}
.signup-button {
  color: black;
}
</style>
