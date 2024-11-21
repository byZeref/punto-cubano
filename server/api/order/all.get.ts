
export default defineEventHandler(async (event) => {
  const { supabase } = await useSupabase(event)

  const { data: orders, error, status } = await supabase
    .from('orders')
    .select()

  console.log(orders)

  if (error) {
    throw createError({
      statusCode: status,
      message: error.message,
    })
  }

  return orders

})