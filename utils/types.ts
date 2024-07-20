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