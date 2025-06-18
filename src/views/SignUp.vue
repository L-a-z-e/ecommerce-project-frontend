<template>
  <div>
    <h1>회원가입</h1>
    <form @submit.prevent="handleSignUp">
      <div>
        <label for="username">이름:</label>
        <input id="username" v-model="form.username" type="text" required/>
      </div>
      <div>
        <label for="password">비밀번호:</label>
        <input id="password" v-model="form.password" type="password" required/>
      </div>
      <div>
        <label for="email">이메일:</label>
        <input id="email" v-model="form.email" type="email" required/>
      </div>
      <button type="submit">가입하기</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import type {SignUpRequest} from "../types/api.ts";
import {useRouter} from "vue-router";
import apiClient from "../api";

const form = reactive<SignUpRequest>({
  username: '',
  password: '',
  email: ''
});

const message = ref<string>('');
const router = useRouter();

const handleSignUp = async (): Promise<void> => {
  try {
    // apiClient.post<ResponseType, RequestType>(url, data)
    const response = await apiClient.post<string>("/users/signup", form);

    message.value = response.data;

    setTimeout(() => {
      router.push('/login');
    }, 1000);
  } catch (error: any) {
    if(error.response && error.response.data) {
      message.value = '입력값을 확인해주세요. 이미 가입된 이메일일 수 있습니다.';
    } else {
      message.value = '회원가입 중 오류가 발생했습니다.';
    }
  }
};
</script>