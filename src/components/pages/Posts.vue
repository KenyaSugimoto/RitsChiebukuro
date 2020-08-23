<template>
  <div>
    <h2>{{ name }}<v-icon x-large> {{iconName}} </v-icon></h2>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12">
          <hr>
          <template v-if='posts !== null && typeof(posts[0]) !== "undefined"'>
            <div
              v-for="post in posts"
              :key="post.document.fields.postId.stringValue"
              class="content-box"
            >
              <v-row justify="center">
                <v-col cols="11">
                  <v-card @click="toPost(post)">
                    <v-card-text>
                      <v-row>
                        <v-col>
                          <br>
                          <div class="title">{{ post.document.fields.title.stringValue }}</div>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <br>
                          <div>{{ post.document.fields.created_at.timestampValue | dateFormat }}</div>
                        </v-col>
                      </v-row>
                      <br>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </template>

          <template v-else>
            <h3>{{name}}はありません</h3>
          </template>

          <hr>
          <br><br>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["posts", "name", "iconName"],

  computed: {
    watchingPost() {
      return this.$store.getters.watchingPost;
    }
  },
  methods: {
    toPost(post) {
      this.$store.dispatch("post/getPostByPostId", post.document.fields.postId.stringValue).then((response) => {
        if (response == "OK") {
          const existWatchingPost = "document" in this.watchingPost;
          if (existWatchingPost) {
            this.$router.push({
              name: "post",
              params: { postId: this.watchingPost.document.fields.postId.stringValue },
            });
          } else {
            this.$router.push({name: "notFound"});
          }
        }
      });
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
.box {
  width: 50%;
  padding: 0.5em 1em;
  margin: auto;
  background: #edeef0;
  color: rgb(231, 9, 9);
}
.content-box {
  border-radius: 9px;
}
</style>
