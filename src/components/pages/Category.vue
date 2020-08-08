<template>
  <div>
    <h2>カテゴリ一覧ページ</h2>
    <hr>
    <select id="categoryData" v-model="category">
      <option disabled value="">カテゴリを選択してください。</option>
      <option v-for="(item) in categoryData" v-bind:key="item.id"> {{item}} </option>
    </select>
  </div>
</template>


<script>
import categoryFromJson from "../../assets/categoryData.json";
export default {
  data() {
    return {
      categoryData: categoryFromJson.categoryData,
      category: "", //選ばれたカテゴリーの変数
    }
  },
}
</script>