<template>
  <div>
    <div v-if="loading">로딩중</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="cart">
      <ul>
        <li v-for="item in cart.items" :key="item.id">
          <span>{{ item.productName }} ({{ item.price }}원)</span>
          -
          <span>
            수량:
            <input type="number" :value="item.quantity" @change="updateQuantity(item.id, ($event.target as HTMLInputElement).value)" min="1">
          </span>
          <button @click="removeItem(item.id)">삭제</button>
        </li>
      </ul>
      <hr>
      <h3>총 금액: {{ cart.totalPrice }}</h3>
      <div>
        <label for="address">배송주소</label>
        <input type="text" id="address" v-model="address" placeholder="배송지를 입력하세요."/>
        <button @click="createOrder" :disabled="!address.trim()">주문하기</button>
      </div>
      <p v-if="orderMessage">{{ orderMessage }}</p>
    </div>
    <div v-else-if="!loading">
      장바구니가 비었습니다.
    </div>
  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import type {CartResponse} from "@/types/api.ts";
import apiClient from "@/api";
import axios from "axios";
import {useRouter} from "vue-router";

const cart = ref<CartResponse | null>(null);
const loading = ref<boolean>(true);
const error = ref<string>('');
const address = ref<string>('');
const orderMessage = ref<string>('');
const router = useRouter();

onMounted(async () => {
  await fetchCart();
});

const fetchCart = async () => {
  try {
    loading.value = true;
    error.value = '';
    const response = await apiClient.get<CartResponse>('/cart');
    cart.value = response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      error.value = '장바구를 보려면 로그인이 필요합니다.';
    } else {
      error.value = '장바구니를 불러오는 데 실패했습니다.';
    }
  } finally {
    loading.value = false;
  }
}

const updateQuantity = async (id: number, newQuantity: string) => {
  try {
    const quantity = parseInt(newQuantity, 10);
    if (isNaN(quantity) || quantity < 1) {
      alert('유효한 수량을 입력해주세요.');
      return;
    }
    await apiClient.patch(`/cart/items/${id}`, { quantity })
    await fetchCart();
  } catch (err) {
    alert('수량 변경에 실패했습니다.');
  }
}

const removeItem = async (id: number) => {
  if (!confirm('정말로 이 상품을 삭제하시겠습니까?'))
    return;

  try {
    await apiClient.delete(`/cart/items/${id}`);
    await fetchCart();
  } catch (err) {
    alert('상품 삭제에 실패했습니다.');
  }
}

const createOrder = async () => {
  if (!address.value.trim()) {
    alert('배송지 주소를 입력하세요.')
    return;
  }

  if(!confirm('정말로 주문하시겠습니까?'))
    return;

  try{
    orderMessage.value = '주문 처리 중...';
    await apiClient.post<void>('/orders', { address: address.value });
    orderMessage.value = '주문이 성공적으로 완료되었습니다.! 잠시 후 주문 내역 페이지로 이동합니다.';

    setTimeout(() => {
      // TODO: 주문 내역 페이지 이동
      router.push('/my-orders')
    }, 1000);
  } catch (err) {
    console.error(err);
    if(axios.isAxiosError(err) && err.response?.data) {
      // backend에서 보낸 구체적인 에러 메시지가 있다면 사용
      orderMessage.value = `주문 실패: ${err.response.data || '알 수 없는 오류'}`;
    } else {
      orderMessage.value = '주문 처리 중 오류가 발생했습니다.';
    }
  }
}

</script>

<style scoped>
ul { list-style: none; padding: 0; }
li { margin-bottom: 10px; }
input[type="number"] { width: 50px; }
</style>