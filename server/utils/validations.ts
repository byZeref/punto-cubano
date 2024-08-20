import type { ProductPayload } from "~/utils/types";
import { regex } from '~/utils/constants'

const { PRICE_REGEX } = regex

export const validateProductPayload = (payload: ProductPayload) => {
  const { name, description, price, category } = payload

  if (name === 'undefined') {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'field `name` is required' })
  }
  if (description === 'undefined') {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'field `description` is required' })
  }
  if (price === 'undefined') {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'field `price` is required' })
  }
  if (!PRICE_REGEX.test(price)) {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'field `price` is invalid' })
  }
  if (category === 'undefined') {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'field `category` is required' })
  }
}

