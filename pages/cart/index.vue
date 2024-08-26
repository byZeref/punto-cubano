<script setup>
const cartStore = useCartStore()
const router = useRouter()
const products = computed(() => cartStore.products)

const handleDiscountQuantity = (target) => {
  cartStore.remove(target)
}
const handleAddQuantity = (target) => {
  cartStore.add(target)
}

const showOrderDataModal = ref(false)
const handleConfirmOrder = () => {
  console.log('confirm order')
  // TODO show form
  showOrderDataModal.value = true
}
</script>

<template>
  <OrderDataModal
    v-if="showOrderDataModal"
    :show="showOrderDataModal"
    @update:show="(val) => showOrderDataModal = val" 
  />
  
  <section class="relative pb-20">
    <div class="flex justify-between items-center">
      <NuxtLink to="/products" class="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 py-1 px-2 rounded-md duration-200">
        <UIcon name="i-heroicons-arrow-long-left" />
        <span>Regresar</span>
      </NuxtLink>
      <div class="flex flex-col">
        <span class="text-xs text-slate-500 dark:text-slate-300">Importe total</span>
        <span class="font-bold sm:text-lg">${{ cartStore.total.toFixed(2) }}</span>
      </div>
    </div>

    <UDivider class="mt-4 mb-6" />

    <UAlert
      v-if="!products.length"
      icon="i-heroicons-information-circle"
      color="sky"
      variant="soft"
      title="Carrito vacío!"
      description="No se han agregado productos a su carrito."
      :actions="[{ variant: 'outline', color: 'sky', label: 'Ver todos los productos', click: () => router.push('/products') }]"
    />

    <div v-else class="flex flex-col gap-5">
      <div
        v-for="product in products" 
        :key="product.id"
        class="flex h-[80px] sm:h-20 px-2"
      >
        <div class="h-full w-[80px] lg:w-[100px] flex-shrink-0 overflow-hidden rounded-md">
          <img
            :src="product.imageUrl" 
            class="product-image h-full w-auto object-cover duration-200"
            alt="Product image"
          >
        </div>
        <div class="px-2 flex justify-between items-center w-full gap-2">
          <div class="flex flex-col h-full w-full">
            <span class="product-name font-semibold text-sm text-slate-900 dark:text-white">{{ product.name }}</span>
            <div class="mt-auto flex justify-between items-center">
              <div>
                <span class="text-xs line-clamp-1">Subtotal</span>
                <span class="font-medium text-lg">${{ product.subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex items-center">
                <UButton
                  :icon="product.quantity > 1 ? 'i-heroicons-minus' : 'i-heroicons-trash'"
                  color="red"
                  variant="ghost"
                  class="text-red-500 dark:text-red-400"
                  @click="handleDiscountQuantity(product)"
                />
                <UButton
                  color="white"
                  variant="ghost"
                  class="px-3 text-slate-900 dark:text-slate-100 font-medium hover:bg-transparent"
                >
                  <span class="font-semibold">{{ product.quantity }}</span>
                </UButton>
                <UButton
                  icon="i-heroicons-plus"
                  color="primary"
                  variant="ghost"
                  class="text-[#4c1b1e] dark:text-[#7f2c30] hover:bg-[#4c1b1e1a] dark:hover:bg-[#4c1b1ea1]"
                  @click="handleAddQuantity(product)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FixedBottom v-if="products.length" label="Confirmar pedido" :action="handleConfirmOrder" />
      
    </div>
  </section>
</template>

<style scoped>
.router-link-active {
  color: var(--text-color) !important;
  font-weight: normal !important;
}

</style>
