# E-Commerce Project Frontend - Vue 3 + TypeScript + Vite

**현대적인 전자상거래 플랫폼의 프론트엔드 애플리케이션**입니다. Vue 3의 Composition API, TypeScript의 타입 안정성, Vite의 고속 개발 환경을 통해 **확장 가능하고 유지보수하기 쉬운 SPA(Single Page Application)**를 구현합니다.

---

## 🎯 프로젝트 개요

| 항목 | 설명 |
|------|------|
| **프레임워크** | Vue 3.5.13 + TypeScript 5.8 |
| **번들러** | Vite 6.3 |
| **상태관리** | Pinia 3.0 |
| **라우팅** | Vue Router 4.5 |
| **HTTP 클라이언트** | Axios 1.10 |
| **개발 서버** | Vite Dev Server (HMR 지원) |
| **타입 검사** | vue-tsc |
| **Node 버전** | 18.0 이상 |

---

## 🚀 빠른 시작

### 1단계: 환경 설정

**필수 요구사항**
```bash
# Node.js 18+ 확인
node --version  # v18.0.0 이상

# npm 또는 yarn 확인
npm --version   # 9.0.0 이상
```

### 2단계: 프로젝트 클론 및 설치

```bash
# 저장소 클론
git clone https://github.com/L-a-z-e/ecommerce-project-frontend.git
cd ecommerce-project-frontend

# 의존성 설치
npm install
# 또는
yarn install
```

### 3단계: 개발 서버 실행

```bash
# 개발 서버 시작 (Hot Module Replacement 활성화)
npm run dev

# 기본 주소: http://localhost:5173
```

### 4단계: 프로덕션 빌드

```bash
# TypeScript 타입 체크 + Vite 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

---

## 📁 프로젝트 구조

```
ecommerce-project-frontend/
│
├── src/                          # 소스 코드
│   ├── api/                       # API 호출 레이어
│   │   ├── productApi.ts         # 상품 관련 API
│   │   ├── orderApi.ts           # 주문 관련 API
│   │   ├── userApi.ts            # 사용자 관련 API
│   │   └── client.ts             # Axios 설정 및 인스턴스
│   │
│   ├── components/                # 재사용 가능한 컴포넌트
│   │   ├── ProductCard.vue       # 상품 카드
│   │   ├── ProductList.vue       # 상품 목록
│   │   ├── ShoppingCart.vue      # 장바구니
│   │   ├── Navbar.vue            # 네비게이션 바
│   │   ├── Footer.vue            # 푸터
│   │   └── common/               # 공통 컴포넌트
│   │       ├── Button.vue
│   │       ├── Modal.vue
│   │       ├── Loading.vue
│   │       └── Toast.vue
│   │
│   ├── views/                     # 페이지 컴포넌트
│   │   ├── HomeView.vue          # 홈페이지
│   │   ├── ProductDetailView.vue # 상품 상세
│   │   ├── CartView.vue          # 장바구니 페이지
│   │   ├── CheckoutView.vue      # 결제 페이지
│   │   ├── OrderListView.vue     # 주문 목록
│   │   ├── LoginView.vue         # 로그인
│   │   ├── SignupView.vue        # 회원가입
│   │   └── ProfileView.vue       # 프로필
│   │
│   ├── stores/                    # Pinia 상태관리
│   │   ├── products.ts           # 상품 저장소
│   │   ├── cart.ts               # 장바구니 저장소
│   │   ├── user.ts               # 사용자 저장소
│   │   ├── order.ts              # 주문 저장소
│   │   └── ui.ts                 # UI 상태 저장소
│   │
│   ├── router/                    # Vue Router 설정
│   │   ├── index.ts              # 라우터 인스턴스
│   │   └── guards.ts             # 라우트 가드
│   │
│   ├── types/                     # TypeScript 타입 정의
│   │   ├── product.ts            # 상품 타입
│   │   ├── user.ts               # 사용자 타입
│   │   ├── order.ts              # 주문 타입
│   │   ├── api.ts                # API 응답 타입
│   │   └── common.ts             # 공용 타입
│   │
│   ├── assets/                    # 정적 자산
│   │   ├── images/               # 이미지
│   │   ├── icons/                # 아이콘
│   │   └── fonts/                # 폰트
│   │
│   ├── App.vue                    # 루트 컴포넌트
│   ├── main.ts                    # 애플리케이션 진입점
│   ├── style.css                  # 전역 스타일
│   └── vite-env.d.ts              # Vite 환경 타입
│
├── public/                        # 정적 파일
│   ├── favicon.ico
│   └── vite.svg
│
├── index.html                     # HTML 템플릿
├── vite.config.ts                 # Vite 설정
├── tsconfig.json                  # TypeScript 설정
├── tsconfig.app.json              # 앱 TypeScript 설정
├── tsconfig.node.json             # 노드 TypeScript 설정
├── package.json                   # 의존성
└── .gitignore
```

---

## 🏗 아키텍처 개요

### 계층 구조

```
Views (페이지)
   ↓
