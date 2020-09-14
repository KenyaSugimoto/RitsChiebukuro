<template>
  <div id="app">
    <v-container>
      <v-row><v-col><h2>ユーザ登録</h2></v-col></v-row>
      <br>
      <v-row><v-col><router-link to="/login" class="login">ログインはこちらから</router-link></v-col></v-row>

      <br><br>
      <v-row justify="center">
        <v-col cols="11" lg="6" md="8"  sm="9">
          <v-text-field class='text-field' label='Email' v-model='email' suffix='@ed.ritsumei.ac.jp' :rules="[rules.email]" />
        </v-col>
      </v-row>

      <br>

      <v-row justify="center">
        <v-col cols="11" lg="6" md="8"  sm="9">
          <v-text-field
            class='text-field'
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.min]"
            :type="show1 ? 'text' : 'password'"
            label="パスワード（6文字以上の半角英数字）"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="11" lg="6" md="8"  sm="9">
          <v-text-field
            class='text-field'
            v-model="confirmPassword"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.min]"
            :type="show2 ? 'text' : 'password'"
            label="パスワード(確認用)"
            counter
            @click:append="show2 = !show2"
          ></v-text-field>
        </v-col>
      </v-row>
      <br>

      <v-row justify="center">
        <v-col cols="11" lg="6" md="8"  sm="9">
          <v-text-field class='text-field' label="ユーザ名（半角英数字のみ）" outlined v-model="userName" />
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="11" lg="6" md="8"  sm="9">
          <div @click='resetMajorAndGrade'>
            <v-row justify="center">
              <v-col lg="3">
                <input type="radio" v-model="degree" value="bachelor" id="bachelor" name="grade">
                <label for="bachelor">学部生</label>
              </v-col>
              <v-col lg="3">
                <input type="radio" v-model="degree" value="master" id="master" name="grade">
                <label for="master">大学院生</label>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="11" lg="6" md="8"  sm="9">
          <div v-if="degree == 'bachelor'">
            <v-select :items="department" label="学部を選択してください。" solo class="select-box" v-model="major"></v-select>
            <v-select :items="bachelorGrade" label="学年を選択してください。" solo class="select-box" v-model="grade"></v-select>
          </div>
          <div v-else>
            <v-select :items="master" label="研究科を選択してください。" solo class="select-box" v-model="major"></v-select>
            <v-select :items="masterGrade" label="学年を選択してください。" solo class="select-box" v-model="grade"></v-select>
          </div>
        </v-col>
      </v-row>

      <v-row><v-col><h3>利用規約をご確認ください。</h3></v-col></v-row>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent :width="width">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text large color="#F44336" v-bind="attrs" v-on="on">
              <h4>利用規約を確認する</h4>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">利用規約</v-card-title>
            <v-card-text class="text">
              <b>Rits知恵袋 利用規約</b><br>
              利用のルール<br>
              Rits知恵袋は、その内容を立命館大学の学生みなさんで作っていくサービスです。<br>
              たくさんの方々がご利用し、さまざまな価値観が交わされる場であるからこそ、時にはなじみのない意見に出合ったり、不快と感じられるような経験をされることがあるかもしれません。<br>
              ご利用にあたっては、こうしたサービスの趣旨をご理解いただいたうえでのご利用をお願いいたします。なお、運営としては、できるかぎり多くの方々に快適にご利用いただける環境をご提供するために、誹謗中傷など明らかに悪意のある行為や不正利用には、強制的にメッセージを削除する等厳しく対処してまいりますので、一部の心ない方に心をわずらわされることなく、Rits知恵袋をご利用いただければと考えております。<br>
              <br>

              ●禁止事項について<br>
              快適にサービスをご利用いただくために、Rits知恵袋では以下の事項を禁止しています。<br>
              禁止事項1：誹謗（ひぼう）中傷など他人を攻撃したり、傷つける内容の投稿<br>
              いやがらせ、悪口、脅しなど、他人の権利を侵害し、または他人の迷惑となるような投稿を行うことは禁止しています。<br>
              このような内容の投稿をした場合、ほかの参加者を不快にさせるだけでなく、投稿した本人が民事上あるいは刑事上の責任を追及される可能性があります。行動の結果は、ご自身で責任を負うことになりますので、ご注意ください。<br>
              禁止事項2：社会規範および公序良俗に反する内容の投稿<br>
              社会通念上、わいせつ、不愉快だと感じる可能性のある内容や画像の投稿、またはこれらの内容を含むウェブページのURLを掲載することは禁止しています。<br>
              なお、わいせつな内容や画像の投稿は、刑事罰の対象になる場合もあります。<br>
              また法令違反や犯罪行為の誘発・実行の暗示、いたずらの意図がうかがえる内容など、ほかの参加者の気持ちを不快にさせるような内容の投稿も禁止しています。<br>
              禁止事項3：商業目的や広告目的で利用すること<br>
              Rits知恵袋を商業目的や広告目的に利用することは禁止しています。<br>
              下記のような利用は、商業目的や広告目的の利用であると判断する場合があります。<br>
              * 商品の売買や金銭授受を目的とした利用<br>
              * サークルの勧誘に関する利用<br>
              禁止事項4：個人を特定できる情報の投稿<br>
              ご自身のものであるか他人のものであるかを問わず、個人を特定できる情報（氏名、住所、電話番号、メールアドレスなど）の公開は禁止しています。<br>
              他人の名前、住所、電話番号、メールアドレス、IPアドレス、口座番号、自動車のナンバーなど、個人情報やそれに準ずる情報の公開はプライバシー侵害の観点から不法行為に該当し、民事上の責任を追及される場合もあります。ご注意ください。<br>
              禁止事項5：無断で著作物を公開するなど、第三者の知的財産権を侵害すること<br>
              無断で著作物を公開するなど第三者の知的財産権を侵害することは禁止しています。<br>
              他人の著作物を引用する場合は、正当な引用にあたるかどうか、ご自身の責任で判断したうえで投稿してください。<br>
              画像や動画などを使うときは、他人の著作権や肖像権などの知的財産権を侵害しないかを確認してからご利用ください。なお、他人の著作物を無断で改変した画像や動画を使用した場合も、著作権侵害に該当するおそれがあります。<br>
              特に授業のレジュメ等の公開は著作権侵害に該当するのでご注意ください。<br>
              禁止事項6：サービス運営を妨害する行為<br>
              大量の投稿を繰り返すなどして、Rits知恵袋のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為は禁止しています。<br>
              また、他人になりすましたり、他人に誤認を与える内容の投稿は禁止です。<br>
              そのほか、運営が不適切だと判断するもの<br>
              このページに記載されていない行為でも、運営が不適切だと判断した場合、なんらかの措置を行う可能性があります。<br>
              <br>

              ●ガイドライン違反と判断した場合の対処について<br>
              みなさんの投稿が運営の利用規約に反していると運営が判断したときは、投稿の削除やRits知恵袋の利用停止といった措置を予告なく行う場合があります。<br>
              <br>

              ●さいごに
              質問や回答をするときや、コメントなどを書くときに、これから投稿しようとしている内容が相手を傷つけないか、また、ほかの利用者に迷惑をかけることにならないか、上記の事項を参考にサービスへご参加ください。

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#0D47A1" text @click="dialog = false; agreeCheck = false;">同意しない</v-btn>
              <v-btn color="#E64A19" large text @click="dialog = false; agreeCheck = true;">同意する</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row>
        <v-col>
          <v-btn outlined width="15%" color="#B3424A" @click="signUp">
            <font color='black'><b>登録</b></font>
          </v-btn>
        </v-col>
      </v-row>
      <v-row><v-col></v-col></v-row>

    </v-container>

  </div>
