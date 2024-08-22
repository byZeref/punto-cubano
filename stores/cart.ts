import type { Product, ProductCart } from '@/utils/types'

export const useCartStore = defineStore('cart', () => {
  const products = ref<ProductCart[]>([])
  const count = computed(() => products.value.reduce((acc, curr) => acc + curr.quantity, 0))
  const total = computed(() => products.value.reduce((acc, curr) => acc + curr.subtotal, 0))

  const add = (product: Product) => {
    const target = products.value.find(prod => prod.id === product.id)
    if (target) {
      target.quantity++
      target.subtotal += parseFloat(target.price)
    }
    else products.value.push({ ...product, quantity: 1, subtotal: parseFloat(product.price) })
  }

  const remove = (product: Product) => {
    const target = products.value.find(prod => prod.id === product.id)!
    if (target.quantity > 1) {
      target.quantity--
      target.subtotal -= parseFloat(target.price)
    }
    else products.value = products.value.filter(prod => prod.id !== product.id)
  }

  return { products, count, total, add, remove }

})