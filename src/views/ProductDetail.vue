<template>
  <div v-if="loading">로딩 중...</div>
  <div v-if="error">{{ error }}</div>
  <div v-if="product">
    <!-- 상품 상세 정보 -->
    <h1>{{ product.productName }}</h1>
    <p>가격: {{ product.price }}원</p>
    <p>재고: {{ product.stock }}</p>
    <p>속성: {{product.attributes }}</p>
    <hr />
    <div>
      <label for="quantity">수량:</label>
      <input type="number" id="quantity" v-model.number="quantity" min="1"/>
      <button @click="addCart">장바구니 담기</button>
      <p v-if="cartMessage">{{ cartMessage }}</p>
    </div>

    <!-- 추천 상품 -->
    <div v-if="recommendations.length > 0" class="recommendations">
      <hr>
      <h2>함께 본 상품</h2>
      <ul>
        <li v-for="recommendation in recommendations" :key="recommendation.id">
          <router-link :to="`/products/${recommendation.id}`">
            <strong>{{ recommendation.productName }}</strong> - {{ recommendation.price }}원
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import type {Product} from "@/types/api.ts";
import apiClient from "@/api";
import axios from "axios";
import {useRoute} from "vue-router";

const props = defineProps<{
  id: string;
}>();
const route = useRoute();

const product = ref<Product | null>(null);
const recommendations = ref<Product[]>([]);
const quantity = ref<number>(1);
const loading = ref<boolean>(true);
const error = ref<string>('');
const cartMessage = ref<string>('');

onMounted(async () => {
  await fetchProductDetail(props.id);
})

const fetchProductDetail = async (productId: string) => {
  try{
    loading.value = true;
    const [productResponse, recommendResponse] = await Promise.all([
        apiClient.get<Product>(`/products/${productId}`),
        apiClient.get<Product[]>(`/products/${productId}/recommendations`)
    ]);
    product.value = productResponse.data;
    recommendations.value = recommendResponse.data;
  } catch (err) {
    console.error(err);
    error.value = '상품 정보를 불러오는 데 실패했습니다.';
  } finally {
    loading.value = false;
  }
};

const addCart = async () => {
  if (!product.value) {
    return;
  }

  try {
    cartMessage.value = '장바구니에 추가 중...';
    const response = await apiClient.post<string>('/cart/items', {productId: product.value.id, quantity: quantity.value});
    cartMessage.value = response.data;
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      if (err.response && err.response.status === 401 || err.response?.status === 403) {
        cartMessage.value = '장바구니에 상품을 추가하려면 로그인이 필요합니다.';
      } else {
        cartMessage.value = '장바구니 추가에 실패했습니다.';
      }
    } else {
      cartMessage.value = '알 수 없는 오류가 발생했습니다.';
    }

  }
};

watch(() => props.id, (newId) => {
  if (route.name === 'ProductDetail') {
    fetchProductDetail(newId);
  }
})
</script>

<style scoped>

</style>