</template>

<script>
import ritsData from "../../assets/rits.json";
import {toast} from "../../function/toastr.js";
import {dialog} from "../../function/dialog.js";


export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      degree: "bachelor",
      major: "",
      grade: "",
      department: ritsData.department,
      master: ritsData.master,
      rules: {
        min: value => value.length >= 6 || '最低6文字必要です',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))$/
          return pattern.test(value) || '不正なEmailアドレスです';
        },
      },
      show1: false,
      show2: false,
      bachelorGrade: ritsData.bachelorGrade,
      masterGrade: ritsData.masterGrade,
      dialog: false,
      agreeCheck: false,
      col: 6,
    }
  },

  methods: {
    signUp() {
      const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*$/;
      if (this.email == "" || this.password == "", this.confirmPassword == "", this.userName == "", this.major == "", this.grade == "") {
        toast('登録情報を全て入力してください。', "error");
      } else if (this.password != this.confirmPassword) {
        toast('パスワードが一致しません。', "error");
      } else if (this.userName.match(/[^0-9 ^a-z ^A-Z]/g )) {
        toast('ユーザIDが不正です。\n半角英数字で入力してください。', "error");
      } else if (!reg.test(this.email)) {
        toast('正しいメールアドレスを入力してください。', "error");
      } else if (!this.agreeCheck) {
        toast('利用規約をご確認ください。同意していただけない場合、登録することができません。', "error")
      } else {
        dialog(this, {
          title: 'この入力内容で登録しますか？',
          body: `Email： <b>${this.email}@ed.ritsumei.ac.jp</b> <br><br><br> ユーザ名： <b>${this.userName}</b> <br><br><br> ${this.degree == 'bachelor' ? '学部' : '研究科'}： <b>${this.major}</b> <br><br><br> 学年： <b>${this.grade}</b>`
        }, true).then((response) => {
          if (response == 'OK') {
            this.$store.dispatch('signUp/signUp', {
              email: `${this.email}@ed.ritsumei.ac.jp`,
              password: this.password,
              userName: this.userName,
              major: this.major,
              grade: this.grade,
            });
          }
        });
      }
    },
    resetMajorAndGrade() {
      this.major = '';
      this.grade = '';
    },
  },

  computed: {
    width() {
      return this.$vuetify.breakpoint.name === "xs" ? "90%" : "55%";
    }
  },
}

</script>

<style scoped>
.login {
  cursor: pointer;
}
.login:hover {
  background-color: #b1abab;
  color: red;
}
.text {
  text-align: left;
}
</style>
