// @ts-expect-error --> Supabase is not a module, nuxt said
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data: orders, error, status } = await client.from('orders').select()

  console.log(orders)

  if (error) {
    throw createError({
      statusCode: status,
      message: error.message,
    })
  }

  return orders

})