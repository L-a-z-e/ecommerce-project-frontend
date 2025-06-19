<template>
  <div>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">이메일:</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>
      <div>
        <label for="password">비밀번호:</label>
        <input id="password" v-model="form.password" type="password" required />
      </div>
      <button type="submit">로그인</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">

import {reactive, ref} from "vue";
import type {LoginRequest, LoginResponse} from "@/types/api.ts";
import {useRouter} from "vue-router";
import apiClient from "@/api";

const form = reactive<LoginRequest>({
  email: '',
  password: '',
});

const message = ref<string>('');
const router = useRouter();

const handleLogin = async (): Promise<void> => {
  try {
    const response = await apiClient.post<LoginResponse>('/users/login', form);

    // 1. 로그인 성공시, 응답으로 받은 accessToken 추출
    const accessToken = response.data.accessToken;

    // 2. 브라우저의 localStorage에 토큰 저장
    localStorage.setItem('accessToken', accessToken);

    message.value = '로그인 성공 ! 잠시 후 메인 페이지로 이동합니다.';

    setTimeout(() => {
      // TODO: '/' 메인 페이지 생성
      router.push('/');
    }, 1000);
  } catch (error) {
    console.log("Login failed: ", error);
    message.value = '이메일 또는 비밀번호를 확인해주세요.';
  }
}
</script>


<style scoped>

</style>