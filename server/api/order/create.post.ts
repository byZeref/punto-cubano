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
  
  const _order = data[0]
  console.log('data', _order)
  console.log('status', statusOrder)
  console.log('error', error)
  
  let statusProducts
  let productsError
  if (statusOrder === 201) {
    const orderProducts: OrderProduct[] = []
    products.forEach(({ id, quantity }: { id: number, quantity: number }) => {
      orderProducts.push({
        order: _order.id,
        product: id,
        quantity,
      })
    })

    const { status, error } = await supabase
      .from('order_product')
      .insert(orderProducts)

    statusProducts = status
    productsError = error
    console.log('prod-status', statusProducts)
    console.log('prod-error', productsError)

    if (error) {
      // TODO eliminar filas en `order_product` si existen
      // TODO eliminar fila recien insertada en `orders`
    }
  }
  
  return {
    order: _order,
    statusOrder,
    statusProducts,
  }
})