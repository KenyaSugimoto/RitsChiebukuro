<template>
  <div>
    <h2>トップページ</h2>
    <router-view name="search"></router-view>

    <h3>投稿</h3>
    <label for="title">*タイトル</label>
    <input type="text" id="title" v-model="title">
    <br><br>
    <div>
      <label for="content">*質問内容</label>
      <br>
      <textarea id="content" cols="30" rows="10" v-model="content"></textarea>
    </div>
    <label for="categoryData">*質問カテゴリ</label>
    <select id="categoryData" v-model="selectedCategory">
      <option disabled value="">カテゴリを選択してください。</option>
      <option v-for="(item) in categoryData" v-bind:key="item.id"> {{item}} </option>
    </select>
    <br><br>
    <button @click="postContent">投稿</button>

    <h3>投稿一覧</h3>
    <hr>
    <div v-for="post in newPosts" :key="post.name" class="content-box">
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
      <br />
    </div>
  </div>
</template>

<script>
import categoryFromJson from "../../assets/categoryData.json";
export default {
  data() {
    return {
      title: "",
      content: "",
      categoryData: categoryFromJson.categoryData,
      selectedCategory: "",
    };
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    },
    newPosts() {
      return this.$store.getters.newPosts;
    },
  },
  created() {
    this.$store.dispatch("contents/getContents");
  },

  methods: {
    postContent() {
      if(!this.title || !this.content || !this.selectedCategory) {
        alert("入力に不備があります。");
      }else {
        this.$store.dispatch("contents/postContent", {
          title: this.title,
          content: this.content,
          category: this.selectedCategory,
          idToken: this.idToken,
        });
        this.content = "";
        this.title = "";
      }
    },

  },
};
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

</style>
