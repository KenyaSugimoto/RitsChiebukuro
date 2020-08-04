<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link
            to="/"
            class="link"
            active-class="link--active"
            exact
            >Home</router-link>
        </li>
        <li>
          <router-link
            to="/my-page"
            class="link"
            active-class="link--active"
            exact
          >マイページ</router-link>
        </li>
        <li>
          <router-link
            to="/answer"
            class="link"
            active-class="link--active"
            exact
          >回答</router-link>
        </li>
        <li>
          <router-link
            to="/category"
            class="link"
            active-class="link--active"
            exact
          >カテゴリ一覧</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
  .link {
    margin-right: 10px;
  }
  .link--active {
    font-size: 20px;
  }
  router-link {
    margin-right: 10px;
  }
</style>