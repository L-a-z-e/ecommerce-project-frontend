<template>
  <header>
    <nav>
      <router-link to="/">home</router-link> |
      <router-link to="/cart">장바구니</router-link> |
      <router-link to="/my-orders">주문내역</router-link> |
      <router-link to="login">로그인</router-link> |
      <router-link to="signup">회원가입</router-link>
    </nav>
    <!-- 검색창 UI 추가 -->
    <div class="search-bar">
      <input v-model="searchKeyword" @keyup.enter="executeSearch" placeholder="상품 검색...">
      <button @click="executeSearch">검색</button>
    </div>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {useRouter} from "vue-router";

const searchKeyword = ref<string>('');
const router = useRouter();

const executeSearch = async () => {
  if (!searchKeyword.value.trim()) return;

  await router.push(`/search?keyword=${searchKeyword.value}`);
};
</script>
<style>

</style>