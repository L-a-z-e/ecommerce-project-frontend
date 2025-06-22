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

export interface OrderRequest {
  address: string;
}

export interface OrderItemDetail {
  productName: string;
  quantity: number;
  orderPrice: number;
}
export interface OrderResponse {
  orderId: number;
  orderAddress: string;
  totalPrice: number;
  status: string;
  orderDate: string;
  orderItems: OrderItemDetail[];
}