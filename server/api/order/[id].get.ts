import type { OrderProduct } from "~/utils/types";

export default defineEventHandler(async (event) => {
  const { supabase } = await useSupabase(event)
  const orderId = parseInt(getRouterParam(event, 'id')!)

  console.log('id', orderId, typeof orderId);
  

  const { data: orderProducts, error, status } = await supabase
    .from('order_product')
    .select(`
      quantity, product, order(id),
      products (*)
    `)
    .eq('order(id)', orderId)

  console.log(orderProducts)
  console.error(error)

  if (error) {
    throw createError({
      statusCode: status,
      message: error.message,
    })
  }

  orderProducts.forEach((prod: OrderProduct) => {
    if (!prod.products.image) return
    const { data } = supabase.storage.from('products').getPublicUrl(prod.products.image)
    prod.products.imageUrl = data.publicUrl
  })

  return orderProducts

})