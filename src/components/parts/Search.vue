<template>
  <div>
    <input type='text' id='keywords' v-model='keywords'>
    <button @click='search'>検索</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: '',
    }
  },
  methods: {
    search() {
      this.$store.dispatch('search/searchWithKeyWords', this.keywords);
      this.keywords = '';
    }
  }

}
</script>
