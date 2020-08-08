<template>
  <div>
    <h2>カテゴリ一覧ページ</h2>
    <select id="categoryData" v-model="selectedCategory">
      <option disabled value="">カテゴリを選択してください。</option>
      <option v-for="(item) in categoryData" v-bind:key="item.id"> {{item}} </option>
    </select>
    <button @click="getSelectedCategoryPosts">検索</button>

    <p v-if="selectedCategory"> {{selectedCategory}}の新着投稿</p>
    <h3>投稿一覧</h3>
    <hr>
    <div v-for="post in selectedCategoryNewPosts" :key="post.name" class="content-box">
      <div class="title">{{post.document.fields.title.stringValue}}</div>
      <div>
        <router-link to="/my-page">
          {{post.document.fields.userName.stringValue}}
        </router-link>
      </div>
      <div class="content box">{{post.document.fields.content.stringValue}}</div>
      <div>カテゴリ：{{post.document.fields.category.stringValue}}</div>
      <div>投稿時間：{{post.document.fields.created_at.timestampValue | dateFormat}}</div>
      <!-- <div>投稿者：{{post.document.fields.userName.timestampValue}}</div> -->
      <!-- <div>編集時間：{{post.document.fields.updated_at.timestampValue}}</div> -->
      <!-- <div>回答有無：{{post.document.fields.isAnswered.booleanValue}}</div> -->
      <br>
    </div>
  </div>
</template>


<script>
import categoryFromJson from "../../assets/categoryData.json";
export default {
  data() {
    return {
      categoryData: categoryFromJson.categoryData,
      selectedCategory: "",
    }
  },
  computed: {
    selectedCategoryNewPosts() {
      return this.$store.getters.selectedCategoryNewPosts;
    }
  },
  created() {
    this.$store.commit("updateSelectedCategoryNewPosts", null, {root: true})
  },
  methods: {
    getSelectedCategoryPosts() {
      if(!this.selectedCategory) {
        alert("カテゴリを選択してください。");
      }else {
        this.$store.dispatch("contents/getSelectedCategoryPosts", this.selectedCategory);
      }
    },
  },

}
</script>

<style scoped>
div .title {
  font-size: larger;
  font-weight: bolder;
  padding-top: 15px;
}

.box{
  width: 50%;
  padding: 0.5em 1em;
  margin: auto;
  background: #edeef0;
  color: rgb(231, 9, 9);
}

.content-box {
  background-color: rgb(251, 242, 209);
  border-radius: 9px;
  width: 70%;
  margin: 20px auto;
}

.post-form {
  background-color: rgb(199, 217, 218);
}

</style>

