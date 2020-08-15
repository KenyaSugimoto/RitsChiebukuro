<template>
  <div>
    <h2>{{userName}}さんのマイページ</h2>

    <hr>
    <router-link to='/favorite'>気になる質問</router-link>
    <hr>
    <router-link to='/myPosts'>{{userName}}さんの質問</router-link>
    <hr>
    <router-link to=''>プロフィールの変更</router-link>
    <hr>
    <router-link to='/resetPassword'>パスワードの変更</router-link>
    <hr>
    <router-link to=''>通知の設定</router-link>
    <hr>
    <span class='logout' @click='logout'>ログアウト</span>
    <hr>

  </div>
</template>


<script>
export default {
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout/logout");
    },
  },
}
</script>

<style scoped>
.logout {
  padding: 10px;
  cursor: pointer;
}
.logout:hover {
  background-color: #b1abab;
  color: red;
}
</style>