Components (UI 컴포넌트)
   ↓
Stores (Pinia - 상태관리)
   ↓
API (API 레이어)
   ↓
Backend API
```

### 데이터 흐름

```
사용자 액션
   ↓
컴포넌트 이벤트
   ↓
Pinia Action 호출
   ↓
API 요청
   ↓
백엔드 처리
   ↓
응답 처리
   ↓
상태 업데이트
   ↓
UI 자동 업데이트 (반응형)
```

---

## 🛠 핵심 기능

### 1. 상품 관리

**상품 조회**
```typescript
// src/stores/products.ts
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: null as string | null,
  }),
  
  actions: {
    async fetchProducts(page = 1, limit = 10) {
      this.loading = true
      try {
        const response = await productApi.getProducts(page, limit)
        this.products = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    async fetchProductDetail(id: string) {
      return await productApi.getProductDetail(id)
    },
  },
})
```

**컴포넌트에서 사용**
```vue
<template>
  <div class="product-list">
    <ProductCard 
      v-for="product in products" 
      :key="product.id"
      :product="product"
      @click="selectProduct"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProductStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'

const productStore = useProductStore()

const products = computed(() => productStore.products)

onMounted(() => {
  productStore.fetchProducts()
})
</script>
```

### 2. 장바구니 관리

**장바구니 저장소**
```typescript
// src/stores/cart.ts
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  
  getters: {
    totalPrice: (state) => 
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    
    itemCount: (state) => 
      state.items.reduce((sum, item) => sum + item.quantity, 0),
  },
  
  actions: {
    addItem(product: Product, quantity: number = 1) {
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          ...product,
          quantity,
        })
      }
    },
    
    removeItem(productId: string) {
      this.items = this.items.filter(item => item.id !== productId)
    },
    
    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find(item => item.id === productId)
      if (item) item.quantity = Math.max(1, quantity)
    },
    
    clearCart() {
      this.items = []
    },
  },
})
```

### 3. 사용자 인증

**인증 저장소**
```typescript
// src/stores/user.ts
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    token: localStorage.getItem('auth_token') || null,
  }),
  
  actions: {
    async login(email: string, password: string) {
      const response = await userApi.login(email, password)
      this.user = response.user
      this.token = response.token
      this.isAuthenticated = true
      localStorage.setItem('auth_token', response.token)
      return response
    },
    
    async logout() {
      this.user = null
      this.isAuthenticated = false
      this.token = null
      localStorage.removeItem('auth_token')
    },
    
    async signup(userData: SignupData) {
      const response = await userApi.signup(userData)
      return response
    },
  },
})
```

### 4. 라우팅

**라우터 설정**
```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import CartView from '@/views/CartView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetailView,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartView,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutView,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 라우트 가드: 인증 확인
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
```

### 5. API 통신

**API 클라이언트 설정**
```typescript
// src/api/client.ts
import axios from 'axios'
import { useUserStore } from '@/stores/user'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
})

// 요청 인터셉터: 토큰 추가
client.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  return config
})

// 응답 인터셉터: 에러 처리
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const userStore = useUserStore()
      userStore.logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default client
```

**API 호출**
```typescript
// src/api/productApi.ts
import client from './client'
import type { Product, ProductResponse } from '@/types/product'

export const productApi = {
  getProducts(page: number = 1, limit: number = 10) {
    return client.get<ProductResponse>('/products', {
      params: { page, limit },
    })
  },

  getProductDetail(id: string) {
    return client.get<Product>(`/products/${id}`)
  },

  searchProducts(keyword: string) {
    return client.get<Product[]>('/products/search', {
      params: { q: keyword },
    })
  },
}
```

---

## 📝 TypeScript 타입 정의

**상품 타입**
```typescript
// src/types/product.ts
export interface Product {
  id: string
  name: string
  description: string
  price: number
  discount?: number
  images: string[]
  category: string
  stock: number
  rating: number
  reviews: Review[]
  createdAt: Date
}

export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: Date
}

