export interface User {
  email: string,
  role: string,
}

export interface UserData {
  user: User,
  access_token: string,
  refresh_token: string,
}

export type AuthError = {
  name: string,
  status: number,
  __isAuthError: boolean,
}

export interface Product {
  id?: number,
  created_at?: string,
  name: string,
  description: string,
  image?: string,
  imageUrl?: string,
  price: string,
  category: string,
  available: boolean,
}

export interface ProductPayload {
  id?: string,
  name: string,
  description: string,
  image?: Blob,
  price: string,
  category: string,
  available: boolean,
  oldImageName?: string,
}

export type ProductCart = Product & { quantity: number, subtotal: number }

export interface Order {
  products: ProductCart[],
}

export interface OrderProduct {
  order: number,
  product: number,
  quantity: number,
  products?: Product
}

export type FilterType = 'status' | 'name' | 'email' | 'phone'