import type { OrderProduct } from '~/utils/types'
import { order_status } from '~/utils/constants'
const { ORDER_PENDING } = order_status

export default defineEventHandler(async (event) => {
  const { supabase } = await useSupabase(event)
  const form = await readBody(event)
  const { username, phone, email, products } = form

  const order = {
    username,
    phone,
    email,
    datetime: new Date(),
    status: ORDER_PENDING,
  }

  const { data, status: statusOrder, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
  
  console.log('error', error)
  if (error) {
    throw createError({
      statusCode: statusOrder,
      message: 'No se pudo guardar el pedido. Por favor, inténtelo de nuevo.',
    })
  }

  const _order = data[0]
  console.log('data', _order)
  console.log('status', statusOrder)
  
  let statusProducts
  if (statusOrder === 201) {
    const orderProducts: OrderProduct[] = []
    products.forEach(({ id, quantity }: { id: number, quantity: number }) => {
      orderProducts.push({
        order: _order.id,
        product: id,
        quantity,
      })
    })

    const { status, error: errorProducts } = await supabase
      .from('order_product')
      .insert(orderProducts)

    statusProducts = status
    console.log('prod-status', statusProducts)
    console.log('prod-error', errorProducts)

    if (errorProducts) {
      // eliminar filas en `order_product` si existen
      const { error: orderProductsError } = await supabase
        .from('order_product')
        .delete()
        .eq('order', _order.id)

      // eliminar fila recien insertada en `orders`
      const { error: orderError } = await supabase
        .from('orders')
        .delete()
        .eq('id', _order.id)
    }
  }
  
  const finalStatus = statusOrder === 201 && statusProducts === 201 
    ? 201 
    : statusOrder !== 201 ? statusOrder : statusProducts

  return {
    order: _order,
    status: finalStatus,
  }
})