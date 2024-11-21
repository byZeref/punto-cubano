import type { Product } from "~/utils/types"

export default defineEventHandler(async (event) => {
  const { supabase } = await useSupabase(event)

  const { data: products, error, status } = await supabase.from('products').select()

  if (error) {
    throw createError({
      statusCode: status,
      message: error.message,
    })
  }

  products.forEach((prod: Product) => {
    if (!prod.image) return
    const { data } = supabase.storage.from('products').getPublicUrl(prod.image)
    prod.imageUrl = data.publicUrl
  })
  
  return products
  
})