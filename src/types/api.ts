export interface SignUpRequest {
  password: string;
  username: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface Product {
  id: number;
  productName: string;
  price: number;
  stock: number;
  attributes?: string;
}

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
  totalPrice: number;
}

// TODO: 다른 API 타입 추가