<template>
  <div>
    <!-- <v-container>
      <v-tabs v-model="tab" color="basil">
        <v-tab value="keyword" @click="switchSearchFlag">キーワードで探す</v-tab>
        <v-tab value="category" @click="switchSearchFlag">ジャンル別で探す</v-tab>
      </v-tabs>
      <v-row v-if="tab === 0">
        <v-text-field label="キーワードで探す" outlined class="search" v-model='keywords'>
          <template v-slot:append-outer>
            <v-btn icon @click='search'><v-icon x-large>mdi-magnify</v-icon></v-btn>
          </template>
        </v-text-field>
      </v-row>
      <v-row v-if="tab === 1">
        <v-select :items="categoryData" label="カテゴリを選択してください" solo class="select-box" v-model="selectedCategory"></v-select>
      </v-row>
      <v-row justify="center" v-if="tab === 1">
        <h2 v-if="selectedCategory">カテゴリ：{{selectedCategory}}</h2>
        <h2 v-else > 全てのカテゴリ</h2>
      </v-row>
    </v-container> -->
  </div>
</template>

<script>
import categoryFromJson from "../../assets/categoryData.json";
export default {
  data() {
    return {
      keywords: '',
      categoryData: categoryFromJson.categoryData,
      selectedCategory: "",
      tab: null,
    }
  },
  methods: {
    search() {
      this.$store.dispatch('search/searchWithKeyWords', this.keywords);
      this.keywords = '';
    },
  },

}
</script>

