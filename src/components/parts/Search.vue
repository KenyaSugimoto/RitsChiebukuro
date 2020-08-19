<template>
  <div>
    <v-container>
      <v-row>
        <v-text-field label="キーワードで探す" outlined class="search" v-model='keywords'>
          <template v-slot:append-outer>
            <v-btn icon @click='search'><v-icon x-large>mdi-magnify</v-icon></v-btn>
          </template>
        </v-text-field>
      </v-row>
    </v-container>
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

