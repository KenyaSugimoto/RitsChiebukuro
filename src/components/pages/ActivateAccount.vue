<template>
  <div>
    <br><br>
    <hr>

    <h2>アカウントの有効化</h2>
    <h3>登録されたメールアドレスに、<font color='red'>アカウントを有効化するためのURL</font>が記載されたメールを送信しました。</h3>
    <h3>URLをクリックしてアカウントを有効化してください。</h3>
    <h3>その後、<font color='red'>再びログイン</font>してください。</h3>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit('updateBeginActivate', true);
      next();
    });
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('updateBeginActivate', false);
    next();
  },
};
</script>
