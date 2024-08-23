import type { Product, ProductCart } from '@/utils/types'

export const useCartStore = defineStore('cart', () => {
  const products = ref<ProductCart[]>([])
  const count = computed(() => products.value.reduce((acc, curr) => acc + curr.quantity, 0))
  const total = computed(() => products.value.reduce((acc, curr) => acc + curr.subtotal, 0))

  const add = (product: Product, quantity = 1) => {
    const target = products.value.find(prod => prod.id === product.id)
    if (target) {
      target.quantity += quantity
      target.subtotal = parseFloat(target.price) * target.quantity
    }
    else products.value.push({ ...product, quantity: quantity, subtotal: parseFloat(product.price) * quantity })
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