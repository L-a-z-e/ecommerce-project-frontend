<template>
  <div>
    <h1>상품 목록</h1>
    <div v-if="loading">로딩 중...</div>
    <div v-if="error">{{ error }}</div>
    <ul v-if="products.length > 0">
      <li v-for="product in products" :key="product.id">
        <strong>{{ product.productName }}</strong> - {{ product.price }}원 (재고: {{ product.stock }}개)
      </li>
    </ul>
    <div v-else-if="!loading">
      등록된 상품이 없습니다.
    </div>
  </div>
</template>

<script setup lang="ts">

import type {Product} from "@/types/api.ts";
import {onMounted, ref} from "vue";
import apiClient from "@/api";

const products = ref<Product[]>([]);
const loading = ref<boolean>(true);
const error = ref<string>('');

onMounted(async () => {
  await fetchProducts();
});

const fetchProducts = async (): Promise<void> => {

  try {
    loading.value = true;
    error.value = '';

    const response = await apiClient.get<Product[]>('/products');
    products.value = response.data;
  } catch (err: any) {
    console.error("Failed to fetch products:", err);
    error.value = '상품 목록을 불러오는 데 실패했습니다.';
  } finally {
    loading.value = false;
  }
}

</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  border: 1px solid #cccccc;
  margin: 10px;
  padding: 10px;
}
</style>