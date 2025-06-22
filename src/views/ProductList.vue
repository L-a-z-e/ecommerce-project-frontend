<template>
  <div>
    <h1>상품 목록</h1>
    <div class="filters">
      <select v-model="selectedBrand" @change="applyFilters">
        <option value="">모든 브랜드</option>
        <option value="Nike">Nike</option>
        <option value="Adidas">Adidas</option>
        <option value="Puma">Puma</option>
      </select>
      <input v-model.number="minPrice" type="number" placeholder="최소 가격" @change="applyFilters">
      <input v-model.number="maxPrice" type="number" placeholder="최대 가격" @change="applyFilters">
    </div>
    <div v-if="loading">로딩 중...</div>
    <div v-if="error">{{ error }}</div>
    <ul v-if="products.length > 0">
      <router-link v-for="product in products" :key="product.id" :to="`/products/${product.id}`">
        <strong>{{ product.productName }}</strong> - {{ product.price }}원 (재고: {{ product.stock }}개)
      </router-link>
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
// 필터링 조건을 위한 반응형 상태 추가
const selectedBrand = ref<string>('');
const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);


onMounted(async () => {
  await fetchProducts();
});

const fetchProducts = async (): Promise<void> => {

  try {
    loading.value = true;
    error.value = '';

    const params: Record<string, any> = {};
    if (selectedBrand.value) params.brand = selectedBrand.value;
    if (minPrice.value) params.minPrice = minPrice.value;
    if (maxPrice.value) params.maxPrice = maxPrice.value;

    const response = await apiClient.get<Product[]>('/products', { params: params });
    products.value = response.data;
  } catch (err: any) {
    console.error("Failed to fetch products:", err);
    error.value = '상품 목록을 불러오는 데 실패했습니다.';
  } finally {
    loading.value = false;
  }
}

// 필터 조건이 변경될 때마다 이 함수가 호출됨
const applyFilters = async () => {
  await fetchProducts();
};

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
a {
  text-decoration: none;
  color: inherit;
}
</style>