export interface ProductResponse {
  data: Product[]
  total: number
  page: number
  limit: number
}
```

**사용자 타입**
```typescript
// src/types/user.ts
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  address?: Address
  role: 'user' | 'admin'
  createdAt: Date
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface SignupData {
  email: string
  password: string
  name: string
  confirmPassword: string
}
```

**주문 타입**
```typescript
// src/types/order.ts
export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  totalPrice: number
  status: OrderStatus
  shippingAddress: Address
  paymentMethod: string
  createdAt: Date
  updatedAt: Date
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  subtotal: number
}
```

---

## 🎨 컴포넌트 개발 가이드

### 기본 컴포넌트 구조

```vue
<template>
  <div class="product-card">
    <img :src="product.images[0]" :alt="product.name" class="product-image">
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p class="price">{{ product.price | currency }}</p>
      <div class="rating">
        <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= product.rating }">★</span>
      </div>
      <button @click="handleAddToCart" class="btn btn-primary">
        장바구니 추가
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '@/types/product'
import { useCartStore } from '@/stores/cart'

interface Props {
  product: Product
}

defineProps<Props>()

const emit = defineEmits<{
  click: [product: Product]
}>()

const cartStore = useCartStore()
const quantity = ref(1)

const handleAddToCart = () => {
  cartStore.addItem(props.product, quantity.value)
  // 토스트 알림 표시
}
</script>

<style scoped>
.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 16px;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #e74c3c;
  margin: 8px 0;
}

.btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}
</style>
```

---

## 📋 상태 관리 (Pinia) 베스트 프랙티스

### 액션 작성 규칙

```typescript
// ❌ 잘못된 예
actions: {
  increment() {
    this.count++  // 동기 변경
  },
  
  async fetchData() {
    const data = await api.get()
    this.data = data  // 상태 직접 변경
  },
}

// ✅ 올바른 예
actions: {
  increment() {
    this.count++  // 동기 로직은 괜찮음
  },
  
  async fetchData() {
    try {
      const data = await api.get()
      this.data = data
      this.error = null
    } catch (error) {
      this.error = error.message
    }
  },
}
```

### Getter 활용

```typescript
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  
  getters: {
    // 계산된 값 캐싱
    totalPrice(): number {
      return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    
    // 파라미터를 받는 getter
    getItemById: (state) => (id: string) => {
      return state.items.find(item => item.id === id)
    },
  },
})
```

---

## 🔌 환경 변수 설정

**.env 파일**
```bash
# 개발 환경
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=E-Commerce
VITE_APP_VERSION=1.0.0

# 프로덕션 환경 (.env.production)
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=E-Commerce
VITE_APP_VERSION=1.0.0
```

**TypeScript에서 사용**
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL
const appName = import.meta.env.VITE_APP_NAME

// 타입 안정성
const env: ImportMetaEnv = import.meta.env
```

---

## 🧪 컴포넌트 테스트

### Vitest + Vue Test Utils

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'
import type { Product } from '@/types/product'

