# 変数の命名規則について
- "_"を使わない
- 基本的にキャメルケースを使用

# 関数（メソッド）について
## 書く場所について
- Vueファイルには関数を書かない
- VuexのActionsやMutationsにかく
## ActionsとMutationsの切り分けについて
- Mutations:  Vuexのstateを更新する時（同期処理）
- Actions:    それ以外の処理