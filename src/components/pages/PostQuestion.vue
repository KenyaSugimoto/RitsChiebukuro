<template>
  <div class="post-form">
    <v-container>
      <v-row>
        <v-col>
          <h2>気軽に質問してみよう！</h2>
          <hr>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-textarea class='text-area' label='タイトル' outlined auto-grow rows=4 v-model='title'></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select :items="categoryData" label="ジャンルを選ぶ" solo class="select-box" v-model="selectedCategory"></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-textarea class='text-area' label='質問' outlined auto-grow rows=8 v-model='content'></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn width="280" height="40" color="#B3424A" @click="createPost"><font color='white'><b>質問する</b></font></v-btn>
        </v-col>
      </v-row>
      <br><br>

    </v-container>

    </div>
</template>

<script>
import categoryFromJson from "../../assets/categoryData.json";
import {toast} from "../../function/toastr.js";
import {dialog} from "../../function/dialog.js";
export default {
  data() {
    return {
      title: "",
      content: "",
      categoryData: categoryFromJson.categoryData.filter(category => category != '全て'),
      selectedCategory: "",
    };
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    },
  },
  methods: {
    createPost() {
      if (!this.title || !this.content || !this.selectedCategory) {
        toast('入力に不備があります。', "error");
      } else {
        dialog(this, {
          title: '質問を投稿しますか？',
          body: `タイトル： ${this.title} <br><br><br> 質問内容： ${this.content}`
        }, true).then((response) => {
          if (response == 'OK') {
            this.$store.dispatch("post/createPost", {
              title: this.title,
              content: this.content,
              category: this.selectedCategory,
              idToken: this.idToken,
            });
            this.content = "";
            this.title = "";
            this.selectedCategory = "";
          }
        });
      }
    },
  },

}
</script>

<style scoped>
.text-area {
  width: 75%;
  margin: 0 auto;
}
.posts-area {
  display: flex;
}
.select-box {
  width: 75%;
  margin: 0 auto;
}
h2 {
  color: #B3424A;
}
.post-button {
  width: 280px;
  height: 40px;
  color: white;
}
</style>