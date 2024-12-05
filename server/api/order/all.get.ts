
export default defineEventHandler(async (event) => {
  type OrderQuery = {
    page: number,
    pageSize: number,
    status: string,
    name: string,
    email: string,
    phone: string,
  }
  const { supabase } = await useSupabase(event)
  const query = getQuery(event)
  const { page, pageSize, status: statusParam, name, email, phone } = query as OrderQuery
  const initRange = pageSize * (page - 1)
  const endRange = (pageSize * page) - 1

  let orderQuery = supabase.from('orders').select('*', { count: 'exact' }).range(initRange, endRange)
  if (statusParam !== 'all') orderQuery = orderQuery.eq('status', statusParam)
  if (name) orderQuery = orderQuery.ilike('username', `%${name}%`)
  if (email) orderQuery = orderQuery.ilike('email', `%${email}%`)
  if (phone) orderQuery = orderQuery.eq('phone', phone)

  const { data: orders, count: total, error, status } = await orderQuery

  if (error) {
    throw createError({
      statusCode: status,
      message: error.message,
    })
  }

  return {
    orders,
    total
  }

})