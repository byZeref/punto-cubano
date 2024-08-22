// @ts-expect-error --> Supabase is not a module, nuxt said
import { serverSupabaseClient } from '#supabase/server'
import type { Product } from "~/utils/types"

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data: products, error, status } = await client.from('products').select()

  if (error) {
    throw createError({
      statusCode: status,
      message: error.message,
    })
  }

  products.forEach((prod: Product) => {
    if (!prod.image) return
    const { data } = client.storage.from('products').getPublicUrl(prod.image)
    prod.imageUrl = data.publicUrl
  })
  
  return products
  
})