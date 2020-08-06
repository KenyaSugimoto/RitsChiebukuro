<template>
  <div>
    <h2>カテゴリ一覧ページ</h2>
    <select id="categoryData" v-model="category">
      <option disabled value="">カテゴリを選択してください。</option>
      <option v-for="(item) in getCategoryData" v-bind:key="item.id"> {{item}} </option>
    </select>
  </div>
</template>


<script>
export default {
  data() {
    return {
      category: "",
    }
  },
  computed: {
    getCategoryData() {
      return this.$store.getters.categoryData;
    },
  },

}
</script>