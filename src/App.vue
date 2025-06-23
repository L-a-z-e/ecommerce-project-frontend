<template>
  <header>
    <nav>
      <router-link to="/">home</router-link> |
      <router-link to="/cart">장바구니</router-link> |
      <router-link to="/my-orders">주문내역</router-link> |
      <router-link to="login">로그인</router-link> |
      <router-link to="signup">회원가입</router-link>
    </nav>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<script setup lang="ts">

</script>
<style>

</style>