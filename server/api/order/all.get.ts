
export default defineEventHandler(async (event) => {
  const { supabase } = await useSupabase(event)
  const query = getQuery(event)
  const { status: statusParam, name, email, phone } = query
  console.log(query)

  let orderQuery = supabase.from('orders').select('*')
  if (statusParam !== 'all') orderQuery = orderQuery.eq('status', statusParam)
  if (name) orderQuery = orderQuery.ilike('username', `%${name}%`)
  if (email) orderQuery = orderQuery.ilike('email', `%${email}%`)
  if (phone) orderQuery = orderQuery.eq('phone', phone)

  const { data: orders, error, status } = await orderQuery

  // console.log(orders)

  if (error) {
    throw createError({
      statusCode: status,
      message: error.message,
    })
  }

  return orders

})