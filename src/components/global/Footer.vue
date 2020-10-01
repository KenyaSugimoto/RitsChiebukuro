<template>
  <v-footer
    absolute
    color="#9b1423"
  >
    <v-row justify="center">
      <v-btn
        text
        dark
        @click="toTerms"
      >
        <h4>利用規約</h4>
      </v-btn>
      <v-btn
        text
        dark
        @click="toGoogleForm"
      >
        <h4>お問い合わせ</h4>
      </v-btn>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  methods: {
    toTerms() {
      const termsUrl = "https://drive.google.com/file/d/1ZIe2x__33lKV-rSkDY23USkZiAq7MHFV/view";
      window.open(termsUrl, "_blank");
    },
    toGoogleForm() {
      window.open("https://forms.gle/EJSVnMuKKKtT7Le68", "_blank");
    },
  }
}
</script>
