<template>
  <div id="app">
    <h2>登録ページ</h2>

    <label for="email">Email：</label>
    <input type="email" id="email" v-model="email">

    <br><br>
    <br><br>

    <label for="password">パスワード(6文字以上の半角英数字)：</label>
    <input type="password" id="password" v-model="password">

    <br><br>

    <label for="confirmPassword">パスワード(確認用)：</label>
    <input type="password" id="confirmPassword" v-model="confirmPassword">

    <br><br>
    <br><br>

    <label for="userName">ユーザ名（半角英数字のみ）：</label>
    <input type="id" id="userName" v-model="userName">

    <br><br>
    <br><br>

    <input type="radio" v-model="degree" value="bachelor" id="bachelor" name="grade">
    <label for="bachelor">学部生</label>
    <input type="radio" v-model="degree" value="master" id="master" name="grade">
    <label for="master">大学院生</label>

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
    <div v-else>研究科
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
    <br><br>

    <button @click="signup">登録</button>

  </div>
</template>

<script>
import ritsData from "../../assets/rits.json";
export default {
  data(){
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
    }
  },

  methods: {
    signup(){
      const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      if (this.email == "" || this.password == "", this.confirmPassword == "", this.userName == "", this.major == "", this.grade == "") {
        alert("登録情報を全て入力してください。");
      } else if (this.password != this.confirmPassword) {
        alert("パスワードが一致しません。");
        this.password == "";
        this.confirmPassword = "";
      } else if (this.userName.match(/[^0-9 ^a-z]/g )) {
        alert("ユーザIDが不正です。\n半角英数字で入力してください。");
      } else if(!reg.test(this.email)) {
        alert("正しいメールアドレスを入力してください。")
      } else {
        if (confirm("入力内容に間違いはありませんか？")) {
          this.$store.dispatch('signUp/signUp', {
            email: this.email,
            password: this.password,
            userName: this.userName,
            major: this.major,
            grade: this.grade,
          });
        }
      }
    }
  }
}

</script>


