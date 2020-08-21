<template>
  <div>
    <hr>
    <br><br>

    <v-container fulid>
      <v-row justify="center">
        <v-col><h2>パスワード再発行ページ</h2></v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" sm="11"><h3>アカウントのメールアドレスを入力して、「パスワードを変更する」を押してください。</h3></v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" sm="11"><h3>メールアドレスに<font color='red'>パスワード変更ページのURL</font>が記載されたメールを送信します。</h3></v-col>
      </v-row>

      <br><br>

      <v-row justify="center">
        <v-col cols="11" sm="9" lg="6"><v-text-field v-model='email' label="メールアドレス" filled></v-text-field></v-col>
      </v-row>
      <v-row justify="center">
        <v-btn v-if="!xs" outlined color="#B3424A" @click="sendPasswordResetEmail" width="30%" height="50px"><font color='black'><b>パスワードを変更する</b></font></v-btn>
        <v-btn v-else outlined color="#B3424A" @click="sendPasswordResetEmail" width="50%" height="50px"><font color='black'><b>パスワードを変更する</b></font></v-btn>
      </v-row>
      <v-row justify="center">
      </v-row>
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
  computed: {
    xs() {
      return this.$vuetify.breakpoint.xs;
    }
  },
  created() {
    console.log(this.$vuetify.breakpoint);
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
