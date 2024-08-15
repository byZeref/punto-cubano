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
  // price: number,
  // category: string,
}