describe('ProductCard.vue', () => {
  let wrapper: any
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    price: 100,
    // ... 다른 필드
  }

  beforeEach(() => {
    wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    })
  })

  it('상품 이름이 표시된다', () => {
    expect(wrapper.text()).toContain('Test Product')
  })

  it('가격이 올바르게 표시된다', () => {
    expect(wrapper.text()).toContain('100')
  })

  it('장바구니 추가 버튼 클릭 시 이벤트 발생', async () => {
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })
})
```

---

## 📱 반응형 디자인

**CSS 미디어 쿼리**
```css
/* 모바일 우선 접근법 */
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* 태블릿 */
@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 데스크톱 */
@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 큰 화면 */
@media (min-width: 1440px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## 🔒 보안 고려사항

### 1. XSS 방지

```vue
<!-- ❌ 위험: HTML 그대로 렌더링 -->
<div v-html="userContent"></div>

<!-- ✅ 안전: 텍스트로 렌더링 -->
<div>{{ userContent }}</div>

<!-- ✅ 필요한 경우만 DOMPurify 사용 -->
<div v-html="sanitizeHtml(userContent)"></div>
```

### 2. CSRF 방지

```typescript
// API 요청에 CSRF 토큰 포함
client.interceptors.request.use((config) => {
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
  if (token) {
    config.headers['X-CSRF-Token'] = token
  }
  return config
})
```

### 3. 민감한 정보 처리

```typescript
// ❌ 로컬스토리지에 민감한 정보 저장
localStorage.setItem('password', password)

// ✅ 토큰만 저장하고 세션 스토리지 사용
sessionStorage.setItem('auth_token', token)

// ❌ console에 민감한 정보 출력
console.log('Password:', password)

// ✅ 필요한 것만 로깅
console.log('Login attempt for:', email)
```

---

## ⚡ 성능 최적화

### 1. Code Splitting (경로 기반)

```typescript
// src/router/index.ts
const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/checkout',
    component: () => import('@/views/CheckoutView.vue'),
  },
]
```

### 2. 이미지 최적화

```vue
<template>
  <!-- WebP 지원 및 fallback -->
  <picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.jpg" type="image/jpeg">
    <img :src="image.jpg" :alt="alt" loading="lazy">
  </picture>
</template>
```

### 3. 가상 스크롤링 (큰 리스트)

```vue
<!-- vue-virtual-scroller 사용 -->
<RecycleScroller
  :items="products"
  :item-size="300"
  v-slot="{ item }"
>
  <ProductCard :product="item" />
</RecycleScroller>
```

---

## 📚 추가 리소스

### 공식 문서
- [Vue 3 공식 문서](https://vuejs.org/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
- [Vite 공식 문서](https://vitejs.dev/)
- [Pinia 공식 문서](https://pinia.vuejs.org/)
- [Vue Router 공식 문서](https://router.vuejs.org/)

### 개발 도구
- **VSCode**: Vue - Official 확장 프로그램 설치
- **Chrome DevTools**: Vue DevTools 확장 프로그램
- **Vite Plugin Vue DevTools**: `npm install -D vite-plugin-vue-devtools`

### 커뮤니티
- Vue Discord 커뮤니티
- GitHub Discussions
- Stack Overflow

---

## 🐛 일반적인 문제 해결

### 1. Hot Module Replacement 작동하지 않음

```bash
# vite.config.ts에서 확인
export default {
  server: {
    hmr: {
      host: 'localhost',
      port: 5173,
    },
  },
}
```

### 2. TypeScript 에러 - "모듈을 찾을 수 없음"

```typescript
// tsconfig.json에서 경로 설정
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 3. CORS 에러

```typescript
// vite.config.ts에서 프록시 설정
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://backend-server:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
}
```

---

## 📊 빌드 및 배포

### 1. 로컬 빌드

```bash
npm run build

# dist/ 폴더에 생성됨
# dist/index.html - 메인 파일
# dist/assets/ - 번들 파일들
```

### 2. Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### 3. Docker 배포

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## ✅ 개발 체크리스트

```
기본 설정
[✅] Node.js 18+ 설치
[✅] npm 의존성 설치
[✅] .env 파일 설정
[✅] TypeScript 설정 확인

개발
[✅] 로컬 서버 실행 (npm run dev)
[✅] VSCode Vue 확장 설치
[✅] Vue DevTools 설치
[✅] 핫 리로드 확인

빌드
[✅] TypeScript 타입 체크
[✅] npm run build 성공
[✅] dist 폴더 생성 확인
[✅] npm run preview로 검증

배포 전
[✅] 환경 변수 확인
[✅] API 엔드포인트 확인
[✅] 보안 헤더 설정
[✅] 성능 최적화 완료

배포
[✅] 프로덕션 빌드 생성
[✅] 배포 플랫폼 설정
[✅] HTTPS 활성화
[✅] CDN 설정 (선택)

완료도: __/19 항목
```

---

## 🎯 다음 단계

### 단기 (1-2주)
- [ ] 기본 레이아웃 구성
- [ ] 상품 목록 및 상세 페이지
- [ ] 장바구니 기능
- [ ] 로그인/회원가입

### 중기 (2-4주)
- [ ] 결제 시스템 통합
- [ ] 주문 관리
- [ ] 사용자 프로필
- [ ] 검색 및 필터링

### 장기 (1-2개월)
- [ ] 상품 리뷰 시스템
- [ ] 위시리스트
- [ ] 추천 엔진
- [ ] 어드민 대시보드

---

## 📞 지원 및 문의

이슈 발생 시:
1. GitHub Issues에서 기존 이슈 검색
2. 자세한 설명과 함께 새로운 이슈 생성
3. 재현 가능한 최소 코드 예제 제공

---

## 📝 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

---

## 🙏 기여

이 프로젝트에 기여하고 싶다면:
1. Fork 후 feature 브랜치 생성
2. 변경사항 커밋
3. Pull Request 제출

---

**프로젝트 시작 날짜**: 2024년  
**최근 업데이트**: 2025년 12월  
**개발자**: L-a-z-e  
**상태**: 🚀 활발히 개발 중

행운을 빕니다! Happy Coding! 💻✨
