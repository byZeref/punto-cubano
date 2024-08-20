import type { RouteRecordNameGeneric } from 'vue-router'

export const error_types = {
  AUTH_API_ERROR: 'AuthApiError'
}

export const PRODUCT_CATEGORIES = ['Rones', 'Tabacos', 'Cigarros']

export const PROTECTED_ROUTES: RouteRecordNameGeneric[] = ['admin']

export const errorMessages = {
  ERR_INTERNET_CONNECTION: 'Por favor verifique su conexión a internet',
}

export const notificationTypes = {
  NOTIFICATION_SUCCESS: 'success',
  NOTIFICATION_ERROR: 'error',
}

export const regex = {
  PRICE_REGEX: /^[1-9]\d*(\.\d+)?$/,
  EMAIL_REGEX: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
}