<template>
  <div>
    <h2>通知設定</h2>
    <p>内容を編集して「保存」ボタンを押してください。</p>
    <div class="select-config">
      <div>
        <input type="checkbox" name="config" value="1" id="config1">
        <label for="config1">あなたの質問に対する回答やコメントについて通知</label>
      </div>
      <br>
      <div>
        <input type="checkbox" name="config" value="2" id="config2">
        <label for="config2">あなたが回答した質問のコメントについて通知</label>
      </div>
      <br>
      <div>
        <input type="checkbox" name="config" value="3" id="config3">
        <label for="config3">気になるジャンルについての投稿を通知</label>
      </div>
    </div>
    <br>

    <button>保存</button>

  </div>
</template>

<style scoped>
button {
  width: 70px;
  height: 30px;
}
.select-config {
  background-color: blanchedalmond;
  width: 50%;
  margin: auto;
}
</style>