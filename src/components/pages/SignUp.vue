<template>
  <div id="app">
    <h2>ユーザ登録</h2>

    <br>

    <router-link to="/login" class="login">ログインはこちらから</router-link>

    <br><br><br>

    <v-text-field class='text-field' label='Email' v-model='email' suffix='@ed.ritsumei.ac.jp' :rules="[rules.email]"></v-text-field>

    <br><br><br>

    <v-text-field
      class='text-field'
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.min]"
      :type="show1 ? 'text' : 'password'"
      label="パスワード（6文字以上の半角英数字）"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>

    <br><br>

    <v-text-field
      class='text-field'
      v-model="confirmPassword"
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.min]"
      :type="show2 ? 'text' : 'password'"
      label="パスワード(確認用)"
      counter
      @click:append="show2 = !show2"
    ></v-text-field>

    <br><br><br>

    <v-text-field class='text-field' label="ユーザ名（半角英数字のみ）" outlined v-model="userName"></v-text-field>

    <br><br>

    <div @click='resetMajorAndGrade'>
      <input type="radio" v-model="degree" value="bachelor" id="bachelor" name="grade">
      <label for="bachelor">学部生</label>
      <input type="radio" v-model="degree" value="master" id="master" name="grade">
      <label for="master">大学院生</label>
    </div>

    <br><br>

    <div v-if="degree == 'bachelor'">学部：
      <select id="department" v-model="major">
        <option disabled value="">学部を選択してください。</option>
        <option v-for="(item) in department" v-bind:key="item.id"> {{item}} </option>
      </select>
      <select id="grade" v-model="grade">
        <option disabled value="">学年を選択してください。</option>
        <option v-for="i in 6" v-bind:key="i.id"> {{i}}回生 </option>
      </select>
    </div>
    <div v-else>研究科：
      <select id="master" v-model="major">
        <option disabled value="">研究科を選択してください。</option>
        <option v-for="(item) in master" v-bind:key="item.id"> {{item}} </option>
      </select>
      <select id="grade" v-model="grade">
        <option disabled value="">学年を選択してください。</option>
        <option v-for="i in 4" v-bind:key="i.id"> M{{i}} </option>
      </select>
    </div>

    <br><br>

    <v-btn outlined width="160" height="30" color="#B3424A" @click="signUp"><font color='black'><b>登録</b></font></v-btn>

  </div>
</template>

<script>
import ritsData from "../../assets/rits.json";
import {toast} from "../../function/toastr.js";
import {dialog} from "../../function/dialog.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      degree: "bachelor",
      major: "",
      grade: "",
      department: ritsData.department,
      master: ritsData.master,
      rules: {
        min: value => value.length >= 6 || '最低6文字必要です',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))$/
          return pattern.test(value) || '不正なEmailアドレスです';
        },
      },
      show1: false,
      show2: false,
    }
  },

  methods: {
    signUp() {
      const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*$/;
      if (this.email == "" || this.password == "", this.confirmPassword == "", this.userName == "", this.major == "", this.grade == "") {
        toast('登録情報を全て入力してください。', "error");
      } else if (this.password != this.confirmPassword) {
        toast('パスワードが一致しません。', "error");
      } else if (this.userName.match(/[^0-9 ^a-z ^A-Z]/g )) {
        toast('ユーザIDが不正です。\n半角英数字で入力してください。', "error");
      } else if (!reg.test(this.email)) {
        toast('正しいメールアドレスを入力してください。', "error");
      } else {
        dialog(this, {
          title: 'この入力内容で登録しますか？',
          body: `Email： <b>${this.email}@ed.ritsumei.ac.jp</b> <br><br><br> ユーザ名： <b>${this.userName}</b> <br><br><br> ${this.degree == 'bachelor' ? '学部' : '研究科'}： <b>${this.major}</b> <br><br><br> 学年： <b>${this.grade}</b>`
        }, true).then((response) => {
          if (response == 'OK') {
            this.$store.dispatch('signUp/signUp', {
              email: `${this.email}@ed.ritsumei.ac.jp`,
              password: this.password,
              userName: this.userName,
              major: this.major,
              grade: this.grade,
            });
          }
        });
      }
    },
    resetMajorAndGrade() {
      this.major = '';
      this.grade = '';
    },
  }
}

</script>

<style scoped>
.login {
  padding: 10px;
  cursor: pointer;
}
.login:hover {
  background-color: #b1abab;
  color: red;
}
.text-field {
  width: 280px;
  margin: 0 auto;
}
</style>
