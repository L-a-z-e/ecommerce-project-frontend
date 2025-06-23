<template>
  <div>
    <h1>주문 내역</h1>
    <div v-if="loading">주문 내역을 불러오는 중...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="orders.length > 0">
      <div v-for="order in orders" :key="order.orderId" class="order-container">
        <h3>주문 번호: {{ order.orderId }} {{ new Date(order.orderDate).toLocaleDateString() }}</h3>
        <p><strong>상태:</strong> {{ order.status }}</p>
        <p><strong>배송지: </strong> {{ order.orderAddress }}</p>
        <ul>
          <li v-for="(item, index) in order.orderItems" :key="index">
            {{ item.productName }} - {{ item.quantity }}개 (각 {{ item.orderPrice }}원)
          </li>
        </ul>
        <p class="total-price"><strong>총 결제 금액: {{ order.totalPrice }}</strong></p>
      </div>
    </div>
    <div v-else-if="!loading">
      주문 내역이 없습니다.
    </div>
  </div>
</template>

<script setup lang="ts">
import type {OrderResponse} from "@/types/api.ts";
import {onMounted, ref} from "vue";
import apiClient from "@/api";
import axios from "axios";

const orders = ref<OrderResponse[]>([]);
const loading = ref<boolean>(true);
const error = ref<string>("");

onMounted(async (): Promise<void> => {
  try {
    const response = await apiClient.get<OrderResponse[]>("/orders");
    orders.value = response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && (err.response?.status === 401 || err.response?.status === 403)) {
      error.value = '주문 내역을 보려면 로그인이 필요합니다.';
    } else {
      error.value = '주문 내역을 불러오는 데 실패했습니다.';
    }
  } finally {
    loading.value = false;
  }
})

</script>

<style scoped>
.order-container {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
}

.total-price {
  text-align: right;
  font-size: 1.2rem;
}
</style>