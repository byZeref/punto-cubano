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

export const buttons_ui = {
  BTN_PRIMARY: {
    color: {
      primary: {
        solid: `shadow-sm text-white dark:text-white bg-[#4c1b1e] hover:bg-[#4c1b1ef0] disabled:bg-[#4c1b1e] 
        dark:bg-[#4c1b1e] dark:hover:bg-[#4c1b1ed0] dark:disabled:bg-[#4c1b1e]`,
      },
    }
  },
}

export const order_status = {
  ORDER_PENDING: 'pending',
  ORDER_SENT: 'sent',
  ORDER_DELIVERED: 'delivered',
  ORDER_CANCELLED: 'cancelled',
}

export const order_status_labels = {
  pending: 'Pendiente',
  sent: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}

export const order_status_options = [
  { value: 'pending', label:  'Pendiente' },
  { value: 'sent', label:  'Enviado' },
  { value: 'delivered', label:  'Entregado' },
  { value: 'cancelled', label:  'Cancelado' },
]

export const ORDER_TABLE_COLUMNS = [
  { key: 'actions', label: 'Acciones', sortable: false, },
  { key: 'status', label: 'Estado', sortable: true, },
  { key: 'created_at', label: 'Fecha y hora', sortable: true, },
  { key: 'username', label: 'Nombre y apellidos', sortable: true, },
  { key: 'email', label: 'Correo electrónico', sortable: true, },
  { key: 'phone', label: 'Teléfono', sortable: true, },
]

export const DATE_TIME_BASE_FORMAT = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  // second: '2-digit',
  // timeZoneName: 'short'
}