<template>
  <div>
    <h1>'{{ keyword }}' 검색 결과</h1>
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
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import apiClient from "@/api";

const products = ref<Product[]>([]);
const loading = ref<boolean>(true);
const route = useRoute();
const error = ref<string>('');
const keyword = ref<string>(route.query.keyword as string || '');

const search = async () => {
  if (!keyword.value) return;

  try {
    loading.value = true;
    const response = await apiClient.get<Product[]>('/products/search', {
      params: { keyword: keyword.value }
    });
    products.value = response.data;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  search();
})

watch(() => route.query.keyword, (newKeyword) => {
  keyword.value = newKeyword as string || '';
  search();
})
</script>

<style scoped>

</style>