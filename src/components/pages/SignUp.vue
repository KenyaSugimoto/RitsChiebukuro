<template>
  <div id="app">
    <h2>登録</h2>
    <label for="email">Email：</label>
    <input type="email" id="email" v-model="email">
    <br><br>
    <label for="password">パスワード(6文字以上の英数字)：</label>
    <input type="password" id="password" v-model="password">
    <br><br>
    <label for="userName">ユーザID：</label>
    <input type="id" id="userName" v-model="userName">
    <br><br>

    <input type="radio" v-model="grade" value="bachelor" id="bachelor" name="grade">
    <label for="bachelor">学部生</label>
    <input type="radio" v-model="grade" value="master" id="master" name="grade">
    <label for="master">大学院生</label>
    <br><br>

    <div v-if="grade === 'bachelor'">学部：
      <select id="department" v-model="major">
        <option disabled value="">学部を選択してください。</option>
        <option v-for="(item) in department" v-bind:key="item.id"> {{item}} </option>
      </select>
      <select id="gradeNum" v-model="gradeNum">
        <option disabled value="">学年を選択してください。</option>
        <option v-for="i in 6" v-bind:key="i.id"> {{i}}回生 </option>
      </select>
    </div>
    <div v-else>研究科
      <select id="master" v-model="major">
        <option disabled value="">研究科を選択してください。</option>
        <option v-for="(item) in master" v-bind:key="item.id"> {{item}} </option>
      </select>
      <select id="gradeNum" v-model="gradeNum">
        <option disabled value="">学年を選択してください。</option>
        <option v-for="i in 4" v-bind:key="i.id"> M{{i}} </option>
      </select>
    </div>

    <br><br>
    <button @click="signup">登録</button>

  </div>
</template>

<script>
export default {
  data(){
    return {
      email: "",
      password: "",
      userName: "",
      grade: "bachelor",
      major: "",
      gradeNum: "",
    }
  },
  computed: {
    department() {
      return this.$store.getters.department;
    },
    master() {
      return this.$store.getters.master;
    },
  },
  methods: {
    signup(){
      if(confirm("入力内容に間違いはありませんか？")) {
        this.$store.dispatch('signUp/signUp', {
          email: this.email,
          password: this.password,
          userName: this.userName,
          major: this.major,
          gradeNum: this.gradeNum,
        });
        this.email = "";
        this.password = "";
        this.userName = "";
        this.major = "";
        this.gradeNum = "";
      }

    }
  }

}
</script>


