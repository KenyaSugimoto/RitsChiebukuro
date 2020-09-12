<template>
  <div id="app">
    <v-container>
      <v-row><v-col><h2>ユーザ登録</h2></v-col></v-row>
      <br>
      <v-row><v-col><router-link to="/login" class="login">ログインはこちらから</router-link></v-col></v-row>

      <br><br>
      <v-row justify="center">
        <v-col cols="11" lg="6" md="8"  sm="9">
          <v-text-field class='text-field' label='Email' v-model='email' suffix='@ed.ritsumei.ac.jp' :rules="[rules.email]" />
        </v-col>
      </v-row>

      <br>

      <v-row justify="center">
        <v-col cols="11" lg="6" md="8"  sm="9">
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
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="11" lg="6" md="8"  sm="9">
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
        </v-col>
      </v-row>
      <br>

      <v-row justify="center">
        <v-col cols="11" lg="6" md="8"  sm="9">
          <v-text-field class='text-field' label="ユーザ名（半角英数字のみ）" outlined v-model="userName" />
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="11" lg="6" md="8"  sm="9">
          <div @click='resetMajorAndGrade'>
            <v-row justify="center">
              <v-col lg="3">
                <input type="radio" v-model="degree" value="bachelor" id="bachelor" name="grade">
                <label for="bachelor">学部生</label>
              </v-col>
              <v-col lg="3">
                <input type="radio" v-model="degree" value="master" id="master" name="grade">
                <label for="master">大学院生</label>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="11" lg="6" md="8"  sm="9">
          <div v-if="degree == 'bachelor'">
            <v-select :items="department" label="学部を選択してください。" solo class="select-box" v-model="major"></v-select>
            <v-select :items="bachelorGrade" label="学年を選択してください。" solo class="select-box" v-model="grade"></v-select>
          </div>
          <div v-else>
            <v-select :items="master" label="研究科を選択してください。" solo class="select-box" v-model="major"></v-select>
            <v-select :items="masterGrade" label="学年を選択してください。" solo class="select-box" v-model="grade"></v-select>
          </div>
        </v-col>
      </v-row>

      <v-row><v-col><h3>利用規約をご確認ください。</h3></v-col></v-row>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent :width="width">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text large color="#F44336" v-bind="attrs" v-on="on">
              <h4>利用規約を確認する</h4>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">利用規約</v-card-title>
            <v-card-text>利用規約の内容</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#0D47A1" text @click="dialog = false; agreeCheck = false;">同意しない</v-btn>
              <v-btn color="#E64A19" large text @click="dialog = false; agreeCheck = true;">同意する</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row>
        <v-col>
          <v-btn outlined width="15%" color="#B3424A" @click="signUp">
            <font color='black'><b>登録</b></font>
          </v-btn>
        </v-col>
      </v-row>
      <v-row><v-col></v-col></v-row>

    </v-container>

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
      bachelorGrade: ritsData.bachelorGrade,
      masterGrade: ritsData.masterGrade,
      dialog: false,
      agreeCheck: false,
      col: 6,
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
      } else if (!this.agreeCheck) {
        toast('利用規約をご確認ください。同意していただけない場合、登録することができません。', "error")
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
  },

  computed: {
    width() {
      return this.$vuetify.breakpoint.name === "xs" ? "90%" : "55%";
    }
  }
}

</script>

<style scoped>
.login {
  cursor: pointer;
}
.login:hover {
  background-color: #b1abab;
  color: red;
}
</style>
