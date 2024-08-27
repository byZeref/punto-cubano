import type { Order, Product, ProductCart } from '@/utils/types'

export const useCartStore = defineStore('cart', () => {
  const order = useCookie<Order | undefined>('cart_order')
  const products = ref<ProductCart[]>(order.value?.products ?? [])
  const count = computed(() => products.value.reduce((acc, curr) => acc + curr.quantity, 0))
  const total = computed(() => products.value.reduce((acc, curr) => acc + curr.subtotal, 0))

  const add = (product: Product, quantity = 1) => {
    const target = products.value?.find(prod => prod.id === product.id)
    console.log(target);
    
    if (target) {
      target.quantity += quantity
      target.subtotal = parseFloat(target.price) * target.quantity
    }
    else products.value.push({ ...product, quantity: quantity, subtotal: parseFloat(product.price) * quantity })

    _updateOrder()
  }

  const remove = (product: Product) => {
    const target = products.value.find(prod => prod.id === product.id)!
    if (target.quantity > 1) {
      target.quantity--
      target.subtotal -= parseFloat(target.price)
    }
    else products.value = products.value.filter(prod => prod.id !== product.id)

    _updateOrder()
  }

  const _updateOrder = () => {
    order.value = {
      products: products.value,
    }
  }

  return { products, count, total, order, add, remove }

})